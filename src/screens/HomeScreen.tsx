import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/useStore";
import { useTranslation } from "react-i18next";

export function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useStore();
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col bg-night">
      <header className="flex items-center justify-between px-6 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-parchment/10 flex items-center justify-center">
            <span className="text-xs text-parchment font-medium">{user.full_name[0]}</span>
          </div>
          <span className="text-[11px] text-ash">{t('common.credits_left', { count: user.credits })}</span>
        </div>
        <button onClick={() => navigate("/settings")} className="w-8 h-8 rounded-full bg-parchment/5 flex items-center justify-center hover:bg-parchment/10 transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="#8E8E93" strokeWidth="1.2"/><path d="M8 2v2M8 12v2M2 8h2M12 8h2" stroke="#8E8E93" strokeWidth="1.2" strokeLinecap="round"/></svg>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 gap-12">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-center">
          <h1 className="text-3xl font-medium tracking-tight text-parchment mb-3">{t('home.title')}</h1>
          <p className="text-sm text-ash max-w-[220px] mx-auto leading-relaxed">{t('home.subtitle')}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col items-center gap-4 w-full max-w-[280px]">
          <button onClick={() => { useStore.getState().resetJourney(); navigate("/draw"); }} className="w-full py-4 bg-parchment text-ink rounded-full text-sm font-medium tracking-wide hover:bg-bone transition-colors duration-300">
            {t('home.draw_btn')}
          </button>
          <button onClick={() => navigate("/letter-of-day")} className="w-full py-4 border border-parchment/20 text-parchment rounded-full text-sm tracking-wide hover:border-parchment/40 transition-colors duration-300">
            {t('home.letter_btn')}
          </button>
        </motion.div>
      </main>

      <footer className="px-6 pb-8 flex justify-center gap-8">
        <button onClick={() => navigate("/auth")} className="text-xs text-ash hover:text-parchment transition-colors">{t('home.login')}</button>
        <button onClick={() => navigate("/settings")} className="text-xs text-ash hover:text-parchment transition-colors">{t('home.settings')}</button>
      </footer>
    </div>
  );
}
