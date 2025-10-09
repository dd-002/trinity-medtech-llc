"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CTAButton from "@/components/CTAButton";

export default function StoriesCarousel({
  stories = [],
  delay = 4000,
  cardGap = 16,
}) {
  const total = stories.length;
  if (!total) return null;

  const slides = [...stories, ...stories]; // duplicate for seamless loop
  const trackRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const cardWidthRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Measure card width on mount and resize
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const firstCard = track.querySelector("a, div");
      if (firstCard) cardWidthRef.current = firstCard.offsetWidth;
    };
    measure();

    const resizeObserver =
      typeof ResizeObserver !== "undefined" && trackRef.current
        ? new ResizeObserver(measure)
        : null;

    if (resizeObserver) resizeObserver.observe(trackRef.current);
    else window.addEventListener("resize", measure);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      else window.removeEventListener("resize", measure);
    };
  }, [stories]);

  // Initialize scroll position to middle for seamless loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    requestAnimationFrame(() => {
      track.scrollLeft = track.scrollWidth / 2;
      const step = cardWidthRef.current + cardGap;
      const idx = Math.round(track.scrollLeft / step) % total;
      setActiveIndex((idx + total) % total);
    });
  }, [stories, cardGap, total]);

  // Scroll helpers
  const scrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    const step = cardWidthRef.current + cardGap;
    track.scrollBy({ left: step, behavior: "smooth" });

    setTimeout(() => {
      if (track.scrollLeft >= track.scrollWidth / 2 - 1) {
        track.scrollLeft -= track.scrollWidth / 2;
      }
      const idx = Math.round(track.scrollLeft / step) % total;
      setActiveIndex((idx + total) % total);
      setProgress(0);
    }, 520);
  };

  const scrollPrev = () => {
    const track = trackRef.current;
    if (!track) return;
    const step = cardWidthRef.current + cardGap;

    if (track.scrollLeft <= 0) track.scrollLeft += track.scrollWidth / 2;
    track.scrollBy({ left: -step, behavior: "smooth" });

    setTimeout(() => {
      if (track.scrollLeft >= track.scrollWidth / 2 - 1) {
        track.scrollLeft -= track.scrollWidth / 2;
      }
      const idx = Math.round(track.scrollLeft / step) % total;
      setActiveIndex((idx + total) % total);
      setProgress(0);
    }, 520);
  };

  // Sync active index while user scrolls manually
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let rafId = null;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const step = cardWidthRef.current + cardGap;
        const idx = Math.round(track.scrollLeft / step) % total;
        setActiveIndex((idx + total) % total);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cardGap, total]);

  // Auto-progress interval
  useEffect(() => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (total === 0 || delay <= 0) return;

    const tickMs = 100;
    const step = 100 / (delay / tickMs);

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((p) => {
        if (p + step >= 100) {
          scrollNext();
          return 0;
        }
        return p + step;
      });
    }, tickMs);

    return () => {
      if (progressIntervalRef.current)
        clearInterval(progressIntervalRef.current);
    };
  }, [delay, total, activeIndex]);

  return (
    <section className="relative w-full overflow-hidden py-8 bg-[#f7f8f4] ">
      <div className="relative mx-auto pl-2">
        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scroll-snap-x mandatory no-scrollbar scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
          aria-label="Stories carousel"
        >
          {slides.map((s, idx) => (
            <div
              key={`${s.id}-${idx}`}
              className="snap-start flex-shrink-0 w-[300px] sm:w-[300px] md:w-[400px] lg:w-[600px] h-[400px] sm:h-[400px] md:h-[700px] rounded-lg overflow-hidden relative cursor-pointer"
              onClick={() => setProgress(0)}
            >
              <Image
                src={s.image}
                alt={s.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width:640px) 70vw, (max-width:1024px) 45vw, 30vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute left-4 bottom-4 right-4">
                {s.subtitle && (
                  <span className="inline-block text-yellow-400 text-xs sm:text-sm px-2 py-0.5 font-semibold">
                    {s.subtitle}
                  </span>
                )}
                <div className="mt-2 flex items-center justify-between gap-2 px-2">
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold drop-shadow-md truncate">
                    {s.title}
                  </h3>
                  {s.href && (
                    <CTAButton href={s.href} text={<ChevronRight />} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="z-10 flex items-center gap-2 sm:gap-3 md:gap-5 py-5 mx-auto">
          {/* Previous */}
          <button
            aria-label="Previous slide"
            onClick={scrollPrev}
            className="p-2 grid place-items-center text-black "
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-x-1" />
          </button>

          {/* Slide indicators */}
          <div className="flex items-center gap-2 sm:gap-3 ">
            {stories.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-out  ${
                  i === activeIndex
                    ? "w-8 sm:w-10 bg-[#244220]"
                    : "w-3 sm:w-4 bg-[#b6b6b6]"
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            aria-label="Next slide"
            onClick={scrollNext}
            className="p-2 grid place-items-center text-black"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
