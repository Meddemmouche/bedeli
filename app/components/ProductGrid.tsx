// app/components/ProductGrid.tsx
import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import Prodbox from './prod-box';
import { eq, and } from 'drizzle-orm';
import { getProductsByCity, getProductsNearLocation } from '@/lib/products';
import { ALGERIAN_CITIES } from '@/lib/location';

export default async function ProductGrid({
  city,
  maxDistance,
}: {
  city?: string;
  maxDistance?: number;
}) {
  // Simulate slow fetch (remove this in production)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  let allProducts;

  if (city) {
    // Get city coordinates
    const cityData = ALGERIAN_CITIES.find(c => c.name === city);
    
    if (cityData && maxDistance) {
      // Get products within distance
      allProducts = await getProductsNearLocation(
        cityData.latitude,
        cityData.longitude,
        maxDistance
      );
    } else {
      // Just filter by city
      const result = await getProductsByCity(city);
      allProducts = result.map(({ product, user }) => ({ ...product, user, distance: 0 }));
    }
  } else {
    // Default: Get all products
    allProducts = await db
      .select()
      .from(products)
      .where(eq(products.status, 'active'))
      .limit(12);
  }


  return (
    <div className="w-full max-w-7xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Latest Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map((product) => (
          <Prodbox 
            key={product.id} 
            product={{
              id: product.id.toString(),
              slug: product.slug || '',
              name: product.title,
              imageUrl: product.imageUrl || undefined,
              publishDate: product.createdAt ? product.createdAt.toString() : undefined,
              // isNew: isProductNew(product.createdAt)
            }} 
          />
        ))}
      </div>
    </div>
  );
}

export function isProductNew(createdAt: Date | null): boolean {
  if (!createdAt) return false;
  const daysSinceCreated = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceCreated < 7;
}