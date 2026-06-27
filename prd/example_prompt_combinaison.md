# Prompt LLM : Génération des Combinaisons (Master Prompt)

Voici le prompt **exact et exhaustif** extrait du script source (`scripts/generate_combinations.js`) qui génère toutes les combinaisons dans Xano, avec la structure JSON attendue traduite en français pour une meilleure lisibilité. Il a été mis à jour pour injecter la **totalité absolue** des métadonnées de chaque lettre afin de fournir à l'IA le contexte symbolique, corporel (Téhima) et vibratoire le plus profond possible.

---

## Le Prompt Exact (Template)

```text
Tu es un expert en Kabbale, lettres hébraïques, symbolisme profond et psychologie jungienne.
Nous créons une application (Zohar Card) qui tire des cartes hébraïques.
L'utilisateur a tiré une combinaison de deux cartes. L'ordre est très important !
La dynamique va de la Lettre 1 (Agent actif, élan initial) vers la Lettre 2 (Récepteur, manifestation ou destination).

Lettre 1 (Agent actif) : {Nom_Lettre_1}
- Gematria : {Gematria_Lettre_1}
- Signature poétique : {Signature_Poetique_Lettre_1}
- Essence : {Essence_Lettre_1}
- Mouvement intérieur : {Mouvement_Interieur_Lettre_1}
- Question archétypale : {Question_Archetypale_Lettre_1}
- Mots-clés : {Mots_Cles_Lettre_1}
- Polarités : {Polarites_Lettre_1}
- Déséquilibres : {Desequilibres_Lettre_1}
- Symbolisme de la forme : {Description_Forme_Lettre_1}
- Dynamique visuelle : {Mouvement_Visuel_Lettre_1} / {Ouverture_Visuelle_Lettre_1} / {Orientation_Visuelle_Lettre_1}
- Lecture calligraphique : {Lecture_Calligraphique_Lettre_1}
- Pratiques symboliques : {Focus_Pratique_Lettre_1}
- Mouvement/Souffle : {Mouvement_Pratique_Lettre_1} / {Souffle_Pratique_Lettre_1}
- Visualisation : {Visualisation_Lettre_1}
- Zone Corporelle : {Zone_Corporelle_Lettre_1} ({Qualite_Ressentie_Lettre_1})
- Kabbale / Tehima : {Kabbale_Tehima_Lettre_1}
- Qualités vibratoires (climat) : {Climat_Interieur_Lettre_1}
- Profil énergétique : {Tempo_Lettre_1} / {Densite_Lettre_1} / {Polarite_Energie_Lettre_1}
- Couleurs : {Couleurs_Lettre_1}
- Correspondances Kabbalistiques : {Element_Lettre_1} / {Direction_Lettre_1} / Sefirot: {Sefirot_Lettre_1}
- Évocation existentielle (phase de vie) : {Evocation_Phase_Vie_Lettre_1}
- Réflexion personnelle : {Reflexion_Personnelle_Lettre_1}
- Note éthique : {Note_Ethique_Lettre_1}
- Contenu de référence (court) : {Contenu_Court_Lettre_1}
- Contenu de référence (moyen) : {Contenu_Moyen_Lettre_1}
- Contenu de référence (long) : {Contenu_Long_Lettre_1}

Lettre 2 (Récepteur) : {Nom_Lettre_2}
- Gematria : {Gematria_Lettre_2}
- Signature poétique : {Signature_Poetique_Lettre_2}
- Essence : {Essence_Lettre_2}
- Mouvement intérieur : {Mouvement_Interieur_Lettre_2}
- Question archétypale : {Question_Archetypale_Lettre_2}
- Mots-clés : {Mots_Cles_Lettre_2}
- Polarités : {Polarites_Lettre_2}
- Déséquilibres : {Desequilibres_Lettre_2}
- Symbolisme de la forme : {Description_Forme_Lettre_2}
- Dynamique visuelle : {Mouvement_Visuel_Lettre_2} / {Ouverture_Visuelle_Lettre_2} / {Orientation_Visuelle_Lettre_2}
- Lecture calligraphique : {Lecture_Calligraphique_Lettre_2}
- Pratiques symboliques : {Focus_Pratique_Lettre_2}
- Mouvement/Souffle : {Mouvement_Pratique_Lettre_2} / {Souffle_Pratique_Lettre_2}
- Visualisation : {Visualisation_Lettre_2}
- Zone Corporelle : {Zone_Corporelle_Lettre_2} ({Qualite_Ressentie_Lettre_2})
- Kabbale / Tehima : {Kabbale_Tehima_Lettre_2}
- Qualités vibratoires (climat) : {Climat_Interieur_Lettre_2}
- Profil énergétique : {Tempo_Lettre_2} / {Densite_Lettre_2} / {Polarite_Energie_Lettre_2}
- Couleurs : {Couleurs_Lettre_2}
- Correspondances Kabbalistiques : {Element_Lettre_2} / {Direction_Lettre_2} / Sefirot: {Sefirot_Lettre_2}
- Évocation existentielle (phase de vie) : {Evocation_Phase_Vie_Lettre_2}
- Réflexion personnelle : {Reflexion_Personnelle_Lettre_2}
- Note éthique : {Note_Ethique_Lettre_2}
- Contenu de référence (court) : {Contenu_Court_Lettre_2}
- Contenu de référence (moyen) : {Contenu_Moyen_Lettre_2}
- Contenu de référence (long) : {Contenu_Long_Lettre_2}

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

Voici ce que le script génère **réellement** et envoie à l'API d'OpenAI pour la combinaison Aleph vers Beth, avec le contenu 100% exhaustif issu de la base de données :

```text
Tu es un expert en Kabbale, lettres hébraïques, symbolisme profond et psychologie jungienne.
Nous créons une application (Zohar Card) qui tire des cartes hébraïques.
L'utilisateur a tiré une combinaison de deux cartes. L'ordre est très important !
La dynamique va de la Lettre 1 (Agent actif, élan initial) vers la Lettre 2 (Récepteur, manifestation ou destination).

