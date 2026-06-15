import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";
import { login, signup, getMe } from "@/services/authApi";

export function AuthScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mode, setMode] = useState<"login" | "signup" | "magic">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const loginSession = useStore(state => state.loginSession);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (mode === "magic") {
      // Magic link will be implemented in phase 2
      setError("Le lien magique sera bientôt disponible.");
      return;
    }

    setLoading(true);
    try {
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

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-[300px]">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-parchment mb-2">
              {mode === "login" ? "Se connecter" : mode === "signup" ? "Creer un compte" : "Connexion rapide"}
            </h2>
            <p className="text-sm text-ash">{mode === "magic" ? "Recevez un code par email" : "L'identification permet de formuler des questions"}</p>
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom d'utilisateur"
                className="w-full py-3 px-4 bg-night-light border border-parchment/10 rounded-full text-sm text-parchment placeholder:text-ash/40 focus:outline-none focus:border-parchment/25 transition-colors" />
            )}
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
              className="w-full py-3 px-4 bg-night-light border border-parchment/10 rounded-full text-sm text-parchment placeholder:text-ash/40 focus:outline-none focus:border-parchment/25 transition-colors" />
            {mode !== "magic" && (
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe"
                className="w-full py-3 px-4 bg-night-light border border-parchment/10 rounded-full text-sm text-parchment placeholder:text-ash/40 focus:outline-none focus:border-parchment/25 transition-colors" />
            )}
            {error && <p className="text-red-400 text-xs px-2">{error}</p>}
            <button type="submit" disabled={loading} className="w-full py-4 px-6 bg-parchment text-ink rounded-full text-sm font-medium hover:bg-bone transition-colors disabled:opacity-50 flex items-center justify-center text-center whitespace-normal leading-tight">
              {loading ? "Chargement..." : mode === "login" ? "Se connecter" : mode === "signup" ? "Creer" : "Envoyer le code"}
            </button>
          </form>

          <div className="mt-5 space-y-2 text-center">
            {mode === "login" && <>
              <button onClick={() => setMode("magic")} className="text-xs text-ash hover:text-parchment transition-colors block w-full">Recevoir un code par email</button>
              <button onClick={() => setMode("signup")} className="text-xs text-ash hover:text-parchment transition-colors block w-full">Creer un compte</button>
            </>}
            {mode === "signup" && <button onClick={() => setMode("login")} className="text-xs text-ash hover:text-parchment transition-colors">Deja un compte ?</button>}
            {mode === "magic" && <button onClick={() => setMode("login")} className="text-xs text-ash hover:text-parchment transition-colors">Connexion classique</button>}
          </div>
          <div className="mt-8 text-center">
            <button onClick={() => navigate("/home")} className="text-xs text-ash/40 hover:text-ash transition-colors">{t('auth.guest_mode')}</button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
