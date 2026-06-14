# Intégration Profil Xano (v0.21)

## Résumé des Changements
- **API Wrapper** : Création de `src/services/profileApi.ts` avec les méthodes `fetchProfile`, `createProfile` et `updateProfile`.
- **Logique d'Authentification** : 
  - Lors du login ou de la restauration de la session (dans `AuthScreen.tsx` et `App.tsx`), le frontend appelle automatiquement `syncProfileOnLogin`.
  - Le système récupère le profil distant via l'API Xano.
  - S'il existe, les paramètres locaux du device (`appLanguage`, `drawStyle`, `hebrewFont`) sont **écrasés** par ceux du serveur, rendant la configuration cloud prioritaire.
  - S'il n'existe pas, un profil est automatiquement créé sur Xano avec la configuration locale actuelle du terminal de l'utilisateur. L'ID du profil est sauvegardé localement.
- **Synchronisation en Temps Réel** :
  - Chaque fois qu'un utilisateur authentifié modifie l'un de ces 3 paramètres dans l'application, une requête `PATCH` est envoyée silencieusement en tâche de fond pour mettre à jour la colonne `param` de son profil sur Xano.

## Fichiers Modifiés
- `src/services/profileApi.ts` (Nouveau)
- `src/store/useStore.ts` (Ajout de la synchronisation asynchrone)
- `src/screens/AuthScreen.tsx` (Appel post-login)
- `src/App.tsx` (Appel post-hydratation)
- `src/version.ts` et `package.json` (Bump v0.21)

## Correctif (v0.22)
- Ajout du paramètre `user_id` dans le payload de la requête `PATCH /profile/{profile_id}` et modification de `updateProfile` dans `profileApi.ts` et `useStore.ts`. L'API Xano renvoyait une erreur `400 Bad Request (Missing param: user_id)` lors de la mise à jour des paramètres car elle exige ce champ pour l'opération de modification.
