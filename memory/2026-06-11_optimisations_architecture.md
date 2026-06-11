# Log des Changements : Optimisations Architecturales
**Date** : 11 Juin 2026

## Résumé
Suite à un audit technique, l'architecture Frontend a été optimisée pour garantir une meilleure performance (fluidité des animations), une plus grande scalabilité et une meilleure expérience de développement (DX).

## Détail des Modifications
1. **Performance (Code Splitting)** :
   - Refactorisation du routeur dans `App.tsx` en utilisant `React.lazy` et `Suspense`. Chaque écran (Screen) est désormais chargé à la volée.

2. **Gestion de l'État (State Management)** :
   - Suppression du React Context monolithique (`src/store/app-context.tsx`).
   - Remplacement par **Zustand** (`src/store/useStore.ts`) pour éviter les re-renders inutiles lors des changements de préférences utilisateur ou d'historique.
   - Refactorisation de tous les imports dans les composants et écrans pour utiliser le nouveau hook `useStore`.

3. **Expérience Mobile & PWA** :
   - Remplacement de l'unité CSS `h-full` par `h-[100dvh]` pour assurer que l'UI ne soit pas masquée par l'apparition de la barre de navigation sur iOS Safari.
   - Installation et configuration de `vite-plugin-pwa` pour la mise en cache (Service Worker) et l'installation de l'app sur l'écran d'accueil mobile.

4. **Expérience Développeur (DX)** :
   - Implémentation des Path Aliases (`@/*`) via `tsconfig.json` et `vite.config.ts`.
   - Ajout d'un fichier `.prettierrc` couplé au plugin `prettier-plugin-tailwindcss` pour le tri automatique et consistant des classes CSS.

## Fichiers Impactés
- `package.json` (Nouvelles dépendances)
- `tsconfig.json` & `vite.config.ts` (Aliases & PWA)
- `.prettierrc` (Création)
- `src/App.tsx` (Lazy loading, 100dvh)
- `src/store/useStore.ts` (Nouveau store)
- `src/store/app-context.tsx` (Supprimé)
- Tous les fichiers `src/screens/*.tsx` (Migration `useApp` vers `useStore`)
