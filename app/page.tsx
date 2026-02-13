import Search from '@/app/components/search';
import ProductGrid from '@/app/components/ProductGrid';
import { ProductGridSkeleton } from '@/app/components/ProductSkeleton';
import { Suspense } from 'react';
import LocationFilter from '@/app/components/LocationFilter';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ city?: string; distance?: string }>; // Updated type
}) {
  const params = await searchParams;
  return (
    <main className="flex min-h-screen flex-col items-center bg-white px-8 py-4 space-y-4">
        <h1 className="text-2xl font-bold text-black">Welcome to the Home Page</h1>
        <Search />
        <LocationFilter />
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid 
            city={params?.city}
            maxDistance={params?.distance ? parseInt(params.distance) : undefined} />
        </Suspense>
    </main>
  );
}