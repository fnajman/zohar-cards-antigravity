import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if the prompt was already dismissed
    if (localStorage.getItem("pwa_prompt_dismissed")) {
      return;
    }

    // Detect iOS
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    };

    // Detect if already installed / running in standalone mode
    const isInStandaloneMode = () => {
      return ('standalone' in window.navigator) && (window.navigator as any).standalone;
    };

    // Show prompt only on iOS Safari if not in standalone
    if (isIos() && !isInStandaloneMode()) {
      setShowPrompt(true);
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
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 flex justify-center pb-8"
        >
          <div className="bg-night/90 backdrop-blur-xl border border-parchment/20 rounded-2xl p-4 shadow-2xl shadow-black/80 max-w-sm w-full flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-parchment font-medium mb-1 text-sm">Installer l'application</h3>
              <p className="text-xs text-ash/80 leading-relaxed">
                Pour une expérience plein écran, touchez l'icône <span className="inline-block px-1 border border-ash/30 rounded bg-white/5 mx-1">Partage</span> en bas de l'écran, puis <strong>« Sur l'écran d'accueil »</strong>.
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="text-ash/50 hover:text-parchment transition-colors p-1"
              aria-label="Fermer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
