"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import CTAButton from "@/components/CTAButton";

const slides = [
  {
    title: "Trinity",
    blurb:
      "Solution Provider for Sports Medicine & Rehabilitation for government offices and private companies.",
    cta: "Discover more",
    link: "/aboutus",
  },
  {
    title: "Explore Brands",
    blurb:
      "Top tier brands from all around the world",
    cta: "Explore Brands",
    link: "/products",
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
    <section className="relative isolate w-full min-h-screen md:min-h-screen lg:min-h-screen overflow-hidden rounded-[18px] pt-[420px] pb-[30px] md:pt-[500px]">
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

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full text-left text-white">
          <h1
            key={index}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight drop-shadow-md transition-all duration-500 ease-out"
          >
            {slides[index].title}
          </h1>

          <p
            key={`p-${index}`}
            className="mt-3 sm:mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-white/85 transition-all duration-500 ease-out delay-100"
          >
            {slides[index].blurb}
          </p>

          <div
            key={`cta-${index}`}
            className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4 transition-all duration-500 ease-out delay-200"
          >
            <CTAButton text={slides[index].cta} href={slides[index].link} />
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
