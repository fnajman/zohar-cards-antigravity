# Zohar Cards -- Design System
**Version : 2.0**
**Plateforme : Web SPA (mobile-first, max 430px)**

---

## 1. Philosophie

### 1.1 Intent
Zohar Cards n'est pas decoratif, pas un spectacle mystique, pas de la divination.
C'est : contemplatif, symbolique, intemporel, ancre, ethiquement sobre.

> **Axiome** : *Le symbole ouvre une question, il ne ferme jamais une decision.*

### 1.2 Registre Emotionnel

| Dimension | Position |
|-----------|----------|
| Sacre | Present, retenu |
| Mystique | Suggere, jamais theatral |
| Autorite | Calme, jamais dominante |
| Beaute | Structurelle, pas ornementale |
| Silence | Aussi important que la forme |

### 1.3 Principes Visuels Fondamentaux
- Max 2 couleurs par ecran (fond inclus).
- Pas de gradients (sauf texture grain subtile).
- Pas de glassmorphism, neon, glow, ombre portee dramatique.
- Le mouvement est lent et minimal.
- L'espace blanc est un composant actif (silence visuel).

---

## 2. Palette de Couleurs

### 2.1 Core Palette (Immutable)

| Token | Hex / Value | Tailwind | Usage |
|-------|-------------|----------|-------|
| **Night** | `#0E0F1A` | `bg-night` | Fond principal (profondeur, interiorite) |
| **Night Light** | `#1a1b2e` | `bg-night-light` | Surface elevee sur fond sombre |
| **Ink** | `#0A0A0A` | `text-ink` | Texte sur fond clair (autorite) |
| **Parchment** | `#F5F1E8` | `text-parchment`, `bg-parchment` | Texte sur fond sombre, surfaces claires (transmission) |
| **Bone** | `#E8E2D6` | `bg-bone` | Variante chaude pour surfaces |
| **Ash** | `#8E8E93` | `text-ash` | Metadonnees, commentaires, discretion |
| **Mist** | `rgba(245,241,232,0.12)` | `border-mist` | Separateurs subtils sur fond sombre |

### 2.2 Usage Semantique

| Contexte | Couleur |
|----------|---------|
| Fond d'ecran principal | Night `#0E0F1A` |
| Texte principal (sur sombre) | Parchment `#F5F1E8` |
| Texte secondaire (sur sombre) | Parchment/70 (opacity 70%) |
| Texte tertiaire (sur sombre) | Parchment/45 |
| Texte principal (sur clair) | Ink `#0A0A0A` |
| Bordures sur sombre | Parchment/18 |
| Bordures sur clair | Ink/12 |
| Surface carte | Parchment `#F5F1E8` |
| Surface chip/tag sur sombre | Parchment/6 |
| Bouton primaire fond | Parchment |
| Bouton primaire texte | Ink |
| Bouton secondaire fond | Transparent |
| Bouton secondaire texte | Parchment |
| Focus ring | Parchment/22 |
| Etat disabled | Parchment/28 |

### 2.3 Regles
- Maximum 2 couleurs par ecran/carte.
- Pas de gradients (sauf grain texture tres subtil a 4-6% opacity).
- Contraste eleve obligatoire.
- Fond unique par ecran : Night OU Parchment, jamais les deux en meme proportion.

---

## 3. Typographie

### 3.1 Families

| Usage | Font | Fallback |
|-------|------|----------|
| **Latin (UI)** | Inter | system-ui, -apple-system, Segoe UI, Roboto, sans-serif |
| **Hebreu (fallback)** | Frank Ruhl Libre | serif |
| **Hebreu (principal)** | Glyphes vectoriels (SVG/PNG) | Frank Ruhl Libre |

### 3.2 Echelle Typographique

