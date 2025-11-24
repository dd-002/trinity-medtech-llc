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
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-500 w-[calc(100%-2rem)] max-w-7xl bg-white  shadow-lg rounded-md px-5 md:px-8 py-3 flex items-center justify-between transition-all duration-300 text-black">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-3">
        {/* <Image
          src="/logos/logoc.svg"
          alt="TechnoGym Logo"
          width={20}
          height={8}
          className="object-contain"
        /> */}
        <span className="font-bold text-xl text-green-700">TMT </span>
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center space-x-6 font-bold text-sm">
        {/* Products */}
        <li className="relative group">
          <Link href={"/products"}>Products</Link>
        </li>

        {/* Brands */}
        <li className="relative  group">
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
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3
    opacity-0 invisible
    group-hover:opacity-100 group-hover:visible
    transition-all duration-200 ease-out
  "
          >
            <div
              className="pointer-events-auto w-max min-w-[200px] max-w-[min(400px,92vw)]
      rounded-lg border border-gray-200 bg-white shadow-xl p-6 origin-top"
            >
              <ul className="grid grid-cols-1 gap-2 text-sm">
                <li className="whitespace-nowrap">
                  <Link
                    href="/products/cosmed/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Cosmed
                  </Link>
                </li>
                <li className="whitespace-nowrap">
                  <Link
                    href="/products/hpcosmos/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    h/p/cosmos
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/contemplas/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Contemplas
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/ergoline/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Ergoline
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/zebris/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Zebris
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/kinvent/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Kinvent
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/humacnorm/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Humacnorm
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/ametris/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Ametris
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/ctn/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    CTN
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/cellit/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Cellit
                  </Link>
                </li>
                <li className="whitespace-nowrap">
                  <Link
                    href="/products/neurosoft/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Neurosoft
                  </Link>
                </li>

                <li className="whitespace-nowrap">
                  <Link
                    href="/products/movendo/categories"
                    className="hover:text-green-700 cursor-pointer"
                  >
                    Movendo
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
        <Link href={"/contact-us"}>
        <span>
          Get In Touch{" "}
          <span className="text-xs bg-[#21a70f] text-white px-1 rounded-sm">
            ↗
          </span>
        </span>
        </Link>

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
              <Link
                href={"/products"}
                className="w-full flex items-center justify-between hover:text-green-700"
              >
                <span>Products</span>
              </Link>
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
                    {[
                      { name: "Cosmed", href: "/products/cosmed/categories" },
                      { name: "h/p/cosmos", href: "/products/hpcosmos/categories" },
                      { name: "Contemplas", href: "/products/contemplas/categories" },
                      { name: "Ergoline", href: "/products/ergoline/categories" },
                      { name: "Zebris", href: "/products/zebris/categories" },
                      { name: "Kinvent", href: "/products/kinvent/categories" },
                      { name: "Humacnorm", href: "/products/humacnorm/categories" },
                      { name: "Ametris", href: "/products/ametris/categories" },
                      { name: "CTN", href: "/products/ctn/categories" },
                      { name: "Cellit", href: "/products/cellit/categories" },
                      { name: "Neurosoft", href: "/products/neurosoft/categories" },
                      { name: "Movendo", href: "/products/movendo/categories" },
                    ].map((brand) => (
                      <li key={brand.name}>
                        <Link
                          href={brand.href}
                          className="block hover:text-green-700 py-1"
                          onClick={() => setIsOpen(false)} // closes menu after navigation
                        >
                          {brand.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            <li className="hover:text-green-700 cursor-pointer"><Link href={"/faq"}>FAQ</Link></li>
            <li className="hover:text-green-700 cursor-pointer"><Link href={"/stories"}>Stories</Link></li>
            <li className="hover:text-green-700 cursor-pointer flex items-center space-x-1">
              <Link href={"/contact-us"}>
                            <span>Get In Touch</span>
              <span className="text-xs bg-green-400 text-black px-1 rounded-sm">
                ↗
              </span>
              </Link>
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
