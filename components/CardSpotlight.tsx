"use client";

import React, { useState, useRef, PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardSpotlightProps extends PropsWithChildren {
  className?: string;
  onClick?: () => void;
}

const CardSpotlight: React.FC<CardSpotlightProps> = ({ children, className, onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-card cursor-pointer transition-transform duration-300 hover:scale-105",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        animate={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,182,255,.1), transparent 40%)`,
          opacity,
        }}
        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
        style={{
          opacity,
          WebkitMaskImage: "radial-gradient(100% 100% at center, white, transparent)",
        }}
      />
    </div>
  );
};

export default CardSpotlight;