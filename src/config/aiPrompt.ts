import { Draw } from "@/data/types";
import { type PersonalInfo } from "@/services/profileApi";
import { generateSystemPrompt as generateFr } from "./prompts/fr";
import { generateSystemPrompt as generateEn } from "./prompts/en";

interface PromptContext {
  draw: Draw;
  userQuestion: string;
  selectedKeywords: string[];
  language: string;
  personalInfo?: PersonalInfo;
}

export function generateSystemPrompt(context: PromptContext): string {
  if (context.language === 'en') {
    return generateEn(context);
  }
  return generateFr(context);
}
