import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";
import { useCurrentDraw, useAddKeywords } from "@/hooks/useApi";
import { useMemo } from "react";

export function QuestionScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, markJourneyStep, setCurrentQuestion } = useStore();
  const { data: currentDraw } = useCurrentDraw();
  const { mutate: selectKeywords } = useAddKeywords();
  const [question, setQuestion] = useState("");
  const [selected, setSelected] = useState<string[]>([]);

  const resonanceWords = useMemo(() => {
    if (!currentDraw) return [];
    const c1 = currentDraw.card_1?.semantic_field || { keywords: [], imbalances: [] };
    const c2 = currentDraw.card_2?.semantic_field || { keywords: [], imbalances: [] };
    
    const allWords = [
      ...(c1.keywords || []),
      ...(c1.imbalances || []),
      ...(c2.keywords || []),
      ...(c2.imbalances || [])
    ];
    
    return Array.from(new Set(allWords)).sort(() => Math.random() - 0.5);
  }, [currentDraw]);

  if (!currentDraw) { navigate("/home"); return null; }

  const toggle = (w: string) => setSelected((p) => p.includes(w) ? p.filter((x) => x !== w) : [...p, w]);

  const saveAndNavigate = () => {
    if (!user) {
      alert(t('question.guest_alert', "Vous devez créer un compte pour bénéficier de toutes les fonctionnalités."));
      return;
    }
    const isPrivileged = user.role === 'admin' || user.role === 'contrib';
    if (!isPrivileged && (user.credits ?? 0) < 3) {
      alert(t('question.credit_alert', "Vous devez avoir au moins 3 crédits pour obtenir une interprétation."));
      return;
    }

    markJourneyStep("question");
    setCurrentQuestion(question.trim());
    if (selected.length > 0) {
      selectKeywords({ drawId: currentDraw.id, keywords: selected }, {
        onSuccess: () => navigate("/interpretation")
      });
    } else {
      navigate("/interpretation");
    }
  };

  const handleReveal = () => {
    saveAndNavigate();
  };

  const handleSkip = () => {
    saveAndNavigate();
  };

  return (
    <div className="h-full flex flex-col bg-night">
      <header className="sticky top-0 z-10 bg-night/95 backdrop-blur-sm px-6 pt-12 pb-3 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          
        </button>
        <div className="flex gap-2">
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-[300px] flex flex-col items-center gap-7 my-auto pb-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h1 className="text-2xl font-medium tracking-tight text-parchment mb-2">{t('question.title')}</h1>
              <p className="text-sm text-ash leading-relaxed max-w-[320px] sm:max-w-[360px]">
                {t('question.subtitle')}
              </p>
            </motion.div>
            <textarea
              value={question} onChange={(e) => setQuestion(e.target.value)}
              placeholder={t('question.placeholder')}
              className="w-full h-28 bg-night-light border border-parchment/10 rounded-2xl px-4 py-3 text-base text-parchment placeholder:text-ash/40 resize-none focus:outline-none focus:border-parchment/25 transition-colors mb-2"
            />
            
            <div className="w-full text-left">
              <p className="text-[11px] tracking-[0.15em] uppercase text-ash/60 mb-3">{t('interpretation.resonance')}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {resonanceWords.map((w) => (
                  <button key={w} onClick={() => toggle(w)}
                    className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 ${selected.includes(w) ? "bg-parchment text-ink" : "bg-parchment/5 border border-parchment/10 text-parchment/70 hover:border-parchment/25"}`}>
                    {w}
                  </button>
                ))}
              </div>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="w-full flex flex-col gap-3">
              <button 
                onClick={handleReveal}
                disabled={question.trim().length === 0}
                className="w-full py-4 px-6 bg-parchment text-ink rounded-full text-sm font-medium hover:bg-bone transition-colors disabled:opacity-50 disabled:bg-parchment/10 disabled:text-ash disabled:hover:bg-parchment/10 flex items-center justify-center text-center whitespace-normal leading-tight"
              >
                {t('question.reveal_btn')}
              </button>
              <button onClick={handleSkip} className="w-full py-3 text-ash text-sm hover:text-parchment transition-colors">
                {t('question.reveal_skip_btn')}
              </button>
            </motion.div>
          </motion.div>
      </main>
    </div>
  );
}
