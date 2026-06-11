import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface MediaPlayerProps {
  src: string;
  type: "audio" | "video";
  onEnded?: () => void;
  poster?: string;
}

export function MediaPlayer({ src, type, onEnded, poster }: MediaPlayerProps) {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play().catch((err) => console.error("Playback failed:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (mediaRef.current) {
      setProgress(mediaRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (mediaRef.current) {
      setDuration(mediaRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (mediaRef.current) {
      mediaRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
    };
  }, []);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.load();
    }
  }, [src]);

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden bg-night flex flex-col justify-center items-center group ${type === "video" ? "aspect-[9/16] h-[75vh]" : "aspect-video"}`}>
      {type === "video" ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          src={src}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={onEnded}
          onClick={togglePlay}
          playsInline
          poster={poster}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-night-light border border-parchment/10 relative">
           <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #F5F1E8 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
           <motion.div 
             animate={isPlaying ? { scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] } : { scale: 1, opacity: 0.3 }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="w-24 h-24 rounded-full bg-parchment filter blur-2xl"
           />
           <audio
             ref={mediaRef as React.RefObject<HTMLAudioElement>}
             src={src}
             onTimeUpdate={handleTimeUpdate}
             onLoadedMetadata={handleLoadedMetadata}
             onEnded={onEnded}
             preload="auto"
           />
        </div>
      )}

      {/* Controls Overlay */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${isPlaying && !isFullscreen ? "opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
        <div className="flex flex-col gap-2">
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-parchment/70 font-medium w-8 text-right">{formatTime(progress)}</span>
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={progress}
              onChange={handleSeek}
              className="flex-1 h-1 bg-parchment/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-parchment [&::-webkit-slider-thumb]:rounded-full"
            />
            <span className="text-[10px] text-parchment/70 font-medium w-8">{formatTime(duration)}</span>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between mt-1">
            <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center rounded-full bg-parchment/10 text-parchment hover:bg-parchment/20 transition-colors">
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="4" y="3" width="3" height="10" rx="1"/><rect x="9" y="3" width="3" height="10" rx="1"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4.5 3.5L12.5 8L4.5 12.5V3.5Z"/></svg>
              )}
            </button>
            
            {type === "video" && (
              <button onClick={toggleFullscreen} className="p-2 text-parchment/70 hover:text-parchment transition-colors">
                {isFullscreen ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 10L2 14M6 10V13.5M6 10H2.5M10 6L14 2M10 6V2.5M10 6H13.5"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6L2 2M6 6V2.5M6 6H2.5M10 10L14 14M10 10V13.5M10 10H13.5"/></svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
