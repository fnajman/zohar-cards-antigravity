import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Letter } from "@/data/types";
import { useStore } from "@/store/useStore";
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

  return (
    <div className="relative">
      <motion.div initial={false} animate={{ height: "auto" }} className="overflow-hidden">
        <p className="text-sm text-parchment/90 leading-relaxed">
          {expanded ? longText : mediumText}
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="inline-flex items-center justify-center w-6 h-6 ml-2 rounded-full border border-parchment/20 text-parchment/60 hover:text-parchment hover:border-parchment/40 transition-colors text-xs font-medium"
          >
            {expanded ? "-" : "+"}
          </button>
        </p>
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
  return (
    <div className="space-y-5">
      <div className="text-center">
        <HebrewGlyph symbol={letter.symbol} size="lg" letter={letter} />
        <h2 className="text-xl font-medium text-parchment mt-3">{letter.identity?.name || letter.latin_id}</h2>
        <p className="text-xs text-ash mt-1">
          Position {letter.identity?.alphabet_position || "?"} | Valeur {letter.identity?.gematria_value || "?"} | {letter.kabbalistic_correspondences?.letter_type || "?"}
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
