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
    },
    {
      id: "tehima",
      title: t('experience.tehima'),
      desc: t('experience.tehima_desc'),
      path: "/experience/tehima",
    },
    {
      id: "calligraphy",
      title: t('experience.calligraphy'),
      desc: t('experience.calligraphy_desc'),
      path: "/experience/calligraphy",
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
                className="w-full text-left p-5 rounded-2xl bg-night-light border border-parchment/5 hover:border-parchment/20 hover:bg-parchment/[0.03] transition-all group"
              >
                <h3 className="text-lg font-medium text-parchment mb-2 group-hover:text-parchment/90">{opt.title}</h3>
                <p className="text-sm text-ash leading-relaxed">{opt.desc}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
