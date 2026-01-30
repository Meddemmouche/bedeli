// app/product/[slug]/page.tsx
import { db } from '@/lib/db';
import { products, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import ProductGridSugg from '@/app/components/ProductGridSugg';
import { ProductGridSkeleton } from '@/app/components/ProductSkeleton';

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Fetch product by slug
  const { slug } = await params
  const [product] = await db
    .select({
      product: products,
      owner: users,
    })
    .from(products)
    .leftJoin(users, eq(products.u_id, users.id))
    .where(eq(products.slug, slug))
    .limit(1);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-transparent py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          ← Back to browse
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-100 relative">
              <Image
                src={product.product.imageUrl || '/placeholder.svg'}
                alt={product.product.title}
                fill
                className="object-cover"
              />
              <div className="absolute text-gray-800 top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium shadow">
                {product.product.condition}
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <span className="inline-block bg-black text-white px-3 py-1 rounded-full text-sm font-medium mb-3">
                  {product.product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.product.title}
                </h1>
                <p className="text-gray-600 text-sm">
                  Posted {new Date(product.product.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="border-t pt-6">
                <h2 className="font-semibold text-gray-900 mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.product.description}
                </p>
              </div>

              <div className="border-t pt-6">
                <h2 className="font-semibold text-gray-900 mb-3">Owner</h2>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-white-500 rounded-full flex items-center justify-center text-white font-medium">
                    {product.owner?.f_name?.[0]}{product.owner?.l_name?.[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {product.owner?.f_name} {product.owner?.l_name}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 space-y-3">
                <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors">
                  Propose Trade
                </button>
                <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Message Owner
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-7xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Suggested for You</h2>
            <Suspense fallback={<ProductGridSkeleton />}>
                <ProductGridSugg id={product.product.id} category={product.product.category} />
            </Suspense>
        </div>
      </div>
    </main>
  );
}