| Style | Taille | Line-height | Weight | Tracking | Usage |
|-------|--------|-------------|--------|----------|-------|
| **H1** | 34px (`text-4xl`) | 40px | 500 (Medium) | -0.2px | Titres majeurs |
| **H2** | 24px (`text-2xl`) | 30px | 500 | -0.1px | Sous-titres |
| **H3** | 18px (`text-lg`) | 24px | 500 | 0 | Labels, sections |
| **Body** | 15px (`text-base`) | 22px | 400 (Regular) | 0 | Lecture courante |
| **Caption** | 12px (`text-xs`) | 16px | 400 | 0.2px | Details techniques |
| **Overline** | 11px (`text-[11px]`) | 14px | 500 | 1.2px | UPPERCASE, categories |
| **Button** | 14px | 18px | 600 (Semibold) | 0.6px | Labels boutons |

### 3.3 Regles
- Titres : tracking serre (tight).
- Captions/Overlines : tracking large.
- Jamais de serif decoratif pour le latin.
- Maximum 3 poids utilises simultanement.
- Line-height : 150% pour body, 120% pour headings.

---

## 4. Espacement & Layout

### 4.1 Systeme 8px

Unite de base : 8px. Tous les espacements sont des multiples.

| Token | Valeur | Usage |
|-------|--------|-------|
| `space-1` | 4px | Micro-gaps |
| `space-2` | 8px | Gaps minimum |
| `space-3` | 12px | Gap standard entre elements |
| `space-4` | 16px | Gap moyen |
| `space-5` | 20px | Gap confortable |
| `space-6` | 24px | Section gap, padding ecran |
| `space-8` | 32px | Separation majeure |
| `space-10` | 40px | Grande respiration |
| `space-12` | 48px | Separation de bloc |
| `space-16` | 64px | Espace monumental |

### 4.2 Layout Global
- **Container max** : 430px (centre horizontalement sur desktop).
- **Padding ecran X** : 24px (`px-6`).
- **Padding ecran Y** : 24px (`py-6`).
- **Gap sections** : 24px (`gap-6`).
- **Gap elements** : 12px (`gap-3`).

### 4.3 Regles
- L'espace vide est un composant actif (silence).
- Marges genereuses obligatoires. Ne jamais coller aux bords.
- Centrage vertical et horizontal privilegie.
- Alignement gauche uniquement pour les commentaires/metadonnees.

---

## 5. Radius & Formes

| Element | Radius | Tailwind |
|---------|--------|----------|
| Cartes | 20px | `rounded-2xl` |
| Boutons | 999px (pill) | `rounded-full` |
| Inputs | 999px (pill) | `rounded-full` |
| Tags/Chips | 999px | `rounded-full` |
| Modals | 24px | `rounded-3xl` |
| Petit radius | 8px | `rounded-lg` |

---

## 6. Bordures & Elevation

### 6.1 Bordures
| Contexte | Epaisseur | Couleur |
|----------|-----------|---------|
| Sur fond sombre | 1px (hairline) | `border-parchment/[0.12]` |
| Sur fond clair | 1px | `border-ink/10` |
| Focus state | 1px ring | `ring-parchment/30` |

### 6.2 Ombres
| Token | Valeur | Usage |
|-------|--------|-------|
| `shadow-none` | none | Defaut sur fond sombre |
| `shadow-soft` | `0px 10px 30px rgba(0,0,0,0.25)` | Cartes sur fond clair uniquement |

Regles :
- Pas d'ombre dramatique.
- Ombres reservees aux elements sur fond clair.
- Sur fond sombre : utiliser les bordures subtiles a la place.

---

## 7. Composants

### 7.1 Bouton Primaire
- Fond : Parchment
- Texte : Ink
- Shape : Pill (`rounded-full`)
- Hauteur : 48px
- Padding X : 18px+
- Font : 14px, weight 600, tracking 0.6
- Hover : opacity 0.9
- Active : scale 0.98

### 7.2 Bouton Secondaire
- Fond : Transparent
- Texte : Parchment
- Border : 1px `parchment/18`
- Shape : Pill
- Memes dimensions que primaire

### 7.3 Carte (Letter Card)
- Format : Vertical (portrait)
- Fond : Transparent ou night-light
- Border : 1px `parchment/5` a `parchment/12`
- Radius : 20px
- Padding : 20px x 18px
- Contenu : Glyphe centre + nom + metadata

