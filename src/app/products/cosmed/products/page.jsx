"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/products/ProductGrid";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  const category = searchParams.get("category") || "all";
  const page = parseInt(searchParams.get("page") || "1");
  const itemsPerPage = 12;

  const categories = [
    { key: "all", label: "All Products" },
    { key: "Cardio Pulmonary Exercise Test", label: "Cardio Pulmonary Exercise Test" },
    { key: "Indirect Calorimetry", label: "Indirect Calorimetry" },
    { key: "Pulmonary Function Test", label: "Pulmonary Function Test" },
    { key: "Spirometer", label: "Spirometer" },
    { key: "ECG", label: "ECG" },
    { key: "Ergometers", label: "Ergometers" },
    { key: "Software", label: "Software" },
  ];

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === "all") params.delete("category");
    else params.set("category", cat);
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
    setSidebarOpen(false);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          category: category !== "all" ? category : "",
          limit: itemsPerPage.toString(),
          page: page.toString(),
        });

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        const data = await res.json();
        console.log(data)
        setProducts(data.data || []);
        setTotalProducts(data.pagination.totalItems || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, page]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  console.log(totalPages)

  // 👇 Generate pagination numbers (e.g., 1, 2, 3 …)
  const paginationNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <main className="relative min-h-screen bg-gray-50 overflow-hidden pt-15">
      <Navbar />

      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-green-700 text-white rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? "✕" : "☰ Category"}
      </button>

      <div className="flex flex-col lg:flex-row container mx-auto px-4 md:px-10 py-20 gap-8">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-24 left-0 h-full lg:h-[80vh] w-64 bg-white shadow-lg transform 
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            transition-transform duration-300 ease-in-out z-40 
            lg:translate-x-0 lg:w-1/5 rounded-xl`}
          style={{
            minHeight: "600px",
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

          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <>
              <ProductGrid products={products} itemsPerPage={itemsPerPage} />

              {/* --- PAGINATION TABS BELOW --- */}
              { totalPages>1 &&(
                <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
                  {/* Prev Button */}
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md border ${
                      page === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-green-700 border-green-700 hover:bg-green-50"
                    }`}
                  >
                    Prev
                  </button>

                  {/* Page Numbers */}
                  {paginationNumbers.map((num) => (
                    <button
                      key={num}
                      onClick={() => handlePageChange(num)}
                      className={`px-4 py-2 rounded-md border transition-colors ${
                        num === page
                          ? "bg-green-700 text-white border-green-700"
                          : "bg-white text-green-700 border-green-700 hover:bg-green-50"
                      }`}
                    >
                      {num}
                    </button>
                  ))}

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-md border ${
                      page === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-green-700 border-green-700 hover:bg-green-50"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <Footer />
    </main>
  );
}
