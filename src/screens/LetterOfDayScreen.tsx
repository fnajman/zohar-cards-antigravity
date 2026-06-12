import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLetterOfDay } from "@/hooks/useApi";
import { HebrewGlyph, LetterCard } from "../components/LetterComponents";
import { useScrollHint } from "@/hooks/useScrollHint";

export function LetterOfDayScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: letter, isLoading } = useLetterOfDay();
  const [showDetails, setShowDetails] = useState(false);
  const scrollRef = useScrollHint();

  if (isLoading) return <div className="h-full bg-night" />;
  if (!letter) { navigate("/home"); return null; }

  return (
    <div ref={scrollRef as any} className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-parchment/10">
        <h1 className="text-2xl font-medium tracking-tight text-parchment">{t('letter_day.title')}</h1>
        <button onClick={() => navigate("/home")} className="w-8 h-8 rounded-full bg-parchment/5 flex items-center justify-center hover:bg-parchment/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M4 4L12 12" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pb-8">
        {!showDetails ? (
          <div className="flex-1 flex flex-col items-center mt-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex flex-col items-center gap-1 mb-8">
              <p className="text-[11px] tracking-[0.2em] uppercase text-ash">{t('letter_day.title')}</p>
              <p className="text-xs text-ash/50">{new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6">
              <HebrewGlyph symbol={letter.symbol} size="xl" letter={letter} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="text-center mb-12 max-w-[280px]">
              <h2 className="text-2xl font-medium text-parchment text-center mt-6">{letter.identity?.name || letter.latin_id}</h2>
              <p className="text-sm text-parchment/60 mt-2">{letter.symbolic_essence.core_idea}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-auto w-full max-w-[280px]">
              <button 
                onClick={() => setShowDetails(true)} 
                className="w-full py-4 bg-parchment text-ink rounded-full text-sm font-medium tracking-wide hover:bg-bone transition-colors duration-300"
              >
                {t('reveal.read_btn')}
              </button>
            </motion.div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-8 w-full max-w-md mx-auto">
            <LetterCard letter={letter} />
            <button onClick={() => navigate("/home")} className="w-full mt-10 mb-8 py-4 border border-parchment/20 text-parchment rounded-full text-sm hover:border-parchment/40 transition-colors">
              Retour à l'accueil
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
