'use client';

import React, { useEffect, useState, useCallback, use } from 'react'; // 👈 Import 'use'
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

// Define the shape of the product data for better type safety (even in JS)
const DEFAULT_PRODUCT_DATA = {
  name: 'Product Not Found',
  smallDesc: 'Product details could not be loaded.',
  largeDesc: 'The requested product could not be found or the ID is invalid.',
  imageLink: '/image-placeholder.png',
  category: 'Unknown',
  brand: 'Unknown',
  price: '—', 
  officialPage: '#',
};

/**
 * Fetches product data from the API endpoint.
 * @param {string | string[] | undefined} productID - The ID of the product.
 * @returns {Promise<object | null>} The product data or null if fetching fails.
 */
async function fetchProduct(productID) {
  if (!productID || Array.isArray(productID)) return null;
  try {
    const res = await fetch(`/api/products/${productID}`, { cache: 'no-store' });
    if (!res.ok) {
      console.error(`Fetch error for product ${productID}: ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default function ProductPage({ params }) {
  // 💥 CORRECTED USAGE: Use React.use() to synchronously unwrap the params Promise 💥
  // This addresses the Next.js warning for future compatibility.
  const resolvedParams = use(params);
  const productID = resolvedParams?.productID; 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFound, setIsFound] = useState(false);

  const loadProduct = useCallback(async () => {
    if (!productID) {
      setLoading(false);
      setIsFound(false);
      return;
    }
    
    setLoading(true);
    setIsFound(false);
    
    const data = await fetchProduct(productID);
    
    setProduct(data);
    setIsFound(!!data);
    setLoading(false);

  }, [productID]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  const display = product ?? DEFAULT_PRODUCT_DATA;

  /* ---------------------- RENDER LOGIC ---------------------- */

  // 1. Loading State
  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center text-gray-400 text-lg bg-black">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Product Details…
        </div>
        <Footer />
      </>
    );
  }

  // 2. Not Found State (404)
  if (!isFound) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[#0b0b0b] text-white p-6">
          <h1 className="text-8xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-3xl font-semibold mb-3">Product Not Found</h2>
          <p className="text-gray-400 max-w-lg">
            We couldn't find the product you're looking for. Please check the ID or browse our <Link href="/" className="text-green-400 hover:underline">homepage</Link>.
          </p>
        </div>
        <Footer />
      </>
    );
  }
  
  // 3. Success State
  return (
    <>
      <main className="min-h-screen  text-black">

        {/* ====================== HERO SECTION (Title & Description) ====================== */}
        <section className="w-full px-6 sm:px-12 lg:px-24 pt-24 pb-10 text-center">

          <p className="text-sm text-black tracking-widest uppercase">
            {display.category}
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mt-2 tracking-tight text-green-400">
            {display.name}
          </h1>

          <p className="text-lg sm:text-xl text-gray-900 mt-4 max-w-2xl mx-auto leading-relaxed">
            {display.largeDesc}
          </p>
          
          {/* ====================== TECHNICAL SPECS BUTTON ====================== */}
          {display.officialPage && display.officialPage !== "#" && (
            <div className="mt-8">
                <Link
                href={display.officialPage}
                target="_blank"
                className="inline-block px-8 py-3 rounded-full bg-green-500 text-black font-semibold 
                           hover:bg-green-400 transition transform
                           tracking-wide uppercase text-sm" // Highlighted button style
                >
                📄 View Technical Specifications
                </Link>
            </div>
          )}
        </section>

        {/* ====================== IMAGE ====================== */}
        <section className="w-full flex justify-center py-10">
          <div className="relative w-full max-w-4xl h-[320px] sm:h-[460px] lg:h-[580px]">
            <Image
              src={display.imageLink || DEFAULT_PRODUCT_DATA.imageLink}
              alt={display.name}
              fill
              priority
              className="object-contain "
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 900px"
            />
          </div>
        </section>

        {/* ====================== CONTACT SECTION ====================== */}
        {/* Simplified and removed price/GST info as requested */}
        <section className="w-full px-6 sm:px-12 lg:px-24 py-16 bg-[#111] border-t border-gray-800">
          <div className="max-w-3xl mx-auto text-center space-y-6">

            <h2 className="text-2xl font-semibold text-white">
              Ready to Order? Contact Us
            </h2>

            <p className="text-gray-400 text-base">
              For pricing, bulk orders, or technical inquiries, please reach out directly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">

              <a
                href="tel:+919820052225"
                className="px-8 py-3 rounded-full border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition flex items-center justify-center font-medium"
              >
                📞 Call: +919820052225
              </a>

              <button
                // Add actual contact form or modal functionality here
                onClick={() => console.log('Opens Contact Form/Modal')} 
                className="px-8 py-3 rounded-full bg-green-500 text-black hover:bg-green-400 transition font-medium"
              >
                Request a Quote
              </button>

            </div>
          </div>
        </section>

        {/* --- FEATURES + FAQ SECTION REMOVED as requested --- */}
        
      </main>

      <Footer />
    </>
  );
}