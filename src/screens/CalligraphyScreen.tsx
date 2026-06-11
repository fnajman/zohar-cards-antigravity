import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MediaPlayer } from "@/components/MediaPlayer";
import { useStore } from "@/store/useStore";
import { useCurrentDraw } from "@/hooks/useApi";
import { useScrollHint } from "@/hooks/useScrollHint";

export function CalligraphyScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: currentDraw } = useCurrentDraw();
  const markJourneyStep = useStore(state => state.markJourneyStep);
  const [ready, setReady] = useState(false);

  // Forced to "1.mp4" (Aleph) for now as requested
  const videoSrc = `/video/calligraph/1.mp4`;
  const scrollRef = useScrollHint();

  return (
    <div ref={scrollRef as any} className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="px-6 pt-12 pb-4">
        <button onClick={() => navigate("/experience")} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          
        </button>
      </header>

      <main className="flex-1 px-6 pb-12 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!ready ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-2xl font-medium text-parchment mb-4">{t('experience.calligraphy')}</h1>
              <p className="text-sm text-ash/80 max-w-[280px] mx-auto leading-relaxed mb-12">
                {t('experience.calligraphy_desc')}
              </p>
              <button
                onClick={() => {
                  setReady(true);
                  markJourneyStep("experience");
                }}
                className="px-8 py-3 rounded-full border border-parchment/20 text-parchment text-sm hover:bg-parchment/5 transition-colors"
              >
                {t('experience.ready_btn')}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full flex flex-col items-center justify-center"
            >
              <MediaPlayer src={videoSrc} type="video" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
