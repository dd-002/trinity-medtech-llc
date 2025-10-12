import React from "react";
import CTAButton from "../CTAButton";
import Image from "next/image";

export default function BrandSection() {
  const categories = [
    {
      title: "STRENGTH",
      description:
        "Elevate training with reliable equipment that seamlessly connects to a whole...",
      image: "/images/strength-equipment.jpg",
      buttonText: "BROWSE EQUIPMENT",
    },
    {
      title: "FUNCTIONAL",
      description:
        "Equipment designed around the needs of those who aim at excellence in functiona...",
      image: "/images/functional-equipment.jpg",
      buttonText: "BROWSE EQUIPMENT",
    },
    {
      title: "MEDICAL",
      description:
        "Superior results for patients and athletes alike, with objective evaluation and...",
      image: "/images/medical-equipment.jpg",
      buttonText: "BROWSE ALL EQUIPMENT",
    },
    {
      title: "PILATES",
      description:
        "Sleek aesthetics, fine craftsmanship and top performance honor the Pilates...",
      image: "/images/pilates-equipment.jpg",
      buttonText: "BROWSE EQUIPMENT",
    },
    {
      title: "PILATES",
      description:
        "Sleek aesthetics, fine craftsmanship and top performance honor the Pilates...",
      image: "/images/pilates-equipment.jpg",
      buttonText: "BROWSE EQUIPMENT",
    },
        {
      title: "PILATES",
      description:
        "Sleek aesthetics, fine craftsmanship and top performance honor the Pilates...",
      image: "/images/pilates-equipment.jpg",
      buttonText: "BROWSE EQUIPMENT",
    },
        {
      title: "PILATES",
      description:
        "Sleek aesthetics, fine craftsmanship and top performance honor the Pilates...",
      image: "/images/pilates-equipment.jpg",
      buttonText: "BROWSE EQUIPMENT",
    },
        {
      title: "PILATES",
      description:
        "Sleek aesthetics, fine craftsmanship and top performance honor the Pilates...",
      image: "/images/pilates-equipment.jpg",
      buttonText: "BROWSE EQUIPMENT",
    },
  ];

  return (
    <section className="bg-[#1a1a1a] py-16 px-4 sm:px-6 lg:px-8 mt-2 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-12 tracking-wide">
          Browse By
          <br />
          BRANDS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden bg-gray-600 rounded-lg transition-transform duration-3">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 "
                />
              </div>

              {/* Yellow Content Section */}
              <div className="bg-[#B0CE88] p-6 flex flex-col justify-between min-h-[240px]">
                <div>
                  <h3 className="text-xl font-bold text-black mb-3 tracking-wide">
                    {category.title}
                  </h3>
                  <p className="text-black text-sm leading-relaxed mb-6">
                    {category.description}
                  </p>
                </div>

                <button className="flex items-center text-black font-semibold text-sm hover:translate-x-2 transition-transform duration-200">
                  <span className="mr-2">▸</span>
                  {category.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
