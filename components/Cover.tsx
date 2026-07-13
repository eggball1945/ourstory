"use client";

import React, { useEffect, useRef } from "react";
import { createTimeline } from "animejs";
import { FlowerLogo } from "./FlowerLogo";

interface CoverProps {
  onOpen: () => void;
  guestName: string;
}

export const Cover: React.FC<CoverProps> = ({ onOpen, guestName }) => {
  const coverRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (!contentRef.current || !coverRef.current) return;

    // animejs v4 timeline animation
    const tl = createTimeline({
      defaults: { ease: "inOutQuad" }
    });

    tl.add(contentRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 600,
    })
    .add(coverRef.current, {
      translateY: "-100vh",
      duration: 1000,
      onComplete: () => {
        onOpen();
      }
    }, 400); // starts at 400ms
  };

  return (
    <div
      ref={coverRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(rgba(144, 30, 50, 0.75), rgba(184, 62, 85, 0.8)), url('/images/hero-bg.png')"
      }}
    >
      <div
        ref={contentRef}
        className="w-full max-w-lg px-6 text-center text-[#FFF5F6] flex flex-col items-center justify-between h-[80vh]"
      >
        {/* Decorative Top Line / Logo */}
        <div className="flex flex-col items-center gap-3">
          <FlowerLogo size={56} color="#D4AF37" className="romantic-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Jurnal Cerita &amp; Foto</span>
        </div>

        {/* Wedding Couple Initials and Names */}
        <div className="my-8">
          <h2 className="font-serif text-5xl md:text-6xl font-normal tracking-wide text-[#FFF5F6] drop-shadow-md mb-2">
            Ibal
          </h2>
          <span className="font-serif text-3xl font-light italic text-[#D4AF37] my-2 block">&amp;</span>
          <h2 className="font-serif text-5xl md:text-6xl font-normal tracking-wide text-[#FFF5F6] drop-shadow-md">
            Aya
          </h2>
        </div>

        {/* Guest Name Info Card */}
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 shadow-xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#FFF5F6]/70 mb-3">Halo,</p>
          <p className="text-xs text-[#FFF5F6]/60 italic mb-6 leading-relaxed">
            Selamat datang di catatan kecil perjalanan kebersamaan kami.
          </p>
          
          {/* Pulsing Buka Undangan Button */}
          <button
            onClick={handleOpen}
            className="group relative flex w-full items-center justify-center rounded-full bg-[#D4AF37] py-3.5 px-6 text-sm font-semibold tracking-wider text-[#B83E55] shadow-lg transition-all duration-300 hover:bg-[#C5A880] hover:text-[#2C2C2C] hover:shadow-xl active:scale-98"
          >
            <span className="absolute -inset-1 rounded-full border border-[#D4AF37]/50 animate-ping group-hover:hidden"></span>
            <svg
              className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Mulai Membaca
          </button>
        </div>

        {/* Date and Footer */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-serif text-sm tracking-[0.1em] text-[#FFF5F6]">Cerita Kebersamaan Kita</p>
          <div className="h-0.5 w-16 bg-[#D4AF37]"></div>
        </div>
      </div>
    </div>
  );
};
