// app/components/Prodbox.tsx
import Link from 'next/link';

export default function Prodbox({ product }: { 
  product: { 
    id?: string;
    slug?: string;
    name?: string; 
    imageUrl?: string; 
    publishDate?: string; 
    isNew?: boolean 
  } 
}) {
  if (!product || (!product.name && !product.imageUrl)) {
    return (
      <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h3>
        </div>
      </div>
    );
  }

  const formattedDate = product.publishDate 
    ? new Date(product.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Date not available';

  console.log(product.slug);

  return (
    <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.imageUrl || "https://placehold.co/300x200/e5e7eb/6b7280?text=No+Image"} 
          alt={product.name || "Product"}
          className="w-full h-48 object-cover"
        />
        {product.isNew && (
          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-xs font-medium text-gray-700">New</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name || "Unnamed Product"}
        </h3>
        
        <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
          <svg 
            className="w-4 h-4 text-gray-500 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm text-gray-600">{formattedDate}</span>
        </div>

        <Link 
          href={product.slug ? `/product/${product.slug}` : '#'}
          className="mt-6 w-full bg-red-300 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 block text-center"
        >
          View Product Details
        </Link>
      </div>
    </div>
  );
}
