# Implémentation de la Sauvegarde des Tirages (14 Juin 2026)

## Résumé des changements
Afin de conserver une trace persistante des tirages et des échanges avec l'Intelligence Artificielle, une intégration avec la base de données de Xano a été mise en place via deux nouveaux endpoints.

1. **Sauvegarde Initiale (`POST /draw`)** : Dès que l'utilisateur (authentifié) valide un tirage de deux cartes, une entrée est créée dans la base de données. L'application stocke localement l'identifiant retourné (`draw_id`) pour de futures mises à jour. Le système est protégé par un verrou afin d'empêcher les appels redondants lors des animations de l'interface (React Strict Mode / re-renders).
2. **Synchronisation de l'Historique LLM (`PATCH /draw/{draw_id}`)** : Le champ `llm_history` stocke la trace complète de la session. Lors de l'initialisation, il inclut en en-tête (rôle "system") le modèle IA utilisé ainsi que les **mots-clés sélectionnés** par l'utilisateur (si applicables). À chaque nouvel échange avec l'IA, le tableau est mis à jour et synchronisé dans le cloud via cet appel PATCH.

## Fichiers Créés / Modifiés
- `src/services/drawApi.ts` (Nouveau) : Isole la logique réseau pour les requêtes `POST` et `PATCH` vers l'endpoint `/draw`.
- `src/services/api.ts` : Adaptation de la fonction locale `createDraw` pour inclure l'appel à Xano si l'utilisateur est connecté.
- `src/screens/DrawScreen.tsx` : Ajout d'un verrou (`useRef`) empêchant de boucler sur la requête de création de tirage.
- `src/screens/InterpretationScreen.tsx` : Ajout du hook utilitaire `syncHistoryToCloud()` et modification des méthodes `initChat` et `handleSend` pour synchroniser l'historique de manière transparente.

## Décisions Techniques
- Les utilisateurs non connectés (Guest) continuent de bénéficier d'une expérience locale, avec un `draw_id` simulé par `Date.now()`. Aucune requête réseau n'est effectuée pour éviter les erreurs 401.
- Pour inclure les "mots-clés" (keywords) qui résonnent avec l'utilisateur, ils sont formatés au sein du message système (prompt caché) du JSON `llm_history`. Cela évite d'ajouter de nouvelles colonnes inutiles dans Xano et préserve le contexte pour l'IA dans l'historique brut.
