"use client";

import React from "react";
import Hero from "@/components/home/Hero";
import ProductCarousel from "@/components/products/ProductCarousel";
import BrandSection from "@/components/products/BrandSection";
import BrandLogoSection from "@/components/home/BrandSection";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactUs";
import BentoShowcase from "@/components/products/Bento";

const STORIES = [
  {
    id: "1",
    title: "SKILLRUN — Pro Treadmill",
    subtitle: "Cardio",
    image: "/stock/stock1.jpg",
    href: "/products/skillrun",
  },
  {
    id: "2",
    title: "UNICA — Multi Gym",
    subtitle: "Strength",
    image: "/stock/stock6.png",
    href: "/products/unica",
  },
  {
    id: "3",
    title: "Pure Strength",
    subtitle: "Accessories",
    image: "/stock/stock2.jpg",
    href: "/brands/pure-strength",
  },
  {
    id: "4",
    title: "SKILLRUN — Pro Treadmill",
    subtitle: "Cardio",
    image: "/stock/stock7.png",
    href: "/products/skillrun",
  },
  {
    id: "5",
    title: "UNICA — Multi Gym",
    subtitle: "Strength",
    image: "/stock/stock6.png",
    href: "/products/unica",
  },
  {
    id: "6",
    title: "Pure Strength",
    subtitle: "Accessories",
    image: "/stock/stock2.jpg",
    href: "/brands/pure-strength",
  },
  {
    id: "7",
    title: "SKILLRUN — Pro Treadmill",
    subtitle: "Cardio",
    image: "/stock/stock7.png",
    href: "/products/skillrun",
  },
  {
    id: "8",
    title: "UNICA — Multi Gym",
    subtitle: "Strength",
    image: "/stock/stock6.png",
    href: "/products/unica",
  },
  {
    id: "9",
    title: "Pure Strength",
    subtitle: "Accessories",
    image: "/stock/stock2.jpg",
    href: "/brands/pure-strength",
  },
];

// Icon components for features
const IconSledPush = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="10" width="18" height="8" rx="1" />
  </svg>
);

const IconCushion = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
  </svg>
);

const IconBootcamp = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7" />
  </svg>
);

export default function ProductsPage() {

  return (
    <main className="relative min-h-screen  overflow-hidden">
      <Hero />
      <BrandSection />
      <BentoShowcase />
      <ProductCarousel stories={STORIES} />
      <BrandLogoSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