### 7.4 Flip Card (Tirage)
- Dos : `bg-night-light`, border `parchment/12`, motif subtil
- Face : `bg-parchment/[0.08]`, border `parchment/25`, glyphe centre
- Rotation : Y 180deg, duration 600ms
- Perspective : 500px sur container

### 7.5 Input
- Fond : `parchment/6` (sur sombre)
- Texte : Parchment
- Placeholder : Parchment/45
- Border : 1px `parchment/18`
- Shape : Pill
- Hauteur : 48px
- Padding X : 16px
- Focus : ring `parchment/30` (pas de outline bleu natif)

### 7.6 Tags / Keywords
- Fond : `parchment/5`
- Border : 1px `parchment/10`
- Shape : Pill
- Texte : 12px, parchment/80
- Padding : 12px x 4px

### 7.7 Separateur
- Sur sombre : `border-parchment/[0.08]`
- Epaisseur : 1px
- Pas de separateur visible quand l'espace suffit

---

## 8. Glyphes Hebreux

### 8.1 Principe
Les lettres hebraiques sont des **entites symboliques**, pas de la typographie.
Elles sont rendues comme des images vectorielles ou bitmap selon le style choisi.

### 8.2 Styles Disponibles

| Style | Format | Source | Description |
|-------|--------|--------|-------------|
| **Lalou** | PNG | `/fonts/Lalou/{nn}.png` | Calligraphie artistique Lalou (defaut) |
| **Biblical** | SVG | `/fonts/Biblical/{n}.svg` | Calligraphie biblique vectorielle |
| **Modern** | SVG | `/fonts/Modern/{n}.svg` | Style moderne vectoriel epure |
| **Standard** | Unicode | Font Frank Ruhl Libre | Caracteres systeme (fallback) |

### 8.3 Nommage des Fichiers
- **Lalou** : Numero padde sur 2 chiffres (01.png, 02.png, ..., 22.png)
- **Biblical** : Numero simple sans zero (1.svg, 2.svg, ..., 22.svg)
- **Modern** : Numero simple sans zero (1.svg, 2.svg, ..., 22.svg)

### 8.4 Tailles de Rendu

| Size | Classe img | Font (fallback) | Usage |
|------|-----------|-----------------|-------|
| xs | `h-5 w-auto` | `text-base` | Listes, grilles denses |
| sm | `h-7 w-auto` | `text-xl` | Cartes de tirage petites |
| md | `h-10 w-auto` | `text-3xl` | Affichage moyen |
| lg | `h-16 w-auto` | `text-5xl` | Revelation, lecture |
| xl | `h-24 w-auto` | `text-7xl` | Hero display |

### 8.5 Regles de Rendu
- Centre dans son container.
- Entoure de silence (jamais colle a du texte).
- Sur fond sombre : couleur Parchment/ivoire.
- Sur fond clair : couleur Ink/noir.
- `object-contain` pour preserver les proportions.
- Fallback `onError` : affiche le caractere Unicode.

---

## 9. Animations & Motion

