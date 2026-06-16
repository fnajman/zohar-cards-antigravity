import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore, type Message } from "@/store/useStore";
import { useCurrentDraw } from "@/hooks/useApi";
import { getAiResponse, getAiResponseStream, ChatMessage } from "@/services/aiService";
import { updateDrawHistory } from "@/services/drawApi";
import ReactMarkdown from 'react-markdown';

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
  const deductCredits = useStore(s => s.deductCredits);
  const chatSessionPaid = useStore(s => s.chatSessionPaid);
  const setChatSessionPaid = useStore(s => s.setChatSessionPaid);
  const messages = chatMessages;
  const setMessages = setChatMessages;
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [linksShouldBlink, setLinksShouldBlink] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    markJourneyStep("interpretation");
  }, [markJourneyStep]);

  const syncHistoryToCloud = async (msgs: Message[]) => {
    const s = useStore.getState();
    
    // Si pas connecté ou si l'ID est un grand timestamp (tirage purement local), on ne synchronise pas.
    // Un timestamp Date.now() est > 1.7 trillion. Les IDs Xano sont de petits entiers.
    if (!s.authToken || !s.user?.id || !s.profileId || !currentDraw?.id || currentDraw.id > 1000000000000) {
      return;
    }

    const history = msgs
      .filter(m => !m.id.includes("action") && m.role !== "system" || m.content.startsWith("Model used:"))
      .map(m => ({ role: m.role, content: m.content }));
    
    const keywords = currentDraw.selected_keywords?.length 
      ? currentDraw.selected_keywords.join(", ") 
      : "Aucun";

    const fullHistory = [
      { role: "system", content: `Model used: ${s.aiModel}\nMots sélectionnés: ${keywords}` },
      ...(s.currentQuestion?.trim() ? [{ role: "user", content: s.currentQuestion.trim() }] : []),
      ...history.filter(m => m.role !== "system")
    ];

    await updateDrawHistory(s.authToken, currentDraw.id, s.user.id, s.profileId, fullHistory);
  };

  useEffect(() => {
    const initChat = async () => {
      if (messages.length === 0 && currentDraw && !isTyping) {
        setIsTyping(true);
        deductCredits(3).catch(console.error);
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
              for (let i = 0; i < content.length; i++) {
                fullResponse += content[i];
                if (i % 2 === 0 || i === content.length - 1) {
                  setMessages([{ id: "msg-0", role: "assistant", content: fullResponse }]);
                }
                await new Promise(r => setTimeout(r, 15));
              }
            }
          }

          setMessages(prev => [
            ...prev,
            { 
              id: "msg-0-action", 
              role: "system", 
              content: t('interpretation.followup_text', "Vous pouvez continuer à dialoguer avec moi, ou découvrir votre Lettre de soutien en cliquant sur le lien en bas à gauche, ou clôturer le tirage avec le lien en bas à droite.")
            }
          ]);
          setLinksShouldBlink(true);
          
          // Sync with cloud after initial generation
          syncHistoryToCloud([{ id: "msg-0", role: "assistant", content: fullResponse }]);
        } catch (error) {
          console.error(error);
          setMessages([
            { id: "msg-0", role: "assistant", content: i18n.language === 'en' ? '[EN] The encounter of these two letters opens a space for deep reflection...\n\n(Placeholder)' : fakeAI },
            { 
              id: "msg-0-action", 
              role: "system", 
              content: t('interpretation.followup_text', "Vous pouvez continuer à dialoguer avec moi, ou découvrir votre Lettre de soutien en cliquant sur le lien en bas à gauche, ou clôturer le tirage avec le lien en bas à droite.")
            }
          ]);
        } finally {
          setIsTyping(false);
        }
      }
    };
    initChat();
  }, [currentDraw, messages.length, i18n.language, currentQuestion]);

  const [autoScroll, setAutoScroll] = useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    setAutoScroll(isAtBottom);
  };

  const scrollToBottom = () => {
    if (autoScroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, autoScroll]);

  useEffect(() => {
    if (!currentDraw) {
      navigate("/home");
    }
  }, [currentDraw, navigate]);

  if (!currentDraw) { return null; }

  const isUnlimited = user?.role === "admin" || user?.role === "contrib";



  const handleSend = async () => {
    if (!inputText.trim() || !currentDraw || isTyping) return;
    
    if (!user) {
      const wantToSignup = window.confirm(t('question.guest_alert', "Vous devez créer un compte pour bénéficier de toutes les fonctionnalités.\n\nVoulez-vous créer un compte maintenant ?"));
      if (wantToSignup) {
        navigate("/auth", { state: { mode: "signup" } });
      }
      return;
    }
    const isPrivileged = user.role === 'admin' || user.role === 'contrib';
    if (!isPrivileged && (user.credits ?? 0) < 3) {
      alert(t('question.credit_alert', "Vous devez avoir au moins 3 crédits pour poser une question."));
      return;
    }
    
    deductCredits(3).catch(console.error);
    
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
          for (let i = 0; i < content.length; i++) {
            fullResponse += content[i];
            if (i % 2 === 0 || i === content.length - 1) {
              setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs[newMsgs.length - 1] = { id: newMsgId, role: "assistant", content: fullResponse };
                return newMsgs;
              });
            }
            await new Promise(r => setTimeout(r, 15));
          }
        }
      }
      setIsTyping(false);
      
      // Sync the new messages with cloud
      syncHistoryToCloud([...newHistory, { id: newMsgId, role: "assistant", content: fullResponse }]);
      
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

      <main className="flex-1 overflow-y-auto px-6 py-6" onScroll={handleScroll}>
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
                {msg.role === 'system' ? (
                  msg.content
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-a:text-parchment prose-strong:text-parchment prose-em:text-parchment/80">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
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
        {/* Action Links above input */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 px-2 mb-2 text-[11px] uppercase tracking-wider font-medium text-ash/70 text-center">
          <button 
            onClick={() => navigate("/support-letter")} 
            className={`hover:text-parchment transition-colors underline underline-offset-4 decoration-parchment/20 hover:decoration-parchment ${linksShouldBlink ? 'animate-[link-blink_1s_ease-in-out_3]' : ''}`}
          >
            {t('interpretation.support_btn', 'Lettre de soutien')}
          </button>
          <button 
            onClick={() => navigate("/home")} 
            className={`hover:text-parchment transition-colors ${linksShouldBlink ? 'animate-[link-blink_1s_ease-in-out_3]' : ''}`}
          >
            {t('common.close_draw', 'Clore le tirage')}
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
