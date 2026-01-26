import { db } from '@/lib/db';
import { products } from '@/lib/schema';

export async function getStaticPaths() {
  // Return paths for all products
  const allProducts = await db.select({ id: products.id }).from(products);
  return {
    paths: allProducts.map((p) => ({ params: { id: p.id.toString() } })),
    fallback: 'blocking',
  };
}

export async function getProductById(id: string) {
  // Fetch product by ID
    const allProducts = await db.select({ id: products.id }).from(products).all();
    paths: allProducts.map((p: { id: number }) => ({ 
    params: { id: p.id.toString() } 
    })),
  return product;
}