"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X, Phone, Search, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState({
    products: false,
    brands: false,
  });

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl bg-white/90 backdrop-blur-md shadow-lg rounded-2xl px-5 md:px-8 py-3 flex items-center justify-between transition-all duration-300">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image
          src="/logos/logoc.svg"
          alt="TechnoGym Logo"
          width={20}
          height={8}
          className="object-contain"
        />
        <span className="font-bold text-xl text-green-700">TMT </span>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-6 font-bold text-sm">
        {/* Products */}
        <li className="relative group">
          <Link href={"/products"}>Products</Link>
        </li>

        {/* Brands */}
        <li className="relative group">
          <button
            className="flex items-center gap-1 hover:text-green-700 relative z-10"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Brands
            <ChevronDown
              size={16}
              className="transition-transform duration-200 group-hover:rotate-180"
            />
          </button>

          <div
            className="invisible opacity-0 translate-y-2 scale-[0.98]
               group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
               absolute left-1/2 -translate-x-1/2 top-[36px]
               transition-all duration-200 ease-out pointer-events-none group-hover:pointer-events-auto"
          >
            <div className="pointer-events-auto mt-3 w-max min-w-[200px] max-w-[min(400px,92vw)] rounded-2xl border border-gray-200 bg-white shadow-xl p-6 origin-top">
              <ul className="grid grid-cols-1 gap-2 text-sm">
                <li className="whitespace-nowrap">
                  <Link
                    href="/products/brands?brand=cosmed"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Cosmed
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/brands?brand=contemplas"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Contemplas
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/brands?brand=ergoline"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Ergoline
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/brands?brand=zebris"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Zebris
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/brands?brand=kinvent"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Kinvent
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/brands?brand=humacnorm"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Humacnorm
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/brands?brand=ametris"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Ametris
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/brands?brand=ctn"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    CTN
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/brands?brand=cellit"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Cellit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </li>

        <li className="hover:text-green-700 cursor-pointer">FAQ</li>
        <li className="hover:text-green-700 cursor-pointer">Stories</li>
      </ul>

      {/* Right Section */}
      <div className="hidden md:flex items-center space-x-5 text-sm font-bold">
        <span>
          Get In Touch{" "}
          <span className="text-xs bg-[#21a70f] text-white px-1 rounded-sm">
            ↗
          </span>
        </span>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-gray-800 hover:text-green-700"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Drawer with animation */}
      <div
        className={`absolute left-0 w-full md:hidden transition-all duration-200 ease-out ${
          isOpen
            ? "top-[64px] opacity-100 translate-y-0"
            : "pointer-events-none top-[64px] opacity-0 -translate-y-2"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-b-2xl shadow-md flex flex-col items-start p-6 space-y-4 animate-in">
          <ul className="flex flex-col space-y-3 font-medium text-gray-800 text-sm w-full">
            {/* Products collapsible with height animation */}
            <li>
              <button
                className="w-full flex items-center justify-between hover:text-green-700"
                onClick={() =>
                  setMobileOpen((p) => ({ ...p, products: !p.products }))
                }
                aria-expanded={mobileOpen.products}
              >
                <span>Products</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileOpen.products ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-200 ease-out ${
                  mobileOpen.products
                    ? "grid-rows-[1fr] opacity-100 mt-2"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-1 gap-3 text-[13px] text-gray-700">
                    <div>
                      <p className="text-gray-500 mb-2">Home Gym</p>
                      <ul className="space-y-1 pl-3">
                        <li className="hover:text-green-700">Treadmills</li>
                        <li className="hover:text-green-700">Bikes</li>
                        <li className="hover:text-green-700">Ellipticals</li>
                        <li className="hover:text-green-700">Rowers</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-2">Strength</p>
                      <ul className="space-y-1 pl-3">
                        <li className="hover:text-green-700">Racks</li>
                        <li className="hover:text-green-700">Benches</li>
                        <li className="hover:text-green-700">Dumbbells</li>
                        <li className="hover:text-green-700">Bundles</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-2">Accessories</p>
                      <ul className="space-y-1 pl-3">
                        <li className="hover:text-green-700">Bands</li>
                        <li className="hover:text-green-700">Mats & Pads</li>
                        <li className="hover:text-green-700">Storage</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            {/* Brands collapsible */}
            <li>
              <button
                className="w-full flex items-center justify-between hover:text-green-700"
                onClick={() =>
                  setMobileOpen((p) => ({ ...p, brands: !p.brands }))
                }
                aria-expanded={mobileOpen.brands}
              >
                <span>Brands</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    mobileOpen.brands ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid overflow-hidden transition-all duration-200 ease-out ${
                  mobileOpen.brands
                    ? "grid-rows-[1fr] opacity-100 mt-2"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-1 text-[13px] text-gray-700 pl-3">
                    <li className="hover:text-green-700">Personal</li>
                    <li className="hover:text-green-700">Artis</li>
                    <li className="hover:text-green-700">Excite</li>
                    <li className="hover:text-green-700">Skill</li>
                    <li className="hover:text-green-700">Biostrength</li>
                    <li className="hover:text-green-700">Pure Strength</li>
                    <li className="hover:text-green-700">My Selection</li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="hover:text-green-700 cursor-pointer">FAQ</li>
            <li className="hover:text-green-700 cursor-pointer">Stories</li>
            <li className="hover:text-green-700 cursor-pointer">Membership</li>
            <li className="hover:text-green-700 cursor-pointer flex items-center space-x-1">
              <span>Business</span>
              <span className="text-xs bg-green-400 text-black px-1 rounded-sm">
                ↗
              </span>
            </li>
          </ul>

          <div className="border-t border-gray-200 w-full pt-4">
            <button className="block w-full text-left font-semibold hover:text-green-700">
              Log in
            </button>
            <div className="flex items-center mt-3 space-x-2 text-sm">
              <Phone size={16} />
              <span>+919820052225</span>
            </div>
            <div className="mt-3">
              <Search
                className="cursor-pointer hover:text-green-700"
                size={20}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
