import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const text = `Cher voyageur,

Ce que vous avez traverse aujourd'hui n'appelle ni resolution ni conclusion.

Les lettres ne demandent rien. Elles ne promettent rien. Elles tiennent un espace — un espace que vous avez accepte de regarder.

Il n'y a rien a atteindre. Il n'y a rien a corriger. Ce qui s'est ouvert reste ouvert aussi longtemps que vous le souhaitez.

Prenez le temps de laisser ces symboles reposer en vous. Ils travailleront a leur rythme, sans votre effort.

Le silence qui suit est aussi precieux que les mots qui l'ont precede.`;

export function SupportLetterScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="px-6 pt-12 pb-4">
        <button onClick={() => navigate(-1)} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {t('common.back')}
        </button>
      </header>

      <main className="flex-1 px-6 pb-8 flex flex-col">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex-1">
          <div className="text-center mb-6">
            <p className="text-[11px] tracking-[0.2em] uppercase text-ash mb-2">{t('support.title')}</p>
            <div className="w-8 h-px bg-parchment/20 mx-auto" />
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
            className="bg-parchment/[0.03] rounded-2xl p-6 border border-parchment/5">
            <p className="text-sm text-parchment/85 leading-[1.9] whitespace-pre-line font-light">{text}</p>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-8">
          <button onClick={() => navigate("/home")} className="w-full py-4 bg-parchment/5 text-parchment rounded-full text-sm font-medium hover:bg-parchment/10 transition-colors">
            {t('support.back_btn')}
          </button>
        </motion.div>
      </main>
    </div>
  );
}
