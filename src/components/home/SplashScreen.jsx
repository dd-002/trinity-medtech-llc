"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SplashScreen() {
  const [phase, setPhase] = useState("idle"); // idle | breathe-in | breathe-out | logo | done
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setPhase("breathe-in");

    const totalDuration = 5000; // 5 seconds for full circle fill
    const intervalTime = 50; // update every 50ms
    const steps = totalDuration / intervalTime;
    const increment = 100 / steps;

    const fillInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(fillInterval);
          setPhase("logo");
          return 100;
        }
        if (newProgress >= 50 && phase !== "breathe-out") {
          setPhase("breathe-out");
        }
        return newProgress;
      });
    }, intervalTime);

    // After full fill, show logo and fade out
    setTimeout(() => setPhase("done"), 8500);
    setTimeout(() => setIsVisible(false), 9500);

    return () => clearInterval(fillInterval);
  }, []);

  if (!isVisible) return null;

  const circleRadius = 45;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 ${
        phase === "done" ? "opacity-0" : "opacity-100"
      }`}
      style={{ zIndex: 9999 }}
    >
      {/* Circular Loader */}
      {phase !== "logo" && phase !== "done" && (
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Base ring */}
          <div className="absolute w-full h-full rounded-full border-4 border-green-700 border-opacity-30"></div>

          {/* Animated stroke */}
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={circleRadius}
              stroke="#22c55e"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
                transition: "stroke-dashoffset 0.05s linear",
              }}
            />
          </svg>

          {/* Text instruction */}
          <p className="absolute top-[110%] text-gray-300 text-lg animate-fade-in">
            {phase === "breathe-in"
              ? "Breathe In..."
              : phase === "breathe-out"
              ? "Breathe Out..."
              : ""}
          </p>
        </div>
      )}

      {/* Logo & Final Text */}
      {phase === "logo" && (
        <div className="flex flex-col items-center space-y-4 animate-fade-in-up">
          {/* <Image
            src="/logos/logoc.svg"
            alt="Trinity Logo"
            width={100}
            height={100}
            className="animate-glow"
          /> */}
          <h1 className="text-green-400 font-bold text-5xl">TMT</h1>
          <p className="text-lg text-gray-300">Your, wellness journey</p>
          <h1 className="text-2xl font-semibold text-green-400">
            Starts Here
          </h1>
        </div>
      )}
    </div>
  );
}
