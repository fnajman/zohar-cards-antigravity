import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCurrentDraw } from "@/hooks/useApi";

export function ExperienceMenuScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: currentDraw } = useCurrentDraw();

  const options = [
    {
      id: "meditation",
      title: t('experience.meditation'),
      desc: t('experience.meditation_desc'),
      path: "/experience/meditation",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M8 12h8"/>
          <path d="M12 8v8"/>
        </svg>
      ),
    },
    {
      id: "tehima",
      title: t('experience.tehima'),
      desc: t('experience.tehima_desc'),
      path: "/experience/tehima",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2"/>
          <path d="M5 11l7-2 7 2"/>
          <path d="M12 9v7"/>
          <path d="M9 22l3-6 3 6"/>
        </svg>
      ),
    },
    {
      id: "calligraphy",
      title: t('experience.calligraphy'),
      desc: t('experience.calligraphy_desc'),
      path: "/experience/calligraphy",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 L16.5 3.5z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="px-6 pt-12 pb-4">
        <button onClick={() => navigate("/support-letter")} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {t('common.back')}
        </button>
      </header>

      <main className="flex-1 px-6 pb-8 flex flex-col">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="text-center mb-10">
            <h1 className="text-2xl font-medium tracking-tight text-parchment mb-2">{t('experience.title')}</h1>
            {currentDraw && (
              <p className="text-sm text-ash">
                {currentDraw.card_1.name}
              </p>
            )}
          </div>

          <div className="space-y-4">
            {options.map((opt, i) => (
              <motion.button
                key={opt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                onClick={() => navigate(opt.path)}
                className="w-full text-left p-5 rounded-2xl bg-night-light border border-parchment/5 hover:border-parchment/20 hover:bg-parchment/[0.03] transition-all group flex gap-5 items-start"
              >
                <div className="text-parchment/60 mt-0.5 group-hover:text-parchment transition-colors">{opt.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-parchment mb-2 group-hover:text-parchment/90">{opt.title}</h3>
                  <p className="text-sm text-ash leading-relaxed">{opt.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8">
            <button onClick={() => navigate("/home")} className="w-full py-4 bg-transparent border border-parchment/20 text-parchment rounded-full text-sm font-medium hover:bg-parchment/5 transition-colors">
              {t('support.back_btn')}
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
