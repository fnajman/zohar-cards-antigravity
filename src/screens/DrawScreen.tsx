import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useShake } from "@/hooks/useShake";
import { useStore, type DrawStyle } from "@/store/useStore";
import { useTranslation } from "react-i18next";
import { useCreateDraw, useLetters } from "@/hooks/useApi";
import { HebrewGlyph, type HebrewFontStyle } from "../components/HebrewGlyph";
import type { Letter } from "../data/types";

const MODE_META: { id: DrawStyle; label: string; icon: React.ReactNode }[] = [
  { id: "grid", label: "Ordonne", icon: <GridIcon /> },
  { id: "chaos", label: "Chaos", icon: <ChaosIcon /> },
  { id: "fan", label: "Eventail", icon: <FanIcon /> },
  { id: "slider", label: "Slider", icon: <SliderIcon /> },
  { id: "hold", label: "Maintenir", icon: <HoldIcon /> },
];

export function DrawScreen() {
  const navigate = useNavigate();
  const { drawStyle, setDrawStyle, hebrewFont, markJourneyStep } = useStore();
  const { mutate: performDraw, isPending } = useCreateDraw();
  const { t } = useTranslation();
  const { data: letters = [] } = useLetters();
  const [selected, setSelected] = useState<Letter[]>([]);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [shuffledLetters, setShuffledLetters] = useState<Letter[]>([]);
  const [debugCount, setDebugCount] = useState(0);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    if (letters.length > 0 && shuffledLetters.length === 0) {
      setShuffledLetters([...letters].sort(() => Math.random() - 0.5));
    }
  }, [letters, shuffledLetters.length]);

  const handleTitleClick = useCallback(() => {
    setDebugCount(c => {
      if (c + 1 >= 5) {
        setDebugMode(true);
        return 0;
      }
      return c + 1;
    });
  }, []);

  const handleSelect = useCallback((letter: Letter) => {
    if (isPending || revealed.has(letter.id)) return;
    setRevealed((prev) => new Set(prev).add(letter.id));
    setSelected((prev) => {
      if (prev.find((l) => l.id === letter.id)) return prev;
      return [...prev, letter];
    });
  }, [revealed, isPending]);

  useEffect(() => {
    if (selected.length === 1) {
      markJourneyStep("card1");
    }
    if (selected.length === 2 && !isPending) {
      markJourneyStep("card2");
      performDraw({ selectedIds: [selected[0].id, selected[1].id] }, {
        onSuccess: () => setTimeout(() => navigate("/reveal"), 2000)
      });
    }
  }, [selected, isPending, performDraw, navigate, markJourneyStep]);


  const changeMode = (id: DrawStyle) => {
    setDrawStyle(id);
  };

  const handleHoldComplete = useCallback(() => {
    if (isPending) return;
    if (selected.length === 1) {
      markJourneyStep("card2");
      performDraw({ selectedIds: [selected[0].id] as any }, {
        onSuccess: () => setTimeout(() => navigate("/reveal"), 600)
      });
    } else {
      markJourneyStep("card1");
      markJourneyStep("card2");
      performDraw(undefined, {
        onSuccess: () => setTimeout(() => navigate("/reveal"), 600)
      });
    }
  }, [selected, performDraw, navigate, isPending, markJourneyStep]);

  if (letters.length === 0 || shuffledLetters.length === 0) {
    return <div className="h-full bg-night" />;
  }

  return (
    <div className="h-full flex flex-col bg-night">
      <header className="px-6 pt-12 pb-3 flex items-center justify-between">
        <button onClick={() => navigate("/home")} className="text-sm text-ash hover:text-parchment transition-colors flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {drawStyle === "grid" && <GridMode key="grid" onSelect={handleSelect} revealed={revealed} hebrewFont={hebrewFont} letters={shuffledLetters} debugMode={debugMode} onTitleClick={handleTitleClick} />}
          {drawStyle === "chaos" && <ChaosMode key="chaos" onSelect={handleSelect} revealed={revealed} hebrewFont={hebrewFont} letters={shuffledLetters} debugMode={debugMode} onTitleClick={handleTitleClick} />}
          {drawStyle === "fan" && <FanMode key="fan" onSelect={handleSelect} revealed={revealed} hebrewFont={hebrewFont} letters={shuffledLetters} debugMode={debugMode} onTitleClick={handleTitleClick} />}
          {drawStyle === "slider" && <SliderMode key="slider" onSelect={handleSelect} revealed={revealed} hebrewFont={hebrewFont} letters={shuffledLetters} debugMode={debugMode} onTitleClick={handleTitleClick} />}
          {drawStyle === "hold" && <HoldMode key="hold" onComplete={handleHoldComplete} />}
        </AnimatePresence>
      </main>

      {selected.length > 0 && selected.length < 2 && drawStyle !== "hold" && (
        <div className="px-6 py-2 text-center">
          <span className="text-xs text-ash">{t('draw.revealed', { name: selected[0].identity?.name || selected[0].latin_id })}</span>
        </div>
      )}

      <nav className="px-4 pb-6 pt-3 border-t border-parchment/5">
        <div className="flex items-center justify-around">
          {MODE_META.map((m) => (
            <button
              key={m.id}
              onClick={() => changeMode(m.id)}
              className={`flex flex-col items-center gap-1 px-2 py-1 rounded-lg transition-all duration-300 ${drawStyle === m.id ? "text-parchment" : "text-ash/50 hover:text-ash"
                }`}
            >
              <div className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${drawStyle === m.id ? "bg-parchment/10" : ""
                }`}>
                {m.icon}
              </div>
              <span className="text-[9px] tracking-wide">{m.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

// --- CARD BACK (decorative motif) ---
function CardBack({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "w-[16vw] max-w-[65px] aspect-[2/3]",
    md: "w-[22vw] max-w-[90px] aspect-[2/3]",
    lg: "w-[30vw] max-w-[120px] aspect-[2/3]"
  };
  return (
    <div className={`${sizes[size]} rounded-xl bg-night-light border border-parchment/12 flex items-center justify-center relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #F5F1E8 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
      <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" className="opacity-30">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="#F5F1E8" strokeWidth="1" />
        <circle cx="12" cy="12" r="3" stroke="#F5F1E8" strokeWidth="0.7" />
      </svg>
    </div>
  );
}

// --- FLIPPING CARD ---
function FlipCard({ letter, isRevealed, onClick, size = "md", hebrewFont = "Lalou", debugMode = false }: {
  letter: Letter;
  isRevealed: boolean;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  hebrewFont?: HebrewFontStyle;
  debugMode?: boolean;
}) {
  const sizes = {
    sm: "w-[16vw] max-w-[65px] aspect-[2/3]",
    md: "w-[22vw] max-w-[90px] aspect-[2/3]",
    lg: "w-[30vw] max-w-[120px] aspect-[2/3]"
  };
  const glyphSizes = { sm: "xs" as const, md: "sm" as const, lg: "md" as const };

  return (
    <motion.div
      className={`${sizes[size]} perspective-500 cursor-pointer`}
      onClick={onClick}
      whileHover={!isRevealed ? { scale: 1.05, y: -2 } : {}}
      whileTap={!isRevealed ? { scale: 0.92 } : {}}
      animate={isRevealed ? {
        scale: [1, 1.8, 1.8, 0],
        opacity: [1, 1, 1, 0]
      } : { scale: 1, opacity: 1 }}
      transition={isRevealed ? {
        duration: 2,
        times: [0, 0.25, 0.85, 1],
        ease: "easeInOut"
      } : { type: "spring", stiffness: 400, damping: 25 }}
      style={{ zIndex: isRevealed ? 50 : "auto" }}
    >
      <motion.div
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.0, 0.0, 1.0] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back */}
        <div className="absolute inset-0 rounded-xl bg-night-light border border-parchment/12 flex items-center justify-center overflow-hidden" style={{ backfaceVisibility: "hidden" }}>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #F5F1E8 1px, transparent 1px)", backgroundSize: "8px 8px" }} />
          <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" className="opacity-30">
            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="#F5F1E8" strokeWidth="1" />
            <circle cx="12" cy="12" r="3" stroke="#F5F1E8" strokeWidth="0.7" />
          </svg>
          {debugMode && <span className="absolute inset-0 flex items-center justify-center text-parchment/30 text-3xl font-bold z-10 pointer-events-none select-none">{letter.symbol}</span>}
        </div>
        {/* Front (revealed) */}
        <div className="absolute inset-0 rounded-xl bg-night-light border border-parchment/25 flex items-center justify-center overflow-hidden shadow-2xl shadow-black/60" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <div className="absolute inset-0 bg-parchment/[0.04]" />
          <HebrewGlyph letter={letter} style={hebrewFont} size={glyphSizes[size]} />
        </div>
      </motion.div>
    </motion.div>
  );
}

