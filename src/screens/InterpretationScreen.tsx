import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";
import { useCurrentDraw } from "@/hooks/useApi";

const fakeAI = `La rencontre de ces deux lettres ouvre un espace de reflexion profond.

La premiere lettre agit comme une impulsion, un mouvement initial qui cherche a se deployer. La seconde lettre offre un cadre, une structure ou cette impulsion peut trouver son expression.

Ensemble, elles dessinent un paysage interieur ou le potentiel rencontre la forme. Ce n'est ni une reponse ni une direction — c'est un miroir.

L'espace entre ces deux forces est un lieu de contemplation. Il vous appartient d'y lire ce que votre regard y depose.`;

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function InterpretationScreen() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data: currentDraw } = useCurrentDraw();
  const { user, markJourneyStep } = useStore();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markJourneyStep("interpretation");
  }, [markJourneyStep]);

  useEffect(() => {
    // Initialize the first AI message only once
    if (messages.length === 0 && currentDraw) {
      setMessages([
        {
          id: "msg-0",
          role: "assistant",
          content: i18n.language === 'en' ? '[EN] The encounter of these two letters opens a space for deep reflection...\n\n(Placeholder)' : fakeAI
        }
      ]);
    }
  }, [currentDraw, messages.length, i18n.language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!currentDraw) { navigate("/home"); return null; }

  if (user.credits < 3) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-night px-6 gap-6">
        <p className="text-sm text-ash text-center max-w-[280px] leading-relaxed">
          {t('interpretation.no_credits', 'Il vous faut au moins 3 crédits pour obtenir une interprétation personnelle profonde.')}
        </p>
        <div className="w-full max-w-[240px] flex flex-col gap-3">
          <button onClick={() => navigate("/settings")} className="w-full py-4 border border-parchment/20 text-parchment rounded-full text-sm hover:border-parchment/40 transition-colors">
            {t('interpretation.buy_credits', 'Acheter des crédits')}
          </button>
          <button onClick={() => navigate("/home")} className="w-full py-3 text-ash text-sm hover:text-parchment transition-colors">
            {t('interpretation.home_btn', 'Retour à l\'accueil')}
          </button>
        </div>
      </div>
    );
  }

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputText.trim()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputText("");
    
    // Fake AI response delay for prototype
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Je comprends. L'impulsion de cette combinaison vous invite à regarder au-delà de l'évidence. Comment cela résonne-t-il avec ce que vous traversez actuellement ?"
      }]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-night relative">
      <header className="flex-none bg-night/95 backdrop-blur-sm px-6 pt-12 pb-4 border-b border-parchment/5 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/reading")} className="text-sm text-ash hover:text-parchment transition-colors flex items-center justify-center w-8 h-8 rounded-full bg-parchment/5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div>
            <h2 className="text-sm font-medium text-parchment leading-tight">{currentDraw.combination.title}</h2>
            <p className="text-[10px] uppercase tracking-wider text-ash/60">{t('interpretation.subtitle', 'Interprétation')}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 scroll-smooth">
        <div className="flex flex-col gap-6">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-parchment/10 text-parchment rounded-br-sm' 
                    : 'bg-night-light border border-parchment/5 text-parchment/90 rounded-bl-sm'
                }`}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </main>

      {/* FIXED BOTTOM BAR */}
      <div className="flex-none bg-night border-t border-parchment/5 px-4 pt-3 pb-8">
        {/* Action Buttons above input */}
        <div className="flex justify-center gap-3 mb-3">
          <button 
            onClick={() => navigate("/support-letter")} 
            className="flex-[2] py-2.5 bg-parchment text-ink rounded-full text-[12px] uppercase tracking-wider font-semibold hover:bg-bone transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {t('interpretation.support_btn', 'Lettre de soutien')}
          </button>
          <button 
            onClick={() => navigate("/home")} 
            className="flex-[1] py-2.5 bg-transparent border border-parchment/10 text-ash rounded-full text-[11px] uppercase tracking-wider hover:text-parchment hover:border-parchment/30 transition-all flex items-center justify-center gap-2"
          >
            {t('common.close_draw', 'Clore')}
          </button>
        </div>

        {/* Input Area */}
        <div className="relative flex items-end gap-2 bg-night-light border border-parchment/10 rounded-2xl p-2 focus-within:border-parchment/25 transition-colors">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Écrivez votre message..."
            className="flex-1 max-h-[120px] min-h-[40px] bg-transparent text-sm text-parchment placeholder:text-ash/40 resize-none py-2 px-2 focus:outline-none"
            rows={1}
            style={{ height: "auto" }}
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-xl bg-parchment/10 text-parchment flex items-center justify-center disabled:opacity-30 disabled:bg-transparent transition-all shrink-0 mb-0.5"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
