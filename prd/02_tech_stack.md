# 02 Tech Stack -- Architecture Technique

Ce document definit la stack technique de Zohar Cards.

---

## 1. Architecture Generale

| Couche | Technologie | Role |
| :--- | :--- | :--- |
| **Frontend** | React 19 + TypeScript | Application web SPA |
| **Build** | Vite 6 | Dev server + bundler |
| **Styling** | Tailwind CSS 4 | Design system utilitaire |
| **Animation** | Framer Motion 11 | Transitions et micro-interactions |
| **Routing** | React Router 7 | Navigation SPA |
| **State** | Zustand | Etat global (tirages, preferences) |
| **Backend** | Supabase (prevu) | Auth, DB, Edge Functions |
| **Deploiement** | GitHub + Railway | Hosting CI/CD statique via `serve` |

---

## 2. Frontend

### 2.1 Langage & Framework
- **TypeScript** strict.
- **React 19** (derniere version stable).
- Architecture : Single Page Application, mobile-first responsive (max-width 430px centre).

### 2.2 Styling
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin.
- Tokens personnalises definis dans `src/index.css` via `@theme`.
- Pas de CSS-in-JS, pas de fichiers CSS separes par composant.

### 2.3 Animation
- **Framer Motion** pour toutes les animations.
- Philosophie : lent, doux, minimal. Pas de bounce, pas d'elastic.
- Durees : 500ms-800ms pour les transitions majeures, 300ms pour les micro-interactions.

### 2.4 Routing
- **React Router v7** (BrowserRouter).
- Navigation programmatique via `useNavigate()`.
- Routes definies dans `src/App.tsx`.

### 2.5 Gestion d'Etat
- **Client State (Zustand)** (`src/store/useStore.ts`) : Preferences utilisateur, affichage UI.
- **Server State (React Query)** (`src/hooks/useApi.ts`) : Cache, chargements asynchrones et mutations (historique, tirages).
- Preparation complete pour le branchement Supabase/Xano.

---

## 3. Assets & Glyphes

### 3.1 Glyphes Hebreux
Les lettres hebraiques sont rendues comme images (pas comme texte systeme) quand un style non-standard est selectionne.

| Style | Format | Emplacement | Nommage |
| :--- | :--- | :--- | :--- |
| Lalou (defaut) | PNG | `public/fonts/Lalou/` | `01.png` a `22.png` (padde) |
| Biblical | SVG | `public/fonts/Biblical/` | `1.svg` a `22.svg` (non-padde) |
| Modern | SVG | `public/fonts/Modern/` | `1.svg` a `22.svg` (non-padde) |
| Standard | Unicode | -- (font Frank Ruhl Libre) | -- |

Nommage : `{position}.{ext}` (ex: `01.svg`, `22.png`).

### 3.2 Composant HebrewGlyph
- Fichier : `src/components/HebrewGlyph.tsx`.
- Detecte l'extension par style (SVG ou PNG).
- Fallback `onError` vers caractere Unicode.
- Reset de l'erreur au changement de style.
- Le style par defaut est **Biblical**.

---

## 4. Structure du Projet

```
/
├── public/
│   ├── favicon.svg
│   └── fonts/
│       ├── Lalou/           (22 PNG, nommage: 01.png a 22.png) [defaut]
│       ├── Biblical/        (22 SVG, nommage: 1.svg a 22.svg)
│       └── Modern/          (22 SVG, nommage: 1.svg a 22.svg)
├── src/
│   ├── App.tsx              (Routes)
│   ├── main.tsx             (Point d'entree)
│   ├── index.css            (Tailwind + Tokens)
│   ├── components/
│   │   ├── HebrewGlyph.tsx  (Rendu glyphes multi-style)
│   │   └── LetterComponents.tsx (Card, Glyph wrapper)
│   ├── data/
│   │   ├── types.ts         (Types TypeScript)
│   │   └── fake-data.ts     (22 lettres + combinaisons mock)
│   ├── screens/
│   │   ├── SplashScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── DrawScreen.tsx   (4 modes de tirage)
│   │   ├── RevealScreen.tsx
│   │   ├── ReadingScreen.tsx
│   │   ├── QuestionScreen.tsx
│   │   ├── InterpretationScreen.tsx
│   │   ├── SupportLetterScreen.tsx
│   │   ├── LetterOfDayScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── AuthScreen.tsx
│   └── store/
│       └── useStore.ts      (State global)
├── prd/                     (Documentation produit)
├── design.md                (Design System)
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Dependances

### Production
- `react` ^19.1.0
- `react-dom` ^19.1.0
- `react-router-dom` ^7.6.2
- `framer-motion` ^11.18.0
- `zustand` (latest)
- `@tanstack/react-query` (latest)

### Developpement & Build
- `vite` ^6.3.5
- `@vitejs/plugin-react` ^4.5.2
- `tailwindcss` ^4.1.8
- `@tailwindcss/vite` ^4.1.8
- `typescript` ~5.8.3
- `vite-plugin-pwa` (latest)
- `serve` (latest - pour le script start sur Railway)

---

## 6. Backend (Futur : Supabase)

L'application fonctionne actuellement en mode local (donnees en memoire). La migration vers Supabase est prevue pour :
- Authentification email/password.
- Persistance des tirages et historique.
- Edge Functions pour l'interpretation IA.
- Stockage des lettres et combinaisons en base.

---

## 7. Contraintes & Best Practices

- **Mobile-first** : Interface optimisee pour ecrans < 430px (centree sur desktop).
- **No Eject** : Pas de configuration complexe, tout passe par Vite.
- **Performance** : Bundle < 500KB gzip. Lazy-loading implemente avec React.lazy pour un FCP optimal.
- **PWA** : Application installable et mise en cache via vite-plugin-pwa.
- **Accessibilite** : Contrastes eleves, tailles de texte lisibles, alt text sur les glyphes.
- **Securite** : Pas de donnees sensibles dans le code. `.env` pour les cles API (futur).

---
