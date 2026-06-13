import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";

const TOTAL_STEPS = 11;

export function TutorialScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { setHasSeenTutorial } = useStore();
  const [step, setStep] = useState(0);

  const fromHome = location.state?.fromHome;

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(s => s + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setHasSeenTutorial();
    navigate(fromHome ? "/home" : "/auth");
  };

  return (
    <div className="h-full flex flex-col bg-night">
      <header className="px-6 pt-12 pb-4 flex items-center relative">
        <div className="flex-1" />
        <h1 className="text-sm tracking-[0.2em] uppercase text-ash font-medium absolute left-1/2 -translate-x-1/2">
          {t('tutorial.title')}
        </h1>
        <div className="flex-1 flex justify-end">
          <button 
            onClick={handleFinish} 
            className="text-xs text-ash/60 hover:text-parchment transition-colors"
          >
            {t('tutorial.skip')}
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center text-center"
          >
            <div className="w-full max-w-[210px] max-h-[40vh] aspect-[3/4] mb-8 relative flex items-center justify-center border border-parchment/15 rounded-2xl p-4 bg-night-light/30">
              <img 
                src={`/tuto/${step + 1}.png`} 
                alt={t(`tutorial.step_${step + 1}_title`)} 
                className="w-full h-full object-contain drop-shadow-2xl rounded-lg"
                draggable={false}
              />
            </div>
            
            <h2 className="text-xl font-medium text-parchment mb-3">
              {t(`tutorial.step_${step + 1}_title`)}
            </h2>
            <p className="text-sm text-ash max-w-[280px] leading-relaxed mb-6">
              {t(`tutorial.step_${step + 1}_desc`)}
            </p>
            <span className="text-[11px] text-ash/50 tracking-widest font-medium">
              {step + 1} / {TOTAL_STEPS}
            </span>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="px-6 pb-12 flex flex-col items-center gap-6">
        <div className="flex gap-3">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <button 
              key={i} 
              onClick={() => setStep(i)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${i === step ? 'bg-parchment' : 'bg-parchment/20 hover:bg-parchment/50'}`} 
              aria-label={`Aller à l'étape ${i + 1}`}
            />
          ))}
        </div>
        
        <button 
          onClick={handleNext} 
          className="w-full max-w-[280px] py-4 bg-parchment text-ink rounded-full text-sm font-medium tracking-wide hover:bg-bone transition-colors duration-300"
        >
          {step === TOTAL_STEPS - 1 ? t('tutorial.finish') : t('tutorial.next')}
        </button>
      </footer>
    </div>
  );
}
