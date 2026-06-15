import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen } from "@/screens/SplashScreen";
import { JourneyProgress } from "@/components/JourneyProgress";
import { InstallPrompt } from "@/components/InstallPrompt";
import { useStore } from "@/store/useStore";
import { getMe } from "@/services/authApi";
import i18n from "@/i18n/config";
import { UpdatePopup } from "@/components/UpdatePopup";

const HomeScreen = React.lazy(() => import("@/screens/HomeScreen").then(m => ({ default: m.HomeScreen })));
const DrawScreen = React.lazy(() => import("@/screens/DrawScreen").then(m => ({ default: m.DrawScreen })));
const RevealScreen = React.lazy(() => import("@/screens/RevealScreen").then(m => ({ default: m.RevealScreen })));
const ReadingScreen = React.lazy(() => import("@/screens/ReadingScreen").then(m => ({ default: m.ReadingScreen })));
const QuestionScreen = React.lazy(() => import("@/screens/QuestionScreen").then(m => ({ default: m.QuestionScreen })));
const InterpretationScreen = React.lazy(() => import("@/screens/InterpretationScreen").then(m => ({ default: m.InterpretationScreen })));
const SupportLetterScreen = React.lazy(() => import("@/screens/SupportLetterScreen").then(m => ({ default: m.SupportLetterScreen })));
const LetterOfDayScreen = React.lazy(() => import("@/screens/LetterOfDayScreen").then(m => ({ default: m.LetterOfDayScreen })));
const SettingsScreen = React.lazy(() => import("@/screens/SettingsScreen").then(m => ({ default: m.SettingsScreen })));
const AuthScreen = React.lazy(() => import("@/screens/AuthScreen").then(m => ({ default: m.AuthScreen })));
const ExperienceMenuScreen = React.lazy(() => import("@/screens/ExperienceMenuScreen").then(m => ({ default: m.ExperienceMenuScreen })));
const MeditationScreen = React.lazy(() => import("@/screens/MeditationScreen").then(m => ({ default: m.MeditationScreen })));
const TehimaScreen = React.lazy(() => import("@/screens/TehimaScreen").then(m => ({ default: m.TehimaScreen })));
const CalligraphyScreen = React.lazy(() => import("@/screens/CalligraphyScreen").then(m => ({ default: m.CalligraphyScreen })));
const AboutScreen = React.lazy(() => import("@/screens/AboutScreen").then(m => ({ default: m.AboutScreen })));
const TutorialScreen = React.lazy(() => import("@/screens/TutorialScreen").then(m => ({ default: m.TutorialScreen })));


const LoadingFallback = () => <div className="h-[100dvh] w-full bg-night" />;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export default function App() {
  const authToken = useStore(state => state.authToken);
  const loginSession = useStore(state => state.loginSession);
  const logout = useStore(state => state.logout);
  const appLanguage = useStore(state => state.appLanguage);

  React.useEffect(() => {
    if (appLanguage && i18n.language !== appLanguage) {
      i18n.changeLanguage(appLanguage);
    }
  }, [appLanguage]);

  React.useEffect(() => {
    // Si on a un token mais pas de user (ex: rechargement de page), on va chercher le profil
    if (authToken && !useStore.getState().user) {
      getMe(authToken)
        .then(user => {
          loginSession(authToken, user);
          useStore.getState().syncProfileOnLogin(authToken, user);
        })
        .catch(() => logout());
    }
  }, [authToken, loginSession, logout]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="h-full w-full max-w-[430px] mx-auto relative bg-night">
          <UpdatePopup />
          <JourneyProgress />
          <InstallPrompt />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/draw" element={<DrawScreen />} />
              <Route path="/reveal" element={<RevealScreen />} />
              <Route path="/reading" element={<ReadingScreen />} />
              <Route path="/question" element={<QuestionScreen />} />
              <Route path="/interpretation" element={<InterpretationScreen />} />
              <Route path="/support-letter" element={<SupportLetterScreen />} />
              <Route path="/letter-of-day" element={<LetterOfDayScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
              <Route path="/auth" element={<AuthScreen />} />
              <Route path="/tutorial" element={<TutorialScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/experience" element={<ExperienceMenuScreen />} />
              <Route path="/experience/meditation" element={<MeditationScreen />} />
              <Route path="/experience/tehima" element={<TehimaScreen />} />
              <Route path="/experience/calligraphy" element={<CalligraphyScreen />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
