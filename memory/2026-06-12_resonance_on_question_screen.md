# 2026-06-12 : Résonance dynamique sur QuestionScreen

## Résumé des changements
La fonctionnalité de sélection des mots de résonance ("Quels mots résonnent en vous ?") a été rendue dynamique et partagée entre l'écran de Question (`QuestionScreen`) et l'écran d'Interprétation (`InterpretationScreen`).

## Décisions techniques et design
1. **Génération Dynamique des Mots** :
   - Abandon de l'ancienne liste "en dur" (placeholder).
   - Les mots sont générés en combinant `semantic_field.keywords` et `semantic_field.imbalances` des deux lettres tirées via un hook `useMemo`.
   - Utilisation de `new Set` pour retirer les doublons et `Math.random()` pour mélanger l'ordre d'affichage.
2. **Continuité de l'expérience utilisateur** :
   - Les mots peuvent être sélectionnés dès l'écran de la question (`QuestionScreen`).
   - L'état de sélection (`selected_keywords`) est propagé et sauvegardé via l'API (`useAddKeywords`).
   - L'écran d'Interprétation s'initialise désormais avec la valeur de `currentDraw?.selected_keywords`, assurant une fluidité parfaite (le mot reste "coché" visuellement).

## Liste des fichiers modifiés
- `src/screens/QuestionScreen.tsx` (Ajout UI et logique de sélection)
- `src/screens/InterpretationScreen.tsx` (Récupération des données pré-selectionnées)
- `src/version.ts` (Bumping version vers v0.10)
