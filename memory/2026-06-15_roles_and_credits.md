# Mise à jour des permissions, rôles et crédits (v0.35)

## Résumé
Implémentation stricte des règles de rôles et de crédits pour l'utilisation du chat LLM :

1. **Invité (Guest)** :
   - Peut tirer les cartes et lire l'analyse **pré-calculée (combinaison)** sur l'écran "Reading".
   - Ne peut pas aller sur l'écran d'interprétation IA (QuestionScreen bloquera).
   - Un message d'alerte l'invite à créer un compte s'il tente d'aller plus loin.

2. **Administrateur (admin)** :
   - Accès illimité sans vérification ni déduction de crédits.
   - Peut modifier le modèle IA manuellement dans les paramètres.

3. **Contributeur (contrib)** :
   - Accès illimité sans vérification ni déduction de crédits.
   - *Ne peut pas* modifier le modèle IA manuellement dans les paramètres (menu masqué).

4. **Utilisateur standard (user)** :
   - Doit avoir un minimum de **3 crédits** pour déclencher n'importe quelle requête IA (incluant la génération initiale sans question).
   - Déduction de **3 crédits par requête** (qu'il s'agisse du premier tirage IA, d'une question, ou d'une réponse de chat).
   - Le bouton "Révéler" et "Passer" bloquent si les crédits sont insuffisants (< 3).
