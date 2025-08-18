"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LogoProps {
  onOpenMenu: () => void;
}

export default function Logo({ onOpenMenu }: LogoProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 1200); // stops after pulse
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <button
        onClick={onOpenMenu}
        className={`transition-transform ${isAnimating ? "animate-pulse scale-105" : "scale-100"
          }`}
      >
        <Image
          src="/logo.png" // replace with your logo file path
          alt="Logo"
          width={180}
          height={180}
          className="rounded-full object-cover"
          priority
        />
        <span className="text-white">Open Menu</span>
      </button>
      
    </div>

  );
}
