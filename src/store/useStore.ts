import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fakeUser } from "@/data/fake-data";
import type { UserProfile } from "@/data/types";
import type { HebrewFontStyle } from "@/components/HebrewGlyph";
import { fetchProfile, createProfile, updateProfile } from "@/services/profileApi";

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
  profileId: number | null;
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
  setProfileId: (id: number | null) => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  setAiModel: (model: string) => void;
  setHasSeenTutorial: () => void;
  usedGiftCodes: string[];
  applyGiftCode: (code: string) => { success: boolean; messageKey: string };
  syncProfileOnLogin: (token: string, user: UserProfile) => Promise<void>;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      authToken: null,
      profileId: null,
      aiModel: "anthropic/claude-haiku-4.5",
      hasSeenTutorial: false,
      drawStyle: "chaos",
      hebrewFont: "Lalou",
      appLanguage: navigator.language.startsWith('fr') ? 'fr' : 'en',
      journeyProgress: [],
      currentQuestion: "",
      chatMessages: [],

      setDrawStyle: (style) => {
        set({ drawStyle: style });
        const s = get();
        if (s.authToken && s.profileId && s.user) {
          updateProfile(s.authToken, s.profileId, s.user.id, { appLanguage: s.appLanguage, drawStyle: s.drawStyle, hebrewFont: s.hebrewFont, aiModel: s.aiModel });
        }
      },
      setHebrewFont: (font) => {
        set({ hebrewFont: font });
        const s = get();
        if (s.authToken && s.profileId && s.user) {
          updateProfile(s.authToken, s.profileId, s.user.id, { appLanguage: s.appLanguage, drawStyle: s.drawStyle, hebrewFont: s.hebrewFont, aiModel: s.aiModel });
        }
      },
      setAppLanguage: (lang) => {
        set({ appLanguage: lang });
        const s = get();
        if (s.authToken && s.profileId && s.user) {
          updateProfile(s.authToken, s.profileId, s.user.id, { appLanguage: s.appLanguage, drawStyle: s.drawStyle, hebrewFont: s.hebrewFont, aiModel: s.aiModel });
        }
      },
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
      setProfileId: (id) => set({ profileId: id }),
      logout: () => set({ authToken: null, user: null, profileId: null }),
      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
      setAiModel: (aiModel) => {
        set({ aiModel });
        const s = get();
        if (s.authToken && s.profileId && s.user) {
          updateProfile(s.authToken, s.profileId, s.user.id, { appLanguage: s.appLanguage, drawStyle: s.drawStyle, hebrewFont: s.hebrewFont, aiModel: s.aiModel });
        }
      },
      setHasSeenTutorial: () => set({ hasSeenTutorial: true }),
      usedGiftCodes: [],
      applyGiftCode: (code: string) => {
        const state = get();
        const codeUpper = code.trim().toUpperCase();
        
        if (codeUpper !== "BONUS03") {
          return { success: false, messageKey: 'settings.gift_code_invalid' };
        }
        
        const isPrivileged = state.user?.role === 'admin' || state.user?.role === 'contrib';
        
        if (!isPrivileged && state.usedGiftCodes.includes(codeUpper)) {
          return { success: false, messageKey: 'settings.gift_code_used' };
        }
        
        // Apply credits
        set({ 
          usedGiftCodes: isPrivileged ? state.usedGiftCodes : [...state.usedGiftCodes, codeUpper],
          user: state.user ? { ...state.user, credits: (state.user.credits || 0) + 3 } : null
        });
        
        const s = get();
        if (s.authToken && s.profileId && s.user) {
          updateProfile(s.authToken, s.profileId, s.user.id, { 
            appLanguage: s.appLanguage, 
            drawStyle: s.drawStyle, 
            hebrewFont: s.hebrewFont, 
            aiModel: s.aiModel 
          }, s.usedGiftCodes).catch(console.error);
        }
        
        return { success: true, messageKey: 'settings.gift_code_success' };
      },
      syncProfileOnLogin: async (token, user) => {
        try {
          let profile = await fetchProfile(token);
          if (!profile) {
            const s = get();
            profile = await createProfile(token, user.id, {
              appLanguage: s.appLanguage,
              drawStyle: s.drawStyle,
              hebrewFont: s.hebrewFont,
              aiModel: s.aiModel
            }, s.usedGiftCodes);
          } else {
            if (profile.param) {
              const p = profile.param as any;
              set({
                appLanguage: p.appLanguage || get().appLanguage,
                drawStyle: p.drawStyle || get().drawStyle,
                hebrewFont: p.hebrewFont || get().hebrewFont,
                aiModel: p.aiModel || get().aiModel
              });
            }
            if (profile.bonuscode) {
              set({ usedGiftCodes: profile.bonuscode });
            }
          }
          if (profile) {
            set({ profileId: profile.id });
          }
        } catch (err) {
          console.error("Profile sync failed", err);
        }
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
