import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";
import { useLetterOfDay } from "@/hooks/useApi";
import { HebrewGlyph } from "../components/LetterComponents";

export function LetterOfDayScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: letter, isLoading } = useLetterOfDay();

  if (!letter) return <div className="h-full bg-night" />;

  return (
    <div className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-parchment/10">
        <h1 className="text-2xl font-medium tracking-tight text-parchment">{t('letter_day.title')}</h1>
        <button onClick={() => navigate("/home")} className="w-8 h-8 rounded-full bg-parchment/5 flex items-center justify-center hover:bg-parchment/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M4 4L12 12" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-6 pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex flex-col items-center gap-1 mb-6 mt-8">
          <p className="text-[11px] tracking-[0.2em] uppercase text-ash">{t('letter_day.subtitle')}</p>
          <p className="text-xs text-ash/50">{new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="mb-6">
          <HebrewGlyph symbol={letter.symbol} size="xl" letter={letter} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="text-center mb-6 max-w-[280px]">
          <h2 className="text-2xl font-medium text-parchment mb-2">{letter.name}</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="w-full max-w-[300px] space-y-4">
          <div className="bg-night-light rounded-2xl p-6 border border-parchment/5 mb-6">
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-ash/60 mb-2">{t('letter_day.essence')}</h3>
            <p className="text-sm font-medium text-parchment mb-4">{letter.symbolic_essence.core_idea}</p>
            <p className="text-sm text-parchment/80 leading-relaxed">{letter.content_medium}</p>
          </div>

          <div className="bg-parchment/5 rounded-2xl p-6 border border-parchment/10">
            <h3 className="text-[11px] tracking-[0.2em] uppercase text-ash/60 mb-3">{t('letter_day.invitation')}</h3>
            <p className="text-sm text-parchment italic font-medium leading-relaxed">"{letter.symbolic_essence.archetypal_question}"</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center pt-1">
            {letter.semantic_field.keywords.map((kw: string) => (
              <span key={kw} className="px-3 py-1 bg-parchment/5 border border-parchment/10 rounded-full text-xs text-parchment/70">{kw}</span>
            ))}
          </div>
          <div className="border-t border-parchment/5 pt-4">
            <p className="text-sm text-parchment/60 italic text-center leading-relaxed">"{letter.signature}"</p>
          </div>
        </motion.div>

        <button onClick={() => navigate("/home")} className="mt-8 py-3 px-8 border border-parchment/20 text-parchment rounded-full text-sm hover:border-parchment/40 transition-colors">
          Retour
        </button>
      </main>
    </div>
  );
}
