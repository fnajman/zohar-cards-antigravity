import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { useCurrentDraw } from "@/hooks/useApi";
import { HebrewGlyph, LetterCard } from "../components/LetterComponents";
import { useScrollHint } from "@/hooks/useScrollHint";

export function ReadingScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: currentDraw } = useCurrentDraw();
  const markJourneyStep = useStore(state => state.markJourneyStep);
  const scrollRef = useScrollHint();

  useEffect(() => {
    markJourneyStep("reading");
  }, [markJourneyStep]);
  const [tab, setTab] = useState<"combo" | "l1" | "l2">("l1");

  if (!currentDraw) { navigate("/home"); return null; }
  const { card_1, card_2, combination } = currentDraw;

  return (
    <div ref={scrollRef as any} className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="sticky top-0 z-10 bg-night/95 backdrop-blur-sm px-6 pt-12 pb-3">
        <button onClick={() => navigate("/home")} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          
        </button>
      </header>

      <main className="flex-1 px-6 pb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex flex-col items-center"><HebrewGlyph symbol={card_1.symbol} size="md" letter={card_1} /><span className="text-xs text-ash mt-1">{card_1.identity?.name || card_1.latin_id}</span></div>
          <span className="text-ash">+</span>
          <div className="flex flex-col items-center"><HebrewGlyph symbol={card_2.symbol} size="md" letter={card_2} /><span className="text-xs text-ash mt-1">{card_2.identity?.name || card_2.latin_id}</span></div>
        </div>

        <div className="flex gap-1 mb-6 bg-night-light rounded-full p-1">
          {([["l1", card_1.identity?.name || card_1.latin_id], ["l2", card_2.identity?.name || card_2.latin_id], ["combo", t('reading.tab_combo')]] as const).map(([key, label]) => (
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
                <div className="bg-night-light rounded-2xl p-4 border border-parchment/5">
                  <p className="text-sm text-ash leading-relaxed">
                    {combination.content_medium}
                  </p>
                  
                  {combination.content_long && (
                    <div className="mt-4 border-t border-parchment/10 pt-4">
                      <details className="group">
                        <summary className="flex justify-between items-center cursor-pointer list-none text-[11px] tracking-[0.1em] uppercase text-parchment/70 hover:text-parchment transition-colors">
                          <span>{t('reading.read_more', 'Lire plus')}</span>
                          <span className="text-parchment/50 group-open:rotate-45 transition-transform duration-300">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                        </summary>
                        <div className="pt-4 space-y-3">
                          {combination.content_long.split('\n').filter(p => p.trim() !== '').map((para, i) => (
                            <p key={i} className="text-sm text-ash leading-relaxed">{para.trim()}</p>
                          ))}
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-night-light rounded-2xl p-4 border border-parchment/5">
                <p className="text-[11px] tracking-[0.15em] uppercase text-ash/60 mb-2">{t('reading.theme', 'THÈME')}</p>
                <p className="text-sm text-parchment">{combination.pair_essence.core_theme}</p>
              </div>
              <div className="bg-night-light rounded-2xl p-4 border border-parchment/5">
                <p className="text-[11px] tracking-[0.15em] uppercase text-ash/60 mb-2">{t('reading.archetypal_question', 'QUESTION ARCHÉTYPALE')}</p>
                <p className="text-sm text-parchment italic">{combination.pair_essence.archetypal_question}</p>
              </div>
              <div className="space-y-3">
                <p className="text-[11px] tracking-[0.15em] uppercase text-ash/60">{t('reading.frames', 'CADRES DE LECTURE')}</p>
                {(["general", "relationships", "work_and_projects", "inner_life"] as const).map((k) => {
                  const frame = combination.reading_frames[k];
                  if (!frame) return null;
                  
                  return (
                    <div key={k} className="bg-night-light rounded-xl p-4 border border-parchment/5">
                      <span className="text-[10px] tracking-[0.1em] text-ash uppercase mb-2 block">
                        {k === "inner_life" ? t('reading.frame_inner', 'Vie intérieure') : k === "relationships" ? t('reading.frame_relationships', 'Relations') : k === "work_and_projects" ? t('reading.frame_work', 'Travail & Projets') : t('reading.frame_general', 'Général')}
                      </span>
                      <ul className="list-none space-y-1 mb-3">
                        {frame.what_to_observe?.map((obs, i) => (
                          <li key={i} className="text-sm text-parchment/80 flex items-start">
                            <span className="text-parchment/40 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>{obs}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm text-parchment/90 italic pt-2 border-t border-parchment/10">
                        → {frame.what_it_points_to}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              {combination.reflective_questions && combination.reflective_questions.length > 0 && (
                <div className="bg-night-light rounded-2xl p-4 border border-parchment/5">
                  <p className="text-[11px] tracking-[0.15em] uppercase text-ash/60 mb-3">{t('reading.reflective_questions', 'QUESTIONS DE RÉFLEXION')}</p>
                  <ul className="space-y-3">
                    {combination.reflective_questions.map((q, i) => (
                      <li key={i} className="text-sm text-parchment/90 flex items-start">
                        <span className="text-parchment/30 mr-2 flex-shrink-0">{(i + 1).toString().padStart(2, '0')}.</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {tab === "l1" && <LetterCard letter={card_1} />}
          {tab === "l2" && <LetterCard letter={card_2} />}
        </motion.div>

        <div className="mt-8 flex flex-col gap-3">
          <button onClick={() => navigate("/question")} className="w-full py-4 px-6 bg-parchment text-ink rounded-full text-sm font-medium hover:bg-bone transition-colors flex items-center justify-center text-center whitespace-normal leading-tight">
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
