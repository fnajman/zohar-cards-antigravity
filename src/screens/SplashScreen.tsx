import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import i18n from "@/i18n/config";

export function SplashScreen() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const lang = i18n.language;
    Promise.all([
      queryClient.prefetchQuery({ queryKey: ['letters', lang], queryFn: () => api.getLetters(lang) }),
      queryClient.prefetchQuery({ queryKey: ['letterOfDay', lang], queryFn: () => api.getLetterOfTheDay(lang) }),
      queryClient.prefetchQuery({ queryKey: ['drawHistory', lang], queryFn: () => api.getDrawHistory(lang) }),
      queryClient.prefetchQuery({ queryKey: ['currentDraw', lang], queryFn: () => api.getCurrentDraw(lang) }),
    ]).then(() => {
      const t = setTimeout(() => navigate("/home"), 3200);
      return () => clearTimeout(t);
    });
  }, [navigate, queryClient]);

  return (
    <div className="h-full flex flex-col items-center justify-center bg-night relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative"
      >
        <img
          src="/fonts/Lalou/01.png"
          alt="Aleph"
          className="h-32 w-auto object-contain"
          draggable={false}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 2.5, delay: 0.5 }}
          className="absolute inset-0 blur-3xl bg-parchment rounded-full -z-10"
        />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="mt-6 text-[11px] tracking-[0.3em] uppercase text-ash font-medium"
      >
        Zohar Cards
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-12"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="w-1.5 h-1.5 bg-parchment/50 rounded-full"
        />
      </motion.div>
    </div>
  );
}
