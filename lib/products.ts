// lib/products.ts
import { db } from '@/lib/db';
import { products, users } from './schema';
import { eq, and, or } from 'drizzle-orm';
import { generateSlug } from './slugify';

// lib/products.ts - Add these functions

import { calculateDistance } from './location';

export async function getProductsNearLocation(
  latitude: number,
  longitude: number,
  maxDistance: number = 50, // km
  limit: number = 20
) {
  // Get all active products with location
  const allProducts = await db
    .select({
      product: products,
      user: users,
    })
    .from(products)
    .leftJoin(users, eq(products.u_id, users.id))
    .where(eq(products.status, 'active'));

  // Calculate distances and filter
  const productsWithDistance = allProducts
    .map(({ product, user }) => {
      // Use product location or fallback to user location
      const prodLat = product.latitude || user?.latitude;
      const prodLon = product.longitude || user?.longitude;

      if (!prodLat || !prodLon) {
        return null; // Skip products without location
      }

      const distance = calculateDistance(latitude, longitude, prodLat, prodLon);

      return {
        ...product,
        user,
        distance,
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null && p.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);

  return productsWithDistance;
}

export async function getProductsByCity(city: string, limit: number = 20) {
  return await db
    .select({
      product: products,
      user: users,
    })
    .from(products)
    .leftJoin(users, eq(products.u_id, users.id))
    .where(
      and(
        eq(products.status, 'active'),
        or(
          eq(products.city, city),
          eq(users.city, city)
        )
      )
    )
    .limit(limit);
}

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