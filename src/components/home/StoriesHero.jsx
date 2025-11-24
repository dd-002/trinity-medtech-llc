"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";


export default function BioHero() {
  const logoSrc = '/logos/logob.svg';
  const heroSrc = '/stock/stock2.jpg';

  return (
    <section className="w-full bg-[#F7F8F4]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left: brand + copy */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              {/* <div className="relative size-5  overflow-hidden ring-1 ring-white bg-white">
                <Image
                  src={logoSrc}
                  alt="Brand logo"
                  fill
                  sizes="20px"
                  className="object-cover"
                  priority
                />
              </div> */}
              <span className="text-sm  tracking-wide text-[#244220]">
                Trinity • Healthtech
              </span>
            </div>

            <h1 className="text-green-600 text-4xl sm:text-5xl font-semibold leading-tight">
              You are more than human.
            </h1>

            <p className="mt-5 max-w-xl text-[#2c3c2c]/80">
             At Trinity, we bridge innovation, technology, and healthcare—connecting leading global health brands with the professionals and institutions that need them most. As a trusted health tech dealership, we deliver reliability, service excellence, and future-ready solutions that advance care and empower better health outcomes. Learn more about us through our customers.
            </p>

            <div className="mt-8">
              <Link
                href="#discover"
                className="inline-flex items-center gap-3 rounded-lg bg-green-600 text-white px-5 py-3 text-sm font-medium shadow-sm hover:bg-[#1f381c] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#244220]"
              >
                Discover
                <span
                  aria-hidden="true"
                  className="inline-flex items-center justify-center size-6 rounded-full bg-white/15"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="opacity-90"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          {/* Right: image in soft card */}
          <div className="relative">
            <div className="relative rounded-lg bg-white shadow-[0_1px_0_0_rgba(0,0,0,0.04)] ring-1 ring-black/5 overflow-hidden">
              <div className="absolute inset-0 bg-[#244220]/5" />
              <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3]">
                <Image
                  src={heroSrc}
                  alt="Illustration"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover mix-blend-multiply"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
