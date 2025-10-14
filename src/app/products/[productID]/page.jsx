'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

// Simple param unwrap (handles potential Promise-like params in app router)
async function unwrapParamsParam(p) {
  return (p && typeof p.then === 'function') ? await p : p;
}

// Fetch product data with a small, clean API wrapper
async function fetchProduct(productID) {
  if (!productID) return null;
  try {
    const res = await fetch(`/api/products/${productID}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default function ProductPage({ params }) {
  // Resolve params (supports Promise-based params in newer Next.js versions)
  const [resolvedParams, setResolvedParams] = useState(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const p = await unwrapParamsParam(params);
      if (mounted) setResolvedParams(p);
    })();
    return () => { mounted = false; };
  }, [params]);

  const productID = resolvedParams?.productID;

  // Local data fetch
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productID) {
      setLoading(false);
      return;
    }
    let mounted = true;
    (async () => {
      const data = await fetchProduct(productID);
      if (mounted) {
        setProduct(data);
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [productID]);

  const display = product ?? {
    name: 'Product Not Found',
    smallDesc: 'Product details could not be loaded.',
    largeDesc: 'The requested product could not be found.',
    imageLink: '/image-placeholder.png',
    category: 'Unknown',
    brand: 'Unknown',
    price: '—',
    officialPage: '#',
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-gray-500">Loading product…</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white text-gray-800">
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image Card */}
          <article className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex items-center justify-center">
            <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] max-w-md relative bg-white overflow-hidden rounded-xl">
              <Image
                src={display.imageLink || '/image-placeholder.png'}
                alt={display.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                unoptimized={false}
              />
            </div>
          </article>

          {/* Right: Details Card */}
          <section className="space-y-6 border-l border-gray-200 pl-6">
            <div className="text-sm uppercase tracking-wide text-gray-500">
              All Exercise Equipment
              <span className="ml-2 text-green-700 font-semibold">{display.category}</span>
            </div>

            <div className="text-sm text-gray-500">
              Brand:
              <span className="ml-2 text-gray-900 font-semibold">{display.brand}</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 leading-tight mb-1">
                {display.name}
              </h1>
              <p className="text-md text-gray-600 capitalize">
                {display.category} Equipment
              </p>
            </div>

            <div className="text-base leading-relaxed text-gray-700">
              <p className="mb-2">{display.largeDesc}</p>
              {display.officialPage && display.officialPage !== '#' && (
                <p className="mt-1">
                  <Link href={display.officialPage} target="_blank" className="text-green-700 underline hover:text-green-800 transition">
                    Technical Specifications
                  </Link>
                </p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="tel:+919820052225"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 rounded-lg text-gray-800 hover:bg-green-50 transition"
                aria-label="Call supplier"
              >
                📞 +91 98200 52225
              </a>
              <button className="flex-1 px-5 py-3 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 transition" aria-label="Contact us">
                CONTACT US
              </button>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </>
  );
}
