"use client";

import React, { useEffect, useRef } from "react";

interface MusicPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, setIsPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.warn("Autoplay was blocked or failed:", err);
        setIsPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, setIsPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/Bryan Adams - Heaven (Official Music Video) - Bryan Adams.mp3" loop />
      <button
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#B83E55] shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isPlaying ? "animate-spin [animation-duration:8s]" : ""
        }`}
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
      >
        {/* Decorative inner circle representing vinyl center */}
        <div className="absolute h-4 w-4 rounded-full bg-[#FFF5F6] flex items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-[#B83E55]"></div>
        </div>

        {/* Floating Play/Pause Icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isPlaying ? (
            // Pause Icon
            <svg
              className="h-5 w-5 text-white/40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            // Play Icon
            <svg
              className="h-5 w-5 text-[#FFF5F6] ml-0.5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>

        {/* Ambient music waves around the vinyl when playing */}
        {isPlaying && (
          <div className="absolute -inset-1.5 -z-10 rounded-full bg-[#D4AF37]/20 animate-ping [animation-duration:2s]"></div>
        )}
      </button>
    </>
  );
};
