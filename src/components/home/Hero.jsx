"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "UNICA",
    blurb: "The compact multi gym for complete, comfortable, versatile training at home.",
    cta: "Discover more",
  },
  {
    title: "SKILLRUN",
    blurb: "Pro-grade treadmill performance with power and speed training in one platform.",
    cta: "Explore SKILLRUN",
  },
  {
    title: "EXCITE LINE",
    blurb: "Connected cardio equipment designed for engagement and results.",
    cta: "See the line",
  },
];

export default function Hero() {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);

  const total = slides.length;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    paused ? v.pause() : v.play().catch(() => {});
  }, [paused]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="relative isolate w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-[88vh] overflow-hidden rounded-[18px]">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/video/poster.jpg"
      >
        <source src="/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

      {/* Text content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8 h-full flex items-center">
        <div className="w-full text-left text-white">
          <h1
            key={index}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight drop-shadow-md fade-up"
          >
            {slides[index].title}
          </h1>

          <p
            key={`p-${index}`}
            className="mt-4 max-w-2xl text-sm md:text-base lg:text-lg text-white/85 fade-up delay-100"
          >
            {slides[index].blurb}
          </p>

          <div
            key={`cta-${index}`}
            className="mt-8 flex items-center gap-4 fade-up delay-200"
          >
            <a
              href="#discover"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-400 text-black px-5 py-3 text-sm md:text-base font-semibold
                         shadow-[0_10px_30px_-10px_rgba(250,204,21,0.9)]
                         transition-all duration-200 ease-out
                         hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-12px_rgba(250,204,21,0.95)]
                         active:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300"
            >
              {slides[index].cta}
              <span className="inline-block size-2 rounded-full bg-black/80 animate-ping" />
            </a>

            <a
              href="#learn"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 text-white px-5 py-3 text-sm md:text-base
                         transition-all duration-200 ease-out
                         hover:bg-white/15 hover:border-white/50 hover:-translate-y-0.5 active:translate-y-0
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute right-5 md:right-8 bottom-5 md:bottom-8 z-10 flex items-center gap-3 md:gap-5">
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="group grid place-items-center size-9 md:size-10 rounded-full bg-white/10 text-white border border-white/20
                     backdrop-blur-md transition-all duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <ChevronLeft className="size-5 md:size-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ease-out bg-white/50 hover:bg-white
                         ${i === index ? "w-10 bg-yellow-400 shadow-[0_0_0_3px_rgba(0,0,0,0.15)]" : "w-4"}`}
            />
          ))}
        </div>

        <button
          aria-label="Next slide"
          onClick={next}
          className="group grid place-items-center size-9 md:size-10 rounded-full bg-white/10 text-white border border-white/20
                     backdrop-blur-md transition-all duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          <ChevronRight className="size-5 md:size-6 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>

        <button
          aria-label={paused ? "Play background video" : "Pause background video"}
          onClick={() => setPaused((p) => !p)}
          className="ml-1 grid place-items-center size-9 md:size-10 rounded-full bg-white/10 text-white border border-white/20
                     backdrop-blur-md transition-all duration-200 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        >
          {paused ? <Play className="size-5 md:size-6" /> : <Pause className="size-5 md:size-6" />}
        </button>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Now showing: {slides[index].title}. Slide {index + 1} of {total}.
      </div>
    </section>
  );
}
