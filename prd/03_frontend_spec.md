# 03 Frontend Spec -- UI/UX & Design System
**Projet : Zohar Cards**
**Version : 2.0 (Web SPA)**

Ce document definit les specifications d'interface et les directives de design.
Le Design System complet (tokens, composants, regles) est dans `/design.md` a la racine.

---

## 1. Philosophie & Vibe

> **"Interface as Silence"**

L'application est un espace rituel, pas un outil utilitaire.
- **Tempo** : Lent. Tout doit ralentir l'utilisateur.
- **Guidage** : Structurel uniquement. Pas d'onboarding gamifie.
- **Esthetique** : "Sacred but Grounded". Gravure, texture, minimalisme absolu.

---

## 2. Socle Technique

- **Framework** : React 19 (SPA web, mobile-first).
- **Styling** : Tailwind CSS v4 (tokens via `@theme` dans `index.css`).
- **Animation** : Framer Motion (transitions lentes, pas de bounce).
- **Fonts** : Inter (latin) + Frank Ruhl Libre (hebreu fallback).
- **Glyphes** : Fichiers SVG/PNG locaux (pas de font hebraique pour l'affichage principal).

---

## 3. Styles de Glyphes Hebreux

L'utilisateur choisit son style dans les Parametres. Le style selectionne s'applique partout (tirages, revelations, interpretations, lettre du jour).

| Style | ID | Format | Rendu | Chemin |
| :--- | :--- | :--- | :--- | :--- |
| Lalou | `Lalou` | PNG | Calligraphie artistique Lalou (defaut) | `/fonts/Lalou/{nn}.png` (padde) |
| Biblical | `Biblical` | SVG | Calligraphie biblique vectorielle | `/fonts/Biblical/{n}.svg` (non-padde) |
| Modern | `Modern` | SVG | Style moderne epure | `/fonts/Modern/{n}.svg` (non-padde) |
| Standard | `standard` | -- | Unicode (Frank Ruhl Libre) | -- |

- **Defaut** : Lalou.
- **Fallback** : Si l'image ne charge pas (`onError`), affiche le caractere Unicode.
- **Correspondance** : `alphabet_position` (1-22) padde sur 2 chiffres (`01` a `22`).

---

## 4. Ecrans & Navigation

### 4.1 Splash Screen (`/`)
- Affiche le glyphe Aleph (Lalou, 01.png) en grand format avec animation d'apparition.
- Texte "Zohar Cards" en overline.
- Transition automatique vers Home apres 3 secondes.

### 4.2 Home (`/home`)
- Bouton principal : "Tirer deux lettres".
- Acces rapide : "Lettre du jour".
- Navigation : Parametres, Identification.

### 4.3 Draw (`/draw`)
4 modes de tirage visuels :
- **Grid** : Grille ordonnee 5x5 (tap pour retourner).
- **Chaos** : Disposition aleatoire flottante.
- **Fan** : Eventail horizontal defilable.
- **Slider** : Carrousel central (une carte a la fois).

Chaque carte a un dos decore (pattern subtil) et un verso avec le glyphe revele.

### 4.4 Reveal (`/reveal`)
- Presentation sequentielle des 2 lettres tirees.
- Apparition lente (fade + scale).
- Glyphe grand format + nom + essence.

### 4.5 Reading (`/reading`)
- Lecture detaillee de chaque lettre.
- Sections : Essence, Correspondances, Champ semantique, Polarites, Signature.

### 4.6 Question (`/question`)
- Champ libre pour formuler une intention.
- Microcopy : "Il n'est pas necessaire d'etre precis."
- Bouton "Passer" disponible.

### 4.7 Interpretation (`/interpretation`)
- Croisement des 2 lettres (combinaison).
- Titre, essence de la paire, questions reflexives.
- Mots-cles selectionnables (resonance).

### 4.8 Support Letter (`/support-letter`)
- Texte bienveillant genere.
- N'indique ni direction ni solution.

### 4.9 Letter of Day (`/letter-of-day`)
- Une lettre par jour (basee sur la date).
- Lecture complete accessible.

### 4.10 Settings (`/settings`)
- Style de glyphe (Lalou / Biblical / Modern / Standard).
- Mode de tirage par defaut.
- Acces futur : langue, compte, abonnement.

### 4.11 Auth (`/auth`)
- Email / Mot de passe (UI prete, logique Supabase a connecter).

### 4.12 Vivre sa lettre (`/experience`)
Après la réception de la lettre de soutien, l'utilisateur se voit proposer 3 manières d'expérimenter et d'intégrer l'essence de sa lettre. Ces parcours utilisent un composant lecteur média (audio/vidéo) universel, adapté au mobile et desktop, gérant le streaming continu. Le contenu (voix, textes) doit être adapté à la langue choisie (multilingue).

#### 4.12.1 Respirer et méditer (`/experience/meditation`)
- **Lecteur audio** permettant d'écouter une méditation guidée spécifique à la lettre de soutien.
- Les fichiers audio sont streamés depuis `/video/audio/{n}.mp3` (où `{n}` est la position alphabétique non paddée, ex: `1.mp3`).
- UI minimaliste : contrôles de lecture (play/pause, progression), fond apaisant, centré sur l'écoute.

#### 4.12.2 Bouger (`/experience/tehima`)
- **Lecteur vidéo** pour regarder et pratiquer le Téhima (yoga hébraïque).
- Les vidéos sont streamées depuis `/video/tehima/{n}.m4v` (où `{n}` est le numéro de position alphabétique de la lettre).
- Options du lecteur : lecture verticale plein écran, play/pause, plein écran natif.

#### 4.12.3 Se concentrer (`/experience/calligraphy`)
- **Lecteur vidéo** dévoilant la création de la lettre par un calligraphe.
- Les vidéos sont streamées depuis `/video/calligraph/{n}.mp4`.
- Format vidéo centré et adaptatif (fullscreen vertical). L'accent est mis sur le geste et la fluidité.

### Spécifications Techniques : Media Player Component
- **Composant Universel (`MediaPlayer`)** : Un wrapper customisant la balise native `<video>` / `<audio>`.
- **Compatibilité** : Doit être 100% responsive et supporter les modes plein écran natifs iOS/Android, ainsi que la lecture en tâche de fond pour l'audio si possible.
- **Multilingue** : Les pistes audio ou les sous-titres doivent s'adapter selon la variable `i18n.language`.
- **Esthétique** : Contrôles (UI) épurés s'intégrant au "Sacred Minimalism", couleurs `Parchment` et `Night`, sans les gros boutons natifs du navigateur par défaut (masquer les contrôles par défaut et construire des boutons customs).

---

## 5. Interactions & Animations

### 5.1 Principes
- Durees longues : 500ms-800ms pour les revealations.
- Easing : `[0.25, 0.1, 0.25, 1]` (ease-out cubic).
- Pas de bounce, pas d'elastic, pas de glow.
- Scale maximale : 1.02.

### 5.2 Flip Card & Cartes Interactives
- Rotation Y 3D (180deg) pour retourner une carte (duree 600ms).
- Micro-interactions (hover/tap) : Survol (`scale: 1.05`, `y: -2`) et Clic/Touch (`scale: 0.92`) via Framer Motion pour un feedback "physique".
- Tailles relatives (`vw`) couplées à `aspect-[2/3]` pour garantir une taille optimale et un espace de respiration ("ne pas etouffer l'ecran") sur mobile et desktop.
- `perspective: 500px` sur le container.

### 5.3 Transitions d'ecran
- Fade in global (opacity 0 -> 1).
- Aucun slide horizontal (pas d'effet "page suivante").

---

## 6. Responsive & Layout

- **Max-width** : 430px (centre sur desktop).
- **Fond** : `bg-night` (#0E0F1A) couvre tout le viewport.
- **Padding ecran** : `p-6` (24px) minimum.
- **Overflow** : Hidden sur body (pas de scroll global, scroll interne quand necessaire).

---

## 7. Directives pour Assistants IA

```text
Projet : Zohar Cards (Web SPA mobile-first)
Stack : React 19, Vite 6, Tailwind CSS 4, Framer Motion 11, TypeScript.
Design : Sacred Minimalism, Silence-first, Digital Engraving.

Regles visuelles :
1. Couleurs : bg-night (#0E0F1A) ou bg-parchment (#F5F1E8). Jamais d'autre fond.
2. Typographie : Inter. Titres tracking serre (-0.2), captions tracking large (0.2).
3. Formes : Cards rounded-2xl (20px). Boutons rounded-full (pill).
4. Pas de gradients. Couleurs solides uniquement.
5. Marges genereuses (p-6 minimum). Ne jamais coller aux bords.
6. Animations lentes (>500ms). Easing cubic. Jamais de bounce.

Glyphes hebreux :
- Rendus comme images (SVG ou PNG depuis /fonts/{style}/{nn}.ext).
- Pas de font hebraique pour l'affichage principal des lettres.
- Fallback Unicode si image manquante.

Ton :
- L'interface est un miroir, pas un guide.
- Jamais de conseil, prediction ou gamification.
- Espace, silence, contemplation.
```

---
