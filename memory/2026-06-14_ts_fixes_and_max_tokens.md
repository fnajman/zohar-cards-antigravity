# Typescript Fixes & Token Increase (v0.18)

## Résumé des Changements
- **Fix du Build TypeScript (Railway)** : 
  - Suppression de l'utilisation des propriétés "fantômes" (`dynamic` et `evolution_axis`) dans les templates de prompts (`src/config/prompts/en.ts` et `src/config/prompts/fr.ts`). Ces propriétés n'existaient pas sur les types `Combination` et `pair_essence` définis dans `types.ts`, ce qui provoquait une erreur TypeScript bloquant le déploiement.
- **Mise à jour des plafonds de tokens OpenRouter** : 
  - Augmentation du paramètre `max_tokens` à **3000** dans les appels à l'oracle (fichiers `aiService.ts` via les méthodes `getAiResponse` et `getAiResponseStream`). Cela laisse à l'IA la liberté maximale de développer ses interprétations.

## Fichiers Modifiés
- `src/config/prompts/en.ts`
- `src/config/prompts/fr.ts`
- `src/services/aiService.ts`
- `src/version.ts` et `package.json` (Bump v0.18)
