import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";
import { useCurrentDraw } from "@/hooks/useApi";
import { HebrewGlyph } from "../components/LetterComponents";

export function RevealScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: currentDraw, isLoading } = useCurrentDraw();
  const [phase, setPhase] = useState(0);

  if (!currentDraw && !isLoading) { navigate("/home"); return null; }
  if (!currentDraw) return <div className="h-full flex items-center justify-center bg-night" />;

  const { card_1, card_2 } = currentDraw;

  return (
    <div className="h-full flex flex-col items-center justify-center bg-night px-6">
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}
            onAnimationComplete={() => setTimeout(() => setPhase(1), 1000)}
          >
            <motion.div animate={{ opacity: [0.2, 0.7, 0.2] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-2 h-2 bg-parchment rounded-full" />
          </motion.div>
        )}
        {phase === 1 && (
          <motion.div key="c1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center gap-5">
            <HebrewGlyph symbol={card_1.symbol} size="xl" letter={card_1} />
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="text-center">
              <p className="text-[11px] tracking-[0.2em] uppercase text-ash mb-1">{t('reveal.first_letter')}</p>
              <h2 className="text-2xl font-medium text-parchment">{card_1.identity?.name || card_1.latin_id}</h2>
              <p className="text-sm text-ash mt-2 max-w-[240px] italic">"{card_1.signature?.poetic_sentence || card_1.content_short}"</p>
            </motion.div>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              onClick={() => setPhase(2)}
              className="mt-6 py-3 px-8 border border-parchment/20 text-parchment rounded-full text-sm hover:border-parchment/40 transition-colors"
            >{t('reveal.next_btn')}</motion.button>
          </motion.div>
        )}
        {phase === 2 && (
          <motion.div key="c2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center gap-5">
            <HebrewGlyph symbol={card_2.symbol} size="xl" letter={card_2} />
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="text-center">
              <p className="text-[11px] tracking-[0.2em] uppercase text-ash mb-1">{t('reveal.second_letter')}</p>
              <h2 className="text-2xl font-medium text-parchment">{card_2.identity?.name || card_2.latin_id}</h2>
              <p className="text-sm text-ash mt-2 max-w-[240px] italic">"{card_2.signature?.poetic_sentence || card_2.content_short}"</p>
            </motion.div>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              onClick={() => navigate("/reading")}
              className="mt-6 py-3 px-8 bg-parchment text-ink rounded-full text-sm font-medium hover:bg-bone transition-colors"
            >{t('reveal.read_btn')}</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
