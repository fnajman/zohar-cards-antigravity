# 2026-06-12 : UX Improvements & Bugfixes

## Résumé des changements
Ce commit finalise les ajustements ergonomiques de la "Lettre du Jour" et du mode "Cheat" (Tricheur) tout en corrigeant quelques bugs critiques liés à React et à la responsivité mobile.

## Décisions techniques et design
1. **Lettre du jour verrouillée et en deux étapes** :
   - Plutôt qu'un affichage long en une seule page, l'écran de la Lettre du Jour (`/letter-of-day`) agit désormais comme une apparition rituelle : l'écran n'affiche que la lettre et son essence courte (Reveal), suivi d'un bouton menant vers les détails complets (réutilisation du composant `LetterCard`).
   - Pour éviter que la lettre ne change à chaque rafraîchissement (la sélection étant `Math.random()`), j'ai implémenté un système de **verrouillage quotidien via le `localStorage`**. La lettre reste la même jusqu'à minuit.

2. **Fiabilisation du Mode Tricheur sur Mobile** :
   - Le compteur de 5 clics était peu fiable sur smartphone en raison des délais liés au comportement natif du "Double-Tap to Zoom" des navigateurs mobiles.
   - Ajout de la classe utilitaire Tailwind `touch-manipulation` sur les textes cliquables pour forcer le navigateur à interpréter instantanément les touchers (taps) successifs.
   - Ajout d'une limite de temps entre les clics (`600ms`) via des `useRef` pour s'assurer que c'est une action volontaire et concentrée.

3. **Correction "Rules of Hooks" (React)** :
   - J'ai corrigé un crash React (Rules of Hooks) causé par l'appel conditionnel du hook `useScrollHint()` après un `if (isLoading) return...`. Le hook a été replacé au niveau le plus haut de la fonction du composant.

## Liste des fichiers modifiés
- `src/screens/LetterOfDayScreen.tsx` (Refonte UI 2-étapes, correction Hook)
- `src/screens/DrawScreen.tsx` (Refonte de la logique des clics pour mobile, ajout de `touch-manipulation`)
- `src/services/api.ts` (Ajout de la logique de verrouillage quotidien dans `getLetterOfTheDay`)
- `src/version.ts` (Bumping version vers v0.08)
