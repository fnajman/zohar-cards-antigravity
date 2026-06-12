import { letters as fakeLetters, getCombination } from "@/data/fake-data";
import type { Draw, Letter, Combination, DBLetter, DBCombination, DBDraw } from "@/data/types";

const XANO_URL = "https://api.najman.app/api:hyEJD2He";
const CACHE_KEY = "zohar_letters_cache";

let memoryCachedLetters: DBLetter[] | null = null;

async function fetchDBLetters(): Promise<DBLetter[]> {
  if (memoryCachedLetters) return memoryCachedLetters;
  
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      memoryCachedLetters = JSON.parse(cached);
      // Background update
      fetch(`${XANO_URL}/letter`).then(r => r.json()).then(data => {
        if (Array.isArray(data) && data.length > 0) {
          memoryCachedLetters = data;
          localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        }
      }).catch(console.error);
      return memoryCachedLetters!;
    }
    
    const res = await fetch(`${XANO_URL}/letter`);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      memoryCachedLetters = data;
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      return data;
    }
    throw new Error("Invalid format");
  } catch (err) {
    console.error("Failed to fetch letters from Xano, falling back to local fake data:", err);
    return fakeLetters as unknown as DBLetter[];
  }
}

// Helper to flatten
function flattenLetter(dbLetter: DBLetter, lang: string): Letter {
  // If we're using fallback fake data, it might not have the new fields, so we do safe destructuring
  const content = dbLetter.i18n_content[lang === 'en' ? 'en' : 'fr'] || dbLetter.i18n_content.fr;
  return {
    id: dbLetter.id,
    symbol: dbLetter.symbol,
    latin_id: dbLetter.latin_id,
    visual_content: dbLetter.visual_content || null,
    ...content
  } as Letter;
}

function flattenCombination(dbCombo: any, lang: string): Combination {
  // If the API returned a flattened object (e.g. title is at the root)
  if (dbCombo.title) {
    return dbCombo as Combination;
  }
  // Otherwise, it's the fallback mock data which has i18n_content
  const content = dbCombo.i18n_content?.[lang === 'en' ? 'en' : 'fr'] || dbCombo.i18n_content?.fr;
  if (!content) {
    return dbCombo as Combination; // Safe fallback
  }
  return {
    id: dbCombo.id,
    position_1_id: dbCombo.position_1_id,
    position_2_id: dbCombo.position_2_id,
    ...content
  } as Combination;
}

function flattenDraw(dbDraw: DBDraw, lang: string): Draw {
  return {
    id: dbDraw.id,
    created_at: dbDraw.created_at,
    card_1: flattenLetter(dbDraw.card_1, lang),
    card_2: flattenLetter(dbDraw.card_2, lang),
    combination: flattenCombination(dbDraw.combination, lang),
    selected_keywords: dbDraw.selected_keywords,
  };
}

// Mock Database
let drawHistory: DBDraw[] = [];
let currentDraw: DBDraw | null = null;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getRandomLetters(): Promise<[DBLetter, DBLetter]> {
  const dbLetters = await fetchDBLetters();
  const shuffled = [...dbLetters].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

export const api = {
  getLetters: async (lang: string = 'fr'): Promise<Letter[]> => {
    const dbLetters = await fetchDBLetters();
    return dbLetters.map(l => flattenLetter(l, lang));
  },

  getLetterOfTheDay: async (lang: string = 'fr'): Promise<Letter> => {
    const dbLetters = await fetchDBLetters();
    const idx = new Date().getDate() % dbLetters.length;
    return flattenLetter(dbLetters[idx], lang);
  },

  createDraw: async (lang: string = 'fr', selectedIds?: number[]): Promise<Draw> => {
    await delay(600); // Simulate drawing logic
    const dbLetters = await fetchDBLetters();
    let dbCard1: DBLetter, dbCard2: DBLetter;
    if (selectedIds && selectedIds.length === 2) {
      dbCard1 = dbLetters.find(l => l.id === selectedIds[0]) || dbLetters[0];
      dbCard2 = dbLetters.find(l => l.id === selectedIds[1]) || dbLetters[1];
    } else if (selectedIds && selectedIds.length === 1) {
      dbCard1 = dbLetters.find(l => l.id === selectedIds[0]) || dbLetters[0];
      const others = dbLetters.filter(l => l.id !== dbCard1.id);
      dbCard2 = others[Math.floor(Math.random() * others.length)];
    } else {
      [dbCard1, dbCard2] = await getRandomLetters();
    }
    
    // Appelle l'API avec les symboles hébraïques exacts (ex: א et ב)
    // S'ils ne sont pas encore générés dans la base, l'API renverra une erreur et ça passera dans le bloc catch (fallback).
    let dbCombo: DBCombination;
    try {
      const token = "y26ZAel6VjBsRt3MTGnQdBFNYNc";
      const s1 = encodeURIComponent(dbCard1.symbol);
      const s2 = encodeURIComponent(dbCard2.symbol);
      const comboRes = await fetch(`${XANO_URL}/combination/symbol/${s1}/${s2}?token=${token}&lang=${lang}`);
      
      if (comboRes.ok) {
        dbCombo = await comboRes.json();
      } else {
        throw new Error("Combo fetch failed");
      }
    } catch (err) {
      console.error("Failed to fetch combination from Xano, using fake data:", err);
      const c1Fr = flattenLetter(dbCard1, 'fr');
      const c2Fr = flattenLetter(dbCard2, 'fr');
      dbCombo = getCombination(c1Fr, c2Fr);
    }
    
    const dbDraw: DBDraw = {
      id: Date.now(),
      created_at: new Date().toISOString(),
      card_1: dbCard1,
      card_2: dbCard2,
      combination: dbCombo,
      selected_keywords: [],
    };
    currentDraw = dbDraw;
    drawHistory = [dbDraw, ...drawHistory];
    return flattenDraw(dbDraw, lang);
  },

  getCurrentDraw: async (lang: string = 'fr'): Promise<Draw | null> => {
    await delay(200);
    return currentDraw ? flattenDraw(currentDraw, lang) : null;
  },

  getDrawHistory: async (lang: string = 'fr'): Promise<Draw[]> => {
    await delay(400);
    return drawHistory.map(d => flattenDraw(d, lang));
  },

  addKeywordsToDraw: async (drawId: number, keywords: string[], lang: string = 'fr'): Promise<Draw> => {
    await delay(300);
    if (currentDraw?.id === drawId) {
      currentDraw = { ...currentDraw, selected_keywords: keywords };
    }
    drawHistory = drawHistory.map(d => 
      d.id === drawId ? { ...d, selected_keywords: keywords } : d
    );
    const updatedDraw = drawHistory.find(d => d.id === drawId);
    if (!updatedDraw) throw new Error("Draw not found");
    return flattenDraw(updatedDraw, lang);
  }
};
