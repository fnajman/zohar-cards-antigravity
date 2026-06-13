# UI Animation & Default Model (v0.17)

## Résumé des Changements
- **Mise à jour du modèle par défaut** : 
  - Restauration de `anthropic/claude-haiku-4.5` dans la liste des modèles officiels et définition de ce modèle comme choix par défaut pour l'application dans `useStore.ts`.
- **Animation UX / UI** : 
  - Ajout d'une animation subtile (`link-blink`) en CSS pour attirer l'attention de l'utilisateur sur les liens en bas de la page de chat (Lettre de soutien et Clôture de tirage).
  - L'animation se déclenche (clignotement de l'aura lumineuse, 3 itérations) une seule fois, juste après la complétion de la première réponse de l'IA (au moment de l'affichage du message d'orientation "Vous pouvez continuer à dialoguer...").

## Fichiers Modifiés
- `src/services/openrouterApi.ts` (Modèles supportés)
- `src/store/useStore.ts` (Modèle par défaut)
- `src/screens/InterpretationScreen.tsx` (État `linksShouldBlink` et intégration de la classe Tailwind personnalisée)
- `src/index.css` (Keyframes `link-blink` et définition Tailwind)
- `src/version.ts` et `package.json` (Bump v0.17)
