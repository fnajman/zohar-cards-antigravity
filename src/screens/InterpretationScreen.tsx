import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";
import { useCurrentDraw, useAddKeywords } from "@/hooks/useApi";
import { useScrollHint } from "@/hooks/useScrollHint";

const fakeAI = `La rencontre de ces deux lettres ouvre un espace de reflexion profond.

La premiere lettre agit comme une impulsion, un mouvement initial qui cherche a se deployer. La seconde lettre offre un cadre, une structure ou cette impulsion peut trouver son expression.

Ensemble, elles dessinent un paysage interieur ou le potentiel rencontre la forme. Ce n'est ni une reponse ni une direction — c'est un miroir.

L'espace entre ces deux forces est un lieu de contemplation. Il vous appartient d'y lire ce que votre regard y depose.`;

const resonanceWords = ["potentiel", "structure", "silence", "ouverture", "profondeur", "transformation", "passage", "lumiere", "miroir", "ancrage", "impulsion", "forme"];

export function InterpretationScreen() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data: currentDraw } = useCurrentDraw();
  const { mutate: selectKeywords } = useAddKeywords();
  const { user, markJourneyStep } = useStore();
  const [selected, setSelected] = useState<string[]>([]);
  const scrollRef = useScrollHint();

  useEffect(() => {
    markJourneyStep("interpretation");
  }, [markJourneyStep]);

  if (!currentDraw) { navigate("/home"); return null; }

  const toggle = (w: string) => setSelected((p) => p.includes(w) ? p.filter((x) => x !== w) : [...p, w]);
  const save = () => { selectKeywords({ drawId: currentDraw.id, keywords: selected }); navigate("/support-letter"); };

  if (user.credits < 3) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-night px-6 gap-6">
        <p className="text-sm text-ash text-center max-w-[280px] leading-relaxed">
          {t('interpretation.no_credits', 'Il vous faut au moins 3 crédits pour obtenir une interprétation personnelle profonde.')}
        </p>
        <div className="w-full max-w-[240px] flex flex-col gap-3">
          <button onClick={() => navigate("/settings")} className="w-full py-4 border border-parchment/20 text-parchment rounded-full text-sm hover:border-parchment/40 transition-colors">
            {t('interpretation.buy_credits', 'Acheter des crédits')}
          </button>
          <button onClick={() => navigate("/home")} className="w-full py-3 text-ash text-sm hover:text-parchment transition-colors">
            {t('interpretation.home_btn', 'Retour à l\'accueil')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef as any} className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="sticky top-0 z-10 bg-night/95 backdrop-blur-sm px-6 pt-12 pb-3">
        <button onClick={() => navigate("/reading")} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          
        </button>
      </header>

      <main className="flex-1 px-6 pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2 className="text-xl font-medium text-parchment mb-1">{currentDraw.combination.title}</h2>
          <p className="text-xs text-ash mb-6">{t('interpretation.subtitle')}</p>

          <div className="bg-night-light rounded-2xl p-5 border border-parchment/5 mb-8">
            <p className="text-sm text-parchment/90 leading-[1.8] whitespace-pre-line">{i18n.language === 'en' ? '[EN] The encounter of these two letters opens a space for deep reflection.\n\nThe first letter acts as an impulse... (Placeholder)' : fakeAI}</p>
          </div>

          <p className="text-[11px] tracking-[0.15em] uppercase text-ash/60 mb-3">{t('interpretation.resonance')}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {resonanceWords.map((w) => (
              <button key={w} onClick={() => toggle(w)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 ${selected.includes(w) ? "bg-parchment text-ink" : "bg-parchment/5 border border-parchment/10 text-parchment/70 hover:border-parchment/25"}`}>
                {w}
              </button>
            ))}
          </div>

          {selected.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-night-light rounded-xl p-4 border border-parchment/5 mb-6">
              <p className="text-xs text-ash mb-1">{t('interpretation.your_resonance')}</p>
              <p className="text-sm text-parchment">{selected.join(" \u00B7 ")}</p>
            </motion.div>
          )}

          <div className="flex flex-col gap-3">
            <button onClick={save} className="w-full py-4 bg-parchment text-ink rounded-full text-sm font-medium hover:bg-bone transition-colors">{t('interpretation.support_btn')}</button>
            <button onClick={() => navigate("/home")} className="w-full py-3 text-ash text-sm hover:text-parchment transition-colors">{t('common.close_draw')}</button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
