import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore, type DrawStyle } from "@/store/useStore";
import { useDrawHistory } from "@/hooks/useApi";
import { HEBREW_FONT_STYLES, type HebrewFontStyle } from "../components/HebrewGlyph";
import { useScrollHint } from "@/hooks/useScrollHint";

// --- LANGUAGE SELECTOR ---
function LanguageSelector({ close }: { close: () => void }) {
  const { t, i18n } = useTranslation();
  
  const options = [
    { id: "fr", label: t('settings.french') },
    { id: "en", label: t('settings.english') },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-night flex flex-col">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-parchment/10">
        <h2 className="text-xl font-medium tracking-tight text-parchment">{t('settings.language')}</h2>
        <button onClick={close} className="w-8 h-8 rounded-full bg-parchment/5 flex items-center justify-center hover:bg-parchment/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </header>
      <div className="flex-1 px-6 py-6 overflow-y-auto space-y-3">
        {options.map(opt => (
          <button key={opt.id} onClick={() => { i18n.changeLanguage(opt.id); close(); }} className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${i18n.language === opt.id ? "bg-parchment/10 border-parchment/30" : "bg-night-light border-parchment/5 hover:border-parchment/20"}`}>
            <span className={`text-sm ${i18n.language === opt.id ? "text-parchment font-medium" : "text-ash"}`}>{opt.label}</span>
            {i18n.language === opt.id && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L6 11L13 4" stroke="#F5F1E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

const DRAW_STYLES: { id: DrawStyle; label: string }[] = [
  { id: "grid", label: "Ordonne (Grille)" },
  { id: "chaos", label: "Chaos" },
  { id: "fan", label: "Eventail" },
  { id: "slider", label: "Slider" },
  { id: "hold", label: "Maintenir" },
];

export function SettingsScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, drawStyle, setDrawStyle, hebrewFont, setHebrewFont } = useStore();
  const { data: drawHistory = [], isLoading } = useDrawHistory();
  const [section, setSection] = useState<"main" | "history" | "plans" | "draw-style" | "hebrew-font" | "language">("main");

  const back = (to: string | (() => void)) => (
    <button onClick={typeof to === "string" ? () => navigate(to) : to} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      
    </button>
  );

  const scrollRef = useScrollHint();

  if (section === "language") return <LanguageSelector close={() => setSection("main")} />;

  if (section === "draw-style") return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-night flex flex-col">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-parchment/10">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-parchment mb-1">{t('settings.style_title')}</h2>
          <p className="text-xs text-ash">{t('settings.style_subtitle')}</p>
        </div>
        <button onClick={() => setSection("main")} className="w-8 h-8 rounded-full bg-parchment/5 flex items-center justify-center hover:bg-parchment/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </header>
      <main ref={scrollRef as any} className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="space-y-2">
          {DRAW_STYLES.map((s) => (
            <button key={s.id} onClick={() => setDrawStyle(s.id)}
              className={`w-full py-3.5 px-4 rounded-xl text-left text-sm transition-all duration-300 flex items-center justify-between ${
                drawStyle === s.id
                  ? "bg-parchment/10 border border-parchment/20 text-parchment"
                  : "bg-night-light border border-parchment/5 text-parchment/70 hover:border-parchment/15"
              }`}
            >
              <span>{s.label}</span>
              {drawStyle === s.id && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </main>
    </motion.div>
  );

  if (section === "hebrew-font") return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-night flex flex-col">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-parchment/10">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-parchment mb-1">{t('settings.font_title')}</h2>
          <p className="text-xs text-ash">{t('settings.font_subtitle')}</p>
        </div>
        <button onClick={() => setSection("main")} className="w-8 h-8 rounded-full bg-parchment/5 flex items-center justify-center hover:bg-parchment/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </header>
      <main ref={scrollRef as any} className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="space-y-2">
          {HEBREW_FONT_STYLES.map((s) => (
            <button key={s.id} onClick={() => setHebrewFont(s.id)}
              className={`w-full py-3.5 px-4 rounded-xl text-left text-sm transition-all duration-300 flex items-center justify-between ${
                hebrewFont === s.id
                  ? "bg-parchment/10 border border-parchment/20 text-parchment"
                  : "bg-night-light border border-parchment/5 text-parchment/70 hover:border-parchment/15"
              }`}
            >
              <span>{s.label}</span>
              {hebrewFont === s.id && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          ))}
        </div>
      </main>
    </motion.div>
  );

  if (section === "history") return (
    <div className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="sticky top-0 z-10 bg-night/95 backdrop-blur-sm px-6 pt-12 pb-3">{back(() => setSection("main"))}</header>
      <main ref={scrollRef as any} className="flex-1 px-6 py-6 overflow-y-auto">
        <h2 className="text-xl font-medium tracking-tight text-parchment mb-6">{t('settings.history_title')}</h2>
        {isLoading ? <p className="text-sm text-ash">{t('common.loading')}</p> : drawHistory.length === 0
          ? <p className="text-sm text-ash">{t('settings.no_history')}</p>
          : <div className="space-y-3">{drawHistory.map((d) => (
            <div key={d.id} className="bg-night-light rounded-xl p-4 border border-parchment/5">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-hebrew text-xl text-parchment">{d.card_1.symbol}</span>
                <span className="text-ash text-sm">+</span>
                <span className="font-hebrew text-xl text-parchment">{d.card_2.symbol}</span>
                <span className="text-[10px] text-ash ml-auto">{new Date(d.created_at).toLocaleDateString("fr-FR")}</span>
              </div>
              <p className="text-xs text-ash">{d.combination.title}</p>
            </div>
          ))}</div>}
      </main>
    </div>
  );

  if (section === "plans") return (
    <div className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="px-6 pt-12 pb-4">{back(() => setSection("main"))}</header>
      <main ref={scrollRef as any} className="flex-1 px-6 py-6 overflow-y-auto">
        <h2 className="text-xl font-medium tracking-tight text-parchment mb-2">{t('settings.plans_title')}</h2>
        <p className="text-sm text-ash mb-8">{t('settings.plans_subtitle')}</p>
        <div className="space-y-3">
          {([
            { id: "free", name: "Gratuit", price: "0", period: "mois", questions: "2", chat: false },
            { id: "light", name: "Light", price: "4.99", period: "mois", questions: "30", chat: false },
            { id: "plus", name: "Plus", price: "9.99", period: "mois", questions: "100", chat: true },
            { id: "unlimited", name: "Illimité", price: "19.99", period: "mois", questions: "∞", chat: true },
          ] as const).map((p) => (
            <div key={p.name} className={`rounded-2xl p-4 border ${user.sub_tier === p.id ? "bg-parchment/5 border-parchment/20" : "bg-night-light border-parchment/5"}`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-parchment">{p.name}</h3>
                {user.sub_tier === p.id && <span className="text-[10px] uppercase text-ash bg-parchment/10 px-2 py-0.5 rounded-full">{t('settings.current_plan')}</span>}
              </div>
              <p className="text-xs text-ash mb-2">{p.price} EUR / {p.period}</p>
              <p className="text-xs text-parchment/70">{t('settings.questions_per_month', { q: p.questions })}</p>
              <p className="text-xs text-parchment/70">{t('settings.ai_chat', { chat: p.chat ? t('settings.yes') : t('settings.no') })}</p>
              {user.sub_tier !== p.id && <button className="mt-3 w-full py-2 border border-parchment/20 text-parchment rounded-full text-xs hover:border-parchment/40 transition-colors">{t('settings.choose_plan')}</button>}
            </div>
          ))}
        </div>
      </main>
    </div>
  );

  return (
    <div ref={scrollRef as any} className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-parchment/10">
        <h1 className="text-2xl font-medium tracking-tight text-parchment">{t('settings.title')}</h1>
        <button onClick={() => navigate("/home")} className="w-8 h-8 rounded-full bg-parchment/5 flex items-center justify-center hover:bg-parchment/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M4 4L12 12" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </header>
      <main className="flex-1 pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <section className="px-6 py-6 border-b border-parchment/5">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-ash/60 mb-6">{t('settings.account')}</h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-parchment/10 flex items-center justify-center"><span className="text-lg text-parchment font-medium">{user.full_name[0]}</span></div>
              <div><p className="text-sm font-medium text-parchment">{user.full_name}</p><p className="text-[11px] text-ash">{user.email}</p></div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 bg-night-light rounded-xl p-4 border border-parchment/5"><p className="text-[10px] uppercase text-ash mb-1">Abonnement</p><p className="text-sm text-parchment capitalize">{user.sub_tier}</p></div>
              <div className="flex-1 bg-night-light rounded-xl p-4 border border-parchment/5"><p className="text-[10px] uppercase text-ash mb-1">Credits</p><p className="text-sm text-parchment">{user.credits}</p></div>
            </div>
          </section>
          <section className="border-b border-parchment/5">
            <button onClick={() => setSection("draw-style")} className="w-full flex items-center justify-between p-6">
                <span className="text-sm text-parchment/80">{t('settings.draw_style')}</span>
                <span className="text-xs text-ash capitalize flex items-center gap-1">{DRAW_STYLES.find((s) => s.id === drawStyle)?.label}<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <button onClick={() => setSection("hebrew-font")} className="w-full flex items-center justify-between p-6">
                <span className="text-sm text-parchment/80">{t('settings.font_style')}</span>
                <span className="text-xs text-ash capitalize flex items-center gap-1">{HEBREW_FONT_STYLES.find((s) => s.id === hebrewFont)?.label}<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <button onClick={() => setSection("language")} className="w-full flex items-center justify-between p-6">
                <span className="text-sm text-parchment/80">{t('settings.language')}</span>
                <span className="text-xs text-ash capitalize flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
          </section>
          <section className="px-6 py-6">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-ash/60 mb-4">{t('settings.actions')}</h2>
            <div className="space-y-2">
              <Btn label={t('settings.history')} onClick={() => setSection("history")} />
              <Btn label={t('settings.plans')} onClick={() => setSection("plans")} />
              <Btn label={t('about.title')} onClick={() => navigate("/about")} />
              <Btn label={t('settings.logout')} onClick={() => navigate("/auth")} muted />
            </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}

function Btn({ label, onClick, muted }: { label: string; onClick: () => void; muted?: boolean }) {
  return <button onClick={onClick} className={`w-full py-3 px-4 bg-night-light border border-parchment/5 rounded-xl text-left text-sm hover:border-parchment/15 transition-colors ${muted ? "text-ash" : "text-parchment"}`}>{label}</button>;
}
