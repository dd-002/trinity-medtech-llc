

"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/products/ProductGrid";

function ProductsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const category = searchParams.get("category") || "all";
  const itemsPerPage = 12;
  const pageRef = useRef(1);
  const loaderRef = useRef(null);


  const categories = [
    { key: "all", label: "All Products" },
    { key: "Medical", label: "Medical" },
    { key: "Vetrinary", label: "Vetrinary" },
    { key: "Dental", label: "Dental" },
    { key: "Sports", label: "Sports" },
  ];

  // Fetch products
  const fetchProducts = async (pageNum = 1, reset = false) => {
    if (reset) setLoading(true);
    else setLoadingMore(true);

    try {
      const queryParams = new URLSearchParams({
        category: category !== "all" ? category : "",
        brand: "zebris",
        limit: itemsPerPage.toString(),
        page: pageNum.toString(),
      });

      const res = await fetch(`/api/products?${queryParams.toString()}`);
      const data = await res.json();

      const newProducts = data.data || [];
      setProducts((prev) => (reset ? newProducts : [...prev, ...newProducts]));

      const totalItems = data.pagination?.totalItems || 0;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      setHasMore(pageNum < totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // Fetch when category changes
  useEffect(() => {
    pageRef.current = 1;
    setHasMore(true);
    fetchProducts(1, true);
  }, [category]);

  // Infinite scroll observer
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && hasMore && !loadingMore && !loading) {
          setLoadingMore(true);
          pageRef.current += 1;
          fetchProducts(pageRef.current).finally(() => setLoadingMore(false));
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loading, category]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "all") params.delete("category");
    else params.set("category", cat);
    router.push(`?${params.toString()}`, { scroll: false });
    setSidebarOpen(false);
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-green-700 text-white rounded-md shadow-md hover:bg-green-800 transition"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰ Category"}
      </button>

      <div className="flex flex-col lg:flex-row container mx-auto px-4 md:px-10 py-20 gap-8">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-24 left-0 h-full lg:h-[80vh] w-64 bg-white 
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out z-40 
          lg:translate-x-0 lg:w-1/5 rounded-2xl shadow-md border border-gray-100`}
          style={{ minHeight: "600px" }}
        >
          <div className="p-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-3">
              Categories
            </h2>
            <div className="flex flex-col space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`flex items-center justify-between text-left px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
                    ${
                      category === cat.key
                        ? "bg-green-700 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                >
                  <span>{cat.label}</span>
                  {category === cat.key && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 lg:ml-6">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              From the House of{" "}
              <span className="text-green-700 font-black">Zebris</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto lg:mx-0">
              Explore precision-engineered ergometers designed for medical and
              performance excellence.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-10 h-10 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : products.length === 0 ? (
            <p className="text-gray-500 text-center">No products found.</p>
          ) : (
            <>
              <ProductGrid products={products} itemsPerPage={itemsPerPage} />

              {/* Infinite Scroll Loader */}
              <div ref={loaderRef} className="flex justify-center py-10">
                {loadingMore && (
                  <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
                )}
                {!hasMore && (
                  <p className="text-gray-500 text-sm mt-2">
                    You've reached the end of the list.
                  </p>
                )}
              </div>
            </>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-gray-600">Loading page...</div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
