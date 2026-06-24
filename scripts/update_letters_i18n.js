import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const XANO_API_URL = "https://api.najman.app/api:hyEJD2He";
const XANO_API_TOKEN = "y26ZAel6VjBsRt3MTGnQdBFNYNc";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const INPUT_FILE = '/Users/justme/Documents/sync/VibesCoding/Zohar card/4_backup/content/letters_content_fr.2. lalou.md';

function unflattenObject(ob) {
    const result = {};
    for (const i in ob) {
        const keys = i.split('.');
        keys.reduce((acc, val, index) => {
            return acc[val] || (acc[val] = index === keys.length - 1 ? ob[i] : {});
        }, result);
    }
    return result;
}

async function translateToEnglish(frObj) {
    const prompt = `
You are an expert French to English translator specializing in esoteric, kabbalistic, and spiritual texts.
Translate the following JSON object containing the content of a Hebrew letter.
Maintain the poetic tone, the deep symbolism, and the specific formatting.
Do not change the structure or the keys, only translate the values.
Return ONLY valid JSON. No markdown fences.

French JSON:
${JSON.stringify(frObj, null, 2)}
`;
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.2
        })
    });
    
    if (!response.ok) {
        throw new Error(`OpenAI error: ${response.statusText}`);
    }
    
    const data = await response.json();
    let text = data.choices[0].message.content.trim();
    if (text.startsWith('```json')) text = text.slice(7);
    if (text.endsWith('```')) text = text.slice(0, -3);
    
    return JSON.parse(text);
}

async function main() {
    if (!OPENAI_API_KEY) {
        console.error("Missing OPENAI_API_KEY environment variable.");
        process.exit(1);
    }
    
    console.log("Fetching existing letters from Xano...");
    const lettersRes = await fetch(`${XANO_API_URL}/letter?token=${XANO_API_TOKEN}`);
    if (!lettersRes.ok) throw new Error("Failed to fetch letters");
    const existingLetters = await lettersRes.json();
    
    const md = fs.readFileSync(INPUT_FILE, 'utf-8');
    const letterBlocks = md.split(/^# \[/m).slice(1);
    console.log(`Trouvé ${letterBlocks.length} lettres à traiter.`);

    for (const block of letterBlocks) {
        const lines = block.trim().split('\n');
        const header = lines[0];
        const idMatch = header.match(/^(\d+)\]/);
        if (!idMatch) continue;
        const id = parseInt(idMatch[1]);
        
        // Find existing letter to retain required fields like symbol
        const existingLetter = existingLetters.find(l => l.id === id);
        if (!existingLetter) {
            console.warn(`Lettre ${id} non trouvée dans Xano. Ignorée.`);
            continue;
        }

        const flatFr = {};
        const fieldBlocks = block.split(/^### /m).slice(1);
        for (const fb of fieldBlocks) {
            const fLines = fb.trim().split('\n');
            const fieldName = fLines[0].trim();
            let content = fLines.slice(1).join('\n').trim();
            
            const arrayFields = ['semantic_field.keywords', 'semantic_field.imbalances', 'semantic_field.polarities', 'vibrational_qualities.colors'];
            if (arrayFields.includes(fieldName)) {
                content = content.split(',').map(s => s.trim()).filter(s => s);
            }
            flatFr[fieldName] = content;
        }
        
        let frObj = unflattenObject(flatFr);
        
        // Merge with existing metadata and identity from Xano (since we only extracted specific fields in md)
        const oldFr = existingLetter.i18n_content?.fr || {};
        frObj = {
            ...oldFr,
            ...frObj,
            identity: { ...oldFr.identity, ...frObj.identity },
            meta: oldFr.meta
        };

        console.log(`\n============================\nLettre ${id}: Traduction en cours...`);
        
        try {
            const enObj = await translateToEnglish(frObj);
            
            const i18n_content = {
                fr: frObj,
                en: enObj
            };
            
            existingLetter.i18n_content = i18n_content;
            
            console.log(`Lettre ${id}: Mise à jour de Xano...`);
            
            const patchRes = await fetch(`${XANO_API_URL}/letter/${id}?token=${XANO_API_TOKEN}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(existingLetter)
            });
            
            if (!patchRes.ok) {
                const err = await patchRes.text();
                throw new Error(`Failed to update letter ${id}: ${patchRes.status} ${err}`);
            }
            console.log(`✅ Lettre ${id} mise à jour avec succès.`);
        } catch (error) {
            console.error(`❌ Erreur sur la lettre ${id}:`, error);
        }
    }
    console.log(`\n🎉 Processus terminé !`);
}

main().catch(console.error);
