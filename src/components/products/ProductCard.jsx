// components/ProductCard.jsx
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-[#d7dde2] rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
        {/* Product Image */}
        <div className="relative aspect-square bg-white p-6">
          <Image
            src={product.imageLink}
            alt={product.name}
            fill
            className="object-contain  transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>

          {/* Features List */}
          <span className="flex-shrink-0 mt-1">{product.smallDesc}</span>

          {/* Arrow Icon */}
          <div className="flex justify-end mt-4">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-gray-900 group-hover:text-white transition-colors">
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