Lettre 1 (Agent actif) : Aleph
- Gematria : 1
- Signature poétique : Aleph est le seuil silencieux où le sens n'a pas encore choisi de forme.
- Essence : Unité primordiale
- Mouvement intérieur : Émergence de la conscience depuis le néant
- Question archétypale : Comment l'invisible devient-il présent ?
- Mots-clés : Unité, Origine, Silence, Potentiel, Enseignement, Transmission, Stabilité, Continuité
- Polarités : Présence / Absence, Origine / Manifestation, Un / Multiple, Ciel / Terre
- Déséquilibres : Déconnexion du réel, Abstraction excessive, Perte d'ancrage, Nostalgie paralysante, Extrémisme
- Symbolisme de la forme : Composé de deux Yods et un Vav diagonal formant une tension
- Dynamique visuelle : Tension entre haut et bas, ciel et terre / Équilibré / Axe diagonal unificateur
- Lecture calligraphique : Une structure silencieuse contenant un potentiel infini
- Pratiques symboliques : Contemplation du silence intérieur
- Mouvement/Souffle : Alignement vertical minimal, ancrage dans la verticalité / Conscience du souffle naturel, respiration consciente
- Visualisation : Espace blanc qui s'ouvre, lumière pure
- Zone Corporelle : Souffle, poumons, poitrine (Expansion subtile, présence du souffle)
- Kabbale / Tehima : 
- Qualités vibratoires (climat) : Silence avant la forme, contemplation
- Profil énergétique : Immobile / Subtil / Potentiel non-manifesté
- Couleurs : Blanc transparent, Gris doux, Lumière pure
- Correspondances Kabbalistiques : Air / Center / Sefirot: Keter
- Évocation existentielle (phase de vie) : Commencement sans certitude, questionnement sur l'origine
- Réflexion personnelle : Qu'est-ce qui demande à émerger en moi ? Quelle est ma source d'énergie ?
- Note éthique : Cette lettre ne suggère jamais une action ou une décision. Elle invite à la contemplation.
- Contenu de référence (court) : Le potentiel illimité avant toute forme. L'unité primordiale et le silence qui précède la parole.
- Contenu de référence (moyen) : Aleph est le silence qui précède la parole, le souffle retenu avant le chant. Il incarne l'unité pure d'où tout émerge, le point de départ de toute chose. Symbole de l'enseignement et de la transmission, Aleph nous questionne sur la nécessité de trouver notre unité intérieure.
- Contenu de référence (long) : L'alphabet hébreu commence par un silence. En effet, א n'a pas de son et se vocalise à l'aide d'une voyelle. Aleph est le symbole de l'unité, du principe, et par cela de la puissance, de la continuité, de la stabilité. C'est aussi le centre spirituel d'où rayonne la pensée, en établissant un lien entre les mondes supérieur et inférieur, le ciel et la terre. Il symbolise l'Adam Qadmon, l'Homme universel. Aleph unifie les mondes de l'avant et de l'après création. Les mots 'unité' (éħad) et 'amour' (ahavah) commencent par cette lettre en hébreu. Aleph est le point de départ de toute chose, la Source de toute lumière, la Tête suprême. Nous avons tous la nostalgie de cette unité et désirons tous la continuité des belles choses qui nous habitent.

