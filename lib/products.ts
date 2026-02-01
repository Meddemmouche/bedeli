// lib/products.ts
import { db } from '@/lib/db';
import { products } from './schema';
import { eq } from 'drizzle-orm';
import { generateSlug } from './slugify';

export async function createProduct(data: {
  userId: number;
  title: string;
  description: string;
  category: string;
  condition: string;
  imageUrl: string;
}) {
  if (data.userId <= 0) {
    throw new Error('Invalid user ID');
  }
  const [product] = await db
    .insert(products)
    .values({
      u_id: data.userId,
      title: data.title,
      slug: 'temp', // Will update after getting ID
      description: data.description,
      category: data.category,
      condition: data.condition,
      imageUrl: data.imageUrl,
      status: 'active',
      createdAt: new Date().toISOString(),
    })
    .returning();

  // Update with proper slug
  const slug = generateSlug(product.title, product.id);
  await db
    .update(products)
    .set({ slug })
    .where(eq(products.id, product.id));

  return { ...product, slug };
}

export async function getUserProducts(userId: number) {
  return await db
    .select()
    .from(products)
    .where(eq(products.u_id, userId));
}

export async function deleteProduct(productId: number, userId: number) {
  // Verify ownership
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!product || product.u_id !== userId) {
    throw new Error('Not authorized');
  }

  await db.delete(products).where(eq(products.id, productId));
}