# Mise à jour des permissions, rôles et crédits (v0.35)

## Résumé
Implémentation stricte des règles de rôles et de crédits pour l'utilisation du chat LLM :

1. **Invité (Guest)** :
   - Peut tirer les cartes et lire l'analyse de combinaison.
   - Ne peut pas poser de question (ni dans QuestionScreen, ni dans InterpretationScreen).
   - Un message d'alerte l'invite à créer un compte s'il tente d'envoyer une question.

2. **Administrateur (admin)** :
   - Accès illimité sans vérification ni déduction de crédits.
   - Peut modifier le modèle IA manuellement dans les paramètres.

3. **Contributeur (contrib)** :
   - Accès illimité sans vérification ni déduction de crédits.
   - *Ne peut pas* modifier le modèle IA manuellement dans les paramètres (menu masqué).

4. **Utilisateur standard (user)** :
   - Doit avoir un minimum de **3 crédits** pour poser une question (initiale ou suivi).
   - Déduction de **3 crédits par question posée**.
   - L'écran d'interprétation n'est plus bloqué (l'analyse initiale de base est lisible), mais l'envoi de questions requiert 3 crédits à chaque fois.
