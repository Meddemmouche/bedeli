import { db } from '@/lib/db';
import { products } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function getStaticPaths() {
  const allProducts = await db.select({ id: products.id }).from(products);
  return {
    paths: allProducts.map((p) => ({ params: { id: p.id.toString() } })),
    fallback: 'blocking',
  };
}

export async function getProductById(id: string) {
  const productId = Number(id);

  if (!Number.isInteger(productId) || productId <= 0) {
    return null;
  }

  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  return product ?? null;
}
