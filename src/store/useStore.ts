import { create } from 'zustand';
import { fakeUser } from "@/data/fake-data";
import type { UserProfile } from "@/data/types";
import type { HebrewFontStyle } from "@/components/HebrewGlyph";

export type DrawStyle = "grid" | "chaos" | "fan" | "slider" | "hold";

interface AppState {
  user: UserProfile;
  drawStyle: DrawStyle;
  hebrewFont: HebrewFontStyle;
  setDrawStyle: (style: DrawStyle) => void;
  setHebrewFont: (font: HebrewFontStyle) => void;
}

export const useStore = create<AppState>((set) => ({
  user: fakeUser,
  drawStyle: (fakeUser.preferences.default_layout as DrawStyle) || "chaos",
  hebrewFont: "Lalou",

  setDrawStyle: (style) => set({ drawStyle: style }),
  setHebrewFont: (font) => set({ hebrewFont: font }),
}));
