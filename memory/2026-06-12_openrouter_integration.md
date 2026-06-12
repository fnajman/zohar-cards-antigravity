# 2026-06-12 : Intégration de l'API OpenRouter et Transformation Chat

## Résumé des changements
L'écran d'interprétation a été entièrement restructuré pour devenir une interface conversationnelle (Chat) dynamique connectée aux modèles LLM via la passerelle **OpenRouter**. 

## Décisions techniques et design
1. **Passerelle OpenRouter vs OpenAI direct** :
   - Choix d'utiliser OpenRouter pour sa flexibilité multi-modèles (accès à GPT, Claude, Llama, etc. depuis une même API).
   - Utilisation du package officiel `openai` mais pointant vers `https://openrouter.ai/api/v1`.
2. **Contextualisation Sans RAG** :
   - Pas de base de données vectorielle complexe (RAG). L'application construit dynamiquement le "System Prompt" (`src/config/aiPrompt.ts`) en y injectant à la volée le contexte exact du tirage (lettres, combinaisons, sélection de mots).
   - L'IA répond ainsi de façon extrêmement ciblée et poétique sans risque d'halluciner sur les symboliques.
3. **Ergonomie du Chat** :
   - Mémorisation de la question de l'utilisateur (`userQuestion`) via le store Zustand pour la passer au System Prompt en secret (invisible dans la fenêtre de chat).
   - Affichage immédiat d'une animation "Typing..." au chargement de l'écran, suivie du tout premier message de l'IA.
   - Les boutons d'action principale ("Lettre de soutien" et "Clore") ont été repositionnés de façon stratégique au-dessus de la barre de saisie pour rester incitatifs.
4. **Context7** :
   - Installation de l'outil Context7 en tant que MCP server pour vérifier les APIs et SDKs avant leur implémentation. Mise à jour de `.antigravityrules`.

## Fichiers modifiés / créés
- `src/config/aiPrompt.ts` [NEW] (Matrice du prompt)
- `src/services/aiService.ts` [NEW] (Appel API via SDK `openai`)
- `src/screens/InterpretationScreen.tsx` [MODIFIED] (Refonte totale en mode Chat)
- `src/store/useStore.ts` [MODIFIED] (Ajout de `currentQuestion`)
- `src/screens/QuestionScreen.tsx` [MODIFIED] (Sauvegarde de la question)
- `.env.example` [MODIFIED] (Ajout VITE_OPENROUTER_API_KEY)
- `prd/04_backend_spec.md` [MODIFIED] (Mise à jour spécifications AI)
