import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { useCurrentDraw } from "@/hooks/useApi";
import { HebrewGlyph, LetterCard } from "../components/LetterComponents";

export function ReadingScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: currentDraw } = useCurrentDraw();
  const markJourneyStep = useStore(state => state.markJourneyStep);

  useEffect(() => {
    markJourneyStep("reading");
  }, [markJourneyStep]);
  const [tab, setTab] = useState<"combo" | "l1" | "l2">("l1");

  if (!currentDraw) { navigate("/home"); return null; }
  const { card_1, card_2, combination } = currentDraw;

  return (
    <div className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="sticky top-0 z-10 bg-night/95 backdrop-blur-sm px-6 pt-12 pb-3">
        <button onClick={() => navigate("/home")} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {t('common.back')}
        </button>
      </header>

      <main className="flex-1 px-6 pb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex flex-col items-center"><HebrewGlyph symbol={card_1.symbol} size="md" letter={card_1} /><span className="text-xs text-ash mt-1">{card_1.name}</span></div>
          <span className="text-ash">+</span>
          <div className="flex flex-col items-center"><HebrewGlyph symbol={card_2.symbol} size="md" letter={card_2} /><span className="text-xs text-ash mt-1">{card_2.name}</span></div>
        </div>

        <div className="flex gap-1 mb-6 bg-night-light rounded-full p-1">
          {([["l1", card_1.name], ["l2", card_2.name], ["combo", t('reading.tab_combo')]] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)} className={`flex-1 py-2 rounded-full text-xs font-medium transition-all duration-300 ${tab === key ? "bg-parchment/10 text-parchment" : "text-ash hover:text-parchment/70"}`}>
              {label}
            </button>
          ))}
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {tab === "combo" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-medium text-parchment mb-2">{combination.title}</h2>
                <p className="text-sm text-ash leading-relaxed">{combination.content_medium}</p>
              </div>
              <div className="bg-night-light rounded-2xl p-4 border border-parchment/5">
                <p className="text-[11px] tracking-[0.15em] uppercase text-ash/60 mb-2">{t('reading.theme')}</p>
                <p className="text-sm text-parchment">{combination.pair_essence.core_theme}</p>
              </div>
              <div className="bg-night-light rounded-2xl p-4 border border-parchment/5">
                <p className="text-[11px] tracking-[0.15em] uppercase text-ash/60 mb-2">{t('reading.archetypal_question')}</p>
                <p className="text-sm text-parchment italic">{combination.pair_essence.archetypal_question}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] tracking-[0.15em] uppercase text-ash/60">{t('reading.frames')}</p>
                {(["general", "relationships", "work", "inner_life"] as const).map((k) => (
                  <div key={k} className="bg-night-light rounded-xl p-3 border border-parchment/5">
                    <span className="text-[10px] text-ash capitalize">{k === "inner_life" ? t('reading.frame_inner') : k === "relationships" ? t('reading.frame_relationships') : k === "work" ? t('reading.frame_work') : t('reading.frame_general')}</span>
                    <p className="text-sm text-parchment/90 mt-1">{combination.reading_frames[k]}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === "l1" && <LetterCard letter={card_1} />}
          {tab === "l2" && <LetterCard letter={card_2} />}
        </motion.div>

        <div className="mt-8 flex flex-col gap-3">
          <button onClick={() => navigate("/question")} className="w-full py-4 bg-parchment text-ink rounded-full text-sm font-medium hover:bg-bone transition-colors">
            {t('reading.ask_question')}
          </button>
          <button onClick={() => navigate("/home")} className="w-full py-3 text-ash text-sm hover:text-parchment transition-colors">
            {t('common.close_draw')}
          </button>
        </div>
      </main>
    </div>
  );
}
