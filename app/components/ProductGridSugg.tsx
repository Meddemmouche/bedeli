import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import Prodbox from './prod-box';
import { and, eq, ne } from 'drizzle-orm';

const isProductNew = (createdAt: Date | null): boolean => {
  if (!createdAt) return false;
  const daysSinceCreation = (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceCreation <= 7;
};

export default async function ProductGridSugg({ 
    category,
    id
 }: { category: string,
    id: number
  }) {
  // Simulate slow fetch (remove this in production)
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const someProducts = await db.select().from(products).where(and(eq(products.category, category), ne(products.id, id))).limit(3);

  return (
    <div className="w-full max-w-7xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Latest Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {someProducts.map((product) => (
          <Prodbox 
            key={product.id} 
            product={{
              id: product.id.toString(),
              slug: product.slug || '',
              name: product.title,
              imageUrl: product.imageUrl || undefined,
              publishDate: product.createdAt ? product.createdAt.toString() : undefined,
              isNew: isProductNew(new Date(product.createdAt))
            }} 
          />
        ))}
      </div>
    </div>
  );
}