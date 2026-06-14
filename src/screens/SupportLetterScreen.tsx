import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCurrentDraw } from "@/hooks/useApi";
import { useStore } from "@/store/useStore";
import { HebrewGlyph } from "@/components/LetterComponents";
import { useScrollHint } from "@/hooks/useScrollHint";



export function SupportLetterScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: currentDraw } = useCurrentDraw();
  const markJourneyStep = useStore(state => state.markJourneyStep);

  useEffect(() => {
    markJourneyStep("support_letter");
  }, [markJourneyStep]);

  const scrollRef = useScrollHint();

  return (
    <div ref={scrollRef as any} className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="px-6 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          
        </button>
      </header>

      <main className="flex-1 px-6 pb-8 flex flex-col">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex-1">
          <div className="text-center mb-6">
            <p className="text-[11px] tracking-[0.2em] uppercase text-ash mb-2">{t('support.title')}</p>
            <div className="w-8 h-px bg-parchment/20 mx-auto mb-6" />
            {currentDraw && (
              <div className="flex justify-center mb-6 opacity-80">
                <HebrewGlyph symbol={currentDraw.card_1.symbol} size="lg" letter={currentDraw.card_1} />
              </div>
            )}
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="bg-parchment/[0.03] rounded-2xl p-6 border border-parchment/5">
            <p className="text-sm text-parchment/85 leading-[1.9] whitespace-pre-line font-light">{t('support.letter_text')}</p>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8 flex flex-col gap-3">
          <button onClick={() => navigate("/experience")} className="w-full py-4 px-6 bg-parchment text-ink rounded-full text-sm font-medium hover:bg-parchment/90 transition-colors flex items-center justify-center text-center whitespace-normal leading-tight">
            {t('support.experience_btn')}
          </button>
          <button onClick={() => navigate("/home")} className="w-full py-4 px-6 bg-transparent border border-parchment/20 text-parchment rounded-full text-sm font-medium hover:bg-parchment/5 transition-colors flex items-center justify-center text-center whitespace-normal leading-tight">
            {t('support.back_btn')}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
