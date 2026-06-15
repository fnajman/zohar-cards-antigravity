# 2026-06-15 : Mise à jour PWA et FAQ

## Résumé des changements
1. **PWA Update Popup** :
   - Mise en place d'un système de mise à jour PWA non bloquant.
   - Création du composant `UpdatePopup.tsx`.
   - Ajout de `public/version.json` pour vérifier dynamiquement le numéro de la nouvelle version.
   - Au clic sur "Recharger", l'application effectue une déconnexion stricte (`logout()` et `resetJourney()`) puis recharge la page pour appliquer la mise à jour PWA.
2. **Ajouts à la FAQ** :
   - Création de `FaqSection.tsx` accessible depuis les paramètres.
   - Ajout de contenu bilingue (français et anglais).
   - Ajout d'informations sur : Frank Lalou, le Téhima, et la sécurité des données (conformité RGPD).
3. **UI/UX** :
   - Optimisation des espacements dans les paramètres et sur l'écran d'accueil pour un rendu plus compact.
   - Ajout d'un geste "Swipe" (framer-motion drag) sur le tutoriel.

## Fichiers Modifiés/Créés
- `src/components/UpdatePopup.tsx` [NEW]
- `src/components/FaqSection.tsx` [NEW]
- `public/version.json` [NEW]
- `src/App.tsx` [MODIFIED]
- `src/screens/SettingsScreen.tsx` [MODIFIED]
- `src/screens/HomeScreen.tsx` [MODIFIED]
- `src/screens/TutorialScreen.tsx` [MODIFIED]
- `src/locales/fr/translation.json` [MODIFIED]
- `src/locales/en/translation.json` [MODIFIED]
- `src/version.ts` [MODIFIED]
