# Zohar Cards — Design System & Charte Graphique

> **Purpose**  
This document defines the complete visual, symbolic, and generative design system for **Zohar Cards**.  
It is intended to be:
- a **source of truth** for humans (designers, product, editors)
- a **machine-readable reference** for LLMs (ChatGPT, Claude, Lovable, Cursor, etc.)

The system is **influenced by the provided visual sources** (sacred symbols, zodiacal seals, typographic emblems, printed artifacts) and **constrained by the PRD, ethical guardrails, and symbolic rigor** of the Zohar Cards project.

---

## 1. Design Philosophy

### 1.1 Core Intent
Zohar Cards is **not decorative**, **not mystical spectacle**, **not fortune‑telling**.

It is:
- contemplative
- symbolic
- timeless
- grounded
- ethically restrained

The design must **invite reflection**, not suggest answers.

> **Design axiom**: *The symbol opens a question, never closes a decision.*

---

### 1.2 Emotional Register

| Dimension | Position |
|---------|----------|
| Sacred | Present, restrained |
| Mystical | Suggested, never theatrical |
| Authority | Calm, never dominant |
| Beauty | Structural, not ornamental |
| Silence | As important as form |

---

## 2. Visual DNA (Derived from Source Visuals)

### 2.1 Structural Motifs

Mandatory recurring structures:
- Circular seals / medallions
- Hexagram-based geometry (never aggressive)
- Radial symmetry
- Framed emblems
- Central void or breathing space

Forbidden:
- Random abstraction
- Soft gradients
- Excessive illustration
- Organic fantasy shapes

---

### 2.2 Symbolic Style

Symbols must feel:
- engraved
- printed
- stamped
- inherited

Not:
- digital
- glossy
- futuristic
- illustrative

Line work:
- uniform stroke
- slightly rounded joins
- high contrast

---

## 3. Color System

### 3.1 Core Palette (Immutable)

```text
Deep Night Blue   #0E0F1A
Ink Black         #0A0A0A
Parchment Ivory   #F5F1E8
Warm Bone         #E8E2D6
Ash Grey          #8E8E93
```

Rules:
- Maximum 2 colors per screen/card
- No gradients except **very subtle paper grain**
- High contrast is preferred

---

### 3.2 Semantic Use

| Color | Meaning |
|------|--------|
| Night Blue | Depth, silence, interiority |
| Ivory | Transmission, text, memory |
| Black | Structure, authority |
| Grey | Commentary, metadata |

---

## 4. Typography System

### 4.1 Latin Typography

Primary font (recommended class):
- Geometric grotesk
- Humanist undertone
- Wide tracking

Examples (choose one, never mix):
- Inter
- IBM Plex Sans
- Space Grotesk

Rules:
- Titles: uppercase, wide tracking
- Body: sentence case
- Never decorative serif

---

### 4.2 Hebrew Letters

Hebrew letters are **entities**, not typography.

Rules:
- Rendered as vector glyphs or calligraphic forms
- Centered
- Large
- Surrounded by silence
- Never justified
- Never animated aggressively

> The letter must feel **present**, not explained.

---

## 5. Iconography & Symbols

### 5.1 Icon Rules

Icons must:
- be monoline
- be geometric
- feel engraved

No:
- emojis
- pictograms
- playful icons

---

### 5.2 Emblem Construction

Allowed elements:
- circles
- hexagrams
- dots
- stars
- crowns (minimal)

All emblems:
- symmetrical
- centered
- mathematically balanced

---

## 6. Card System (Zohar Cards)

### 6.1 Card Format

- Vertical
- Strong margin
- Central symbol
- Text below or above (never overlapping symbol)

```text
┌──────────────┐
│              │
│   SYMBOL     │
│              │
│   NAME       │
│   SUBTEXT    │
│              │
└──────────────┘
```

---

### 6.2 Text Hierarchy

1. Letter name (Hebrew / transliteration)
2. Archetypal theme
3. Reflective sentence (optional)

Never:
- Advice
- Prediction
- Command

---

## 7. Layout & Spacing

### 7.1 Grid

- 8‑point system
- Large outer margins
- Generous breathing zones

Whitespace is **intentional meaning**, not empty space.

---

### 7.2 Alignment

- Mostly centered
- Occasional left alignment for commentary

Never chaotic.

---

## 8. Motion & Interaction (Digital)

If motion exists:
- Slow
- Linear
- Minimal

Examples:
- fade in
- subtle scale (1.02 max)

Never:
- bounce
- elastic
- gamified transitions

---

## 9. Ethical Guardrails (Visual)

Design must NEVER:
- suggest decisions
- replace human judgment
- dramatize life choices

Visual tone must **support autonomy**, not influence action.

---

## 10. File & Asset Standards

### 10.1 Accepted Formats

- SVG (primary)
- PDF print
- PNG (export only)
- Figma components

---

### 10.2 Naming Convention

```text
zohar_symbol_<letter>.svg
zohar_card_<letter>_v1.pdf
zohar_emblem_generic.svg
```

---

## 11. LLM — GENERATIVE PROMPT (MASTER)

Use this prompt **as-is** in Lovable, Claude, ChatGPT, or Cursor.

---

### 🔮 ZOHAR CARDS — DESIGN GENERATION PROMPT

```
You are designing visual assets for the project "Zohar Cards".

The design language is:
- sacred but non-religious
- timeless
- minimal
- symbolic
- ethically neutral

Visual constraints:
- dark night blue or parchment background
- high-contrast monochrome palette
- engraved / stamped aesthetic
- circular or hexagram-based symmetry
- no gradients (except subtle paper grain)

Typography:
- neutral grotesk for Latin text
- Hebrew letters treated as symbolic entities, not fonts

Rules:
- never suggest advice or decisions
- never dramatize destiny or fate
- always preserve silence and whitespace

Goal:
Create visuals that open reflection, not answers.
The symbol must invite a question, not impose meaning.
```

---

## 12. Final Principle

> **Zohar Cards is a system of mirrors, not oracles.**

Design must reflect — never direct.

