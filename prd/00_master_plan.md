# PRD -- Zohar Cards : Application de tirage symbolique des lettres hebraiques
## Document de reference produit (Master Plan)
**Version : 2.0**
**Statut : Reference fondatrice**

---

## 0. Index & Articulation

Ce document fait autorite sur la Vision, le Produit et l'UX.

Documents complementaires :
- **`01_data_schema.md`** : Structure de donnees (locale + future Supabase).
- **`02_tech_stack.md`** : Choix techniques (Vite, React, Tailwind CSS, Supabase).
- **`03_frontend_spec.md`** : Specifications UI & Design System.
- **`04_backend_spec.md`** : Logique serveur et API (Supabase Edge Functions).
- **`05_guardrails.md`** : Cadre Ethique & Securite.
- **`07_i18n_strategy.md`** : Strategie Internationalisation.
- **`/design.md`** (racine) : Design System complet et tokens.

---

## 1. Vision & Positionnement

### 1.1 Preambule Culturel et Universel
Cette application n'est pas une application religieuse. Elle s'inscrit dans une demarche culturelle, symbolique et humaniste, inspiree par la tradition de la Kabbale et des lettres hebraiques.

Les lettres y sont abordees comme :
- des formes symboliques
- des archetypes de langage
- des structures de sens
- des outils de reflexion interieure

L'application est ouverte a toutes et a tous (laics, spirituels, curieux). Elle n'impose aucune croyance. Son intention est d'offrir un espace de clarification interieure via une pratique ancestrale adaptee au numerique.

### 1.2 Vision du produit
L'application propose un dispositif de tirage symbolique fonde sur les 22 lettres hebraiques.
- **Ce que c'est** : Un miroir symbolique pour ralentir et questionner.
- **Ce que ce n'est pas** : Ni prediction, ni conseil, ni aide a la decision.

### 1.3 Problematique adressee
Offrir une alternative aux outils numeriques prescriptifs ou anxiogenes. Proposer un espace symbolique structure qui ne decide jamais a la place de l'utilisateur.

---

## 2. Principes & Ethique

### 2.1 Principes fondateurs
- **Utilisateur Maitre** : L'utilisateur reste l'unique interprete.
- **Systeme Miroir** : Le systeme propose, mais ne conclut jamais.
- **Non-Prescriptif** : L'application n'indique jamais quoi faire.
- **Monetisation Neutre** : Le contenu symbolique est identique pour tous.
- **Pas de Substitution** : Ne remplace jamais un accompagnement humain.

### 2.2 Posture du systeme
- Agit comme : un miroir, un mediateur, un espace de projection.
- Ne se presente jamais comme : un guide, un conseiller, une autorite, un sachant.

### 2.3 Public cible
- **Cible** : Adultes autonomes, curieux, capables de discernement.
- **Non-cible** : Mineurs, personnes fragiles, personnes cherchant des reponses normatives.

---

## 3. Perimetre Fonctionnel

### 3.1 Inclus
- Tirage symbolique de 2 lettres hebraiques.
- Lecture archetypale (definitions fixes par lettre).
- Interpretation croisee des combinaisons (462 paires ordonnees).
- Questionnement guide (formulation d'intention).
- Lettre porteuse de soutien.
- Lettre du jour.
- Choix du style visuel des glyphes (Lalou PNG par defaut, Biblical SVG, Modern SVG, Standard Unicode).
- Modes de tirage multiples (Grille, Chaos, Eventail, Slider).

### 3.2 Exclus
- Divination / Prediction.
- Coaching ou Therapie.
- Diagnostic psychologique.
- Gamification (pas de streaks, scores, badges).

### 3.3 Strategie de Contenu
- **Contenu Statique** : Les definitions des 22 lettres et les 462 combinaisons sont pre-redigees, fixees et validees. Externalisees en TypeScript/JSON.
- **Contenu Genere par IA (futur)** : L'IA interviendra pour la contextualisation en temps reel (interpretation personnalisee).
- **Glyphes** : Trois styles visuels inclus localement (Lalou PNG calligraphique [defaut], Biblical SVG vectoriel, Modern SVG epure) + fallback Unicode.

---

## 4. Modele Economique

### 4.1 Principes
- Acces au tirage de base gratuit.
- Monetisation future sur la profondeur (questions personnelles, IA, historique).

### 4.2 Plans d'Abonnement (futur)
| Plan | Questions / mois | Chat IA | Modules |
| :--- | :--- | :--- | :--- |
| **Gratuit** | 2 | Non | - |
| **Light** | 30 | Non | - |
| **Plus** | 100 | Oui | Yoga Hebraique |
| **Illimite** | Illimite | Oui (Prio) | Tous |

---

## 5. Parcours Utilisateur (User Flow)

### 5.1 Parcours Principal (Happy Path)
1. **Splash** : Animation d'entree, transition automatique.
2. **Accueil** : Menu principal (Tirer, Lettre du jour, Parametres).
3. **Tirage** : Selection manuelle de 2 lettres (mode visuel au choix).
4. **Revelation** : Decouverte sequentielle (Lettre 1 puis Lettre 2).
5. **Lecture** : Interpretation statique de chaque lettre.
6. **Question** : Formulation d'une intention (optionnel).
7. **Interpretation** : Croisement des 2 lettres (combinaison statique ou IA).
8. **Soutien** : Lettre de soutien bienveillante.
9. **Cloture** : Retour au menu.

### 5.2 Parcours Secondaires
- **Lettre du jour** : Une lettre symbolique quotidienne (sans tirage).
- **Parametres** : Choix du style de glyphe, mode de tirage.
- **Authentification** : Email/password (futur, pour historique).

---

## 6. Ecrans Implementes

| Route | Ecran | Statut |
| :--- | :--- | :--- |
| `/` | Splash Screen | Implemente |
| `/home` | Menu Principal | Implemente |
| `/draw` | Tirage (4 modes) | Implemente |
| `/reveal` | Revelation des lettres | Implemente |
| `/reading` | Lecture symbolique | Implemente |
| `/question` | Formulation question | Implemente |
| `/interpretation` | Interpretation croisee | Implemente |
| `/support-letter` | Lettre de soutien | Implemente |
| `/letter-of-day` | Lettre du jour | Implemente |
| `/settings` | Parametres | Implemente |
| `/auth` | Authentification | Implemente (UI) |

---

## 7. Risques & Criteres de Succes

### 7.1 Risques
- **Dependance** : Limitation des usages, messages de prevention.
- **Surinterpretation** : Garde-fous semantiques, clarte "Miroir".
- **Privacy** : Pas de tracking, pas de training IA sur les donnees.

### 7.2 KPIs
- Retention J+7 : > 20%.
- Satisfaction : > 4.7/5.
- Session moyenne : > 4 min.

---
