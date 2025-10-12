"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/products/ProductGrid";

// Icon components
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
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const category = searchParams.get("category") || "all";

  const categories = [
    { key: "all", label: "All Products" },
    { key: "cardio", label: "Cardio Equipment" },
    { key: "strength", label: "Strength Machines" },
    { key: "weights", label: "Free Weights" },
    { key: "accessories", label: "Accessories" },
  ];

  const products = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    name: "Technogym Run",
    category: i % 2 === 0 ? "cardio" : "strength",
    price: 1045000,
    image: "/products/technogym-run.jpg",
    features: [
      { icon: <IconSledPush />, text: "Sled push mode" },
      { icon: <IconCushion />, text: "Cushioned and quiet" },
      { icon: <IconBootcamp />, text: "Bootcamp workouts" },
    ],
  }));

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "all") params.delete("category");
    else params.set("category", cat);
    router.push(`?${params.toString()}`, { scroll: false });
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (sidebarOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [sidebarOpen]);

  return (
    <main className="relative min-h-screen bg-gray-50 overflow-hidden pt-15">
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-green-700 text-white rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰ Category"}
      </button>

      <div className="flex flex-col lg:flex-row container mx-auto px-4 md:px-10 py-20 gap-8">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-24 left-0 h-full lg:h-[80vh] w-64 bg-white shadow-lg transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-40 lg:translate-x-0 lg:w-1/5 rounded-xl`}
          style={{
            minHeight: "600px", // fixed vertical size on desktop
          }}
        >
          <div className="p-6 h-full overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6 text-green-700">
              Categories
            </h2>
            <div className="flex flex-col space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`text-left px-3 py-2 rounded-lg border transition-colors ${
                    category === cat.key
                      ? "bg-green-700 text-white border-green-700"
                      : "bg-white text-gray-700 hover:bg-green-50 border-gray-200"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 lg:ml-6">
          <h1 className="text-4xl font-bold mb-8">
            From the House of <span className="text-green-700">COSMED</span>
          </h1>
          <ProductGrid products={filteredProducts} itemsPerPage={12} />
        </section>
      </div>

      <Footer />
    </main>
  );
}
