# 05 Guardrails -- Cadre Ethique & Regles d'Execution

Ce document definit le cadre strict d'execution pour les agents IA et les developpeurs.
Il sert de "Constitution" pour l'implementation de Zohar Cards.

---

## 1. Ordre d'Autorite

En cas de conflit, la hierarchie est :

1. **Cadre ethique** (ce document)
2. **Parcours utilisateur** (`00_master_plan.md`)
3. **Design System** (`design.md`, `03_frontend_spec.md`)
4. **Exigences fonctionnelles**
5. **Regles visuelles**

**Regle d'or** : L'ethique prevaut sur la fonctionnalite. L'absence de fonctionnalite prevaut sur la supposition.

---

## 2. Comportements Interdits

L'application ne doit JAMAIS :

- **Inventer du sens** : Pas de nouvelles significations hors de la base de connaissance.
- **Affirmer ou diagnostiquer** : Aucune affirmation psychologique, medicale ou divinatoire.
- **Gamifier** : Pas de streaks, scores, badges, recompenses, niveaux.
- **Conseiller** : Jamais "Vous devriez...", "Il est conseille de...", "Attention a...".
- **Orienter** : Jamais influencer une decision de vie.
- **Notifier sans accord** : Pas de push notifications non sollicitees.
- **Inventer des ecrans** : Ne creer que les ecrans definis dans le PRD.

---

## 3. Modele Mental

L'application est un **MIROIR**, pas un GUIDE.

- Le systeme **reflete**, il ne dirige pas.
- Le systeme **propose**, il ne conclut pas.
- Le systeme **respecte le silence**.
- Le systeme est **neutre et bienveillant**.

---

## 4. Contrat d'Execution IA

- **Minimalisme** : Code le plus simple possible pour le besoin.
- **Clarte** : Code lisible par un developpeur junior.
- **Scope strict** : Ne jamais ajouter de fonctionnalite non demandee.
- **Erreurs douces** : Messages calmes, jamais d'alertes rouges agressives.
- **Fallback ethique** : Si l'IA genere du contenu prescriptif, le systeme intercepte et utilise un texte pre-defini.

---

## 5. Responsabilites par Couche

| Couche | Responsabilite | Interdit |
| :--- | :--- | :--- |
| **UI** | Rendu visuel, animations lentes, esthetique sacree | Gamification, urgence, manipulation |
| **Logique** | Etats, tirage aleatoire, navigation | Prediction, influence |
| **IA** | Generation texte (interpretation, soutien) | Navigation, regles metiers, decisions |
| **Contenu** | Definitions statiques, validees | Invention, extrapolation |

---

## 6. Principe de Sobriete

- Si ce n'est pas demande, ne pas l'implementer.
- Si le silence suffit, ne pas mettre de texte.
- Si une animation n'apporte pas de sens, ne pas l'ajouter.
- Si une information n'est pas certaine, ne pas l'afficher.

---

## 7. Securite

- **Pas de donnees sensibles dans le code** : API Keys dans `.env` uniquement.
- **Pas de tokens dans les URLs**.
- **Pas de console.log en production** avec des donnees personnelles.
- **`.env` dans `.gitignore`** systematiquement.
- **RLS active** sur toutes les tables utilisateur en Supabase.

---

## 8. Architecture DRY

- **Source de verite unique** : Chaque logique existe a un seul endroit.
- **Audit pre-coding** : Verifier les hooks/utils/composants existants avant de creer.
- **Factorisation immediate** : Si du code similaire existe, refactoriser en fonction partagee.
- **Modularite** : Petits fichiers importes > grandes fonctions monolithiques.

---
