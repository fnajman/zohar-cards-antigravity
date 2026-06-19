import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useScrollHint } from "@/hooks/useScrollHint";

export function AboutScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const scrollRef = useScrollHint();

  return (
    <div ref={scrollRef as any} className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="px-6 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </header>

      <main className="flex-1 px-6 pb-12 flex flex-col justify-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-parchment/5 border border-parchment/10 flex items-center justify-center">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-60">
              <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#F5F1E8" />
            </svg>
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-parchment mb-6">{t('about.title')}</h1>
          <p className="text-sm text-ash/80 leading-relaxed text-justify mb-10">
            {t('about.content')}
          </p>

          <div className="pt-8 border-t border-parchment/10">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border border-parchment/20">
              <img 
                src="/images/photo-franck-lalou.jpg" 
                alt="Frank Lalou" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
            <p className="text-sm text-ash/80 leading-relaxed text-center italic mb-4">
              {t('about.frank_lalou')}
            </p>
            <a href="https://lalou.devfree.fr/" target="_blank" rel="noopener noreferrer" className="text-sm text-parchment/80 hover:text-parchment transition-colors underline block text-center">
              https://lalou.devfree.fr/
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
