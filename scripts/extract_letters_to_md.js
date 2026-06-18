import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const XANO_API_URL = "https://api.najman.app/api:hyEJD2He";
const XANO_API_TOKEN = "y26ZAel6VjBsRt3MTGnQdBFNYNc";

const OUTPUT_FILE = path.join(__dirname, '../prd/letters_content_fr.md');

// Helper to flatten an object into dot notation paths
function flattenObject(ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null && !Array.isArray(ob[i])) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

// Fields we want to extract for translation/editing
const fieldsToExtract = [
    'signature.poetic_sentence',
    'content_long',
    'content_short',
    'content_medium',
    'form_symbolism.visual_dynamics.movement',
    'form_symbolism.visual_dynamics.openness',
    'form_symbolism.visual_dynamics.orientation',
    'form_symbolism.formal_description',
    'form_symbolism.calligraphic_reading',
    'semantic_field.keywords',
    'semantic_field.imbalances',
    'semantic_field.polarities',
    'symbolic_essence.core_idea',
    'symbolic_essence.inner_movement',
    'symbolic_essence.archetypal_question',
    'symbolic_practices.focus',
    'symbolic_practices.movement',
    'symbolic_practices.breathing',
    'symbolic_practices.visualization',
    'body_correspondence.body_area',
    'body_correspondence.felt_quality',
    'body_correspondence.symbolic_function',
    'existential_reading.ethical_note',
    'existential_reading.life_phase_evocation',
    'existential_reading.personal_reflection_focus',
    'letter_relationships.transition_logic',
    'vibrational_qualities.colors',
    'vibrational_qualities.inner_climate'
];

async function main() {
    console.log("Connexion à l'API Xano pour récupérer les lettres...");
    const response = await fetch(`${XANO_API_URL}/letter?token=${XANO_API_TOKEN}`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const letters = await response.json();
    console.log(`✅ ${letters.length} lettres récupérées.`);

    // Sort by id / alphabet_position
    letters.sort((a, b) => a.id - b.id);

    let markdown = `# Extraction des Lettres (Français)\n\n`;
    markdown += `Ce fichier contient l'intégralité du contenu éditable des lettres en français.\n`;
    markdown += `**Règles d'édition :**\n`;
    markdown += `- Ne modifiez pas les balises \`### champ\`.\n`;
    markdown += `- Modifiez le texte sous chaque balise.\n`;
    markdown += `- Pour les listes (mots-clés, couleurs), séparez par une virgule \`, \`.\n\n`;
    markdown += `--- \n\n`;

    for (const letter of letters) {
        const frData = letter.i18n_content?.fr || {};
        const flatFr = flattenObject(frData);
        
        const name = flatFr['identity.name'] || letter.latin_id;
        markdown += `# [${letter.id}] ${name} (${letter.symbol})\n\n`;

        for (const field of fieldsToExtract) {
            if (flatFr[field] !== undefined && flatFr[field] !== null) {
                markdown += `### ${field}\n`;
                let value = flatFr[field];
                if (Array.isArray(value)) {
                    value = value.join(', ');
                }
                markdown += `${value}\n\n`;
            }
        }
        markdown += `---\n\n`;
    }

    fs.writeFileSync(OUTPUT_FILE, markdown, 'utf-8');
    console.log(`✅ Extraction terminée : ${OUTPUT_FILE}`);
}

main().catch(console.error);
