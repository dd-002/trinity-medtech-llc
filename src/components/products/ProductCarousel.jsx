"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CTAButton from "@/components/CTAButton";

export default function ProductCarousel({
  stories = [],
  delay = 4000,
  cardGap = 16,
}) {
  const total = stories.length;
  if (!total) return null;

  const slides = [...stories, ...stories, ...stories]; // Triple for better seamless loop
  const trackRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const cardWidthRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

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

  // Initialize scroll position to middle set (second copy)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    requestAnimationFrame(() => {
      const step = cardWidthRef.current + cardGap;
      // Start at the beginning of the second set
      track.scrollLeft = total * step;
      setActiveIndex(0);
    });
  }, [stories, cardGap, total]);

  // Seamless loop repositioning
  const handleLoopReset = () => {
    const track = trackRef.current;
    if (!track || isScrollingRef.current) return;

    const step = cardWidthRef.current + cardGap;
    const scrollPos = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;
    
    // Calculate which set we're in
    const currentSet = Math.floor(scrollPos / (total * step));
    
    // Reset to middle set if we're in first or last set
    if (currentSet === 0 || currentSet === 2) {
      const currentIndex = Math.round(scrollPos / step) % total;
      const newScrollPos = total * step + currentIndex * step;
      track.scrollLeft = newScrollPos;
    }
  };

  // Scroll helpers
  const scrollNext = () => {
    const track = trackRef.current;
    if (!track || isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    const step = cardWidthRef.current + cardGap;
    
    track.scrollBy({ left: step, behavior: "smooth" });
    setProgress(0);

    // Wait for smooth scroll to complete
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      handleLoopReset();
      
      const idx = Math.round(track.scrollLeft / step) % total;
      setActiveIndex(idx);
      isScrollingRef.current = false;
    }, 600);
  };

  const scrollPrev = () => {
    const track = trackRef.current;
    if (!track || isScrollingRef.current) return;
    
    isScrollingRef.current = true;
    const step = cardWidthRef.current + cardGap;
    
    track.scrollBy({ left: -step, behavior: "smooth" });
    setProgress(0);

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      handleLoopReset();
      
      const idx = Math.round(track.scrollLeft / step) % total;
      setActiveIndex(idx);
      isScrollingRef.current = false;
    }, 600);
  };

  // Sync active index while user scrolls manually
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let rafId = null;
    let userScrollTimeout = null;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const step = cardWidthRef.current + cardGap;
        const idx = Math.round(track.scrollLeft / step) % total;
        setActiveIndex(idx);
        
        // Reset progress on manual scroll
        if (!isScrollingRef.current) {
          setProgress(0);
        }
      });

      // Detect when user stops scrolling
      if (userScrollTimeout) clearTimeout(userScrollTimeout);
      userScrollTimeout = setTimeout(() => {
        if (!isScrollingRef.current) {
          handleLoopReset();
        }
      }, 150);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (userScrollTimeout) clearTimeout(userScrollTimeout);
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
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [delay, total]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden py-8 bg-[#d2f0d2]">
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
              className="snap-start flex-shrink-0 w-[300px] sm:w-[300px] md:w-[400px] lg:w-[500px] h-[400px] sm:h-[400px] md:h-[550px] rounded-lg overflow-hidden flex flex-col cursor-pointer hover:-translate-y-3 transition-all duration-300"
            >
              {/* Image Section - Takes 60% of height */}
              <div className="relative h-[60%] w-full">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width:640px) 70vw, (max-width:1024px) 45vw, 30vw"
                />
              </div>

              {/* Yellow Content Section - Takes 40% of height */}
              <div className="h-[40%] bg-[#349334] p-6 flex flex-col justify-between">
                <div>
                  {s.subtitle && (
                    <h2 className="text-black text-2xl sm:text-3xl font-bold mb-3 uppercase tracking-tight">
                      {s.subtitle}
                    </h2>
                  )}
                  <p className="text-black text-sm sm:text-base leading-relaxed">
                    {s.title}
                  </p>
                </div>

                {s.href && (
                  <CTAButton
                    href={s.href}
                    text={
                      <span className="flex items-center gap-2">
                        DISCOVER MORE <ChevronRight className="w-4 h-4" />
                      </span>
                    }
                    normalColor="transparent"
                    hoverColor="#228611"
                    normalBorder="border-2 border-black"
                    hoverBorder="border-2 border-[#228611]"
                    className="w-fit px-6 py-2.5 rounded-md text-black hover:text-white font-semibold text-sm transition-all duration-300"
                  />
                )}
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
            className="p-2 grid place-items-center text-black disabled:opacity-50"
            disabled={isScrollingRef.current}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:-translate-x-1" />
          </button>

          {/* Slide indicators */}
          <div className="flex items-center gap-2 sm:gap-3">
            {stories.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-out ${
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
            className="p-2 grid place-items-center text-black disabled:opacity-50"
            disabled={isScrollingRef.current}
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
