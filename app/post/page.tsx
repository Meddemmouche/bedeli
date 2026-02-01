// app/post/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import PostProductForm from '@/app/post/PostProductForm';

export default async function PostPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/connection');
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Post an Item to Trade
        </h1>
        <p className="text-gray-600 mb-8">
          Share what you're willing to trade with the community
        </p>
        
        <PostProductForm />
      </div>
    </main>
  );
}