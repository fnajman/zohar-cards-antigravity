import { motion } from "framer-motion";
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

export function LetterCard({ letter }: { letter: Letter }) {
  return (
    <div className="space-y-5">
      <div className="text-center">
        <HebrewGlyph symbol={letter.symbol} size="lg" letter={letter} />
        <h2 className="text-xl font-medium text-parchment mt-3">{letter.name}</h2>
        <p className="text-xs text-ash mt-1">
          Position {letter.identity.alphabet_position} | Valeur {letter.identity.gematria_value} | {letter.identity.letter_type}
        </p>
      </div>
      <p className="text-sm text-parchment/90 leading-relaxed">{letter.content_medium}</p>
      <div className="bg-night-light rounded-2xl p-4 border border-parchment/5">
        <p className="text-[11px] tracking-[0.15em] uppercase text-ash/60 mb-2">Essence</p>
        <p className="text-base font-medium text-parchment mb-1">{letter.symbolic_essence.core_idea}</p>
        <p className="text-sm text-ash italic">{letter.symbolic_essence.archetypal_question}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {letter.semantic_field.keywords.map((kw) => (
          <span key={kw} className="px-3 py-1 bg-parchment/5 border border-parchment/10 rounded-full text-xs text-parchment/80">{kw}</span>
        ))}
      </div>
      <div className="bg-night-light rounded-2xl p-4 border border-parchment/5">
        <p className="text-[11px] tracking-[0.15em] uppercase text-ash/60 mb-2">Polarites</p>
        {letter.semantic_field.polarities.map((p) => (
          <p key={p} className="text-sm text-parchment/80">{p}</p>
        ))}
      </div>
      <p className="text-sm text-parchment/60 italic border-t border-parchment/5 pt-4">{letter.signature}</p>
    </div>
  );
}
