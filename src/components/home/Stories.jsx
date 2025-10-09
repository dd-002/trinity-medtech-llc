"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CTAButton from "@/components/CTAButton";

/**
 * StoriesCarousel
 * - stories: [{ id, title, subtitle, image, href }]
 * - delay: ms before auto-advancing (default 4000)
 * - cardGap: px gap between cards (default 16 for tailwind gap-4)
 */
export default function StoriesCarousel({
  stories = [],
  delay = 4000,
  cardGap = 16,
}) {
  const total = stories.length;
  const slides = [...stories, ...stories]; // duplicate for seamless loop

  const trackRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const cardWidthRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0); // 0..total-1
  const [progress, setProgress] = useState(0); // 0..100

  // measure card width (first card) whenever layout/resizes
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const firstCard = track.querySelector("a");
      if (firstCard) cardWidthRef.current = firstCard.offsetWidth;
    };

    measure();

    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      resizeObserverRef.current = new ResizeObserver(measure);
      resizeObserverRef.current.observe(trackRef.current);
    } else {
      window.addEventListener("resize", measure);
    }

    return () => {
      if (resizeObserverRef.current) resizeObserverRef.current.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [stories]);

  // initialize scroll position to middle of duplicated track (so prev/next both work)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // wait a frame to ensure layout measured
    requestAnimationFrame(() => {
      if (track.scrollWidth > 0) {
        track.scrollLeft = track.scrollWidth / 2;
        // set active index based on position
        const w = cardWidthRef.current + cardGap;
        const idx = Math.round(track.scrollLeft / w) % total;
        setActiveIndex((idx + total) % total);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stories, cardGap, total]);

  // helper: scroll forward by one card (smooth) and fix reset if necessary
  const scrollNext = () => {
    const track = trackRef.current;
    if (!track) return;
    const step = Math.round(cardWidthRef.current || 240) + cardGap;
    track.scrollBy({ left: step, behavior: "smooth" });

    // After scroll finishes (approx), check and wrap if passed half
    setTimeout(() => {
      if (!track) return;
      if (track.scrollLeft >= track.scrollWidth / 2 - 1) {
        // jump back by half the scroll width to maintain duplication illusion
        track.scrollLeft = track.scrollLeft - track.scrollWidth / 2;
      }
      // update active index
      const idx = Math.round(track.scrollLeft / step) % total;
      setActiveIndex((idx + total) % total);
      setProgress(0);
    }, 520); // matches CSS smoothness; adjust if needed
  };

  const scrollPrev = () => {
    const track = trackRef.current;
    if (!track) return;
    const step = Math.round(cardWidthRef.current || 240) + cardGap;

    // If near left edge, move to second half first to allow backwards scroll
    if (track.scrollLeft <= 0) {
      track.scrollLeft = track.scrollLeft + track.scrollWidth / 2;
    }
    track.scrollBy({ left: -step, behavior: "smooth" });

    setTimeout(() => {
      if (!track) return;
      if (track.scrollLeft >= track.scrollWidth / 2 - 1) {
        track.scrollLeft = track.scrollLeft - track.scrollWidth / 2;
      }
      const idx = Math.round(track.scrollLeft / step) % total;
      setActiveIndex((idx + total) % total);
      setProgress(0);
    }, 520);
  };

  // sync active index while user scrolls manually (drag/track)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let rafId = null;
    const onScroll = () => {
      // throttle using rAF
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const step = (cardWidthRef.current || 240) + cardGap;
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

  // progress interval: increments progress, then triggers scrollNext
  useEffect(() => {
    // clear previous
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (total === 0 || delay <= 0) return;

    const tickMs = 100;
    const step = 100 / (delay / tickMs);

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((p) => {
        if (p + step >= 100) {
          // trigger forward and reset
          scrollNext();
          return 0;
        }
        return p + step;
      });
    }, tickMs);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, total, activeIndex]);

  if (total === 0) return null;

  return (
    <section className="relative w-full overflow-hidden py-8 bg-[#F7F8F4]">
      <div className="relative  mx-auto pl-2">
        {/* Track */}
        <div
          ref={trackRef}
          className="flex gap-2 overflow-x-auto scroll-snap-type-x mandatory no-scrollbar scroll-smooth"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
          aria-label="Stories carousel"
        >
          {slides.map((s, idx) => (
            <div
              key={`${s.id}-${idx}`}
              className="snap-start flex-shrink-0 w-[300px] sm:w-[300px] md:w-[400px] lg:w-[600px] h-[400px] sm:h-[400px] md:h-[700px] rounded-lg overflow-hidden relative"
              onClick={() => setProgress(0)}
            >
              {/* Card look */}
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 70vw, (max-width:1024px) 45vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Text & CTA */}
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
                    <CTAButton href={s.href} text={<ChevronRight />} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}

        {/* Progress indicators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={scrollPrev}
            aria-label="Previous story"
            className="  p-2   text-black"
          >
            <ChevronLeft className="size-5 md:size-6" />
          </button>
          {stories.map((_, i) => (
            <div
              key={i}
              className="relative h-1 w-5 sm:w-5 rounded-full bg-[#b6b6b6] overflow-hidden"
            >
              <div
                className={`absolute left-0 top-0 h-full bg-black transition-[width] ease-linear`}
                style={{
                  width: i === activeIndex ? `${progress}%` : "0%",
                  opacity: i === activeIndex ? 1 : 0.35,
                }}
              />
            </div>
          ))}

          <button
            onClick={scrollNext}
            aria-label="Next story"
            className="  p-2   text-black"
          >
            <ChevronRight className="size-5 md:size-6" />
          </button>
        </div>
      </div>

      {/* helper utility: hide scrollbar css (if not present in your globals.css) */}
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
