import { create } from 'zustand';
import { fakeUser } from "@/data/fake-data";
import type { UserProfile } from "@/data/types";
import type { HebrewFontStyle } from "@/components/HebrewGlyph";

export type DrawStyle = "grid" | "chaos" | "fan" | "slider" | "hold";
export type JourneyStep = "card1" | "card2" | "reading" | "question" | "interpretation" | "support_letter" | "experience";

interface AppState {
  user: UserProfile;
  drawStyle: DrawStyle;
  hebrewFont: HebrewFontStyle;
  journeyProgress: JourneyStep[];
  setDrawStyle: (style: DrawStyle) => void;
  setHebrewFont: (font: HebrewFontStyle) => void;
  markJourneyStep: (step: JourneyStep) => void;
  resetJourney: () => void;
  setUserCredits: (credits: number) => void;
}

export const useStore = create<AppState>((set) => ({
  user: fakeUser,
  drawStyle: (fakeUser.preferences.default_layout as DrawStyle) || "chaos",
  hebrewFont: "Lalou",
  journeyProgress: [],

  setDrawStyle: (style) => set({ drawStyle: style }),
  setHebrewFont: (font) => set({ hebrewFont: font }),
  markJourneyStep: (step) => set((state) => ({ 
    journeyProgress: state.journeyProgress.includes(step) ? state.journeyProgress : [...state.journeyProgress, step] 
  })),
  resetJourney: () => set({ journeyProgress: [] }),
  setUserCredits: (credits) => set((state) => ({ user: { ...state.user, credits } })),
}));
