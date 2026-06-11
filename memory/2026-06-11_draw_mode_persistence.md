# Correction de la persistance du mode de tirage

**Date**: 11 Juin 2026

## Problème initial
Lors de l'utilisation de l'écran de tirage (`DrawScreen`), si l'utilisateur sélectionnait une première carte, la possibilité de changer de mode de tirage pour la deuxième carte semblait désactivée. 
En réalité, cliquer sur un bouton de changement de mode réinitialisait complètement l'état du tirage (effaçait les sélections précédentes), obligeant l'utilisateur à recommencer le tirage avec le nouveau mode pour les deux cartes. 

## Résolution
1. **Suppression de la réinitialisation de l'état** :
   Dans le fichier `src/screens/DrawScreen.tsx`, la méthode appelée lors du clic sur un mode de tirage (`resetMode`) a été remplacée par `changeMode`. Cette nouvelle méthode met uniquement à jour le mode de tirage visuel (`drawStyle`) via le store, sans vider la liste des cartes `selected` ni le `Set` des cartes `revealed`.
   Cela permet de conserver la première carte sélectionnée, tout en modifiant l'affichage des cartes restantes pour la deuxième sélection.

2. **Adaptation du mode "Maintenir" (HoldMode)** :
   Le comportement de `HoldMode` a été adapté pour tenir compte du fait que l'utilisateur pourrait y basculer *après* avoir déjà sélectionné une première carte dans un autre mode. 
   - Désormais, le composant accepte une fonction de rappel `onComplete`.
   - Si une seule carte a été sélectionnée, l'API reçoit uniquement l'ID de cette carte, garantissant que la deuxième soit piochée au hasard.
   - L'API backend mockée (`src/services/api.ts` et `useApi.ts`) a été mise à jour pour accepter et traiter les tirages asymétriques où un seul ID est fourni.

Ces ajustements permettent une fluidité et une mixité totale dans le choix des modes de tirage pour chaque carte du tirage à deux cartes, alignant le comportement sur les attentes de l'utilisateur.
