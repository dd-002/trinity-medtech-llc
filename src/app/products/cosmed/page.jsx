"use client";

import React from "react";
import Hero from "@/components/home/Hero";
import BrandSection from "@/components/products/BrandSection";
import BrandLogoSection from "@/components/home/BrandSection";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactUs";
import BentoShowcase from "@/components/products/Bento";

export default function ProductsPage() {

  return (
    <main className="relative min-h-screen  overflow-hidden">
      <Hero />
      <BrandSection />
      <BentoShowcase />
      <BrandLogoSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
