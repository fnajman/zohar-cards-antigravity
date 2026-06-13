const OPENROUTER_API_URL = "https://openrouter.ai/api/v1";

const CURATED_MODELS = [
  "openai/gpt-5.5",
  "openai/gpt-5.5-pro",
  "openai/gpt-4o-mini",
  "anthropic/claude-opus-4.8",
  "anthropic/claude-opus-4.6",
  "anthropic/claude-3-haiku",
  "google/gemini-3.1-pro",
  "moonshotai/kimi-latest",
  "meta-llama/llama-4-scout",
  "mistralai/mistral-small-2603"
];

export interface ORModel {
  id: string;
  name: string;
  pricing: {
    prompt: string;
    completion: string;
  };
}

export interface ORSpending {
  usage: number;
  limit: number;
}

export const openrouterApi = {
  getAvailableModels: async (): Promise<ORModel[]> => {
    const key = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!key) return [];
    
    try {
      const res = await fetch(`${OPENROUTER_API_URL}/models`);
      if (!res.ok) throw new Error("Failed to fetch models");
      const json = await res.json();
      
      if (json && Array.isArray(json.data)) {
        // Filter models to only include our curated list
        const models: ORModel[] = json.data.filter((m: any) => CURATED_MODELS.includes(m.id));
        
        // Sort them to match the order in CURATED_MODELS
        models.sort((a, b) => {
          return CURATED_MODELS.indexOf(a.id) - CURATED_MODELS.indexOf(b.id);
        });
        
        return models;
      }
      return [];
    } catch (err) {
      console.error("Error fetching OpenRouter models:", err);
      return [];
    }
  },

  getSpending: async (): Promise<ORSpending | null> => {
    const key = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!key) return null;

    try {
      const res = await fetch(`${OPENROUTER_API_URL}/auth/key`, {
        headers: {
          "Authorization": `Bearer ${key}`
        }
      });
      if (!res.ok) throw new Error("Failed to fetch key info");
      const json = await res.json();
      
      if (json && json.data) {
        return {
          usage: json.data.usage || 0,
          limit: json.data.limit || 0
        };
      }
      return null;
    } catch (err) {
      console.error("Error fetching OpenRouter spending:", err);
      return null;
    }
  }
};
