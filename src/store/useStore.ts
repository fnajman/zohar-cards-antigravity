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
  user: UserProfile;
  drawStyle: DrawStyle;
  hebrewFont: HebrewFontStyle;
  journeyProgress: JourneyStep[];
  currentQuestion: string;
  chatMessages: Message[];
  setDrawStyle: (style: DrawStyle) => void;
  setHebrewFont: (font: HebrewFontStyle) => void;
  markJourneyStep: (step: JourneyStep) => void;
  setCurrentQuestion: (q: string) => void;
  setChatMessages: (updater: Message[] | ((prev: Message[]) => Message[])) => void;
  resetJourney: () => void;
  setUserCredits: (credits: number) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: fakeUser,
      drawStyle: (fakeUser.preferences.default_layout as DrawStyle) || "chaos",
      hebrewFont: "Lalou",
      journeyProgress: [],
      currentQuestion: "",
      chatMessages: [],

      setDrawStyle: (style) => set({ drawStyle: style }),
      setHebrewFont: (font) => set({ hebrewFont: font }),
      markJourneyStep: (step) => set((state) => ({ 
        journeyProgress: state.journeyProgress.includes(step) ? state.journeyProgress : [...state.journeyProgress, step] 
      })),
      setCurrentQuestion: (q) => set({ currentQuestion: q }),
      setChatMessages: (updater) => set((state) => ({
        chatMessages: typeof updater === 'function' ? updater(state.chatMessages) : updater
      })),
      resetJourney: () => set({ journeyProgress: [], currentQuestion: "", chatMessages: [] }),
      setUserCredits: (credits) => set((state) => ({ user: { ...state.user, credits } })),
    }),
    {
      name: 'zohar-storage',
      // We only want to persist settings, not the user data (which will come from DB) or the journey progress
      partialize: (state) => ({
        drawStyle: state.drawStyle,
        hebrewFont: state.hebrewFont
      }),
    }
  )
);
