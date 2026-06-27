# Changements du 24-27 Juin 2026 : Exhaustivité des Prompts et Kabbale/Tehima

## Résumé
Mise à jour majeure du processus de génération des combinaisons hébraïques pour l'Intelligence Artificielle. Le script de génération a été refondu pour injecter **l'intégralité absolue** des caractéristiques de chaque lettre, permettant des interprétations LLM d'une profondeur inédite. En parallèle, une nouvelle correspondance anatomique spécifique ("Kabbale / Tehima") a été ajoutée dans la base, l'interface et le prompt IA.

## Décisions Techniques et Design

1. **Prompt Exhaustif (Master Prompt)**
   - **Problème :** Le LLM manquait de contexte sur certaines nuances vibratoires ou corporelles des lettres lorsqu'il générait les textes des combinaisons.
   - **Solution :** Refonte du fichier `scripts/generate_combinations.js`. Le prompt inclut désormais la Gematria, les déséquilibres, la dynamique visuelle complète (mouvement, ouverture, orientation), les pratiques symboliques (focus, mouvement, souffle, visualisation), le climat intérieur vibratoire complet, les correspondances de l'Arbre de Vie (Sefirot), et les couleurs.
   - **Validation :** Testé avec la combinaison Aleph + Beth pour vérifier que la structure JSON retournée par GPT-4o-mini est correcte malgré la densité du prompt.

2. **Nouvelle métadonnée : `body_area_kabbale_tehima`**
   - **Base de données :** Ajout du champ `body_correspondence.body_area_kabbale_tehima` dans la structure JSON de la table Letter (via API Xano).
   - **UI (Frontend) :** Modification de `src/components/LetterComponents.tsx` pour afficher conditionnellement cette information dans l'accordéon "Pratiques & Corps" si elle est présente.
   - **IA Context (Frontend) :** Ajout de la clé dans `src/config/prompts/fr.ts` et `en.ts` pour que la fonctionnalité de chat tienne compte de cette spécificité anatomique mystique.
   - **Types :** Mise à jour de `src/data/types.ts` pour inclure ce champ optionnel.

3. **Versioning PWA (v0.60)**
   - Correction stricte de la numérotation des versions (passage de la branche 0.59 à 0.60 au lieu de 1.1.21).
   - Fichiers alignés : `package.json`, `src/version.ts`, et `public/version.json`.

4. **Documentation Centrale**
   - Refonte du fichier `README.md` pour présenter l'architecture globale (Vibecoding, Frontend Statique / Xano, Scripts de génération).
   - Copie des règles `.antigravityrules` vers `.cursorrules` pour un support natif étendu par les IDEs IA modernes (Cursor, Windsurf).
   - Mise à jour de `prd/example_prompt_combinaison.md` avec le nouveau template exhaustif.

## Fichiers Modifiés / Créés
- `[MODIFIED] scripts/generate_combinations.js`
- `[MODIFIED] prd/example_prompt_combinaison.md`
- `[MODIFIED] src/data/types.ts`
- `[MODIFIED] src/components/LetterComponents.tsx`
- `[MODIFIED] src/config/prompts/fr.ts`
- `[MODIFIED] src/config/prompts/en.ts`
- `[MODIFIED] src/version.ts`
- `[MODIFIED] public/version.json`
- `[MODIFIED] package.json`
- `[MODIFIED] README.md`
- `[NEW] .cursorrules` (copié depuis `.antigravityrules`)
- `[NEW] memory/2026-06-27_exhaustive_prompt_and_kabbale_tehima.md`
