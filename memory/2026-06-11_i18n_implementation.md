# Implémentation i18n
Date: 2026-06-11

## Changements Majeurs
- **Installation de `react-i18next` et `i18next-browser-languagedetector`** pour la gestion des langues.
- **Création du fichier de configuration i18n** `src/i18n/config.ts` qui contient les traductions fr/en.
- **Restructuration des données factices** dans `fake-data.ts` et `types.ts` avec la structure `i18n_content: { fr: ..., en: ... }`.
- **Modification de l'API Mock** `api.ts` pour accepter un paramètre `lang` (qui utilise par défaut la langue du navigateur ou sélectionnée) et aplatir les données de la structure de base de données à la structure de l'interface utilisateur.
- **Migration complète des écrans** :
  - `HomeScreen`
  - `DrawScreen`
  - `RevealScreen`
  - `ReadingScreen`
  - `InterpretationScreen`
  - `QuestionScreen`
  - `LetterOfDayScreen`
  - `SupportLetterScreen`
  - `SettingsScreen`
- **Ajout d'un sélecteur de langue** dans `SettingsScreen`.

## Corrections Post-Implémentation
- **Fix `DrawScreen.tsx` (Bug des hooks)** : Déplacement de la condition `if (letters.length === 0)` sous les appels de hooks (`useState`, `useCallback`, `useEffect`) pour respecter les Rules of Hooks. Ajout de cette condition pour éviter le crash du mode Chaos (`reading 'x' of undefined`) lors de la transition asynchrone des données au changement de langue.
- **Fix `api.ts` et sélection de cartes** : Mise à jour de la fonction `createDraw` et de ses appels via React Query (`useCreateDraw`) pour qu'elle accepte et utilise réellement les IDs des cartes sélectionnées par l'utilisateur, au lieu de tirer au hasard.

## Prochaines Étapes
- Mettre à jour les données complètes (vrais textes finaux en anglais) si le placeholder de traduction générique s'avère insuffisant. L'application est maintenant totalement prête à l'emploi.
