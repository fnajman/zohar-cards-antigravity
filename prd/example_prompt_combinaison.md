# Prompt LLM : Génération des Combinaisons (Master Prompt)

Voici le prompt **exact et littéral** extrait du script source (`scripts/generate_combinations.js`) qui a généré toutes vos combinaisons dans Xano, avec la structure JSON attendue traduite en français pour une meilleure lisibilité.

---

## Le Prompt Exact (Template)

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
      // LA MÊME STRUCTURE EXACTE TRADUITE EN ANGLAIS
  },
  "fr": {
      "title": "Un titre poétique et évocateur pour cette combinaison exacte",
      "content_long": "Un magnifique texte profond en 4 paragraphes expliquant la dynamique entre ces deux lettres spécifiques.",
      "pair_essence": {
          "pair_name": "Le titre répété",
          "core_theme": "Le thème central de la combinaison",
          "archetypal_question": "Une question profonde pour l'utilisateur",
          "one_sentence_summary": "Résumé de l'interaction en une phrase"
      },
      "content_short": "1 phrase maximum.",
      "content_medium": "Un paragraphe résumant la synergie.",
      "reading_frames": {
          "general": { "what_to_observe": ["élément 1", "élément 2", "élément 3", "élément 4"], "what_it_points_to": "..." },
          "inner_life": { "what_to_observe": ["élément 1", "élément 2", "élément 3", "élément 4"], "what_it_points_to": "..." },
          "relationships": { "what_to_observe": ["élément 1", "élément 2", "élément 3", "élément 4"], "what_it_points_to": "..." },
          "work_and_projects": { "what_to_observe": ["élément 1", "élément 2", "élément 3", "élément 4"], "what_it_points_to": "..." }
      },
      "reflective_questions": ["Q1", "Q2", "Q3", "Q4", "Q5"]
  }
}
```

---

## Exemple concret injecté (Aleph + Beth)

Voici ce que le script envoyait **réellement** à l'IA d'OpenAI pour générer la combinaison Aleph vers Beth, après avoir récupéré les variables depuis la base de connaissances JSON. (Instructions JSON traduites en français).

```text
Tu es un expert en Kabbale, lettres hébraïques, symbolisme profond et psychologie jungienne.
Nous créons une application (Zohar Card) qui tire des cartes hébraïques.
L'utilisateur a tiré une combinaison de deux cartes. L'ordre est très important !
La dynamique va de la Lettre 1 (Agent actif, élan initial) vers la Lettre 2 (Récepteur, manifestation ou destination).

Lettre 1 (Agent actif) : Aleph
Symbolisme court : Le potentiel illimité avant toute forme. L'unité primordiale et le silence qui précède la parole.
Essence : Unité primordiale

Lettre 2 (Récepteur) : Beth
Symbolisme court : La demeure, la maison. L'espace sacré où la manifestation devient possible. Première lettre de la Torah.
Essence : Demeure sacrée et manifestation

CRÉE LE CONTENU DE CETTE COMBINAISON EXACTE.
Le contenu ne doit jamais être prescriptif ni faire de divination (pas de voyance ni de conseils médicaux/psychologiques stricts).
Utilise un ton poétique, profond et méditatif.
Génère le résultat en JSON, avec les deux clés principales "en" et "fr".

IMPORTANT: RÉPONDS UNIQUEMENT AVEC LE JSON EXACT SUIVANT (rien d'autre autour):
{
  "en": {
      // LA MÊME STRUCTURE EXACTE TRADUITE EN ANGLAIS
  },
  "fr": {
      "title": "Un titre poétique et évocateur pour cette combinaison exacte",
      "content_long": "Un magnifique texte profond en 4 paragraphes expliquant la dynamique entre ces deux lettres spécifiques.",
      "pair_essence": {
          "pair_name": "Le titre répété",
          "core_theme": "Le thème central de la combinaison",
          "archetypal_question": "Une question profonde pour l'utilisateur",
          "one_sentence_summary": "Résumé de l'interaction en une phrase"
      },
      "content_short": "1 phrase maximum.",
      "content_medium": "Un paragraphe résumant la synergie.",
      "reading_frames": {
          "general": { "what_to_observe": ["élément 1", "élément 2", "élément 3", "élément 4"], "what_it_points_to": "..." },
          "inner_life": { "what_to_observe": ["élément 1", "élément 2", "élément 3", "élément 4"], "what_it_points_to": "..." },
          "relationships": { "what_to_observe": ["élément 1", "élément 2", "élément 3", "élément 4"], "what_it_points_to": "..." },
          "work_and_projects": { "what_to_observe": ["élément 1", "élément 2", "élément 3", "élément 4"], "what_it_points_to": "..." }
      },
      "reflective_questions": ["Q1", "Q2", "Q3", "Q4", "Q5"]
  }
}
```
