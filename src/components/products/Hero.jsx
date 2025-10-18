"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import CTAButton from "@/components/CTAButton";
import WordsPullUpMotion from "../animations/WordsPullUp";

const slides = [
  {
    title: "Products",
    blurb: "Explore our Pro-grade products from brands across the world",
    cta: "Explore",
  },
];

export default function Hero() {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [index, setIndex] = useState(0);

  const total = slides.length;

  useEffect(() => {
    const v = videoRef.current;
    if (v) paused ? v.pause() : v.play().catch(() => {});
  }, [paused]);

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <section className="relative isolate w-full min-h-[98vh] md:min-h-[98vh] lg:min-h-[98vh] overflow-hidden rounded-[18px] pt-[450px] md:pt-[500px]">
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
        <source src="/video/stock2.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full text-left text-white">
          {/* Title line */}
          <div>
            <WordsPullUpMotion text="Products" fontSize="4rem" delay={0.25} />
          </div>

          {/* Subtitle line */}
          <div className="mt-3 sm:mt-4">
            <WordsPullUpMotion
              text="Explore our Pro-grade products from brands across the world"
              weight={300}
              className="text-white/85"
              fontSize="1.2rem"
              delay={0.35}
              opacity={0.85}
            />
          </div>

          {/* CTA */}
          <div
            key={`cta-${index}`}
            className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 transition-all duration-500 ease-out delay-200"
          >
            <CTAButton text={slides[index].cta} href="#discover" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute right-4 sm:right-6 bottom-4 sm:bottom-6 z-10 flex items-center gap-2 sm:gap-3 md:gap-5">
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="group grid place-items-center size-9 sm:size-10 text-white "
        >
          <ChevronLeft className="size-5 sm:size-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-out hover:bg-white
                         ${
                           i === index
                             ? "w-8 sm:w-10 bg-[#21a70f] shadow-[0_0_0_3px_rgba(0,0,0,0.15)]"
                             : "w-3 sm:w-4 bg-white"
                         }`}
            />
          ))}
        </div>

        <button
          aria-label="Next slide"
          onClick={next}
          className="group grid place-items-center size-9 sm:size-10 text-white "
        >
          <ChevronRight className="size-5 sm:size-6 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>

        <button
          aria-label={
            paused ? "Play background video" : "Pause background video"
          }
          onClick={() => setPaused((p) => !p)}
          className="group grid place-items-center size-9 sm:size-10 text-white "
        >
          {paused ? (
            <Play className="size-5 sm:size-6" />
          ) : (
            <Pause className="size-5 sm:size-6" />
          )}
        </button>
      </div>
    </section>
  );
}
