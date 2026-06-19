import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore, type DrawStyle } from "@/store/useStore";
import { useDrawHistory } from "@/hooks/useApi";
import { type PersonalInfo } from "@/services/profileApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { openrouterApi } from "@/services/openrouterApi";
import { HEBREW_FONT_STYLES, type HebrewFontStyle } from "../components/HebrewGlyph";
import { useScrollHint } from "@/hooks/useScrollHint";
import { APP_VERSION } from "@/version";
import { FaqSection } from "@/components/FaqSection";

// --- LANGUAGE SELECTOR ---
function LanguageSelector({ close }: { close: () => void }) {
  const { t, i18n } = useTranslation();
  const setAppLanguage = useStore(state => state.setAppLanguage);
  
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
          <button key={opt.id} onClick={() => { setAppLanguage(opt.id); i18n.changeLanguage(opt.id); close(); }} className={`w-full p-4 rounded-xl border flex items-center justify-between transition-colors ${i18n.language === opt.id ? "bg-parchment/10 border-parchment/30" : "bg-night-light border-parchment/5 hover:border-parchment/20"}`}>
            <span className={`text-sm ${i18n.language === opt.id ? "text-parchment font-medium" : "text-ash"}`}>{opt.label}</span>
            {i18n.language === opt.id && <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L6 11L13 4" stroke="#F5F1E8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// --- PERSONAL INFO FORM ---
function PersonalInfoForm({ close }: { close: () => void }) {
  const { t } = useTranslation();
  const { personalInfo, setPersonalInfo } = useStore();
  const [formData, setFormData] = useState<PersonalInfo>(personalInfo || {});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPersonalInfo(formData);
    close();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-night flex flex-col">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-parchment/10">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-parchment mb-1">{t('settings.personal.title', 'Personnel')}</h2>
          <p className="text-xs text-ash">{t('settings.personal.subtitle', 'Facultatif')}</p>
        </div>
        <button onClick={close} className="w-8 h-8 rounded-full bg-parchment/5 flex items-center justify-center hover:bg-parchment/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </header>
      <main className="flex-1 px-6 py-6 overflow-y-auto overflow-x-hidden pb-20">
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-[10px] text-parchment/70 uppercase tracking-wider">{t('settings.personal.gender', 'Genre')}</label>
            <select 
              value={formData.gender || ""} 
              onChange={e => setFormData({ ...formData, gender: e.target.value })}
              className="block w-full appearance-none m-0 bg-night-light border border-parchment/10 rounded-xl px-4 py-3 text-base text-parchment focus:outline-none focus:border-parchment/30"
            >
              <option value="">{t('settings.personal.gender_none', 'Non défini')}</option>
              <option value="male">{t('settings.personal.gender_male', 'Homme')}</option>
              <option value="female">{t('settings.personal.gender_female', 'Femme')}</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-parchment/70 uppercase tracking-wider">{t('settings.personal.birthDate', 'Date de naissance')}</label>
            <input 
              type="date" 
              value={formData.birthDate || ""} 
              onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
              className="block w-full appearance-none m-0 bg-night-light border border-parchment/10 rounded-xl px-4 py-3 text-base text-parchment focus:outline-none focus:border-parchment/30"
              style={{ colorScheme: 'dark' }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-parchment/70 uppercase tracking-wider">{t('settings.personal.childrenCount', 'Nombre d\'enfants')}</label>
            <input 
              type="number" 
              min="0" max="9"
              value={formData.childrenCount ?? ""} 
              onChange={e => setFormData({ ...formData, childrenCount: e.target.value ? parseInt(e.target.value) : undefined })}
              className="block w-full appearance-none m-0 bg-night-light border border-parchment/10 rounded-xl px-4 py-3 text-base text-parchment focus:outline-none focus:border-parchment/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-parchment/70 uppercase tracking-wider">{t('settings.personal.profession', 'Profession')}</label>
            <input 
              type="text" 
              value={formData.profession || ""} 
              onChange={e => setFormData({ ...formData, profession: e.target.value })}
              placeholder={t('settings.personal.profession_ph', 'Ex: Designer...')}
              className="block w-full appearance-none m-0 bg-night-light border border-parchment/10 rounded-xl px-4 py-3 text-base text-parchment placeholder-ash focus:outline-none focus:border-parchment/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-parchment/70 uppercase tracking-wider">{t('settings.personal.maritalStatus', 'Statut marital')}</label>
            <input 
              type="text" 
              value={formData.maritalStatus || ""} 
              onChange={e => setFormData({ ...formData, maritalStatus: e.target.value })}
              placeholder={t('settings.personal.maritalStatus_ph', 'Ex: Célibataire...')}
              className="block w-full appearance-none m-0 bg-night-light border border-parchment/10 rounded-xl px-4 py-3 text-base text-parchment placeholder-ash focus:outline-none focus:border-parchment/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-parchment/70 uppercase tracking-wider">{t('settings.personal.freeText', 'Dites-nous en plus librement')}</label>
            <textarea 
              value={formData.freeText || ""} 
              onChange={e => setFormData({ ...formData, freeText: e.target.value })}
              rows={4}
              placeholder={t('settings.personal.freeText_ph', 'Détails libres...')}
              className="block w-full appearance-none m-0 bg-night-light border border-parchment/10 rounded-xl px-4 py-3 text-base text-parchment placeholder-ash focus:outline-none focus:border-parchment/30 resize-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 mt-6 bg-parchment/10 text-parchment rounded-xl font-medium hover:bg-parchment/20 transition-colors border border-parchment/20"
          >
            {t('settings.personal.save', 'Enregistrer')}
          </button>
        </form>
      </main>
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
  const { t, i18n } = useTranslation();
  const { user, drawStyle, setDrawStyle, hebrewFont, setHebrewFont, aiModel, setAiModel } = useStore();
  const { data: drawHistory = [], isLoading } = useDrawHistory();
  const [section, setSection] = useState<"main" | "history" | "plans" | "draw-style" | "hebrew-font" | "language" | "ai-model" | "gift-code" | "personal" | "faq">("main");
  const [giftCode, setGiftCode] = useState("");
  const [giftCodeMessage, setGiftCodeMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isSubmittingGiftCode, setIsSubmittingGiftCode] = useState(false);
  const [expandedDrawId, setExpandedDrawId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const handleCheckUpdate = async () => {
    try {
      const res = await fetch('/version.json?t=' + Date.now(), { cache: 'no-store' });
      const data = await res.json();
      if (data && data.version && data.version !== APP_VERSION) {
        useStore.getState().setHasUpdateAvailable(data.version);
      } else {
        alert(t('settings.up_to_date', 'L\'application est déjà à jour.'));
      }
    } catch (e) {
      console.error("Version check failed", e);
    }
  };

  const { data: spending } = useQuery({
    queryKey: ["openrouter-spending"],
    queryFn: openrouterApi.getSpending,
    enabled: user?.role === "admin" || user?.role === "contrib",
  });

  const { data: models = [] } = useQuery({
    queryKey: ["openrouter-models"],
    queryFn: openrouterApi.getAvailableModels,
    enabled: user?.role === "admin" || user?.role === "contrib",
  });

  const back = (to: string | (() => void)) => (
    <button onClick={typeof to === "string" ? () => navigate(to) : to} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      
    </button>
  );

  const scrollRef = useScrollHint();

  if (section === "personal") return <PersonalInfoForm close={() => setSection("main")} />;
  if (section === "language") return <LanguageSelector close={() => setSection("main")} />;
  if (section === "faq") return <FaqSection close={() => setSection("main")} />;

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

  if (section === "ai-model") return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-night flex flex-col">
      <header className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-parchment/10">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-parchment mb-1">{t('settings.model_title', 'Modèle IA')}</h2>
          <p className="text-xs text-ash">{t('settings.model_subtitle', 'Choisissez le moteur')}</p>
        </div>
        <button onClick={() => setSection("main")} className="w-8 h-8 rounded-full bg-parchment/5 flex items-center justify-center hover:bg-parchment/10 transition-colors">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </header>
      <main ref={scrollRef as any} className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="space-y-2">
          {models.map((m) => (
            <button key={m.id} onClick={() => setAiModel(m.id)}
              className={`w-full py-3.5 px-4 rounded-xl text-left text-sm transition-all duration-300 flex flex-col ${
                aiModel === m.id
                  ? "bg-parchment/10 border border-parchment/20 text-parchment"
                  : "bg-night-light border border-parchment/5 text-parchment/70 hover:border-parchment/15"
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span className="font-medium">{m.name}</span>
                {aiModel === m.id && (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-[10px] text-ash/60 font-mono">
                ${(parseFloat(m.pricing.prompt) * 1000000).toFixed(2)}/1M in | ${(parseFloat(m.pricing.completion) * 1000000).toFixed(2)}/1M out
              </span>
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
        {isLoading ? (
          <div className="flex items-center justify-center py-10">
            <span className="w-6 h-6 rounded-full border-2 border-parchment/20 border-t-parchment animate-spin"></span>
          </div>
        ) : drawHistory.length === 0
          ? <p className="text-sm text-ash">{t('settings.no_history')}</p>
          : <div className="space-y-4">{drawHistory.map((d) => {
              const dDate = new Date(d.created_at);
              return (
                <div key={d.id} className="bg-night-light rounded-xl p-4 border border-parchment/5 flex flex-col gap-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-hebrew text-xl text-parchment">{d.card_1.symbol}</span>
                      <span className="text-ash text-sm">+</span>
                      <span className="font-hebrew text-xl text-parchment">{d.card_2.symbol}</span>
                      <div className="text-[10px] text-ash ml-auto text-right">
                        <div>{dDate.toLocaleDateString()}</div>
                        <div>{dDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      </div>
                    </div>
                    <div className="flex items-start justify-between gap-2 mt-2">
                      <p className="text-xs text-ash/80 leading-relaxed font-medium">{d.combination.title}</p>
                      <button 
                        onClick={() => setExpandedDrawId(expandedDrawId === d.id ? null : d.id)}
                        className="flex-shrink-0 w-5 h-5 rounded-md border border-parchment/20 flex items-center justify-center text-parchment hover:bg-parchment/10 transition-colors"
                      >
                        {expandedDrawId === d.id ? (
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : (
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        )}
                      </button>
                    </div>
                    {expandedDrawId === d.id && d.combination.content_medium && (
                      <div className="mt-3 p-3 bg-night/50 rounded-lg border border-parchment/5">
                        <p className="text-xs text-ash leading-relaxed">
                          {d.combination.content_medium}
                        </p>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      queryClient.setQueryData(['currentDraw', i18n.language], d);
                      navigate("/reading");
                    }}
                    className="self-start text-[11px] text-parchment/70 bg-parchment/5 hover:bg-parchment/10 py-1.5 px-3 rounded-lg transition-colors border border-parchment/10 flex items-center gap-1.5 mt-1"
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 14A6 6 0 1 0 2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M2 3V8H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {t('settings.reanalyze_btn')}
                  </button>
                </div>
              );
            })}</div>}
      </main>
    </div>
  );



  const handleGiftCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftCode.trim() || isSubmittingGiftCode) return;
    
    setIsSubmittingGiftCode(true);
    setGiftCodeMessage(null);
    
    try {
      const result = await useStore.getState().applyGiftCode(giftCode);
      setGiftCodeMessage({
        type: result.success ? 'success' : 'error',
        text: t(result.messageKey, { count: result.count })
      });
      if (result.success) {
        setGiftCode("");
      }
    } finally {
      setIsSubmittingGiftCode(false);
    }
  };

  if (section === "gift-code") return (
    <div className="h-full flex flex-col bg-night overflow-y-auto">
      <header className="px-6 pt-12 pb-4">{back(() => { setSection("main"); setGiftCodeMessage(null); setGiftCode(""); })}</header>
      <main ref={scrollRef as any} className="flex-1 px-6 py-6 overflow-y-auto">
        <h2 className="text-xl font-medium tracking-tight text-parchment mb-6">{t('settings.gift_code_label')}</h2>
        
        <form onSubmit={handleGiftCodeSubmit} className="space-y-4">
          <div>
            <input 
              type="text" 
              value={giftCode}
              onChange={(e) => setGiftCode(e.target.value)}
              placeholder={t('settings.gift_code_placeholder')}
              disabled={isSubmittingGiftCode}
              className="block w-full appearance-none m-0 bg-night-light border border-parchment/10 rounded-xl px-4 py-3 text-parchment placeholder-ash focus:outline-none focus:border-parchment/30 transition-colors uppercase disabled:opacity-50"
            />
          </div>
          <button 
            type="submit"
            disabled={isSubmittingGiftCode}
            className="w-full py-3 bg-parchment/10 text-parchment rounded-xl font-medium hover:bg-parchment/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-12"
          >
            {isSubmittingGiftCode ? <span className="w-5 h-5 rounded-full border-2 border-parchment/20 border-t-parchment animate-spin"></span> : t('settings.gift_code_submit')}
          </button>
          
          {giftCodeMessage && (
            <div className={`mt-4 p-4 rounded-xl text-sm ${giftCodeMessage.type === 'success' ? 'bg-green-900/20 text-green-400 border border-green-900/50' : 'bg-red-900/20 text-red-400 border border-red-900/50'}`}>
              {giftCodeMessage.text}
            </div>
          )}
        </form>
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
          <section className="px-6 py-4 border-b border-parchment/5">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-ash/60 mb-4">{t('settings.account')}</h2>
            <div className="bg-night-light border border-parchment/10 rounded-2xl p-4 flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-parchment/10 flex items-center justify-center"><span className="text-lg text-parchment font-medium">{user ? user.name?.[0]?.toUpperCase() : '?'}</span></div>
              <div><p className="text-sm font-medium text-parchment">{user ? user.name : "Invité"}</p><p className="text-[11px] text-ash">{user ? user.email : "Non connecté"}</p></div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => navigate("/subscription")} className="flex-1 text-left bg-night-light rounded-xl p-4 border border-parchment/5 hover:bg-parchment/10 transition-colors">
                <p className="text-[10px] uppercase text-ash mb-1">Abonnement</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-parchment capitalize">{user ? user.sub_tier : "Gratuit"}</p>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-ash"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </button>
              <div className="flex-1 bg-night-light rounded-xl p-4 border border-parchment/5"><p className="text-[10px] uppercase text-ash mb-1">Credits</p><p className="text-sm text-parchment">{user ? user.credits : 0}</p></div>
            </div>
          </section>
          <section className="border-b border-parchment/5">
            <button onClick={() => setSection("draw-style")} className="w-full flex items-center justify-between p-4">
                <span className="text-sm text-parchment/80">{t('settings.draw_style')}</span>
                <span className="text-xs text-ash capitalize flex items-center gap-1">{DRAW_STYLES.find((s) => s.id === drawStyle)?.label}<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <button onClick={() => setSection("hebrew-font")} className="w-full flex items-center justify-between p-4">
                <span className="text-sm text-parchment/80">{t('settings.font_style')}</span>
                <span className="text-xs text-ash capitalize flex items-center gap-1">{HEBREW_FONT_STYLES.find((s) => s.id === hebrewFont)?.label}<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <button onClick={() => setSection("language")} className="w-full flex items-center justify-between p-4 border-b border-parchment/5">
                <span className="text-sm text-parchment/80">{t('settings.language')}</span>
                <span className="text-xs text-ash capitalize flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <button onClick={() => setSection("personal")} className="w-full flex items-center justify-between p-4 border-b border-parchment/5">
                <div className="flex flex-col items-start">
                  <span className="text-sm text-parchment/80">{t('settings.personal.title', 'Personnel')}</span>
                  <span className="text-[10px] text-ash/60">{t('settings.personal.subtitle', 'Facultatif')}</span>
                </div>
                <span className="text-xs text-ash flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <button onClick={() => setSection("faq")} className="w-full flex items-center justify-between p-4">
                <div className="flex flex-col items-start">
                  <span className="text-sm text-parchment/80">{t('faq.title', 'Aide & FAQ')}</span>
                  <span className="text-[10px] text-ash/60">Questions fréquentes</span>
                </div>
                <span className="text-xs text-ash flex items-center gap-1"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
          </section>

          {(user?.role === "admin" || user?.role === "contrib") && (
            <section className="px-6 py-4 border-b border-parchment/5">
              <h2 className="text-[11px] tracking-[0.2em] uppercase text-ash/60 mb-4">{t('settings.admin_title', 'Administration')}</h2>
              
              <div className="bg-night-light border border-parchment/10 rounded-2xl p-4 flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-parchment font-medium mb-1">OpenRouter API</p>
                  <p className="text-xs text-ash">
                    {t('settings.spent', 'Dépenses')}: <span className="text-parchment">${spending?.usage.toFixed(4) || "0.0000"}</span> / ${spending?.limit || "0"}
                  </p>
                </div>
              </div>

              {user?.role === "admin" && (
                <button onClick={() => setSection("ai-model")} className="w-full flex items-center justify-between p-4 bg-night-light border border-parchment/5 rounded-xl hover:border-parchment/15 transition-colors">
                  <span className="text-sm text-parchment/80">{t('settings.model_title', 'Modèle IA')}</span>
                  <span className="text-xs text-ash truncate max-w-[150px] flex items-center gap-1">
                    {models.find(m => m.id === aiModel)?.name || aiModel.split('/').pop()}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </button>
              )}
            </section>
          )}

          <section className="px-6 py-4">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-ash/60 mb-4">{t('settings.actions')}</h2>
            <div className="space-y-2">
              {user && <Btn label={t('settings.gift_code_btn')} onClick={() => setSection("gift-code")} />}
              {user && <Btn label={t('settings.history')} onClick={() => setSection("history")} />}
              {user && <Btn label={t('settings.plans')} onClick={() => navigate("/subscription")} />}
              <Btn label={t('settings.update_btn', { version: APP_VERSION })} onClick={handleCheckUpdate} />
              <Btn label={t('about.title')} onClick={() => navigate("/about")} />
              <Btn 
                label={user ? t('settings.logout', 'Déconnexion') : t('auth.login_btn', 'Se connecter')} 
                onClick={() => {
                  if (user) {
                    useStore.getState().logout();
                  }
                  navigate("/auth");
                }} 
                muted 
              />
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
