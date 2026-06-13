const OPENROUTER_API_URL = "https://openrouter.ai/api/v1";

const CURATED_MODELS = [
  "openai/gpt-5.5",
  "openai/gpt-5.5-pro",
  "openai/gpt-5.4-mini",
  "openai/gpt-4o",
  "openai/gpt-4o-mini",
  "anthropic/claude-opus-4.8",
  "anthropic/claude-opus-4.6",
  "anthropic/claude-3.5-sonnet",
  "anthropic/claude-3.5-haiku",
  "anthropic/claude-3-haiku",
  "anthropic/claude-haiku-4.5",
  "google/gemini-3.5-flash",
  "google/gemini-3.1-pro",
  "google/gemini-pro-1.5",
  "google/gemini-flash-1.5",
  "moonshotai/kimi-latest",
  "meta-llama/llama-4-scout",
  "meta-llama/llama-3.1-70b-instruct",
  "meta-llama/llama-3.1-8b-instruct",
  "mistralai/mistral-large-2407",
  "mistralai/mistral-small-2603",
  "mistralai/mistral-nemo",
  "microsoft/phi-3-mini-128k-instruct",
  "qwen/qwen-2-72b-instruct"
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
        let models: ORModel[] = json.data.filter((m: any) => CURATED_MODELS.includes(m.id));
        
        // Filter out models costing more than $30/1M tokens (prompt or completion)
        models = models.filter(m => {
          const promptPrice = parseFloat(m.pricing.prompt) * 1000000;
          const completionPrice = parseFloat(m.pricing.completion) * 1000000;
          return promptPrice <= 30 && completionPrice <= 30;
        });

        // Sort by average price ascending
        models.sort((a, b) => {
          const priceA = (parseFloat(a.pricing.prompt) + parseFloat(a.pricing.completion));
          const priceB = (parseFloat(b.pricing.prompt) + parseFloat(b.pricing.completion));
          return priceA - priceB;
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
