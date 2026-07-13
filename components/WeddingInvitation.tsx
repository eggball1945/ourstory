"use client";

import React, { useState, useEffect } from "react";
import { Cover } from "./Cover";
import { MusicPlayer } from "./MusicPlayer";
import { ScrollAnimate } from "./ScrollAnimate";
import { FlowerLogo } from "./FlowerLogo";
import { HeartRain } from "./HeartRain";

export const WeddingInvitation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [daysTogether, setDaysTogether] = useState(0);

  // Extract guest name from URL Query String (?to=...)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to");
      if (to) {
        setGuestName(to);
      }
    }
  }, []);

  // Lock/Unlock Body scroll depending on cover page state
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Calculate days together since commitment date: September 14, 2025
  useEffect(() => {
    const startDate = new Date("2025-09-14T00:00:00").getTime();
    
    const calculateDays = () => {
      const now = new Date().getTime();
      const diffTime = Math.abs(now - startDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setDaysTogether(diffDays);
    };

    calculateDays();
    const interval = setInterval(calculateDays, 1000 * 60 * 60); // update every hour
    
    return () => clearInterval(interval);
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    setIsPlaying(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FFF5F6] font-sans selection:bg-[#B83E55] selection:text-white overflow-x-hidden">
      {/* Cover / Screen Filter */}
      {!isOpen && <Cover onOpen={handleOpenInvitation} guestName={guestName} />}

      {/* Floating Audio controller */}
      {isOpen && <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />}

      {/* Falling Hearts Rain */}
      {isOpen && <HeartRain />}

      {/* Main Content Container */}
      <div className={`transition-opacity duration-1000 ${isOpen ? "opacity-100" : "opacity-0 h-screen overflow-hidden"}`}>
        
        {/* HERO SECTION */}
        <section
          className="relative flex h-screen items-center justify-center bg-cover bg-center text-center text-[#FFF5F6] px-6"
          style={{
            backgroundImage: "linear-gradient(rgba(144, 30, 50, 0.45), rgba(184, 62, 85, 0.65)), url('/images/hero-bg.png')",
            backgroundSize: "cover"
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <ScrollAnimate animation="fade-down" duration={1200} className="flex flex-col items-center gap-3">
              <FlowerLogo size={64} color="#D4AF37" className="romantic-pulse" />
              <span className="text-xs uppercase tracking-[0.4em] font-semibold text-[#D4AF37] drop-shadow">Catatan Cerita &amp; Foto</span>
            </ScrollAnimate>
            
            <ScrollAnimate animation="zoom-in" duration={1400} delay={300}>
              <h1 className="font-serif text-6xl md:text-8xl font-normal tracking-wide text-white drop-shadow-lg">
                Ibal &amp; Aya
              </h1>
            </ScrollAnimate>

            <ScrollAnimate animation="fade-up" duration={1200} delay={600} className="flex flex-col items-center gap-3">
              <p className="font-serif text-lg tracking-[0.15em] text-white drop-shadow">Sebuah Perjalanan Sederhana</p>
              <div className="h-0.5 w-24 bg-[#D4AF37]"></div>
            </ScrollAnimate>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/70 font-medium">Scroll Down</span>
              <svg className="h-4 w-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section className="relative py-24 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
          <ScrollAnimate animation="fade-up" className="mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#B83E55] font-semibold">Tentang Kami</h2>
            <div className="h-0.5 w-16 bg-[#D4AF37] mx-auto mt-4"></div>
            <p className="mt-4 text-sm text-[#2C2C2C]/70 max-w-md mx-auto leading-relaxed">
              Katanya, hubungan itu bukan mencari orang yang sempurna, tapi belajar menerima hal-hal tidak sempurna dengan cara yang menyenangkan. Ini sekilas tentang kami:
            </p>
          </ScrollAnimate>

          <div className="grid md:grid-cols-2 gap-12 w-full mt-6">
            {/* IBAL CARD */}
            <ScrollAnimate animation="fade-right" duration={1200} className="flex flex-col items-center bg-white rounded-3xl p-8 border border-[#C5A880]/20 shadow-md">
              <div className="relative group overflow-hidden rounded-2xl border-4 border-[#C5A880]/30 p-2 shadow bg-white mb-4 w-64 h-64">
                <img
                  src="/images/1.jpg"
                  alt="Iqbal Fadilah"
                  className="rounded-xl w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-[#D4AF37]/50 rounded-xl pointer-events-none m-2"></div>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#B83E55]">Iqbal Fadilah</h3>
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mt-1">Ibal</p>
              <p className="text-xs text-[#2C2C2C]/60 mt-2 font-medium tracking-wide">30 Maret 2008</p>
            </ScrollAnimate>

            {/* AYA CARD */}
            <ScrollAnimate animation="fade-left" duration={1200} className="flex flex-col items-center bg-white rounded-3xl p-8 border border-[#C5A880]/20 shadow-md">
              <div className="relative group overflow-hidden rounded-2xl border-4 border-[#C5A880]/30 p-2 shadow bg-white mb-4 w-64 h-64">
                <img
                  src="/images/2.jpg"
                  alt="Alvairani Jasmine Apringga"
                  className="rounded-xl w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-[#D4AF37]/50 rounded-xl pointer-events-none m-2"></div>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#B83E55]">Alvairani Jasmine Apringga</h3>
              <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mt-1">Aya</p>
              <p className="text-xs text-[#2C2C2C]/60 mt-2 font-medium tracking-wide">6 Agustus 2009</p>
            </ScrollAnimate>
          </div>
        </section>

        {/* TIME TOGETHER COUNTER & FUN STATS */}
        <section className="relative bg-[#B83E55] text-[#FFF5F6] py-24 px-6 overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('/images/hero-bg.png')", backgroundSize: "cover" }}></div>
          <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
            
            <ScrollAnimate animation="zoom-in" className="w-full max-w-2xl bg-white border border-[#C5A880]/30 rounded-3xl shadow-2xl p-8 text-center mb-16 relative text-[#2C2C2C]">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#B83E55] px-6 py-2 rounded-full font-serif text-sm font-semibold border border-white shadow">
                Perjalanan Kami
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-[#B83E55] mt-2 mb-2">Hari-Hari yang Telah Dilalui</h3>
              <p className="text-xs text-[#2C2C2C]/50 mb-6">Mulai berkomitmen sejak 14 September 2025</p>
              
              <div className="inline-flex items-center justify-center bg-[#FFF5F6] rounded-2xl px-8 py-5 border border-[#C5A880]/20 shadow-inner mb-2">
                <span className="text-5xl md:text-6xl font-bold text-[#B83E55] tracking-wider">{daysTogether}</span>
                <span className="text-sm font-bold uppercase text-[#2C2C2C]/50 ml-3 tracking-widest">Hari Bersama</span>
              </div>
            </ScrollAnimate>

            {/* Fun Stats Grid */}
            <ScrollAnimate animation="fade-up" className="text-center mb-12">
              <h2 className="font-serif text-3xl text-[#D4AF37] font-semibold">Statistik Kebersamaan</h2>
              <div className="h-0.5 w-16 bg-[#FFF5F6]/30 mx-auto mt-4"></div>
              <p className="mt-4 text-sm text-[#FFF5F6]/70 max-w-md mx-auto leading-relaxed">
                Di balik kebersamaan kami, ada estimasi angka-angka sederhana yang mewarnai perjalanan ini:
              </p>
            </ScrollAnimate>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
              <ScrollAnimate animation="fade-right" delay={100} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <span className="text-3xl font-bold text-[#D4AF37]">20+</span>
                <p className="text-xs uppercase tracking-wider text-[#FFF5F6]/60 mt-2">Makanan &amp; Minuman Bareng</p>
              </ScrollAnimate>
              
              <ScrollAnimate animation="zoom-in" delay={200} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <span className="text-3xl font-bold text-[#D4AF37]">30+</span>
                <p className="text-xs uppercase tracking-wider text-[#FFF5F6]/60 mt-2">Kali Debat Nyari Tempat Makan</p>
              </ScrollAnimate>
              
              <ScrollAnimate animation="fade-left" delay={300} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
                <span className="text-3xl font-bold text-[#D4AF37]">6+</span>
                <p className="text-xs uppercase tracking-wider text-[#FFF5F6]/60 mt-2">Tempat Dikunjungi</p>
              </ScrollAnimate>
            </div>

          </div>
        </section>

        {/* STORY TIMELINE (NOT LEBAY) */}
        <section className="relative bg-[#FFF5F6] py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimate animation="fade-up" className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#B83E55] font-semibold">Garis Waktu Cerita Kami</h2>
              <div className="h-0.5 w-16 bg-[#D4AF37] mx-auto mt-4"></div>
              <p className="mt-4 text-sm text-[#2C2C2C]/70 max-w-md mx-auto leading-relaxed">
                Cerita singkat bagaimana kami bertumbuh, bertengkar, berbaikan, dan terus berjalan berdampingan.
              </p>
            </ScrollAnimate>

            {/* Vertical Line */}
            <div className="absolute left-6 md:left-1/2 top-48 bottom-12 w-0.5 bg-[#C5A880]/30 hidden md:block"></div>

            <div className="flex flex-col gap-16 relative">
              {/* Event 1 */}
              <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
                <div className="w-full md:w-5/12 text-center md:text-right">
                  <ScrollAnimate animation="fade-right">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37]">Masa Sekolah</span>
                    <h3 className="font-serif text-xl font-bold mt-1 text-[#B83E55]">Pertemuan Pertama</h3>
                    <p className="mt-3 text-sm text-[#2C2C2C]/80 leading-relaxed">
                      Pertemuan pertama kita di sekolah pas Iqbal kelas 12 dan Aya kelas 11. Langkah awal dari sebuah perjalanan panjang.
                    </p>
                  </ScrollAnimate>
                </div>
                <div className="h-8 w-8 rounded-full border-4 border-[#FFF5F6] bg-[#D4AF37] z-20 flex items-center justify-center my-4 md:my-0 shadow-lg">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B83E55]"></span>
                </div>
                <div className="w-full md:w-5/12 hidden md:block"></div>
              </div>

              {/* Event 2 */}
              <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
                <div className="w-full md:w-5/12 hidden md:block"></div>
                <div className="h-8 w-8 rounded-full border-4 border-[#FFF5F6] bg-[#D4AF37] z-20 flex items-center justify-center my-4 md:my-0 shadow-lg">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#B83E55]"></span>
                </div>
                <div className="w-full md:w-5/12 text-center md:text-left">
                  <ScrollAnimate animation="fade-left">
                    <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37]">14 September 2025</span>
                    <h3 className="font-serif text-xl font-bold mt-1 text-[#B83E55]">Hari Jadian &amp; Komitmen</h3>
                    <p className="mt-3 text-sm text-[#2C2C2C]/80 leading-relaxed">
                      Banyak masalah bahkan di hari jadian kita tanggal 14 September, tapi kita lalui semuanya bersama.
                    </p>
                  </ScrollAnimate>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MEMORY GRID (POLAROID COLLAGE - EXPANDED) */}
        <section className="relative py-24 px-6 bg-white border-t border-[#C5A880]/15">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <ScrollAnimate animation="fade-up" className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#B83E55] font-semibold">Album Momen Kebersamaan</h2>
              <div className="h-0.5 w-16 bg-[#D4AF37] mx-auto mt-4"></div>
              <p className="mt-4 text-sm text-[#2C2C2C]/70 max-w-md mx-auto leading-relaxed">
                Beberapa cerita kecil dan kenangan acak yang sempat kami abadikan.
              </p>
            </ScrollAnimate>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full mt-6">
              {/* Polaroid 1 */}
              <ScrollAnimate animation="zoom-in" delay={100} className="flex flex-col items-center">
                <div className="bg-white p-4 border border-zinc-200 shadow-lg rotate-2 hover:rotate-0 hover:scale-102 hover:shadow-2xl transition-all duration-300 w-full max-w-[240px] cursor-pointer">
                  <div className="h-44 bg-[#B83E55]/10 relative flex items-center justify-center overflow-hidden mb-4">
                    <img src="/images/5 Outdoor Image Collage Ripped Paper Instagram Story.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Moment 1" />
                    <span className="absolute top-2 right-2 bg-white/85 backdrop-blur-sm px-2 py-0.5 rounded text-xs shadow-sm font-semibold">🎨</span>
                  </div>
                </div>
              </ScrollAnimate>

              {/* Polaroid 2 */}
              <ScrollAnimate animation="zoom-in" delay={200} className="flex flex-col items-center">
                <div className="bg-white p-4 border border-zinc-200 shadow-lg -rotate-3 hover:rotate-0 hover:scale-102 hover:shadow-2xl transition-all duration-300 w-full max-w-[240px] cursor-pointer">
                  <div className="h-44 bg-[#B83E55]/10 relative flex items-center justify-center overflow-hidden mb-4">
                    <img src="/images/IMG_20251029_141521.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Moment 2" />
                    <span className="absolute top-2 right-2 bg-white/85 backdrop-blur-sm px-2 py-0.5 rounded text-xs shadow-sm font-semibold">❤️</span>
                  </div>
                </div>
              </ScrollAnimate>

              {/* Polaroid 3 */}
              <ScrollAnimate animation="zoom-in" delay={300} className="flex flex-col items-center">
                <div className="bg-white p-4 border border-zinc-200 shadow-lg rotate-3 hover:rotate-0 hover:scale-102 hover:shadow-2xl transition-all duration-300 w-full max-w-[240px] cursor-pointer">
                  <div className="h-44 bg-[#B83E55]/10 relative flex items-center justify-center overflow-hidden mb-4">
                    <img src="/images/IMG_20251104_143342.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Moment 3" />
                    <span className="absolute top-2 right-2 bg-white/85 backdrop-blur-sm px-2 py-0.5 rounded text-xs shadow-sm font-semibold">🛵</span>
                  </div>
                </div>
              </ScrollAnimate>

              {/* Polaroid 4 */}
              <ScrollAnimate animation="zoom-in" delay={400} className="flex flex-col items-center">
                <div className="bg-white p-4 border border-zinc-200 shadow-lg -rotate-2 hover:rotate-0 hover:scale-102 hover:shadow-2xl transition-all duration-300 w-full max-w-[240px] cursor-pointer">
                  <div className="h-44 bg-[#B83E55]/10 relative flex items-center justify-center overflow-hidden mb-4">
                    <img src="/images/IMG_20251107_113103.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Moment 4" />
                    <span className="absolute top-2 right-2 bg-white/85 backdrop-blur-sm px-2 py-0.5 rounded text-xs shadow-sm font-semibold">🌅</span>
                  </div>
                </div>
              </ScrollAnimate>

              {/* Polaroid 5 */}
              <ScrollAnimate animation="zoom-in" delay={150} className="flex flex-col items-center">
                <div className="bg-white p-4 border border-zinc-200 shadow-lg -rotate-1 hover:rotate-0 hover:scale-102 hover:shadow-2xl transition-all duration-300 w-full max-w-[240px] cursor-pointer">
                  <div className="h-44 bg-[#B83E55]/10 relative flex items-center justify-center overflow-hidden mb-4">
                    <img src="/images/IMG-20260509-WA0165.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Moment 5" />
                    <span className="absolute top-2 right-2 bg-white/85 backdrop-blur-sm px-2 py-0.5 rounded text-xs shadow-sm font-semibold">☕</span>
                  </div>
                </div>
              </ScrollAnimate>

              {/* Polaroid 6 */}
              <ScrollAnimate animation="zoom-in" delay={250} className="flex flex-col items-center">
                <div className="bg-white p-4 border border-zinc-200 shadow-lg rotate-2 hover:rotate-0 hover:scale-102 hover:shadow-2xl transition-all duration-300 w-full max-w-[240px] cursor-pointer">
                  <div className="h-44 bg-[#B83E55]/10 relative flex items-center justify-center overflow-hidden mb-4">
                    <img src="/images/Snapchat-2123842091.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Moment 6" />
                    <span className="absolute top-2 right-2 bg-white/85 backdrop-blur-sm px-2 py-0.5 rounded text-xs shadow-sm font-semibold">🤳</span>
                  </div>
                </div>
              </ScrollAnimate>

              {/* Polaroid 7 */}
              <ScrollAnimate animation="zoom-in" delay={350} className="flex flex-col items-center">
                <div className="bg-white p-4 border border-zinc-200 shadow-lg -rotate-2 hover:rotate-0 hover:scale-102 hover:shadow-2xl transition-all duration-300 w-full max-w-[240px] cursor-pointer">
                  <div className="h-44 bg-[#B83E55]/10 relative flex items-center justify-center overflow-hidden mb-4">
                    <img src="/images/Snapchat-349491329.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Moment 7" />
                    <span className="absolute top-2 right-2 bg-white/85 backdrop-blur-sm px-2 py-0.5 rounded text-xs shadow-sm font-semibold">🍜</span>
                  </div>
                </div>
              </ScrollAnimate>

              {/* Polaroid 8 */}
              <ScrollAnimate animation="zoom-in" delay={450} className="flex flex-col items-center">
                <div className="bg-white p-4 border border-zinc-200 shadow-lg rotate-1 hover:rotate-0 hover:scale-102 hover:shadow-2xl transition-all duration-300 w-full max-w-[240px] cursor-pointer">
                  <div className="h-44 bg-[#B83E55]/10 relative flex items-center justify-center overflow-hidden mb-4">
                    <img src="/images/Snapchat-906714358.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Moment 8" />
                    <span className="absolute top-2 right-2 bg-white/85 backdrop-blur-sm px-2 py-0.5 rounded text-xs shadow-sm font-semibold">✨</span>
                  </div>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </section>

        {/* FOOTER SECTION */}
        <footer className="relative bg-[#B83E55] text-[#FFF5F6] py-20 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('/images/hero-bg.png')", backgroundSize: "cover" }}></div>
          <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center gap-6">
            
            <ScrollAnimate animation="zoom-in" className="flex flex-col items-center gap-4">
              <FlowerLogo size={56} color="#D4AF37" className="romantic-pulse" />
              <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-wide text-white">
                Iqbal &amp; Alvairani
              </h2>
              <div className="h-0.5 w-16 bg-[#D4AF37]"></div>
            </ScrollAnimate>

            <ScrollAnimate animation="fade-up" delay={200} className="flex flex-col items-center gap-4">
              <p className="text-sm text-[#FFF5F6]/80 leading-relaxed italic max-w-md">
                "Katanya, jarak terjauh bukanlah kilometer, tapi ketika kita berhenti tertawa bersama. Di sini kami belajar untuk terus saling menertawakan hal-hal kecil."
              </p>
            </ScrollAnimate>

            <div className="h-px w-full bg-[#FFF5F6]/10 my-6"></div>

            <ScrollAnimate animation="fade-up" delay={400} className="text-xs text-[#FFF5F6]/60 flex flex-col gap-2">
              <p>Terima kasih sudah mampir dan ikut membaca potongan cerita perjalanan kami berdua.</p>
              <p className="mt-4 font-semibold text-[#D4AF37] tracking-[0.2em] uppercase font-serif">Dibuat dengan Kasih</p>
              <p className="font-bold text-sm text-white">Ibal &amp; Aya &copy; 2026</p>
            </ScrollAnimate>
          </div>
        </footer>

      </div>
    </div>
  );
};
