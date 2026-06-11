import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function AuthScreen() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup" | "magic">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => { e.preventDefault(); navigate("/home"); };

  return (
    <div className="h-full flex flex-col bg-night">
      <header className="px-6 pt-12 pb-4">
        <button onClick={() => navigate("/home")} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Retour
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-[300px]">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-parchment mb-2">
              {mode === "login" ? "Se connecter" : mode === "signup" ? "Creer un compte" : "Connexion rapide"}
            </h2>
            <p className="text-sm text-ash">{mode === "magic" ? "Recevez un code par email" : "L'identification permet de formuler des questions"}</p>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
              className="w-full py-3 px-4 bg-night-light border border-parchment/10 rounded-full text-sm text-parchment placeholder:text-ash/40 focus:outline-none focus:border-parchment/25 transition-colors" />
            {mode !== "magic" && (
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe"
                className="w-full py-3 px-4 bg-night-light border border-parchment/10 rounded-full text-sm text-parchment placeholder:text-ash/40 focus:outline-none focus:border-parchment/25 transition-colors" />
            )}
            <button type="submit" className="w-full py-4 bg-parchment text-ink rounded-full text-sm font-medium hover:bg-bone transition-colors">
              {mode === "login" ? "Se connecter" : mode === "signup" ? "Creer" : "Envoyer le code"}
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
            <button onClick={() => navigate("/home")} className="text-xs text-ash/40 hover:text-ash transition-colors">Continuer sans compte</button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
