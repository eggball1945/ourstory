"use client";

import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

interface ScrollAnimateProps {
  children: React.ReactNode;
  animation: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out" | "rotate-in";
  duration?: number;
  delay?: number;
  ease?: string;
  className?: string;
}

export const ScrollAnimate: React.FC<ScrollAnimateProps> = ({
  children,
  animation,
  duration = 1000,
  delay = 0,
  ease = "outQuad",
  className = "",
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Set initial styles instantly using duration: 0 in animate
    let initialStyles: any = {};
    if (animation === "fade-up") initialStyles = { opacity: 0, translateY: 50 };
    else if (animation === "fade-down") initialStyles = { opacity: 0, translateY: -50 };
    else if (animation === "fade-left") initialStyles = { opacity: 0, translateX: 50 };
    else if (animation === "fade-right") initialStyles = { opacity: 0, translateX: -50 };
    else if (animation === "zoom-in") initialStyles = { opacity: 0, scale: 0.8 };
    else if (animation === "zoom-out") initialStyles = { opacity: 0, scale: 1.2 };
    else if (animation === "rotate-in") initialStyles = { opacity: 0, rotate: -15, scale: 0.9 };

    animate(el, {
      ...initialStyles,
      duration: 0,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let animeParams: any = {
              opacity: 1,
              duration,
              delay,
              ease,
            };

            if (animation === "fade-up" || animation === "fade-down") {
              animeParams.translateY = 0;
            } else if (animation === "fade-left" || animation === "fade-right") {
              animeParams.translateX = 0;
            } else if (animation === "zoom-in" || animation === "zoom-out") {
              animeParams.scale = 1;
            } else if (animation === "rotate-in") {
              animeParams.rotate = 0;
              animeParams.scale = 1;
            }

            animate(el, animeParams);
            observer.unobserve(el); // Only run once
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [animation, duration, delay, ease]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};
