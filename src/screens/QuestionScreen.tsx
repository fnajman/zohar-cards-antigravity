import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";
import { useCurrentDraw } from "@/hooks/useApi";

export function QuestionScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user } = useStore();
  const { data: currentDraw } = useCurrentDraw();
  const [question, setQuestion] = useState("");

  if (!currentDraw) { navigate("/home"); return null; }

  const handleReveal = () => {
    navigate("/interpretation");
  };

  return (
    <div className="h-full flex flex-col bg-night">
      <header className="sticky top-0 z-10 bg-night/95 backdrop-blur-sm px-6 pt-12 pb-3 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {t('common.back')}
        </button>
        <div className="flex gap-2">
          <span className="text-[11px] text-ash tracking-wide">{t('common.credits_left', { count: user.credits })}</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        {user.credits <= 0 ? (
          <div className="h-full flex flex-col items-center justify-center gap-6">
            <p className="text-sm text-ash text-center max-w-[240px]">{t('question.no_credits')}</p>
            <button className="px-6 py-3 border border-parchment/20 text-parchment rounded-full text-sm hover:border-parchment/40 transition-colors">
              {t('question.see_plans')}
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-[300px] flex flex-col items-center gap-7">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="text-2xl font-medium tracking-tight text-parchment mb-2">{t('question.title')}</h1>
              <p className="text-sm text-ash leading-relaxed max-w-[280px]">
                {t('question.subtitle')}
              </p>
            </motion.div>
            <textarea
              value={question} onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ce qui occupe mon esprit..."
              className="w-full h-28 bg-night-light border border-parchment/10 rounded-2xl px-4 py-3 text-sm text-parchment placeholder:text-ash/40 resize-none focus:outline-none focus:border-parchment/25 transition-colors"
            />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-full flex flex-col gap-3">
              <button 
                onClick={handleReveal}
                disabled={question.trim().length === 0}
                className="w-full py-4 bg-parchment text-ink rounded-full text-sm font-medium hover:bg-bone transition-colors disabled:opacity-50 disabled:bg-parchment/10 disabled:text-ash disabled:hover:bg-parchment/10"
              >
                {t('question.reveal_btn')}
              </button>
              <button onClick={handleReveal} className="w-full py-3 text-ash text-sm hover:text-parchment transition-colors">
                {t('question.reveal_skip_btn')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
