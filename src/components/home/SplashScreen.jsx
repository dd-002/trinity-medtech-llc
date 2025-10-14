"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit after 2.5s
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Remove after animation ends (0.8s)
      setTimeout(() => setIsVisible(false), 800);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black  transition-transform duration-700 ease-in-out
      ${isExiting ? "-translate-y-full" : "translate-y-0"}`}
       style={{ zIndex: 9999 }}
    >
      <div className="animate-fade-in-up">
        <Image
          src="/logos/logoc.svg"
          alt="Splash Logo"
          width={100}
          height={100}
          className="animate-pulse"
        />
      </div>
    </div>
  );
}