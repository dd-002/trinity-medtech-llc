// components/ProductCard.jsx
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-[#deebd1] rounded-lg overflow-hidden ">
        {/* Product Image */}
        <div className="relative w-full h-64 rounded-t-lg overflow-hidden">
          <Image
            src={product.imageLink}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>

          {/* Features List */}
          <span className="flex-shrink-0 mt-1">
            {product.smallDesc?.length > 65
              ? product.smallDesc.slice(0, 65) + "..."
              : product.smallDesc}
          </span>

          {/* Arrow Icon */}
          <div className="flex justify-end mt-4">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-green-600 group-hover:bg-green-900 group-hover:text-white transition-colors">
              <svg
                className="w-4 h-4"
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
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
