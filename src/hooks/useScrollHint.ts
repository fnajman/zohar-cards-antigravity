import { useEffect, useRef } from "react";

export function useScrollHint() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Wait a brief moment for layout/animations to settle
    const timeout = setTimeout(() => {
      // Check if container is scrollable
      if (container.scrollHeight > container.clientHeight) {
        // Slight scroll down
        container.scrollTo({ top: 30, behavior: "smooth" });
        
        // Scroll back up after a short delay
        setTimeout(() => {
          container.scrollTo({ top: 0, behavior: "smooth" });
        }, 400);
      }
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  return containerRef;
}
