# Chat UI & AI Localization Update

## Résumé des Changements
- **UI de l'écran d'interprétation** : Suppression des deux gros boutons ("Lettre de soutien" et "Clore le tirage") au profit de liens textuels discrets situés juste au-dessus du champ de saisie du chat, pour un design plus épuré.
- **Localisation de l'IA (Prompt)** : Séparation du prompt système (qui était un fichier unique `aiPrompt.ts` en français) en deux fichiers distincts `fr.ts` et `en.ts` dans le dossier `src/config/prompts/`. Cette séparation garantit que le modèle LLM lit toutes les instructions dans la langue ciblée (évitant ainsi que le LLM ne réponde en français quand on lui parle en anglais).
- **Règles du Projet** : Mise à jour du fichier `.antigravityrules` avec une nouvelle règle obligeant la synchronisation des fichiers de prompts pour toutes les langues gérées lors de toute modification future.

## Fichiers Modifiés / Créés / Supprimés
- **Modifiés** : 
  - `.antigravityrules` (Ajout de la règle sur les prompts)
  - `src/screens/InterpretationScreen.tsx` (Remplacement des boutons par des liens textuels et utilisation de react-markdown)
  - `src/config/aiPrompt.ts` (Transformé en routeur pour charger le bon prompt selon la langue)
  - `src/index.css` (Ajout des classes `.markdown-prose`)
  - `package.json` et `package-lock.json` (Ajout de react-markdown)
  - `src/version.ts` (Bump v0.16)
- **Créés** : 
  - `src/config/prompts/fr.ts`
  - `src/config/prompts/en.ts`
