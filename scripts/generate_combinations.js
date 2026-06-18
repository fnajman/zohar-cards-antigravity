import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Configuration
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL de votre API Xano
const XANO_API_URL = "https://api.najman.app/api:hyEJD2He";
const XANO_API_TOKEN = "y26ZAel6VjBsRt3MTGnQdBFNYNc"; // Utilisé via query string ?token=... d'après votre doc

// Fichier des lettres pour avoir les infos de base
const LETTERS_FILE = path.join(__dirname, '../prd/example/letter.json');

// Initialiser OpenAI
if (!process.env.OPENAI_API_KEY) {
  console.error("ERREUR: La clé OPENAI_API_KEY est manquante dans le fichier .env");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  console.log("Lecture des lettres de base...");
  const letters = JSON.parse(fs.readFileSync(LETTERS_FILE, 'utf-8'));
  
  console.log("Interrogation de la base Xano pour récupérer les combinaisons existantes...");
  let existingCombinations = [];
  try {
    const response = await fetch(`${XANO_API_URL}/combination?token=${XANO_API_TOKEN}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération : ${response.status} ${response.statusText}`);
    }

    existingCombinations = await response.json();
    console.log(`✅ ${existingCombinations.length} combinaisons récupérées depuis la base.`);
  } catch (error) {
    console.error("Impossible de récupérer les combinaisons de la base.", error.message);
    process.exit(1);
  }

  // Création du Set pour vérifier rapidement ce qui existe
  const doneSet = new Set();
  existingCombinations.forEach(c => {
    doneSet.add(`${c.position_1_id}_${c.position_2_id}`);
  });

  console.log("Début de la génération en continu...\n");

  // Parcourir les lettres pour générer les combinaisons
  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < letters.length; j++) {
      if (i === j) continue; // Pas de duo avec la même lettre

      const letter1 = letters[i];
      const letter2 = letters[j];
      const comboKey = `${letter1.id}_${letter2.id}`;

      // Si la combinaison existe déjà dans la base Xano, on passe à la suivante
      if (doneSet.has(comboKey)) {
        continue;
      }

      console.log(`[${letter1.id} -> ${letter2.id}] Génération pour: ${letter1.i18n_content.fr.identity.name} + ${letter2.i18n_content.fr.identity.name}...`);

      const prompt = `
Tu es un expert en Kabbale, lettres hébraïques, symbolisme profond et psychologie jungienne.
Nous créons une application (Zohar Card) qui tire des cartes hébraïques.
L'utilisateur a tiré une combinaison de deux cartes. L'ordre est très important !
La dynamique va de la Lettre 1 (Agent actif, élan initial) vers la Lettre 2 (Récepteur, manifestation ou destination).

Lettre 1 (Agent actif) : ${letter1.i18n_content.fr.identity.name}
Signature poétique : ${letter1.i18n_content.fr.signature.poetic_sentence}
Essence : ${letter1.i18n_content.fr.symbolic_essence.core_idea}
Mouvement intérieur : ${letter1.i18n_content.fr.symbolic_essence.inner_movement}
Mots-clés : ${letter1.i18n_content.fr.semantic_field.keywords.join(', ')}
Polarités : ${letter1.i18n_content.fr.semantic_field.polarities.join(', ')}
Lecture calligraphique : ${letter1.i18n_content.fr.form_symbolism.calligraphic_reading}
Climat intérieur : ${letter1.i18n_content.fr.vibrational_qualities.inner_climate}
Évocation existentielle : ${letter1.i18n_content.fr.existential_reading.life_phase_evocation}
Contenu de référence : ${letter1.i18n_content.fr.content_medium}

Lettre 2 (Récepteur) : ${letter2.i18n_content.fr.identity.name}
Signature poétique : ${letter2.i18n_content.fr.signature.poetic_sentence}
Essence : ${letter2.i18n_content.fr.symbolic_essence.core_idea}
Mouvement intérieur : ${letter2.i18n_content.fr.symbolic_essence.inner_movement}
Mots-clés : ${letter2.i18n_content.fr.semantic_field.keywords.join(', ')}
Polarités : ${letter2.i18n_content.fr.semantic_field.polarities.join(', ')}
Lecture calligraphique : ${letter2.i18n_content.fr.form_symbolism.calligraphic_reading}
Climat intérieur : ${letter2.i18n_content.fr.vibrational_qualities.inner_climate}
Évocation existentielle : ${letter2.i18n_content.fr.existential_reading.life_phase_evocation}
Contenu de référence : ${letter2.i18n_content.fr.content_medium}

CRÉE LE CONTENU DE CETTE COMBINAISON EXACTE.
Le contenu ne doit jamais être prescriptif ni faire de divination (pas de voyance ni de conseils médicaux/psychologiques stricts).
Utilise un ton poétique, profond et méditatif.
Génère le résultat en JSON, avec les deux clés principales "en" et "fr".

IMPORTANT: RÉPONDS UNIQUEMENT AVEC LE JSON EXACT SUIVANT (rien d'autre autour):
{
  "en": {
      "title": "A poetic and evocative title for this exact combination",
      "content_long": "A beautiful deep text in 4 paragraphs explaining the dynamic between these two specific letters.",
      "pair_essence": {
          "pair_name": "The title repeated",
          "core_theme": "The core theme of the combination",
          "archetypal_question": "One deep question for the user",
          "one_sentence_summary": "Summary of the interaction"
      },
      "content_short": "1 sentence maximum.",
      "content_medium": "A paragraph summarizing the synergy.",
      "reading_frames": {
          "general": { "what_to_observe": ["item 1", "item 2", "item 3", "item 4"], "what_it_points_to": "..." },
          "inner_life": { "what_to_observe": ["item 1", "item 2", "item 3", "item 4"], "what_it_points_to": "..." },
          "relationships": { "what_to_observe": ["item 1", "item 2", "item 3", "item 4"], "what_it_points_to": "..." },
          "work_and_projects": { "what_to_observe": ["item 1", "item 2", "item 3", "item 4"], "what_it_points_to": "..." }
      },
      "reflective_questions": ["Q1", "Q2", "Q3", "Q4", "Q5"]
  },
  "fr": {
      // THE EXACT SAME STRUCTURE TRANSLATED INTO FRENCH
  }
}`;

      try {
        // 1. Appel LLM (OpenAI)
        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
          temperature: 0.7
        });

        const generatedData = JSON.parse(completion.choices[0].message.content);

        // 2. Envoi directement dans Xano (POST)
        const postData = {
          position_1_id: letter1.id,
          position_2_id: letter2.id,
          i18n_content: generatedData
        };

        const postResponse = await fetch(`${XANO_API_URL}/combination?token=${XANO_API_TOKEN}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });

        if (!postResponse.ok) {
          throw new Error(`Erreur POST Xano: ${postResponse.status} ${postResponse.statusText}`);
        }

        console.log(`✅ Succès de l'insertion pour ${letter1.i18n_content.fr.identity.name} + ${letter2.i18n_content.fr.identity.name}. Pause de 1s...`);
        
        // Pause pour éviter les limites de taux d'OpenAI et de Xano
        await delay(1000);

      } catch (error) {
        console.error(`❌ Erreur lors de la génération/insertion pour ${letter1.i18n_content.fr.identity.name} + ${letter2.i18n_content.fr.identity.name} :`, error.message);
        // Si l'erreur est liée au quota ou au Rate Limit, on arrête tout proprement.
        if (error.status === 429 || error.message.includes('429')) {
          console.error("Quota OpenAI dépassé ou Rate Limit atteint. Relancez le script plus tard.");
          process.exit(1);
        }
      }
    }
  }

  console.log(`\n🎉 Génération terminée ! Toutes les combinaisons sont insérées dans Xano.`);
}

main().catch(console.error);
