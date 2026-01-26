import Search from '@/app/components/search';
import ProductGrid from '@/app/components/ProductGrid';
import { ProductGridSkeleton } from '@/app/components/ProductSkeleton';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-8 py-4 space-y-4">
        <h1 className="text-2xl font-bold text-black">Welcome to the Home Page</h1>
        <Search />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
    </main>
  );
}