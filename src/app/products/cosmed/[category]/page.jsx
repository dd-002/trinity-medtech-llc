"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/products/ProductGrid";


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
  const products = [
    {
      id: 1,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },
    {
      id: 2,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 3,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 4,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 5,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 6,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 7,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 8,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 9,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 10,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 11,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 12,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 13,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },{
      id: 14,
      name: "Technogym Run",
      price: 1045000,
      image: "/products/technogym-run.jpg",
      features: [
        { icon: <IconSledPush />, text: "Sled push mode" },
        { icon: <IconCushion />, text: "Cushioned and quiet" },
        { icon: <IconBootcamp />, text: "Bootcamp workouts" },
      ],
    },
    // Add more products...
  ];
  return (
    <main className="relative min-h-screen  overflow-hidden">
      <Navbar />
      <div className="container mx-auto px-4 md:px-14 py-24">
        <h1 className="text-4xl font-bold mb-8 px-14">From the House of <span className="text-green-700">COSMED</span></h1>
        <ProductGrid products={products} itemsPerPage={12} />
      </div>
      <Footer />
    </main>
  );
}
