import { auth } from '@/lib/auth';
import { User } from 'lucide-react';
import { UserRoundCog } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { products } from '@/lib/schema'
import { eq, desc } from 'drizzle-orm';
import Prodbox from '../components/prod-box';

export default async function Profile(){
    const session = await auth();
    if (!session) {
        return (
            <div className='flex' >You are not logged in</div>
        )
    }
    const history = await db.select().from(products).where(eq(products.u_id, parseInt(session.user?.id || '0'))).limit(10).orderBy(desc(products.createdAt));
  return (
    <main className="min-h-screen bg-transparent py-8 px-4 ">
      <div className="w-fit max-w-6xl mx-auto px-4 border border-gray-300 flex flex-col items-center shadow-xl rounded-lg text-lg gap-4 py-8">
        <Link href="/settings" className="flex items-center gap-4 mb-8">
          <UserRoundCog className="w-6 h-6 text-gray-700" />
          <span className="text-gray-700 font-medium text-lg">Go to Settings</span>
        </Link>
        <div className='flex justify-center gap-4'>
          <div className="w-10 h-10 text-gray-700 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center text-white font-medium">
              {session.user?.name?.charAt(0).toUpperCase() || <User className="w-5 h-5" />}
          </div>
            <span className="text-gray-700 font-medium hidden md:block">
                {session.user?.name?.split(' ')[0]}
            </span>
        </div>
        <div className='flex flex-col gap-2 border border-gray-300 rounded-md px-2 py-1 '>
          <span className='text-sm text-gray-700'>Email: {session.user?.email}</span>
        </div>
        <div className='flex flex-col gap-2 border border-gray-300 rounded-md px-2 py-1 '>
          <span className='text-sm text-gray-700'>Rating: 0.0/10.0</span>
        </div>
      </div>
      <div className=''>
        <h2 className='text-2xl font-bold text-gray-900 mt-8 mb-4'>Your Recent Products</h2>
        {history.length === 0 ? (
          <p className="text-gray-600">You have no recent products.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((product) => (
              <Prodbox
                key={product.id}
                product={{
                  id: product.id.toString(),
                  slug: product.slug || '',
                  name: product.title,
                  imageUrl: product.imageUrl || undefined,
                  publishDate: product.createdAt ? product.createdAt.toString() : undefined,
                }}
              />
            ))}
          </div>
        )}  
      </div>
    </main>
  );
}