# Corrections de Responsive Design (v0.20)

## Résumé des Changements
- **Boutons Principaux** : Sur des écrans spécifiques (ex: Galaxy S25 avec haute densité ou texte traduit long comme "Lire l'interprétation"), le texte débordait des limites du bouton. J'ai :
  - Élargi la contrainte de taille maximale de `max-w-[280px]` à `max-w-[320px] sm:max-w-[360px]` partout dans l'application, ce qui donne 40px d'espace supplémentaire aux blocs de texte et boutons centraux.
  - Ajouté du padding (`px-6`), forcé le centrage flexible (`flex items-center justify-center text-center`) et autorisé le retour à la ligne (`whitespace-normal leading-tight`) pour que les textes très longs se structurent sur deux lignes plutôt que de s'échapper du bouton.
- **Liens de bas de page** : Dans l'écran d'interprétation, les deux liens de bas de page ("Lettre de soutien" et "Clore le tirage") passent désormais en colonne (`flex-col`) sur les très petits écrans pour éviter un chevauchement illisible, puis rebasculent en ligne (`sm:flex-row`) sur les écrans plus larges.

## Fichiers Modifiés
- `src/screens/AuthScreen.tsx`
- `src/screens/ExperienceMenuScreen.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/InterpretationScreen.tsx`
- `src/screens/QuestionScreen.tsx`
- `src/screens/ReadingScreen.tsx`
- `src/screens/SupportLetterScreen.tsx`
- `src/screens/LetterOfDayScreen.tsx`
- `src/screens/TutorialScreen.tsx`
- `src/screens/MeditationScreen.tsx`
- `src/screens/CalligraphyScreen.tsx`
- `src/screens/TehimaScreen.tsx`
- `src/version.ts` et `package.json` (Bump v0.20)
