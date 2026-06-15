# 2026-06-15 : Fix Race Condition (Doublons de profils)

## Résumé du bug
- Le composant `AuthScreen.tsx` créait un profil manuellement après l'inscription/connexion en appelant `syncProfileOnLogin`.
- En parallèle, le changement du `authToken` dans le store réveillait le `useEffect` du composant racine `App.tsx`.
- `App.tsx` déclenchait alors un `getMe()` simultané qui, n'ayant pas encore connaissance de la création du premier profil en base de données, considérait que l'utilisateur n'en avait pas et déclenchait à nouveau `syncProfileOnLogin`, créant un profil en double dans Xano (ex: profils ID 26 et 27 pour Val).

## Résolution
- Modification de `App.tsx` pour empêcher le rechargement asynchrone lors de la connexion immédiate. Le `useEffect` ne se déclenche désormais **que si l'utilisateur n'est pas déjà présent dans la mémoire locale** :
  `if (authToken && !useStore.getState().user) { ... }`
- Cela stoppe la race condition, garantissant 1 profil unique par utilisateur.
