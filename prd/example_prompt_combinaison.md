# Prompt LLM : Génération des Combinaisons (Master Prompt)

Voici le prompt **exact et littéral** extrait du script source (`scripts/generate_combinations.js`) qui a généré toutes vos combinaisons dans Xano, avec la structure JSON attendue traduite en français pour une meilleure lisibilité. Il a été mis à jour pour injecter la quasi-totalité des métadonnées de chaque lettre afin d'enrichir la précision de l'IA.

---

## Le Prompt Exact (Template)

```text
Tu es un expert en Kabbale, lettres hébraïques, symbolisme profond et psychologie jungienne.
Nous créons une application (Zohar Card) qui tire des cartes hébraïques.
L'utilisateur a tiré une combinaison de deux cartes. L'ordre est très important !
La dynamique va de la Lettre 1 (Agent actif, élan initial) vers la Lettre 2 (Récepteur, manifestation ou destination).

Lettre 1 (Agent actif) : {Nom_Lettre_1}
Signature poétique : {Signature_Poetique_Lettre_1}
Essence : {Essence_Lettre_1}
Mouvement intérieur : {Mouvement_Interieur_Lettre_1}
Mots-clés : {Mots_Cles_Lettre_1}
Polarités : {Polarites_Lettre_1}
Lecture calligraphique : {Lecture_Calligraphique_Lettre_1}
Climat intérieur : {Climat_Interieur_Lettre_1}
Évocation existentielle : {Evocation_Existentielle_Lettre_1}
Contenu de référence : {Contenu_Medium_Lettre_1}

Lettre 2 (Récepteur) : {Nom_Lettre_2}
Signature poétique : {Signature_Poetique_Lettre_2}
Essence : {Essence_Lettre_2}
Mouvement intérieur : {Mouvement_Interieur_Lettre_2}
Mots-clés : {Mots_Cles_Lettre_2}
Polarités : {Polarites_Lettre_2}
Lecture calligraphique : {Lecture_Calligraphique_Lettre_2}
Climat intérieur : {Climat_Interieur_Lettre_2}
Évocation existentielle : {Evocation_Existentielle_Lettre_2}
Contenu de référence : {Contenu_Medium_Lettre_2}

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

Voici ce que le script envoyait **réellement** à l'IA d'OpenAI pour générer la combinaison Aleph vers Beth, après avoir récupéré les variables étendues depuis la base de connaissances JSON.

```text
Tu es un expert en Kabbale, lettres hébraïques, symbolisme profond et psychologie jungienne.
Nous créons une application (Zohar Card) qui tire des cartes hébraïques.
L'utilisateur a tiré une combinaison de deux cartes. L'ordre est très important !
La dynamique va de la Lettre 1 (Agent actif, élan initial) vers la Lettre 2 (Récepteur, manifestation ou destination).

Lettre 1 (Agent actif) : Aleph
Signature poétique : Aleph est le seuil silencieux où le sens n'a pas encore choisi de forme.
Essence : Unité primordiale
Mouvement intérieur : Émergence de la conscience depuis le néant
Mots-clés : Unité, Origine, Silence, Potentiel, Enseignement, Transmission, Stabilité, Continuité
Polarités : Présence / Absence, Origine / Manifestation, Un / Multiple, Ciel / Terre
Lecture calligraphique : Une structure silencieuse contenant un potentiel infini
Climat intérieur : Silence avant la forme, contemplation
Évocation existentielle : Commencement sans certitude, questionnement sur l'origine
Contenu de référence : Aleph est le silence qui précède la parole, le souffle retenu avant le chant. Il incarne l'unité pure d'où tout émerge, le point de départ de toute chose. Symbole de l'enseignement et de la transmission, Aleph nous questionne sur la nécessité de trouver notre unité intérieure.

Lettre 2 (Récepteur) : Beth
Signature poétique : Beth est la demeure où l'invisible prend forme, le premier abri de la conscience.
Essence : Demeure sacrée et manifestation
Mouvement intérieur : De l'unité à la dualité, du potentiel à la forme
Mots-clés : Maison, Demeure, Intimité, Bénédiction, Commencement, Création, Sanctuaire, Protection, Gestation
Polarités : Intérieur / Extérieur, Protection / Enfermement, Intimité / Isolement, Gestation / Naissance
Lecture calligraphique : Une lettre enceinte contenant le potentiel, un abri avec une porte ouverte
Climat intérieur : Intimité protégée, espace béni, gestation
Évocation existentielle : Grands commencements, établissement de fondations, création du foyer
Contenu de référence : Beth, c'est la maison. Par extension il exprime toutes les valeurs liées à l'intimité. Par sa forme, on dit que cette lettre est enceinte et qu'elle est l'ouverture vers l'avenir. Première lettre de la Bible, elle exprime les grands commencements. Avec le mot brakha, bénédiction, elle bénit le monde. Elle conserve avec sa petite queue une nostalgie du Un Aleph.

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
