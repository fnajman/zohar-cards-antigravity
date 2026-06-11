import { letters, getCombination } from "@/data/fake-data";
import type { Draw, Letter, Combination, DBLetter, DBCombination, DBDraw } from "@/data/types";

// Helper to flatten
function flattenLetter(dbLetter: DBLetter, lang: string): Letter {
  const content = dbLetter.i18n_content[lang === 'en' ? 'en' : 'fr'] || dbLetter.i18n_content.fr;
  return {
    id: dbLetter.id,
    symbol: dbLetter.symbol,
    latin_id: dbLetter.latin_id,
    identity: dbLetter.identity,
    ...content
  };
}

function flattenCombination(dbCombo: DBCombination, lang: string): Combination {
  const content = dbCombo.i18n_content[lang === 'en' ? 'en' : 'fr'] || dbCombo.i18n_content.fr;
  return {
    id: dbCombo.id,
    position_1_id: dbCombo.position_1_id,
    position_2_id: dbCombo.position_2_id,
    ...content
  };
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

function getRandomLetters(): [DBLetter, DBLetter] {
  const shuffled = [...letters].sort(() => Math.random() - 0.5);
  return [shuffled[0], shuffled[1]];
}

export const api = {
  getLetters: async (lang: string = 'fr'): Promise<Letter[]> => {
    await delay(300);
    return letters.map(l => flattenLetter(l, lang));
  },

  getLetterOfTheDay: async (lang: string = 'fr'): Promise<Letter> => {
    await delay(100);
    const idx = new Date().getDate() % letters.length;
    return flattenLetter(letters[idx], lang);
  },

  createDraw: async (lang: string = 'fr', selectedIds?: number[]): Promise<Draw> => {
    await delay(600); // Simulate drawing logic
    let dbCard1: DBLetter, dbCard2: DBLetter;
    if (selectedIds && selectedIds.length === 2) {
      dbCard1 = letters.find(l => l.id === selectedIds[0]) || letters[0];
      dbCard2 = letters.find(l => l.id === selectedIds[1]) || letters[1];
    } else if (selectedIds && selectedIds.length === 1) {
      dbCard1 = letters.find(l => l.id === selectedIds[0]) || letters[0];
      const others = letters.filter(l => l.id !== dbCard1.id);
      dbCard2 = others[Math.floor(Math.random() * others.length)];
    } else {
      [dbCard1, dbCard2] = getRandomLetters();
    }
    
    // We pass the FR version to getCombination for the placeholders
    const c1Fr = flattenLetter(dbCard1, 'fr');
    const c2Fr = flattenLetter(dbCard2, 'fr');
    const dbCombo = getCombination(c1Fr, c2Fr);
    
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
