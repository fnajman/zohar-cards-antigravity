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
  loginSession: (token: string, user: UserProfile) => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      authToken: null,
      drawStyle: "chaos",
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
      setUserCredits: (credits) => set((state) => ({ 
        user: state.user ? { ...state.user, credits } : null 
      })),
      loginSession: (token, user) => set({ authToken: token, user }),
      logout: () => set({ authToken: null, user: null }),
      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
    }),
    {
      name: 'zohar-storage',
      // We persist settings and authToken, but user profile will be fetched on mount
      partialize: (state) => ({
        drawStyle: state.drawStyle,
        hebrewFont: state.hebrewFont,
        authToken: state.authToken,
      }),
    }
  )
);
