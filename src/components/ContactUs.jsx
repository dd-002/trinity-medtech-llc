"use client";

import React from "react";
import Image from "next/image";
import CTAButton from "./CTAButton";


export default function ContactSection() {
  return (
    <section className="relative h-screen lg:h-screen w-full overflow-hidden">
      {/* ✅ Optimized Background Image */}
      <Image
        src="/stock/stock8.jpg"
        alt="Gym background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gray-900/60" />

      {/* Content Container */}
      <div className="relative h-full flex items-center ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-wide">
              GET IN TOUCH
              <br />
              WITH OUR TEAM
            </h2>

            <p className="text-white text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
              Whether you're curious about our business solutions, equipment, or training experiences,
              we're here to assist you every step of the way. Share your contact information, and our
              experts will get in touch to provide all the answers you need.
            </p>

            <CTAButton text="Contact Us" href="/contact" borderColor="white" hoverBorderColor="white"/>
          </div>
        </div>
      </div>
    </section>
  );
}
