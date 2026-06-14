import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fakeUser } from "@/data/fake-data";
import type { UserProfile } from "@/data/types";
import type { HebrewFontStyle } from "@/components/HebrewGlyph";

// Assuming we duplicate or import the Message type
export type Message = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  action?: "support-letter";
};

export type DrawStyle = "grid" | "chaos" | "fan" | "slider" | "hold";
export type JourneyStep = "card1" | "card2" | "reading" | "question" | "interpretation" | "support_letter" | "experience";

interface AppState {
  user: UserProfile | null;
  authToken: string | null;
  aiModel: string;
  hasSeenTutorial: boolean;
  drawStyle: DrawStyle;
  hebrewFont: HebrewFontStyle;
  appLanguage: string;
  journeyProgress: JourneyStep[];
  currentQuestion: string;
  chatMessages: Message[];
  setDrawStyle: (style: DrawStyle) => void;
  setHebrewFont: (font: HebrewFontStyle) => void;
  setAppLanguage: (lang: string) => void;
  markJourneyStep: (step: JourneyStep) => void;
  setCurrentQuestion: (q: string) => void;
  setChatMessages: (updater: Message[] | ((prev: Message[]) => Message[])) => void;
  resetJourney: () => void;
  setUserCredits: (credits: number) => void;
  loginSession: (token: string, user: UserProfile) => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  setAiModel: (model: string) => void;
  setHasSeenTutorial: () => void;
  usedGiftCodes: string[];
  applyGiftCode: (code: string) => { success: boolean; messageKey: string };
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      authToken: null,
      aiModel: "anthropic/claude-haiku-4.5",
      hasSeenTutorial: false,
      drawStyle: "chaos",
      hebrewFont: "Lalou",
      appLanguage: navigator.language.startsWith('fr') ? 'fr' : 'en',
      journeyProgress: [],
      currentQuestion: "",
      chatMessages: [],

      setDrawStyle: (style) => set({ drawStyle: style }),
      setHebrewFont: (font) => set({ hebrewFont: font }),
      setAppLanguage: (lang) => set({ appLanguage: lang }),
      markJourneyStep: (step) => set((state) => ({ 
        journeyProgress: state.journeyProgress.includes(step) ? state.journeyProgress : [...state.journeyProgress, step] 
      })),
      setCurrentQuestion: (q) => set({ currentQuestion: q }),
      setChatMessages: (updater) => set((state) => ({
        chatMessages: typeof updater === 'function' ? updater(state.chatMessages) : updater
      })),
      resetJourney: () => set({ journeyProgress: [], currentQuestion: "", chatMessages: [] }),
      setUserCredits: (credits) => set((state) => ({ 
        user: state.user ? { ...state.user, credits } : null 
      })),
      loginSession: (token, user) => set({ authToken: token, user }),
      logout: () => set({ authToken: null, user: null }),
      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
      setAiModel: (aiModel) => set({ aiModel }),
      setHasSeenTutorial: () => set({ hasSeenTutorial: true }),
      usedGiftCodes: [],
      applyGiftCode: (code: string) => {
        const state = get();
        const codeUpper = code.trim().toUpperCase();
        
        if (codeUpper !== "BONUS03") {
          return { success: false, messageKey: 'settings.gift_code_invalid' };
        }
        if (state.usedGiftCodes.includes(codeUpper)) {
          return { success: false, messageKey: 'settings.gift_code_used' };
        }
        
        // Apply credits
        set({ 
          usedGiftCodes: [...state.usedGiftCodes, codeUpper],
          user: state.user ? { ...state.user, credits: (state.user.credits || 0) + 3 } : null
        });
        
        return { success: true, messageKey: 'settings.gift_code_success' };
      },
    }),
    {
      name: 'zohar-storage',
      // We persist settings, authToken, aiModel, and tutorial status
      partialize: (state) => ({
        drawStyle: state.drawStyle,
        hebrewFont: state.hebrewFont,
        authToken: state.authToken,
        aiModel: state.aiModel,
        hasSeenTutorial: state.hasSeenTutorial,
        usedGiftCodes: state.usedGiftCodes,
      }),
    }
  )
);
