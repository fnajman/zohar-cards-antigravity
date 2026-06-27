# Zohar Cards 🎴

> **Une application poétique, mystique et immersive pour tirer les lettres hébraïques de la Kabbale et générer des interprétations profondes via l'Intelligence Artificielle.**

Zohar Cards n'est pas un simple outil de divination, c'est un espace de contemplation. Le projet est construit autour du paradigme du **"Vibecoding"** : une fluidité extrême, des animations douces, une absence de distractions visuelles, et une architecture serveur/client propre.

---

## 🛠 L'Architecture (Vue d'ensemble)

L'application est séparée en deux couches étanches :

1. **Le Frontend (L'Espace Sacré)**
   * **Stack** : Vite + React + TypeScript + TailwindCSS + Framer Motion.
   * **PWA (Progressive Web App)** : Le projet est optimisé pour le mobile (`h-[100dvh]`), installable sur iOS/Android avec mise en cache locale.
   * **State Management** : Zustand pour la gestion globale de l'état (tirages, crédits, UI).
   * **Design System** : Thème sombre (Dark Mode natif), effets de *glassmorphism*, animations organiques à 60fps, aucune sélection de texte possible (`select-none`) pour garantir une sensation d'application native.

2. **Le Backend (La Source de Connaissance)**
   * **Stack** : Xano (No-code Backend).
   * **Base de Données** : Les 22 lettres hébraïques (Aleph, Beth...) et leurs 462 combinaisons possibles sont stockées avec un niveau de détail absolu (gématria, climat intérieur, zones corporelles, Tehima, correspondances kabbalistiques).
   * **Intelligence Artificielle** : API reliée à OpenAI/Anthropic pour générer l'interprétation finale ("Lecture") basée sur les cartes tirées et la question de l'utilisateur.

---

## 🧠 L'Intelligence du Système (Prompts & Combinaisons)

Le cœur de Zohar Cards réside dans la profondeur de son contenu. 

*   **L'exhaustivité des Lettres** : Chaque lettre contient une base de données méticuleuse. Lors d'un tirage, la dynamique entre la *Lettre 1 (Agent Actif)* et la *Lettre 2 (Récepteur)* est analysée.
*   **Génération LLM** : Un script de génération (`scripts/generate_combinations.js`) extrait **100% des caractéristiques** des lettres (jusqu'à la zone corporelle Kabbale/Tehima) et les injecte dans un Master Prompt. L'IA génère ensuite une lecture poétique pré-calculée stockée dans Xano pour des performances instantanées en production.
*   **Contextualisation** : Lorsqu'un utilisateur pose une question, le Frontend envoie le contexte à l'API, qui fusionne l'interprétation pré-calculée avec la situation de l'utilisateur pour une réponse sur-mesure.

---

## 📂 Organisation du Dépôt

*   `/src` : Le code source React (Composants, Store Zustand, API Hooks).
*   `/prd` : **Product Requirement Documents**. Les spécifications techniques, les schémas de base de données, et la "Tech Notice" (le guide technique complet de l'API et de la structure).
*   `/memory` : **Le cerveau du projet**. Chaque modification majeure (UI, Backend, Prompts) est loggée ici chronologiquement pour garder une trace parfaite de l'évolution de l'application.
*   `/scripts` : Outils de maintenance, comme le générateur automatique des 462 combinaisons hébraïques vers le backend Xano.

---

## 🤖 Pour l'Intelligence Artificielle (Guide)

Toute IA (Cursor, Windsurf, Claude) travaillant sur ce projet doit **absolument** se référer au fichier caché `.cursorrules` (ou `.antigravityrules`) à la racine du dépôt. Il contient les invariants du projet (règles de design mobile-first, gestion de la mémoire, App Store guidelines).

> *"L'alphabet hébreu commence par un silence... Aleph est le point de départ de toute chose."*
