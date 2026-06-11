import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCurrentDraw } from "@/hooks/useApi";
import { MediaPlayer } from "@/components/MediaPlayer";
import { useStore } from "@/store/useStore";

export function MeditationScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: currentDraw } = useCurrentDraw();
  const markJourneyStep = useStore(state => state.markJourneyStep);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    markJourneyStep("experience");
  }, [markJourneyStep]);

  // Forced to "1.mp3" (Aleph) for now as requested
  const audioSrc = `/video/audio/1.mp3`;

  return (
    <div className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="px-6 pt-12 pb-4">
        <button onClick={() => navigate("/experience")} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {t('common.back')}
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
              <h1 className="text-2xl font-medium text-parchment mb-4">{t('experience.meditation')}</h1>
              <p className="text-sm text-ash/80 max-w-[280px] mx-auto leading-relaxed mb-12">
                {t('experience.meditation_desc')}
              </p>
              <button
                onClick={() => setReady(true)}
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
              <MediaPlayer src={audioSrc} type="audio" />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
