# Prompt LLM : Génération des Combinaisons (Master Prompt)

Voici le prompt **exact et littéral** extrait du script source (`scripts/generate_combinations.js`) qui a généré toutes vos combinaisons dans Xano.

---

## Le Prompt Exact

```text
Tu es un expert en Kabbale, lettres hébraïques, symbolisme profond et psychologie jungienne.
Nous créons une application (Zohar Card) qui tire des cartes hébraïques.
L'utilisateur a tiré une combinaison de deux cartes. L'ordre est très important !
La dynamique va de la Lettre 1 (Agent actif, élan initial) vers la Lettre 2 (Récepteur, manifestation ou destination).

Lettre 1 (Agent actif) : {Nom_Lettre_1}
Symbolisme court : {Symbolisme_court_Lettre_1}
Essence : {Essence_Lettre_1}

Lettre 2 (Récepteur) : {Nom_Lettre_2}
Symbolisme court : {Symbolisme_court_Lettre_2}
Essence : {Essence_Lettre_2}

CRÉE LE CONTENU DE CETTE COMBINAISON EXACTE.
Le contenu ne doit jamais être prescriptif ni faire de divination (pas de voyance ni de conseils médicaux/psychologiques stricts).
Utilise un ton poétique, profond et méditatif.
Génère le résultat en JSON, avec les deux clés principales "en" et "fr".

IMPORTANT: RÉPONDS UNIQUEMENT AVEC LE JSON EXACT SUIVANT (rien d'autre autour):
{
  "en": {
      "title": "A poetic and evocative title for this exact combination",
      "content_long": "A beautiful deep text in 4 paragraphs explaining the dynamic between these two specific letters.",
      "pair_essence": {
          "pair_name": "The title repeated",
          "core_theme": "The core theme of the combination",
          "archetypal_question": "One deep question for the user",
          "one_sentence_summary": "Summary of the interaction"
      },
      "content_short": "1 sentence maximum.",
      "content_medium": "A paragraph summarizing the synergy.",
      "reading_frames": {
          "general": { "what_to_observe": ["item 1", "item 2", "item 3", "item 4"], "what_it_points_to": "..." },
          "inner_life": { "what_to_observe": ["item 1", "item 2", "item 3", "item 4"], "what_it_points_to": "..." },
          "relationships": { "what_to_observe": ["item 1", "item 2", "item 3", "item 4"], "what_it_points_to": "..." },
          "work_and_projects": { "what_to_observe": ["item 1", "item 2", "item 3", "item 4"], "what_it_points_to": "..." }
      },
      "reflective_questions": ["Q1", "Q2", "Q3", "Q4", "Q5"]
  },
  "fr": {
      // THE EXACT SAME STRUCTURE TRANSLATED INTO FRENCH
  }
}
```
