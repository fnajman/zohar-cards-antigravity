import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";
import { login, signup, getMe, requestMagicCode, verifyMagicCode, updateUserPassword } from "@/services/authApi";

export function AuthScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [mode, setMode] = useState<"login" | "signup" | "reset">(location.state?.mode || "login");
  const [resetStep, setResetStep] = useState<1 | 2>(1);
  const [resetCode, setResetCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const loginSession = useStore(state => state.loginSession);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    
    try {
      if (mode === "reset" && resetStep === 1) {
        if (!email) throw new Error("L'email est requis");
        await requestMagicCode(email);
        setResetStep(2);
        return;
      }

      if (mode === "reset" && resetStep === 2) {
        if (!resetCode) throw new Error("Le code est requis");
        if (!password) throw new Error("Le nouveau mot de passe est requis");
        const token = await verifyMagicCode(email, resetCode);
        await updateUserPassword(token, password);
        setSuccessMsg(t('auth.password_changed_success'));
        setMode("login");
        setResetStep(1);
        setResetCode("");
        setPassword("");
        return;
      }

      let token = "";
      if (mode === "login") {
        token = await login(email, password);
      } else if (mode === "signup") {
        if (!name) throw new Error("Le nom est requis");
        token = await signup(name, email, password);
      }
      
      const user = await getMe(token);
      loginSession(token, user);
      useStore.getState().syncProfileOnLogin(token, user);
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-night overflow-y-auto no-scrollbar">
      <header className="px-6 pt-12 pb-4">
        <button onClick={() => navigate("/home")} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Retour
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-start px-6 pt-12 pb-32">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-[300px]">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-parchment mb-2">
              {mode === "login" ? t('auth.login_btn', 'Se connecter') : mode === "signup" ? "Créer un compte" : t('auth.lost_password_title', 'Réinitialisation')}
            </h2>
            <p className="text-sm text-ash">{mode === "reset" ? t('auth.lost_password_desc', 'Entrez votre adresse email') : "L'identification permet de formuler des questions"}</p>
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom d'utilisateur"
                className="w-full py-3 px-4 bg-night-light border border-parchment/10 rounded-full text-sm text-parchment placeholder:text-ash/40 focus:outline-none focus:border-parchment/25 transition-colors" />
            )}
            
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
              disabled={mode === "reset" && resetStep === 2}
              className="w-full py-3 px-4 bg-night-light border border-parchment/10 rounded-full text-sm text-parchment placeholder:text-ash/40 focus:outline-none focus:border-parchment/25 transition-colors disabled:opacity-50" />
            
            {mode === "reset" && resetStep === 2 && (
              <input type="text" value={resetCode} onChange={(e) => setResetCode(e.target.value)} placeholder={t('auth.code_validation', 'Code de validation')}
                className="w-full py-3 px-4 bg-night-light border border-parchment/10 rounded-full text-sm text-parchment placeholder:text-ash/40 focus:outline-none focus:border-parchment/25 transition-colors" />
            )}

            {mode !== "reset" && (
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe"
                className="w-full py-3 px-4 bg-night-light border border-parchment/10 rounded-full text-sm text-parchment placeholder:text-ash/40 focus:outline-none focus:border-parchment/25 transition-colors" />
            )}

            {mode === "reset" && resetStep === 2 && (
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('auth.new_password', 'Nouveau mot de passe')}
                  className="w-full py-3 px-4 bg-night-light border border-parchment/10 rounded-full text-sm text-parchment placeholder:text-ash/40 focus:outline-none focus:border-parchment/25 transition-colors pr-12" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-ash hover:text-parchment transition-colors">
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90052 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C20.9705 13.8272 19.9661 15.459 18.644 16.7534" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.45801 12C3.73228 7.94288 7.52257 5 12.0002 5C16.4778 5 20.2681 7.94291 21.5424 12C20.2681 16.0571 16.4778 19 12.0002 19C7.52256 19 3.73226 16.0571 2.45801 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                </button>
              </div>
            )}

            {error && <p className="text-red-400 text-xs px-2">{error}</p>}
            {successMsg && <p className="text-green-400 text-xs px-2">{successMsg}</p>}
            
            <button type="submit" disabled={loading} className="w-full py-4 px-6 bg-parchment text-ink rounded-full text-sm font-medium hover:bg-bone transition-colors disabled:opacity-50 flex items-center justify-center text-center whitespace-normal leading-tight">
              {loading ? "Chargement..." : mode === "login" ? t('auth.login_btn', 'Se connecter') : mode === "signup" ? "Créer" : resetStep === 1 ? t('auth.send_code', 'Envoyer le code') : t('auth.change_password_btn', 'Changer le mot de passe')}
            </button>
          </form>

          <div className="mt-5 space-y-2 text-center">
            {mode === "login" && <>
              <button onClick={() => { setMode("reset"); setResetStep(1); setSuccessMsg(""); setError(""); }} className="text-xs text-ash hover:text-parchment transition-colors block w-full">{t('auth.lost_password', 'Mot de passe perdu')}</button>
              <button onClick={() => { setMode("signup"); setSuccessMsg(""); setError(""); }} className="text-xs text-ash hover:text-parchment transition-colors block w-full">Créer un compte</button>
            </>}
            {mode === "signup" && <button onClick={() => { setMode("login"); setSuccessMsg(""); setError(""); }} className="text-xs text-ash hover:text-parchment transition-colors">Déjà un compte ?</button>}
            {mode === "reset" && <button onClick={() => { setMode("login"); setSuccessMsg(""); setError(""); }} className="text-xs text-ash hover:text-parchment transition-colors">Connexion classique</button>}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => navigate("/home")} className="text-xs text-ash/40 hover:text-ash transition-colors">{t('auth.guest_mode')}</button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
