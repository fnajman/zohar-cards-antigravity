import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore, type Message } from "@/store/useStore";
import { useCurrentDraw } from "@/hooks/useApi";
import { getAiResponse, getAiResponseStream, ChatMessage } from "@/services/aiService";

const fakeAI = `La rencontre de ces deux lettres ouvre un espace de reflexion profond.

La premiere lettre agit comme une impulsion, un mouvement initial qui cherche a se deployer. La seconde lettre offre un cadre, une structure ou cette impulsion peut trouver son expression.

Ensemble, elles dessinent un paysage interieur ou le potentiel rencontre la forme. Ce n'est ni une reponse ni une direction — c'est un miroir.

L'espace entre ces deux forces est un lieu de contemplation. Il vous appartient d'y lire ce que votre regard y depose.`;



export function InterpretationScreen() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { data: currentDraw } = useCurrentDraw();
  const { user, markJourneyStep, currentQuestion } = useStore();
  
  const chatMessages = useStore(s => s.chatMessages);
  const setChatMessages = useStore(s => s.setChatMessages);
  const messages = chatMessages;
  const setMessages = setChatMessages;
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markJourneyStep("interpretation");
  }, [markJourneyStep]);

  useEffect(() => {
    const initChat = async () => {
      if (messages.length === 0 && currentDraw && !isTyping) {
        setIsTyping(true);
        try {
          const stream = await getAiResponseStream(
            currentDraw,
            currentQuestion,
            currentDraw.selected_keywords || [],
            [],
            i18n.language
          );
          
          setIsTyping(false);
          let fullResponse = "";
          setMessages([{ id: "msg-0", role: "assistant", content: "" }]);

          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              fullResponse += content;
              setMessages([{ id: "msg-0", role: "assistant", content: fullResponse }]);
              // Artificial delay for a more natural typing rhythm
              await new Promise(r => setTimeout(r, 25));
            }
          }

          setMessages(prev => [
            ...prev,
            { 
              id: "msg-0-action", 
              role: "system", 
              content: t('interpretation.followup_text', "Vous pouvez continuer à dialoguer avec moi, ou découvrir votre Lettre de soutien et ses exercices d'intégration quand vous serez prêt(e)."),
              action: "support-letter"
            }
          ]);
        } catch (error) {
          console.error(error);
          setMessages([
            { id: "msg-0", role: "assistant", content: i18n.language === 'en' ? '[EN] The encounter of these two letters opens a space for deep reflection...\n\n(Placeholder)' : fakeAI },
            { 
              id: "msg-0-action", 
              role: "system", 
              content: t('interpretation.followup_text', "Vous pouvez continuer à dialoguer avec moi, ou découvrir votre Lettre de soutien et ses exercices d'intégration quand vous serez prêt(e)."),
              action: "support-letter"
            }
          ]);
        } finally {
          setIsTyping(false);
        }
      }
    };
    initChat();
  }, [currentDraw, messages.length, i18n.language, currentQuestion]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!currentDraw) { navigate("/home"); return null; }

  if (user && user.credits < 3) {
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

  const handleSend = async () => {
    if (!inputText.trim() || !currentDraw || isTyping) return;
    
    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputText.trim()
    };
    
    // Create the updated history locally to pass it to the API
    const newHistory = [...messages, newUserMsg];
    setMessages(newHistory);
    setInputText("");
    setIsTyping(true);
    
    try {
      const stream = await getAiResponseStream(
        currentDraw,
        currentQuestion,
        currentDraw.selected_keywords || [],
        newHistory.map(m => ({ role: m.role, content: m.content } as ChatMessage)),
        i18n.language
      );
      
      setIsTyping(false);
      const newMsgId = (Date.now() + 1).toString();
      let fullResponse = "";
      setMessages(prev => [...prev, { id: newMsgId, role: "assistant", content: "" }]);

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponse += content;
          setMessages(prev => {
            const newMsgs = [...prev];
            newMsgs[newMsgs.length - 1] = { id: newMsgId, role: "assistant", content: fullResponse };
            return newMsgs;
          });
          // Artificial delay for a more natural typing rhythm
          await new Promise(r => setTimeout(r, 25));
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: t('interpretation.error_api', "Je n'arrive pas à me concentrer. Veuillez réessayer.")
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-night relative">
      <header className="flex-none bg-night/95 backdrop-blur-sm px-6 pt-12 pb-4 border-b border-parchment/5 z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/reading")} className="text-sm text-ash hover:text-parchment transition-colors flex items-center justify-center w-8 h-8 rounded-full bg-parchment/5">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
        <div>
          <h2 className="text-lg font-medium text-parchment leading-tight">{currentDraw.combination.title}</h2>
          <p className="text-[10px] uppercase tracking-wider text-ash/60 mt-1">{t('interpretation.subtitle', 'Interprétation contextuelle')}</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 py-6 scroll-smooth">
        <div className="flex flex-col gap-6">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : msg.role === 'system' ? 'justify-center' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-parchment/10 text-parchment rounded-br-sm' 
                    : msg.role === 'system'
                    ? 'bg-transparent text-ash text-center italic border border-parchment/10 text-xs w-full max-w-[90%]'
                    : 'bg-night-light border border-parchment/5 text-parchment/90 rounded-bl-sm'
                }`}
              >
                {msg.content}
                {msg.action === 'support-letter' && (
                  <div className="mt-3">
                    <button 
                      onClick={() => navigate("/support-letter")}
                      className="text-[11px] uppercase tracking-widest text-parchment/80 hover:text-parchment font-medium underline underline-offset-4 decoration-parchment/30 hover:decoration-parchment transition-all"
                    >
                      {t('interpretation.support_btn_inline', 'Découvrir la lettre de soutien')}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-night-light border border-parchment/5 rounded-2xl rounded-bl-sm p-4 text-sm text-parchment/60 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-parchment/50 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-parchment/50 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-parchment/50 rounded-full animate-bounce"></span>
              </div>
            </motion.div>
          )}
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
            placeholder={t('interpretation.placeholder', 'Écrivez votre message...')}
            className="flex-1 max-h-[120px] min-h-[40px] bg-transparent text-base text-parchment placeholder:text-ash/40 resize-none py-2 px-2 focus:outline-none"
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