Lettre 2 (Récepteur) : Beth
- Gematria : 2
- Signature poétique : Beth est la demeure où l'invisible prend forme, le premier abri de la conscience.
- Essence : Demeure sacrée et manifestation
- Mouvement intérieur : De l'unité à la dualité, du potentiel à la forme
- Question archétypale : Qu'est-ce qui m'habite ? Quelle est ma maison intérieure ?
- Mots-clés : Maison, Demeure, Intimité, Bénédiction, Commencement, Création, Sanctuaire, Protection, Gestation
- Polarités : Intérieur / Extérieur, Protection / Enfermement, Intimité / Isolement, Gestation / Naissance
- Déséquilibres : Enfermement excessif, Peur de l'extérieur, Incapacité à quitter le connu, Isolement, Fermeture à la nouveauté
- Symbolisme de la forme : Formée par trois Vav associés avec une ouverture sur la gauche
- Dynamique visuelle : Ouverture vers l'avenir, fermée vers le passé / Ouverte à gauche (Nord), fermée des autres côtés / Base horizontale avec mur vertical
- Lecture calligraphique : Une lettre enceinte contenant le potentiel, un abri avec une porte ouverte
- Pratiques symboliques : Création d'espace sacré, habiter consciemment
- Mouvement/Souffle : Établissement des racines, ancrage dans le lieu / Souffle qui crée l'espace intérieur
- Visualisation : Construction d'un sanctuaire intérieur, espace protégé
- Zone Corporelle : Ventre, utérus, espaces intérieurs du corps (Contenance, protection, gestation)
- Kabbale / Tehima : 
- Qualités vibratoires (climat) : Intimité protégée, espace béni, gestation
- Profil énergétique : Lent et stable / Ancré et contenu / Réceptif et protecteur
- Couleurs : Bleu profond, Brun terreux, Ocre chaud
- Correspondances Kabbalistiques : Terre (dans certaines traditions) / Intérieur / Sefirot: Binah, Intelligence
- Évocation existentielle (phase de vie) : Grands commencements, établissement de fondations, création du foyer
- Réflexion personnelle : Qu'est-ce qui est en gestation en moi ? Que contient ma maison intérieure ? Suis-je ouvert à l'avenir tout en honorant le passé ?
- Note éthique : Cette lettre invite à réfléchir sur ce que nous abritons et nourrissons, sans prescrire ce que cela devrait être.
- Contenu de référence (court) : La demeure, la maison. L'espace sacré où la manifestation devient possible. Première lettre de la Torah.
- Contenu de référence (moyen) : Beth, c'est la maison. Par extension il exprime toutes les valeurs liées à l'intimité. Par sa forme, on dit que cette lettre est enceinte et qu'elle est l'ouverture vers l'avenir. Première lettre de la Bible, elle exprime les grands commencements. Avec le mot brakha, bénédiction, elle bénit le monde. Elle conserve avec sa petite queue une nostalgie du Un Aleph.
- Contenu de référence (long) : Beth signifie 'maison' et exprime l'idée de tout ce qui contient. C'est l'archétype de toutes les demeures, la maison de Dieu et de l'homme, le sanctuaire, la forme en tant que matrice. Elle désigne un endroit réservé à la sainteté sur terre. Beth accorde à chaque créature la capacité de libérer en elle un espace pour recevoir la lumière divine. À différents niveaux, Beth est à la fois la demeure de l'Univers, le temple céleste et matériel, le foyer familial et, par extension, la mère qui gère le foyer et qui éduque les enfants en son sein. Le premier mot de la Genèse, Bereshith, contient les trois lettres de Beth écrit en entier. Beth commence la Torah car elle est l'initiale de 'brakha' (bénédiction) et 'briah' (création). Beth est ouverte d'un côté pour recevoir la lumière et fermée de l'autre. Elle contient la connaissance, la doctrine et la lumière.

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