### 9.1 Principes
- Lent et delibere.
- Lineaire ou ease-out cubic. Jamais de bounce/elastic.
- Scale maximale : 1.02 (pas d'effet "pop").
- Pas de glow, pas de particules.

### 9.2 Durees

| Type | Duree | Usage |
|------|-------|-------|
| Instant | 0ms | Pas de transition |
| Fast | 150ms | Micro-interactions (hover) |
| Normal | 300ms | Transitions UI legeres |
| Slow | 500ms | Revelations, apparitions |
| Ritual | 800ms | Flip card, transitions majeures |

### 9.3 Easing
- **Standard** : `cubic-bezier(0.2, 0.0, 0.0, 1.0)` -- deceleration douce
- **Gentle** : `cubic-bezier(0.2, 0.8, 0.2, 1.0)` -- mouvement naturel
- **Framer Motion** : `[0.25, 0.1, 0.25, 1]` (ease array)

### 9.4 Patterns d'Animation
- **Fade in** : opacity 0 -> 1, duration 500ms+
- **Scale reveal** : scale 0.95 -> 1, opacity 0 -> 1, duration 800ms
- **Flip** : rotateY 0 -> 180deg, duration 600ms
- **Slide up** : translateY 10px -> 0, opacity 0 -> 1

### 9.5 Interdit
- Bounce / elastic / spring aggressif.
- Rotation Z (sauf flip Y pour les cartes).
- Animations en boucle.
- Effets de particules.

---

## 10. Iconographie

### 10.1 Style
- Monoline (stroke uniforme).
- Geometrique.
- Aspect grave / estampe.
- Stroke width : 1.75px.

### 10.2 Tailles
| Size | Dimension |
|------|-----------|
| sm | 18px |
| md | 22px |
| lg | 28px |

### 10.3 Couleurs
- Sur fond sombre : Parchment/70
- Sur fond clair : Ink/70

### 10.4 Interdit
- Emojis
- Pictogrammes ludiques
- Icones colorees
- Icones avec remplissage

---

## 11. Textures & Fond

### 11.1 Grain Overlay
- Texture de bruit subtil sur les fonds Night.
- Opacity : 4-6%.
- Blend mode : overlay.
- Format : pattern SVG ou noise CSS.
- Evite l'effet "plastique" des ecrans OLED.

### 11.2 Motif Dos de Carte
- Radial gradient subtil de points.
- Pattern : `radial-gradient(circle, #F5F1E8 1px, transparent 1px)`.
- Background-size : 8px 8px.
- Opacity : 4%.
- Symbole central (etoile/hexagramme) en overlay a 30% opacity.

---

## 12. Responsive

### 12.1 Breakpoints
L'application est mobile-first. Un seul breakpoint significatif :
- **Mobile** (< 430px) : Full-width, design natif.
- **Desktop** (> 430px) : Container centre a 430px max, fond Night visible autour.

### 12.2 Regles
- Pas de layout multi-colonne (toujours single-column).
- Touch targets : minimum 44x44px.
- Pas de hover-only interactions (tout doit fonctionner au tap).

---

## 13. Tokens CSS (Implementation)

Definis dans `src/index.css` via Tailwind v4 `@theme` :

```css
@theme {
  --color-night: #0E0F1A;
  --color-night-light: #1a1b2e;
  --color-ink: #0A0A0A;
  --color-parchment: #F5F1E8;
  --color-bone: #E8E2D6;
  --color-ash: #8E8E93;
  --color-mist: rgba(245, 241, 232, 0.12);

  --font-family-sans: "Inter", system-ui, sans-serif;
  --font-family-hebrew: "Frank Ruhl Libre", serif;
}
```

---

## 14. Prompt IA (Master Design)

A utiliser pour guider la generation de code UI :

```
Projet : Zohar Cards
Stack : React 19, Tailwind CSS 4, Framer Motion, TypeScript
Design : Sacred Minimalism, Silence-first, Digital Engraving
Container : max-width 430px, centre, fond Night (#0E0F1A)

Palette :
- Night: #0E0F1A (fond principal)
- Night-light: #1a1b2e (surfaces elevees)
- Parchment: #F5F1E8 (texte, surfaces claires)
- Ink: #0A0A0A (texte sur clair)
- Ash: #8E8E93 (metadonnees)

Typographie : Inter uniquement. 3 poids max (400, 500, 600).
Formes : Cards rounded-2xl (20px). Boutons/inputs rounded-full (pill).
Animations : Lentes (>500ms). Ease-out cubic. Jamais de bounce.
Espace : p-6 minimum. L'espace est un composant actif.

Glyphes hebreux : Images SVG/PNG depuis /fonts/{style}/{nn}.ext.
Pas de font hebraique pour les lettres (sauf fallback).

Regles absolues :
- Pas de gradients.
- Pas de couleurs vives.
- Pas de gamification.
- L'interface est un miroir, pas un guide.
```

---

## 15. Principe Final

> **Zohar Cards est un systeme de miroirs, pas d'oracles.**
> Le design reflete -- il ne dirige jamais.
