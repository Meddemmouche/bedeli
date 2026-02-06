// scripts/seed.ts
import { db } from '@/lib/db';
import { products, users } from '@/lib/schema';
import { generateSlug } from '@/lib/slugify';
import { eq } from 'drizzle-orm';

async function seed() {
  console.log('🌱 Seeding database...');
  
  console.log('🧹 Clearing existing data...');
  await db.delete(products);
  await db.delete(users);
  console.log('✅ Data cleared');

  const [user] = await db.insert(users).values({
    f_name: 'Test',
    l_name: 'User',
    email: 'test@test.com',
    age: 25,
    password: 'hashed_password_here',
    gender: 'male',
  }).returning();

  console.log('✅ User created:', user);

  const mockProducts = [
    {
      title: 'PlayStation 5 Console',
      slug: 'temp-1',
      description: 'Barely used PS5, mint condition.',
      category: 'Gaming',
      condition: 'Like New',
      imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
      u_id: user.id,
      createdAt: new Date().toISOString(),
      status: 'active',
    },
    {
      title: 'LEGO Star Wars Millennium Falcon',
      slug: 'temp-2',
      description: 'Complete set with all pieces.',
      category: 'Toys',
      condition: 'Excellent',
      imageUrl: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400',
      u_id: user.id,
      createdAt: new Date().toISOString(),
      status: 'active',
    },
    {
      title: 'iPhone 13 Pro Max 256GB',
      slug: 'temp-3',
      description: 'Space Gray, unlocked.',
      category: 'Electronics',
      condition: 'Good',
      imageUrl: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
      u_id: user.id,
      createdAt: new Date().toISOString(),
      status: 'active',
    },
    {
      title: 'Nike Air Jordan 1 Retro',
      slug: 'temp-4',
      description: 'Limited edition sneakers, size 10.',
      category: 'Fashion',
      condition: 'New',
      imageUrl: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400',
      u_id: user.id,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
    {
      title: 'MacBook Pro M1 2020',
      slug: 'temp-5',
      description: '13-inch, 8GB RAM, 256GB SSD.',
      category: 'Electronics',
      condition: 'Like New',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      u_id: user.id,
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    },
    {
      title: 'Vintage Polaroid Camera',
      slug: 'temp-6',
      description: 'Works perfectly!',
      category: 'Collectibles',
      condition: 'Good',
      imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400',
      u_id: user.id,
      createdAt: new Date().toISOString(),
      status: 'active',
    },
  ];

  const insertedProducts = await db.insert(products).values(mockProducts).returning();

  // Update with proper slugs
  console.log('🔗 Generating slugs...');
  for (const product of insertedProducts) {
    const properSlug = generateSlug(product.title, product.id);
    await db
      .update(products)
      .set({ slug: properSlug })
      .where(eq(products.id, product.id));
  }

  console.log('✅ Database seeded with', insertedProducts.length, 'products!');
  process.exit(0);
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  process.exit(1);
});