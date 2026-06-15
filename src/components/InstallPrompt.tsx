import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("pwa_prompt_dismissed")) return;

    const userAgent = window.navigator.userAgent.toLowerCase();
    
    // Detect iOS (including iPadOS)
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) || 
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
      
    // Detect Android
    const isAndroidDevice = /android/.test(userAgent);

    const isInStandaloneMode = () => {
      // iOS
      if (('standalone' in window.navigator) && (window.navigator as any).standalone) return true;
      // Android / Chrome
      if (window.matchMedia('(display-mode: standalone)').matches) return true;
      return false;
    };

    // Show prompt on mobile if not standalone
    if ((isIosDevice || isAndroidDevice) && !isInStandaloneMode()) {
      setIsAndroid(isAndroidDevice);
      // Slight delay to avoid sudden popup
      setTimeout(() => setShowPrompt(true), 1500);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("pwa_prompt_dismissed", "true");
    setShowPrompt(false);
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 flex justify-center"
          style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 20px))' }}
        >
          <div className="bg-night/95 backdrop-blur-xl border border-parchment/30 rounded-2xl p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] max-w-sm w-full flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-parchment font-medium mb-1 text-sm">Installer Zohar Cards</h3>
              {isAndroid ? (
                <p className="text-xs text-ash/90 leading-relaxed">
                  Pour une expérience plein écran, touchez les <strong className="text-parchment">3 points (⋮)</strong> en haut du navigateur, puis <strong>« Ajouter à l'écran d'accueil »</strong>.
                </p>
              ) : (
                <p className="text-xs text-ash/90 leading-relaxed">
                  Pour une expérience plein écran, touchez l'icône <span className="inline-block px-1 border border-ash/30 rounded bg-white/5 mx-1">Partage</span> en bas de l'écran, puis <strong>« Sur l'écran d'accueil »</strong>.
                </p>
              )}
            </div>
            <button
              onClick={handleDismiss}
              className="text-ash/50 hover:text-parchment transition-colors p-1 bg-white/5 rounded-full"
              aria-label="Fermer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
