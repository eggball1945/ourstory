"use client";

import React from "react";

interface FlowerLogoProps {
  className?: string;
  size?: number;
  color?: string;
}

export const FlowerLogo: React.FC<FlowerLogoProps> = ({
  className = "",
  size = 48,
  color = "#D4AF37", // Elegant gold accent color
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all duration-300 hover:rotate-12`}
    >
      {/* Outer elegant thin dotted ring */}
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="1.5" strokeDasharray="5 5" opacity="0.5" />
      
      {/* Outer solid thin accent ring */}
      <circle cx="50" cy="50" r="40" stroke={color} strokeWidth="1" opacity="0.3" />
      
      {/* Central pistil */}
      <circle cx="50" cy="50" r="6" fill={color} opacity="0.8" />
      
      {/* Minimalist modern line-art flower petals */}
      {/* 4 main petals (vertical / horizontal) */}
      <path
        d="M50 50 C40 20, 60 20, 50 50 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 50 C20 40, 20 60, 50 50 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 50 C40 80, 60 80, 50 50 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 50 C80 40, 80 60, 50 50 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* 4 diagonal secondary petals */}
      <path
        d="M50 50 C30 30, 42 18, 50 50 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d="M50 50 C18 42, 30 58, 50 50 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d="M50 50 C58 58, 42 70, 50 50 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <path
        d="M50 50 C70 42, 58 30, 50 50 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
};
