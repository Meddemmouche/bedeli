'use server'

import { auth } from '@/lib/auth';
import { createProduct } from '@/lib/products';
import { redirect } from 'next/navigation';

export async function postProduct(
  prevState: { error: string } | undefined,
  formData: FormData
) {
  const session = await auth();
  
  if (!session || !session.user) {
    return { error: 'You must be logged in to post' };
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const condition = formData.get('condition') as string;
  const imageUrl = formData.get('imageUrl') as string;

  // Validation
  if (!title || !description || !category || !condition) {
    return { error: 'All fields are required' };
  }

   if (session.user) {

    try {
        const product = await createProduct({
        userId: parseInt(session.user?.id || '0'),
        title,
        description,
        category,
        condition,
        imageUrl: imageUrl || 'https://placehold.co/400x300/e5e7eb/6b7280?text=No+Image',
        });

        console.log('✅ Product created:', product.id);
    } catch (error) {
        console.error('❌ Error creating product:', error);
        return { error: 'Failed to create product' };
    }
    }

  redirect('/profile'); // Redirect to profile to see their products
}