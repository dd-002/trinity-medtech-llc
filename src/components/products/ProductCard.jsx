// components/ProductCard.jsx
"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block w-full sm:w-[320px] h-full"
    >
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl 
                   transition-all duration-300 border border-gray-100 hover:border-[#d4e8c2]
                   flex flex-col h-full"
      >
        {/* Product Image */}
        <div className="relative w-full h-64 overflow-hidden bg-[#f6f8f3]">
          <Image
            src={product.imageLink}
            alt={product.name}
            fill
            className="object-cover  transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="p-5 flex flex-col flex-grow">
          <h3
            className="text-lg font-semibold text-gray-900 mb-2 
                       line-clamp-2 group-hover:text-[#4f6f2f] transition-colors duration-300"
          >
            {product.name}
          </h3>

          <p
            className="text-sm text-gray-600 leading-snug line-clamp-3 flex-grow"
            title={product.smallDesc}
          >
            {product.smallDesc}
          </p>

          <div className="mt-4">
            <span
              className="inline-block text-[#4f6f2f] font-medium text-sm 
                         group-hover:underline transition-all"
            >
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
