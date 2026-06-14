# Fixes d'Authentification et de Crédits (14 Juin 2026)

## Résumé des changements
1. **Refactorisation de l'authentification** : Simplification de la récupération du profil. Le endpoint `/auth/me` de Xano a été mis à jour pour renvoyer directement l'objet `profile` imbriqué dans l'objet `user`. La fonction `fetchProfile` a été supprimée, économisant une requête réseau lors de la connexion (`syncProfileOnLogin` utilise désormais directement `user.profile`).
2. **Correction du bug des crédits (Strict Mode Race Condition)** : L'application débitait les crédits d'interprétation en double lors du premier message de l'IA. En mode "React Strict Mode", `useEffect` exécute la logique d'initialisation du chat (`initChat`) deux fois en parallèle. Puisque l'état `chatSessionPaid` n'était mis à jour qu'à la fin de la génération du stream, les deux requêtes débitaient 3 crédits chacune. L'état `chatSessionPaid` est désormais mis à jour de manière synchrone avant même l'exécution du stream.
3. **Mise à jour de l'UI (Menu d'accueil)** : Correction du pied de page du `HomeScreen`. Le bouton statique "S'identifier" vérifie désormais l'état de l'utilisateur pour afficher "Déconnexion" si l'utilisateur est déjà authentifié, et déclenche la fonction `logout()`.

## Fichiers Modifiés
- `src/data/types.ts` : Ajout de la propriété `profile` à l'interface `UserProfile`.
- `src/services/profileApi.ts` : Suppression de la fonction inutilisée `fetchProfile`.
- `src/store/useStore.ts` : Adaptation de `syncProfileOnLogin` pour extraire `user.profile` directement et suppression des appels inutiles à `fetchProfile`.
- `src/screens/InterpretationScreen.tsx` : Modification de la logique de débit de crédits (`setChatSessionPaid(true)`) pour l'exécuter de manière synchrone avant l'appel à `getAiResponseStream`.
- `src/screens/HomeScreen.tsx` : Mise à jour du texte du bouton du footer pour basculer entre "S'identifier" et "Déconnexion" selon l'état de connexion.

## Décisions Techniques
- Plutôt que d'attendre la fin du stream génératif pour marquer la session comme "payée" (ce qui introduisait une condition de course avec le mode Strict de React), on considère la session payée dès le lancement de la requête. Si une erreur survient, les crédits sont tout de même débités pour éviter tout contournement et pour préserver la sécurité du frontend.
- Le backend Xano reste la seule source de vérité concernant la structure de `/auth/me`, permettant de centraliser les modifications de schéma (un appel API en moins).
