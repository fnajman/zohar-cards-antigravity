import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRegisterSW } from "virtual:pwa-register/react";
import { useStore } from "@/store/useStore";
import { APP_VERSION } from "@/version";

export function UpdatePopup() {
  const { t } = useTranslation();
  const [newVersion, setNewVersion] = useState<string | null>(null);
  const hasUpdateAvailable = useStore(state => state.hasUpdateAvailable);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r: ServiceWorkerRegistration | undefined) {
      // Periodic check for updates every 1 minute
      if (r) {
        setInterval(() => {
          r.update();
        }, 60 * 1000);
      }
    }
  });

  useEffect(() => {
    if (needRefresh) {
      // Fetch the new version when an update is detected
      fetch('/version.json?t=' + Date.now())
        .then(res => res.json())
        .then(data => {
          if (data && data.version) {
            setNewVersion(data.version);
          }
        })
        .catch(err => console.error("Could not fetch new version", err));
    }
  }, [needRefresh]);

  const handleUpdate = async () => {
    // 1. Reset user journey and logout (hard restart)
    useStore.getState().logout();
    useStore.getState().resetJourney();
    
    // 2. Apply update and reload
    if (needRefresh) {
      updateServiceWorker(true);
    } else {
      // Manual bypass if SW update event hasn't fired yet
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        for (const reg of regs) {
          await reg.unregister();
        }
      }
    }

    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleClose = () => {
    setNeedRefresh(false);
    useStore.getState().setHasUpdateAvailable(null);
  };

  const showPopup = needRefresh || !!hasUpdateAvailable;
  const displayVersion = newVersion || hasUpdateAvailable;

  return (
    <AnimatePresence>
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-night/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="w-full max-w-sm bg-night-light border border-parchment/10 p-6 rounded-2xl shadow-2xl flex flex-col items-center text-center"
          >
            <div className="w-12 h-12 rounded-full bg-parchment/10 flex items-center justify-center text-parchment mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
            </div>
            
            <h3 className="text-lg font-medium text-parchment mb-2">
              {t('update.title', 'Nouvelle version disponible')}
            </h3>
            
            <p className="text-sm text-ash mb-2 leading-relaxed">
              {t('update.desc', 'Une nouvelle version de l\'application est en ligne. Voulez-vous la recharger maintenant ?')}
            </p>

            <div className="text-xs text-parchment/60 font-mono tracking-wider mb-6 bg-night px-3 py-1.5 rounded-lg border border-parchment/5">
              {APP_VERSION} {displayVersion ? `-> ${displayVersion}` : ''}
            </div>

            <div className="flex gap-3 w-full">
              <button 
                onClick={handleClose}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-medium text-ash border border-parchment/10 hover:bg-parchment/5 hover:text-parchment transition-colors"
              >
                {t('update.later', 'Plus tard')}
              </button>
              <button 
                onClick={handleUpdate}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-medium bg-parchment text-ink hover:bg-bone transition-colors"
              >
                {t('update.reload', 'Recharger')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
