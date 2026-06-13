# Administration, AI Models, et Enrichissement du Contexte

**Date:** 13 Juin 2026

## Fonctionnalités Ajoutées

### 1. Section Administration & Modèles IA
- **Sélecteur de modèles OpenRouter :** Création d'un menu déroulant exclusif aux administrateurs pour sélectionner le modèle d'Intelligence Artificielle à utiliser (Zustand: `aiModel`).
- **Suivi des dépenses :** Affichage de la consommation OpenRouter (`usage` / `limit`) dans l'écran des paramètres pour les rôles `admin` et `contrib`.
- **Filtres et curation :** Liste blanche dynamique de modèles (incluant GPT-5.5, Claude Opus/Haiku, Gemini Flash/Pro, Llama, Mistral, etc.) triés par prix. Exclusion automatique de tout modèle dépassant $30/1M de tokens.

### 2. Gestion des Crédits
- **Accès illimité :** Suppression des blocages liés aux crédits pour les utilisateurs possédant le rôle `admin` ou `contrib`.
- **UI adaptative :** L'écran d'accueil affiche "Crédits illimités" et l'écran des paramètres affiche "∞" pour ces profils.

### 3. Enrichissement du Prompt (Base de connaissances locale)
- **Injection des données "Frank Lalou" :** Au lieu d'implémenter un système RAG externe coûteux, les enseignements complets présents dans le fichier local (valeur numérique, enseignement direct, résonance psychologique, verbes, aspects ombre/lumière, et méditation d'intégration) sont directement injectés dans le "System Prompt" de l'Oracle (`aiPrompt.ts`).
- **Contrôle et Guardrails :** L'instruction principale oblige désormais l'IA à :
  1. Se baser autant que possible sur le contexte fourni.
  2. Limiter ses réponses à un maximum de 3 questions pour éviter de surcharger l'utilisateur.

## Fichiers Modifiés
- `src/services/openrouterApi.ts` (Nouveau)
- `src/store/useStore.ts`
- `src/screens/SettingsScreen.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/InterpretationScreen.tsx`
- `src/config/aiPrompt.ts`
- `src/locales/fr/translation.json`, `src/locales/en/translation.json`
- `package.json` (Version bump v1.1.0)
