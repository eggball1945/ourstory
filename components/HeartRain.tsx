"use client";

import React, { useEffect, useState } from "react";

interface Heart {
  id: number;
  left: number; // percentage (0 - 100)
  size: number; // pixels (10 - 24)
  delay: number; // seconds
  duration: number; // seconds
  opacity: number;
  swayDelay: number;
}

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  driftX: number;
}

export const HeartRain: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);

  useEffect(() => {
    // Generate randomized background falling hearts
    const heartCount = 25;
    const generated: Heart[] = Array.from({ length: heartCount }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 14) + 10,
      delay: Math.random() * -18,
      duration: Math.random() * 6 + 10,
      opacity: Math.random() * 0.4 + 0.2,
      swayDelay: Math.random() * 5,
    }));
    setHearts(generated);
  }, []);

  // Sparkly click/touch burst of hearts
  useEffect(() => {
    let clickId = 0;
    
    const triggerBurst = (clientX: number, clientY: number) => {
      // Generate 4 mini rising hearts
      const newHearts = Array.from({ length: 4 }).map(() => ({
        id: clickId++,
        x: clientX,
        y: clientY,
        size: Math.floor(Math.random() * 8) + 8, // 8px - 16px
        driftX: (Math.random() - 0.5) * 50, // horizontal sway drift
      }));

      setClickHearts((prev) => [...prev, ...newHearts]);

      // Prune after animation completes (1 second)
      setTimeout(() => {
        setClickHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
      }, 1000);
    };

    const handleClick = (e: MouseEvent) => {
      triggerBurst(e.clientX, e.clientY);
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      triggerBurst(touch.clientX, touch.clientY);
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouch);
    
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      <style>{`
        @keyframes heartFall {
          0% {
            transform: translateY(-10vh) translateX(0);
          }
          50% {
            transform: translateY(45vh) translateX(20px);
          }
          100% {
            transform: translateY(110vh) translateX(-15px);
          }
        }
        @keyframes heartSway {
          0%, 100% {
            transform: rotate(-12deg);
          }
          50% {
            transform: rotate(12deg);
          }
        }
        @keyframes clickHeartRise {
          0% {
            transform: translate(-50%, -50%) scale(0.6) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.3) translateY(-100px);
            opacity: 0;
          }
        }
        @keyframes heartbeatPulse {
          0%, 100% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.08);
          }
          45% {
            transform: scale(0.98);
          }
          60% {
            transform: scale(1.08);
          }
        }
        .falling-heart {
          position: absolute;
          top: -30px;
          animation-name: heartFall;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        .falling-heart svg {
          animation: heartSway 3.5s ease-in-out infinite;
        }
        .click-heart {
          position: fixed;
          animation: clickHeartRise 1s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
          color: #B83E55;
        }
        .romantic-pulse {
          animation: heartbeatPulse 2.4s infinite ease-in-out;
        }
      `}</style>

      {/* Background Falling Hearts Rain */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="falling-heart text-[#B83E55]/60"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              animationDelay: `${heart.swayDelay}s`,
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Reactive Click Heart Bursts */}
      {clickHearts.map((heart) => (
        <div
          key={heart.id}
          className="click-heart"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            marginLeft: `${heart.driftX}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
