import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fakeUser } from "@/data/fake-data";
import type { UserProfile } from "@/data/types";
import type { HebrewFontStyle } from "@/components/HebrewGlyph";
import { createProfile, updateProfile, type PersonalInfo } from "@/services/profileApi";
import { checkCoupon } from "@/services/bonusApi";

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
  personalInfo?: PersonalInfo;
  journeyProgress: JourneyStep[];
  currentQuestion: string;
  chatMessages: Message[];
  chatSessionPaid: boolean;
  setDrawStyle: (style: DrawStyle) => void;
  setHebrewFont: (font: HebrewFontStyle) => void;
  setAppLanguage: (lang: string) => void;
  setPersonalInfo: (info: PersonalInfo) => void;
  markJourneyStep: (step: JourneyStep) => void;
  setCurrentQuestion: (q: string) => void;
  setChatMessages: (updater: Message[] | ((prev: Message[]) => Message[])) => void;
  setChatSessionPaid: (paid: boolean) => void;
  resetJourney: () => void;
  setUserCredits: (credits: number) => void;
  loginSession: (token: string, user: UserProfile) => void;
  setProfileId: (id: number | null) => void;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  setAiModel: (model: string) => void;
  setHasSeenTutorial: () => void;
  usedGiftCodes: string[];
  applyGiftCode: (code: string) => Promise<{ success: boolean; messageKey: string; count?: number }>;
  syncProfileOnLogin: (token: string, user: UserProfile) => Promise<void>;
  deductCredits: (amount: number) => Promise<void>;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => {
      let isSyncing = false;
      return {
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
      chatSessionPaid: false,

      setDrawStyle: (style) => {
        set({ drawStyle: style });
        const s = get();
        if (s.authToken && s.profileId && s.user) {
          updateProfile(s.authToken, s.profileId, s.user.id, { appLanguage: s.appLanguage, drawStyle: s.drawStyle, hebrewFont: s.hebrewFont, aiModel: s.aiModel }, s.usedGiftCodes, s.personalInfo);
        }
      },
      setHebrewFont: (font) => {
        set({ hebrewFont: font });
        const s = get();
        if (s.authToken && s.profileId && s.user) {
          updateProfile(s.authToken, s.profileId, s.user.id, { appLanguage: s.appLanguage, drawStyle: s.drawStyle, hebrewFont: s.hebrewFont, aiModel: s.aiModel }, s.usedGiftCodes, s.personalInfo);
        }
      },
      setAppLanguage: (lang) => {
        set({ appLanguage: lang });
        const s = get();
        if (s.authToken && s.profileId && s.user) {
          updateProfile(s.authToken, s.profileId, s.user.id, { appLanguage: s.appLanguage, drawStyle: s.drawStyle, hebrewFont: s.hebrewFont, aiModel: s.aiModel }, s.usedGiftCodes, s.personalInfo);
        }
      },
      setPersonalInfo: (info) => {
        set({ personalInfo: info });
        const s = get();
        if (s.authToken && s.profileId && s.user) {
          updateProfile(s.authToken, s.profileId, s.user.id, { appLanguage: s.appLanguage, drawStyle: s.drawStyle, hebrewFont: s.hebrewFont, aiModel: s.aiModel }, s.usedGiftCodes, s.personalInfo);
        }
      },
      markJourneyStep: (step) => set((state) => ({ 
        journeyProgress: state.journeyProgress.includes(step) ? state.journeyProgress : [...state.journeyProgress, step] 
      })),
      setCurrentQuestion: (q) => set({ currentQuestion: q }),
      setChatMessages: (updater) => set((state) => ({
        chatMessages: typeof updater === 'function' ? updater(state.chatMessages) : updater
      })),
      setChatSessionPaid: (paid) => set({ chatSessionPaid: paid }),
      resetJourney: () => set({ journeyProgress: [], currentQuestion: "", chatMessages: [], chatSessionPaid: false }),
      setUserCredits: (credits) => set((state) => ({ 
        user: state.user ? { ...state.user, credits } : null 
      })),
      loginSession: (token, user) => set({ authToken: token, user }),
      setProfileId: (id) => set({ profileId: id }),
      logout: () => set({ authToken: null, user: null, profileId: null, usedGiftCodes: [], personalInfo: undefined }),
      updateUser: (data) => set((state) => ({
        user: state.user ? { ...state.user, ...data } : null
      })),
      setAiModel: (aiModel) => {
        set({ aiModel });
        const s = get();
        if (s.authToken && s.profileId && s.user) {
          updateProfile(s.authToken, s.profileId, s.user.id, { appLanguage: s.appLanguage, drawStyle: s.drawStyle, hebrewFont: s.hebrewFont, aiModel: s.aiModel }, s.usedGiftCodes, s.personalInfo);
        }
      },
      setHasSeenTutorial: () => set({ hasSeenTutorial: true }),
      usedGiftCodes: [],
      applyGiftCode: async (code: string) => {
        const state = get();
        const codeUpper = code.trim().toUpperCase();
        
        if (!state.authToken) {
          return { success: false, messageKey: 'settings.gift_code_invalid' };
        }
        
        const isPrivileged = state.user?.role === 'admin' || state.user?.role === 'contrib';
        
        if (!isPrivileged && state.usedGiftCodes.includes(codeUpper)) {
          return { success: false, messageKey: 'settings.gift_code_used' };
        }
        
        try {
          const coupon = await checkCoupon(state.authToken, codeUpper);
          
          if (!coupon) {
            return { success: false, messageKey: 'settings.gift_code_invalid' };
          }
          
          if (coupon.expiration_date && new Date(coupon.expiration_date) < new Date()) {
            return { success: false, messageKey: 'settings.gift_code_expired' };
          }

          const creditToAdd = coupon.credit || 0;
          const newCredits = (state.user?.credits || 0) + creditToAdd;
          
          // Apply credits
          set({ 
            usedGiftCodes: isPrivileged ? state.usedGiftCodes : [...state.usedGiftCodes, codeUpper],
            user: state.user ? { ...state.user, credits: newCredits } : null
          });
          
          const s = get();
          if (s.profileId && s.user) {
            await updateProfile(s.authToken, s.profileId, s.user.id, { 
              appLanguage: s.appLanguage, 
              drawStyle: s.drawStyle, 
              hebrewFont: s.hebrewFont, 
              aiModel: s.aiModel 
            }, s.usedGiftCodes, s.personalInfo, newCredits);
          }
          
          return { success: true, messageKey: 'settings.gift_code_success', count: creditToAdd };
        } catch (err) {
          console.error("Error checking coupon:", err);
          return { success: false, messageKey: 'settings.gift_code_invalid' };
        }
      },
      syncProfileOnLogin: async (token, user) => {
        if (isSyncing) return;
        isSyncing = true;
        try {
          let profile = user.profile;
          if (!profile) {
            const s = get();
            profile = await createProfile(token, user.id, {
              appLanguage: s.appLanguage,
              drawStyle: s.drawStyle,
              hebrewFont: s.hebrewFont,
              aiModel: s.aiModel
            }, [], s.personalInfo, 2);
            
            if (profile) {
              set(state => ({ user: state.user ? { ...state.user, credits: 2 } : null }));
            }
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
            if (profile.bonuscode && profile.bonuscode.length > 0) {
              set({ usedGiftCodes: profile.bonuscode });
            }
            
            // Sync perso
            if (profile.perso && Object.keys(profile.perso).length > 0) {
              set({ personalInfo: profile.perso });
            } else if (get().personalInfo && Object.keys(get().personalInfo!).length > 0) {
              // Cloud has no perso, but local does. Push local to cloud.
              updateProfile(token, profile.id, user.id, {
                appLanguage: get().appLanguage,
                drawStyle: get().drawStyle,
                hebrewFont: get().hebrewFont,
                aiModel: get().aiModel
              }, get().usedGiftCodes, get().personalInfo).catch(console.error);
            }
            
            // Sync credits from profile
            if (profile!.credit !== undefined && profile!.credit !== null) {
              set(state => ({ user: state.user ? { ...state.user, credits: profile!.credit! } : null }));
            }
          }
          if (profile) {
            set({ profileId: profile.id });
          }
        } catch (err) {
          console.error("Profile sync failed", err);
        } finally {
          isSyncing = false;
        }
      },
      deductCredits: async (amount: number) => {
        const state = get();
        if (!state.user) return;
        const isPrivileged = state.user.role === 'admin' || state.user.role === 'contrib';
        if (isPrivileged) return;
        
        const newCredits = Math.max(0, state.user.credits - amount);
        set({ user: { ...state.user, credits: newCredits } });
        
        if (state.authToken && state.profileId) {
          await updateProfile(state.authToken, state.profileId, state.user.id, {
            appLanguage: state.appLanguage,
            drawStyle: state.drawStyle,
            hebrewFont: state.hebrewFont,
            aiModel: state.aiModel
          }, state.usedGiftCodes, state.personalInfo, newCredits).catch(console.error);
        }
      },
    };},
    {
      name: 'zohar-storage',
      // We persist settings, authToken, aiModel, and tutorial status
      partialize: (state) => ({
        drawStyle: state.drawStyle,
        hebrewFont: state.hebrewFont,
        authToken: state.authToken,
        user: state.user,
        profileId: state.profileId,
        aiModel: state.aiModel,
        hasSeenTutorial: state.hasSeenTutorial,
        usedGiftCodes: state.usedGiftCodes,
        personalInfo: state.personalInfo,
      }),
    }
  )
);
