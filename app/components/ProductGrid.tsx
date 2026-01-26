// app/components/ProductGrid.tsx
import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import Prodbox from './prod-box';

export default async function ProductGrid() {
  // Simulate slow fetch (remove this in production)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const allProducts = await db.select().from(products).limit(12);

  return (
    <div className="w-full max-w-7xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Latest Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProducts.map((product) => (
          <Prodbox 
            key={product.id} 
            product={{
              id: product.id.toString(),
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

function isProductNew(createdAt: Date | null): boolean {
  if (!createdAt) return false;
  const daysSinceCreated = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceCreated < 7;
}