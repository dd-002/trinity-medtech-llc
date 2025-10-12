// components/ProductCard.jsx
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-gray-50 rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
        {/* Product Image */}
        <div className="relative aspect-square bg-white p-6">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          
          <p className="text-2xl font-bold text-gray-900 mb-4">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          {/* Features List */}
          <ul className="space-y-3">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-1">
                  {feature.icon}
                </span>
                <span className="text-sm text-gray-700">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

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
