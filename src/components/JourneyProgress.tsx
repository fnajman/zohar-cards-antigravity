import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore, JourneyStep } from "@/store/useStore";

const HIDDEN_ROUTES = ["/", "/home", "/settings", "/letter-of-day", "/auth"];

const STEPS: JourneyStep[] = [
  "card1",
  "card2",
  "reading",
  "question",
  "interpretation",
  "support_letter",
  "experience"
];

export function JourneyProgress() {
  const location = useLocation();
  const progress = useStore((state) => state.journeyProgress);

  if (HIDDEN_ROUTES.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="absolute top-[48px] left-0 w-full z-50 pointer-events-none flex items-center justify-center h-8">
      <div className="relative w-[180px] flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute left-0 right-0 h-[1px] bg-parchment/10" />

        {/* Dots */}
        {STEPS.map((step, index) => {
          const isCompleted = progress.includes(step);
          const isLast = index === STEPS.length - 1;
          
          return (
            <div key={step} className="relative z-10 flex items-center justify-center bg-night px-0.5">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: isCompleted ? "rgba(245, 241, 232, 1)" : "rgba(245, 241, 232, 0.2)",
                  scale: isCompleted ? 1 : 0.8,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`rounded-full ${isLast ? "w-2.5 h-2.5" : "w-1.5 h-1.5"}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
