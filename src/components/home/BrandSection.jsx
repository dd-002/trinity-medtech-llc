"use client";

import React from "react";
import Image from "next/image";

const companies = [
  { name: "Contemplas", logo: "/brands/contemplas.jpg" },
  { name: "Cosmed", logo: "/brands/cosmed.jpg" },
  { name: "Ergoline", logo: "/brands/ergoline.jpg" },
  { name: "hpcosmos", logo: "/brands/hpcosmos.jpeg" },
  { name: "Zebris", logo: "/brands/zebris.jpg" },
];

export default function BrandLogoSection() {
  return (
    <section className="w-full bg-black py-16 flex flex-col items-center">
      <h2 className="text-white text-center text-4xl md:text-5xl font-semibold mb-3">
        Our <span className="text-[#237618]">Partnerships</span>
      </h2>
      <p className="text-gray-300 text-center max-w-2xl mx-auto mb-12 text-lg">
        Proven. Trusted. Everywhere.
      </p>

      <div className="w-full max-w-6xl px-4 mx-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-8 justify-items-center items-center">
        {companies.map((company) => (
          <div
            key={company.name}
            className="relative w-[120px] h-[60px] md:h-[70px]"
            aria-label={company.name}
            title={company.name}
          >
            <Image
              src={company.logo}
              alt={company.name}
              fill
              sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
              className="object-contain grayscale hover:grayscale-0 transition duration-200 ease-out"
              priority={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
