# Log des Changements : Migration vers React Query (TanStack Query)
**Date** : 11 Juin 2026

## Résumé
Pour préparer l'application au branchement futur d'un véritable backend (Supabase ou Xano), nous avons découplé le *Client State* (géré par Zustand) du *Server State*. Nous avons introduit `@tanstack/react-query` et créé un service d'API mocké asynchrone.

## Détail des Modifications
1. **API Mock (`src/services/api.ts`)** :
   - Création de fausses requêtes asynchrones (`getLetters`, `createDraw`, `getCurrentDraw`, `getDrawHistory`) avec un délai simulé.
2. **React Query (`src/hooks/useApi.ts`)** :
   - Configuration du `QueryClientProvider` dans `App.tsx`.
   - Création de hooks (`useCreateDraw`, `useCurrentDraw`, etc.) pour récupérer et muter les données.
3. **Refonte du Store (`useStore.ts`)** :
   - Zustand ne gère désormais plus que les préférences UI (`user`, `drawStyle`, `hebrewFont`). Les données dynamiques sont confiées à React Query.
4. **Mise à jour des Écrans** :
   - `DrawScreen`, `RevealScreen`, `SettingsScreen`, etc. utilisent les hooks React Query et gèrent désormais nativement l'asynchronicité.
   - `SplashScreen` précharge (`prefetchQuery`) les données en arrière-plan pendant la durée de l'animation d'ouverture.

## Fichiers Impactés
- Nouveaux : `src/services/api.ts`, `src/hooks/useApi.ts`
- Modifiés : `src/store/useStore.ts`, `src/App.tsx`, tous les `src/screens/*.tsx`
