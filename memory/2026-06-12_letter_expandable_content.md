# 2026-06-12 : Amélioration de l'affichage des contenus extensibles (ExpandableContent)

## Résumé des changements
Modification du comportement d'affichage des textes descriptifs des lettres, dans le tirage classique ainsi que dans la "Lettre du jour".

## Décisions techniques et design
1. **Accumulation vs Remplacement** :
   - Auparavant, le texte moyen (`content_medium`) était remplacé par le texte long (`content_long`) lors du clic sur le bouton "(+)".
   - Désormais, le composant `ExpandableContent` a été révisé pour que le texte moyen reste visible en permanence, tandis que le texte long se déploie (via `AnimatePresence` de Framer Motion) en dessous, évitant un saut de lecture abrupte et ajoutant un effet d'approfondissement au lieu de remplacement.
2. **Gestion de la redondance** :
   - Ajout d'une condition pour n'afficher le bouton "(+)" que si le texte long existe **et** diffère du texte moyen (`longText && longText !== mediumText`), évitant des déploiements vides ou dupliqués.

## Fichiers modifiés
- `src/components/LetterComponents.tsx` (Composant `ExpandableContent`)
- `src/version.ts` (Bumping version vers v0.09)
