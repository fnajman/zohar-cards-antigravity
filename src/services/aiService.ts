import OpenAI from "openai";
import { generateSystemPrompt } from "@/config/aiPrompt";
import { Draw } from "@/data/types";

// Note: Using OpenAI SDK on the client side requires dangerouslyAllowBrowser: true.
// In a production app, these calls should be routed through your backend to protect the API key.
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY || "",
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": window.location.href, // Recommended by OpenRouter
    "X-Title": "Zohar Cards", // Recommended by OpenRouter
  }
});

const DEFAULT_MODEL = "openai/gpt-4o-mini"; // Good balance of speed and cost

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function getAiResponse(
  draw: Draw,
  userQuestion: string,
  selectedKeywords: string[],
  chatHistory: ChatMessage[],
  language: string
): Promise<string> {
  if (!import.meta.env.VITE_OPENROUTER_API_KEY) {
    throw new Error("Clé API OpenRouter manquante. Veuillez l'ajouter dans le fichier .env.local.");
  }

  // 1. Generate the contextual system prompt
  const systemPrompt = generateSystemPrompt({ draw, userQuestion, selectedKeywords, language });

  // 2. Prepare the full message array
  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...chatHistory
  ];

  try {
    const response = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: messages as any,
    });

    return response.choices[0].message.content || "L'IA n'a pas pu formuler de réponse.";
  } catch (error) {
    console.error("Erreur lors de l'appel à OpenRouter:", error);
    throw new Error("Impossible de se connecter à l'oracle. Réessayez plus tard.");
  }
}
