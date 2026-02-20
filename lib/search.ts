import { db } from '@/lib/db';
import { products, users } from '@/lib/schema';
import { and, eq, like, or } from 'drizzle-orm';
import { calculateDistance } from './location';

export async function SearchByQuery(q: string) {
  if (!q?.trim()) {
    return [];
  }

  const pattern = `%${q.trim()}%`;

  const searchedProduct = await db
    .select({
      product: products,
    })
    .from(products)
    .where(
      and(
        eq(products.status, 'active'),
        or(like(products.title, pattern), like(products.description, pattern))
      )
    );

  return searchedProduct;
}

export async function SearchQueryLoc(q: string, userId: number, maxDistance: number = 50) {
  if (!userId || !q?.trim()) {
    return [];
  }

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

  if (!user || user.latitude == null || user.longitude == null) {
    return [];
  }

  const pattern = `%${q.trim()}%`;

  const allMatches = await db
    .select({
      product: products,
      owner: users,
    })
    .from(products)
    .leftJoin(users, eq(products.u_id, users.id))
    .where(
      and(
        eq(products.status, 'active'),
        or(like(products.title, pattern), like(products.description, pattern))
      )
    );

  return allMatches
    .map(({ product, owner }) => {
      const lat = product.latitude ?? owner?.latitude;
      const lon = product.longitude ?? owner?.longitude;

      if (lat == null || lon == null) {
        return null;
      }

      const distance = calculateDistance(user.latitude!, user.longitude!, lat, lon);
      return { product, owner, distance };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null && item.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
}
