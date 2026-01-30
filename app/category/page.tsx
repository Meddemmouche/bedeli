import Link from "next/link";

const CATEGORIES = [
  { slug: 'gaming', name: 'Gaming', icon: '🎮', count: 45 },
  { slug: 'electronics', name: 'Electronics', icon: '📱', count: 89 },
  { slug: 'toys', name: 'Toys', icon: '🧸', count: 34 },
  { slug: 'fashion', name: 'Fashion', icon: '👟', count: 67 },
  { slug: 'collectibles', name: 'Collectibles', icon: '🎨', count: 23 },
  { slug: 'books', name: 'Books', icon: '📚', count: 56 },
];
export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-transparent px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-1">
                {category.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}