// --- GRID MODE ---
function GridMode({ onSelect, revealed, hebrewFont, letters, debugMode, onTitleClick }: { onSelect: (l: Letter) => void; revealed: Set<number>; hebrewFont: HebrewFontStyle; letters: Letter[]; debugMode: boolean; onTitleClick: () => void }) {
  const { t } = useTranslation();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="h-full px-4 py-4 overflow-y-auto"
    >
      <p className="text-center text-sm text-ash mb-4 cursor-pointer select-none" onClick={onTitleClick}>{t('draw.grid_desc')}</p>
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-4 justify-items-center max-w-2xl mx-auto">
        {letters.map((l) => (
          <FlipCard key={l.id} letter={l} isRevealed={revealed.has(l.id)} onClick={() => onSelect(l)} size="sm" hebrewFont={hebrewFont} debugMode={debugMode} />
        ))}
      </div>
    </motion.div>
  );
}

// --- CHAOS MODE ---
function ChaosMode({ onSelect, revealed, hebrewFont, letters, debugMode, onTitleClick }: { onSelect: (l: Letter) => void; revealed: Set<number>; hebrewFont: HebrewFontStyle; letters: Letter[]; debugMode: boolean; onTitleClick: () => void }) {
  const { t } = useTranslation();
  
  const generatePositions = useCallback(() => {
    return letters.map(() => ({
      // Safe bounds: x between 20% and 80%, y between 25% and 75%
      x: 20 + Math.random() * 60,
      y: 25 + Math.random() * 50,
      rotate: Math.random() * 60 - 30,
    }));
  }, [letters]);

  const [positions, setPositions] = useState(generatePositions);

  const shuffle = useCallback(() => {
    setPositions(generatePositions());
  }, [generatePositions]);

  // Request permission on click if needed (for iOS 13+)
  const handleContainerClick = async () => {
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      try {
        await (DeviceMotionEvent as any).requestPermission();
      } catch (e) {
        // ignore
      }
    }
  };

  useShake(shuffle, 15);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="h-full w-full relative overflow-hidden"
      onClick={handleContainerClick}
    >
      <p className="absolute top-8 left-0 right-0 text-center text-sm text-ash z-10 px-4 cursor-pointer select-none" onClick={onTitleClick}>{t('draw.chaos_desc')}</p>
      <div className="absolute inset-0 max-w-3xl mx-auto">
        {letters.map((l, i) => (
          <motion.div
            key={l.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              left: `${positions[i].x}%`,
              top: `${positions[i].y}%`,
              rotate: positions[i].rotate
            }}
            transition={{ 
              delay: i * 0.025, 
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: revealed.has(l.id) ? 50 : 1 }}
          >
            <FlipCard letter={l} isRevealed={revealed.has(l.id)} onClick={() => onSelect(l)} size="sm" hebrewFont={hebrewFont} debugMode={debugMode} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// --- FAN MODE ---
function FanMode({ onSelect, revealed, hebrewFont, letters, debugMode, onTitleClick }: { onSelect: (l: Letter) => void; revealed: Set<number>; hebrewFont: HebrewFontStyle; letters: Letter[]; debugMode: boolean; onTitleClick: () => void }) {
  const { t } = useTranslation();
  const total = letters.length;
  const arcSpread = 140;
  const startAngle = -arcSpread / 2;
  const angleStep = arcSpread / (total > 1 ? total - 1 : 1);
  const radius = 220;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="h-full flex items-end justify-center relative overflow-hidden pb-4"
    >
      <p className="absolute top-4 left-0 right-0 text-center text-sm text-ash z-10 cursor-pointer select-none" onClick={onTitleClick}>{t('draw.fan_desc')}</p>
      <div className="relative" style={{ width: "100%", height: `${radius + 80}px` }}>
        {letters.map((l, i) => {
          const angle = startAngle + i * angleStep;
          const rad = (angle * Math.PI) / 180;
          const x = Math.sin(rad) * radius;
          const y = -Math.cos(rad) * radius + radius;

          return (
            <motion.div
              key={l.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02, duration: 0.4 }}
              className={`absolute origin-bottom hover:z-30 ${revealed.has(l.id) ? "z-50" : "z-10"}`}
              style={{
                left: `calc(50% + ${x}px)`,
                bottom: `${radius - y + 10}px`,
                translate: "-50% 0",
                transform: `rotate(${angle}deg)`,
              }}
            >
              <div style={{ transform: `rotate(0deg)` }}>
                <FlipCard letter={l} isRevealed={revealed.has(l.id)} onClick={() => onSelect(l)} size="sm" hebrewFont={hebrewFont} debugMode={debugMode} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// --- SLIDER MODE ---
function SliderMode({ onSelect, revealed, hebrewFont, letters, debugMode, onTitleClick }: { onSelect: (l: Letter) => void; revealed: Set<number>; hebrewFont: HebrewFontStyle; letters: Letter[]; debugMode: boolean; onTitleClick: () => void }) {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
      className="h-full flex flex-col items-center justify-center"
    >
      <p className="text-sm text-ash mb-6 cursor-pointer select-none" onClick={onTitleClick}>{t('draw.slider_desc')}</p>
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="w-max flex gap-3 sm:gap-4 px-6 py-4 mx-auto">
          {letters.map((l) => (
            <div key={l.id} className={`flex-shrink-0 relative ${revealed.has(l.id) ? "z-50" : "z-10"}`}>
              <FlipCard letter={l} isRevealed={revealed.has(l.id)} onClick={() => onSelect(l)} size="lg" hebrewFont={hebrewFont} debugMode={debugMode} />
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-ash/40 mt-4">{t('draw.slider_hint')}</p>
    </motion.div>
  );
}

// --- HOLD MODE ---
function HoldMode({ onComplete }: { onComplete?: () => void }) {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<"ready" | "charging" | "done">("ready");
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHold = useCallback(() => {
    setPhase("charging");
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setPhase("done");
          if (onComplete) {
            onComplete();
          }
          return 100;
        }
        return p + 2;
      });
    }, 30);
  }, [onComplete]);

  const endHold = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (phase === "charging") {
      setPhase("ready");
      setProgress(0);
    }
  }, [phase]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center px-6"
    >
      <AnimatePresence mode="wait">
        {phase === "ready" && (
          <motion.div key="r" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6">
            <p className="text-sm text-ash text-center max-w-[200px] leading-relaxed">{t('draw.hold_ready')}</p>
            <div
              onMouseDown={startHold} onMouseUp={endHold} onMouseLeave={endHold}
              onTouchStart={startHold} onTouchEnd={endHold}
              className="w-36 h-52 rounded-2xl bg-night-light border border-parchment/10 flex items-center justify-center cursor-pointer select-none relative overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #F5F1E8 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="opacity-25 group-hover:opacity-40 transition-opacity">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="#F5F1E8" strokeWidth="1" />
                <circle cx="12" cy="12" r="3" stroke="#F5F1E8" strokeWidth="0.7" />
              </svg>
              <span className="absolute bottom-3 text-[10px] tracking-[0.15em] uppercase text-ash/50">{t('draw.hold_btn')}</span>
            </div>
            <p className="text-xs text-ash/40">{t('draw.hold_hint')}</p>
          </motion.div>
        )}
        {phase === "charging" && (
          <motion.div key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-6"
            onMouseUp={endHold} onTouchEnd={endHold}
          >
            <div className="w-36 h-52 rounded-2xl bg-night-light border border-parchment/20 flex items-center justify-center relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-parchment/8 transition-all" style={{ height: `${progress}%` }} />
              <motion.div animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="opacity-40 z-10 relative">
                  <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" stroke="#F5F1E8" strokeWidth="1" />
                  <circle cx="12" cy="12" r="3" stroke="#F5F1E8" strokeWidth="0.7" />
                </svg>
              </motion.div>
            </div>
            <div className="w-28 h-1 bg-parchment/10 rounded-full overflow-hidden">
              <div className="h-full bg-parchment/50 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </motion.div>
        )}
        {phase === "done" && (
          <motion.div key="d" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="font-hebrew text-5xl text-parchment">...</motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- ICONS ---
function GridIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="2" y="2" width="5" height="5" rx="1" /><rect x="11" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="11" width="5" height="5" rx="1" /><rect x="11" y="11" width="5" height="5" rx="1" />
    </svg>
  );
}

function ChaosIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="5" cy="6" r="1.5" /><circle cx="13" cy="4" r="1.5" />
      <circle cx="9" cy="11" r="1.5" /><circle cx="14" cy="13" r="1.5" /><circle cx="4" cy="14" r="1.5" />
    </svg>
  );
}

function FanIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M9 16L4 4" /><path d="M9 16L7 3" /><path d="M9 16V2" /><path d="M9 16L11 3" /><path d="M9 16L14 4" />
    </svg>
  );
}

function SliderIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
      <rect x="1" y="5" width="6" height="8" rx="1.5" /><rect x="6" y="4" width="6" height="10" rx="1.5" /><rect x="11" y="5" width="6" height="8" rx="1.5" />
    </svg>
  );
}

function HoldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="9" cy="9" r="6" /><circle cx="9" cy="9" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
