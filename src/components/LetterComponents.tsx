import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Letter } from "@/data/types";
import { useStore } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { HebrewGlyph as GlyphRenderer } from "./HebrewGlyph";
import { letters as allLetters } from "../data/fake-data";

export function HebrewGlyph({ symbol, size = "md", letter }: { symbol: string; size?: "sm" | "md" | "lg" | "xl"; letter?: Letter }) {
  const { hebrewFont } = useStore();

  const resolvedLetter = letter || (allLetters.find((l) => l.symbol === symbol) as unknown as Letter);

  if (resolvedLetter && hebrewFont !== "standard") {
    const sizeMap = { sm: "sm" as const, md: "md" as const, lg: "lg" as const, xl: "xl" as const };
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex items-center justify-center"
      >
        <GlyphRenderer letter={resolvedLetter} style={hebrewFont} size={sizeMap[size]} />
      </motion.div>
    );
  }

  const sizes = { sm: "text-3xl", md: "text-5xl", lg: "text-7xl", xl: "text-[9rem]" };
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className={`font-hebrew ${sizes[size]} leading-none select-none text-parchment`}
    >
      {symbol}
    </motion.span>
  );
}

function ExpandableContent({ mediumText, longText }: { mediumText: string; longText: string }) {
  const [expanded, setExpanded] = useState(false);
  const hasMoreText = longText && longText !== mediumText;

  return (
    <div className="relative">
      <motion.div initial={false} animate={{ height: "auto" }} className="overflow-hidden">
        <p className="text-sm text-parchment/90 leading-relaxed">
          {mediumText}
          {hasMoreText && (
            <button 
              onClick={() => setExpanded(!expanded)} 
              className="inline-flex items-center justify-center w-6 h-6 ml-2 rounded-full border border-parchment/20 text-parchment/60 hover:text-parchment hover:border-parchment/40 transition-colors text-xs font-medium align-middle"
            >
              {expanded ? "-" : "+"}
            </button>
          )}
        </p>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="text-sm text-parchment/80 leading-relaxed overflow-hidden"
            >
              {longText}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-night-light rounded-2xl border border-parchment/5 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full p-4 flex items-center justify-between text-left hover:bg-parchment/5 transition-colors"
      >
        <span className="text-[11px] tracking-[0.15em] uppercase text-ash/80 font-medium">{title}</span>
        <span className="text-ash/60 text-lg leading-none">{isOpen ? "-" : "+"}</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 border-t border-parchment/5 pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function LetterCard({ letter }: { letter: Letter }) {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-5">
      <div className="text-center">
        <HebrewGlyph symbol={letter.symbol} size="lg" letter={letter} />
        <h2 className="text-xl font-medium text-parchment mt-3">{letter.identity?.name || letter.latin_id}</h2>
        <p className="text-[11px] sm:text-xs text-ash mt-2 max-w-[320px] sm:max-w-[360px] sm:max-w-md mx-auto leading-relaxed">
          {t('letter.position')} {letter.identity?.alphabet_position || "?"} | {t('letter.value')} {letter.identity?.gematria_value || "?"} | {letter.identity?.transliteration || "?"} | {letter.identity?.pronunciation || "?"}
        </p>
      </div>

      <ExpandableContent 
        mediumText={letter.content_medium || ""} 
        longText={letter.content_long || letter.content_medium || ""} 
      />

      <AccordionSection title="Essence & Dynamique">
        <div className="space-y-3">
          <div>
            <p className="text-[10px] uppercase text-ash/60 mb-1">Idée Centrale</p>
            <p className="text-sm text-parchment/90">{letter.symbolic_essence?.core_idea}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-ash/60 mb-1">Mouvement Intérieur</p>
            <p className="text-sm text-parchment/90">{letter.symbolic_essence?.inner_movement}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-ash/60 mb-1">Question Archétypale</p>
            <p className="text-sm text-parchment/90 italic">{letter.symbolic_essence?.archetypal_question}</p>
          </div>
        </div>
      </AccordionSection>

      <AccordionSection title="Champ Sémantique & Mots-clés">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {letter.semantic_field?.keywords?.map((kw) => (
              <span key={kw} className="px-3 py-1 bg-parchment/5 border border-parchment/10 rounded-full text-xs text-parchment/80">{kw}</span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] uppercase text-ash/60 mb-1">Polarités</p>
              <ul className="text-xs text-parchment/80 space-y-1">
                {letter.semantic_field?.polarities?.map((p, i) => <li key={i}>• {p}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-[10px] uppercase text-ash/60 mb-1">Déséquilibres</p>
              <ul className="text-xs text-parchment/80 space-y-1">
                {letter.semantic_field?.imbalances?.map((imb, i) => <li key={i}>• {imb}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </AccordionSection>

      {letter.vibrational_qualities && (
        <AccordionSection title="Qualités Vibratoires & Couleurs">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {letter.vibrational_qualities.colors?.map((color) => (
                <span key={color} className="px-3 py-1 bg-parchment/5 border border-parchment/10 rounded-full text-xs text-parchment/80">{color}</span>
              ))}
            </div>
            <div>
              <p className="text-[10px] uppercase text-ash/60 mb-1">Climat Intérieur</p>
              <p className="text-sm text-parchment/90 italic">{letter.vibrational_qualities.inner_climate}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-parchment/5 pt-3">
              <div>
                <p className="text-[9px] uppercase text-ash/60 mb-1">Tempo</p>
                <p className="text-xs text-parchment/90">{letter.vibrational_qualities.energy_profile?.tempo}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase text-ash/60 mb-1">Densité</p>
                <p className="text-xs text-parchment/90">{letter.vibrational_qualities.energy_profile?.density}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase text-ash/60 mb-1">Polarité</p>
                <p className="text-xs text-parchment/90">{letter.vibrational_qualities.energy_profile?.polarity}</p>
              </div>
            </div>
          </div>
        </AccordionSection>
      )}

      {letter.form_symbolism && (
        <AccordionSection title="Symbolisme de la Forme">
          <div className="space-y-3">
            <div>
              <p className="text-[10px] uppercase text-ash/60 mb-1">Description Formelle</p>
              <p className="text-sm text-parchment/90">{letter.form_symbolism.formal_description}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-ash/60 mb-1">Lecture Calligraphique</p>
              <p className="text-sm text-parchment/90">{letter.form_symbolism.calligraphic_reading}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 border-t border-parchment/5 pt-3">
              <div>
                <p className="text-[9px] uppercase text-ash/60 mb-1">Mouvement</p>
                <p className="text-xs text-parchment/90">{letter.form_symbolism.visual_dynamics?.movement}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase text-ash/60 mb-1">Ouverture</p>
                <p className="text-xs text-parchment/90">{letter.form_symbolism.visual_dynamics?.openness}</p>
              </div>
            </div>
          </div>
        </AccordionSection>
      )}

      {letter.existential_reading && (
        <AccordionSection title="Lecture Existentielle">
          <div className="space-y-3">
            <div>
              <p className="text-[10px] uppercase text-ash/60 mb-1">Phase de Vie</p>
              <p className="text-sm text-parchment/90">{letter.existential_reading.life_phase_evocation}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase text-ash/60 mb-1">Note Éthique</p>
              <p className="text-sm text-parchment/90 italic">{letter.existential_reading.ethical_note}</p>
            </div>
            <div className="bg-night-light/50 p-3 rounded-lg border border-parchment/5">
              <p className="text-[10px] uppercase text-ash/60 mb-1">Réflexion Personnelle</p>
              <p className="text-sm text-parchment/90">{letter.existential_reading.personal_reflection_focus}</p>
            </div>
          </div>
        </AccordionSection>
      )}

      {letter.letter_relationships && (
        <AccordionSection title="Le Voyage de la Lettre">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm text-parchment/90">
              <div className="text-left">
                <p className="text-[9px] uppercase text-ash/60 mb-1">Précédente</p>
                <p>{letter.letter_relationships.previous_letter || "—"}</p>
              </div>
              <div className="text-center text-ash/40">→</div>
              <div className="text-right">
                <p className="text-[9px] uppercase text-ash/60 mb-1">Suivante</p>
                <p>{letter.letter_relationships.next_letter || "—"}</p>
              </div>
            </div>
            <div className="border-t border-parchment/5 pt-3">
              <p className="text-[10px] uppercase text-ash/60 mb-1">Logique de Transition</p>
              <p className="text-xs text-parchment/80 italic">{letter.letter_relationships.transition_logic}</p>
            </div>
          </div>
        </AccordionSection>
      )}

      <AccordionSection title="Pratiques & Corps">
        <div className="space-y-3">
          <div>
            <p className="text-[10px] uppercase text-ash/60 mb-1">Focalisation</p>
            <p className="text-sm text-parchment/90">{letter.symbolic_practices?.focus}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-ash/60 mb-1">Zone Corporelle</p>
            <p className="text-sm text-parchment/90">{letter.body_correspondence?.body_area}</p>
            <p className="text-xs text-parchment/60 mt-1">{letter.body_correspondence?.felt_quality}</p>
          </div>
          {letter.body_correspondence?.body_area_kabbale_tehima && (
            <div>
              <p className="text-[10px] uppercase text-ash/60 mb-1">Kabbale / Téhima</p>
              <p className="text-sm text-parchment/90">{letter.body_correspondence.body_area_kabbale_tehima}</p>
            </div>
          )}
        </div>
      </AccordionSection>

      <AccordionSection title="Kabbale & Correspondances">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase text-ash/60 mb-1">Élément</p>
            <p className="text-sm text-parchment/90">{letter.kabbalistic_correspondences?.element}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-ash/60 mb-1">Direction</p>
            <p className="text-sm text-parchment/90">{letter.kabbalistic_correspondences?.direction}</p>
          </div>
        </div>
      </AccordionSection>

      <p className="text-sm text-parchment/60 italic border-t border-parchment/5 pt-4 text-center">
        {letter.signature?.poetic_sentence}
      </p>
    </div>
  );
}
