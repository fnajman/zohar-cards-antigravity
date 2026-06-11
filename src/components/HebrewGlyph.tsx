import { useState, useEffect } from "react";
import type { Letter } from "../data/types";

export type HebrewFontStyle = "standard" | "Biblical" | "Lalou" | "Modern";

interface StyleConfig {
  id: HebrewFontStyle;
  label: string;
  ext: string;
  padded: boolean;
}

export const HEBREW_FONT_STYLES: StyleConfig[] = [
  { id: "standard", label: "Standard", ext: "", padded: false },
  { id: "Lalou", label: "Lalou", ext: "png", padded: true },
  { id: "Biblical", label: "Biblical", ext: "svg", padded: false },
  { id: "Modern", label: "Modern", ext: "svg", padded: false },
];

function getStyleConfig(style: HebrewFontStyle): StyleConfig {
  return HEBREW_FONT_STYLES.find((s) => s.id === style) || HEBREW_FONT_STYLES[1];
}

interface HebrewGlyphProps {
  letter: Letter;
  style: HebrewFontStyle;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_MAP = {
  xs: { font: "text-base", img: "h-5 w-auto" },
  sm: { font: "text-xl", img: "h-7 w-auto" },
  md: { font: "text-3xl", img: "h-10 w-auto" },
  lg: { font: "text-5xl", img: "h-16 w-auto" },
  xl: { font: "text-7xl", img: "h-24 w-auto" },
};

export function HebrewGlyph({ letter, style, size = "md", className = "" }: HebrewGlyphProps) {
  const sizeConfig = SIZE_MAP[size];
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [style, letter.id]);

  if (style === "standard" || imgError) {
    return (
      <span className={`font-hebrew ${sizeConfig.font} text-parchment ${className}`}>
        {letter.symbol}
      </span>
    );
  }

  const position = letter.identity.alphabet_position;
  const config = getStyleConfig(style);
  const num = config.padded ? position.toString().padStart(2, "0") : position.toString();
  const src = `/fonts/${style}/${num}.${config.ext}`;

  return (
    <img
      src={src}
      alt={letter.name}
      className={`${sizeConfig.img} object-contain ${className}`}
      draggable={false}
      onError={() => setImgError(true)}
    />
  );
}
