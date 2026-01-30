// app/category/[slug]/page.tsx
import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import Prodbox from '@/app/components/prod-box';
import { notFound } from 'next/navigation';
import { like } from 'drizzle-orm';

const VALID_CATEGORIES = ['gaming', 'electronics', 'toys', 'fashion', 'collectibles', 'books'];

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  if (!VALID_CATEGORIES.includes(slug)) {
    notFound();
  }

  // Fetch products for this category
  const categoryProducts = await db
    .select()
    .from(products)
    .where(like(products.category, `%${capitalize(slug)}%`));

  return (
    <main className="min-h-screen bg-transparent px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
          {slug}
        </h1>
        
        {categoryProducts.length === 0 ? (
          <p className="text-gray-600">No items in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <Prodbox
                key={product.id}
                product={{
                  id: product.id.toString(),
                  name: product.title,
                  slug: product.slug || '',
                  imageUrl: product.imageUrl || undefined,
                  publishDate: product.createdAt,
                  isNew: isProductNew(product.createdAt),
                }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function isProductNew(createdAt: string | null): boolean {
  if (!createdAt) return false;
  const daysSinceCreated = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return daysSinceCreated < 7;
}