import Search from '@/app/components/search';
import Prodbox from '@/app/components/prod-box';
import { SearchByQuery } from '@/lib/search';
import LocationFilter from '@/app/components/LocationFilter';


type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? '';
  const results = query ? await SearchByQuery(query) : [];

  return (
    <main className="min-h-screen bg-white px-8 py-4 space-y-6">
      <div className="max-w-7xl mx-auto w-full space-y-4">
        <h1 className="text-2xl font-bold text-black">Search Products</h1>
        <Search />
        <LocationFilter />

        {query ? (
          <p className="text-sm text-gray-600">
            {results.length} result{results.length === 1 ? '' : 's'} for "{query}"
          </p>
        ) : (
          <p className="text-sm text-gray-600">Enter a query to search products.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map(({ product }) => (
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
      </div>
    </main>
  );
}
