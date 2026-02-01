// app/proposals/page.tsx
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getProposalsByUser } from '@/lib/proposals';
import { db } from '@/lib/db';
import { products, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

export default async function ProposalsPage() {
  const session = await auth();
  
  if (!session || !session.user) {
    redirect('/connection');
  }

  const userId = parseInt(session.user.id || "");
  const proposalsList = await getProposalsByUser(userId);

  // Fetch related data for each proposal
  const proposalsWithData = await Promise.all(
    proposalsList.map(async (proposal) => {
      const [fromProduct] = await db
        .select()
        .from(products)
        .where(eq(products.id, proposal.fromProductId))
        .limit(1);

      const [toProduct] = await db
        .select()
        .from(products)
        .where(eq(products.id, proposal.toProductId))
        .limit(1);

      const [fromUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, proposal.fromUserId))
        .limit(1);

      const [toUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, proposal.toUserId))
        .limit(1);

      return {
        ...proposal,
        fromProduct,
        toProduct,
        fromUser,
        toUser,
        isSender: proposal.fromUserId === userId,
      };
    })
  );

  const received = proposalsWithData.filter(p => !p.isSender);
  const sent = proposalsWithData.filter(p => p.isSender);

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Proposals</h1>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          {/* Received Proposals */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Received ({received.length})
            </h2>
            {received.length === 0 ? (
              <p className="text-gray-500">No proposals received yet</p>
            ) : (
              <div className="space-y-4">
                {received.map((prop) => (
                  <ProposalCard key={prop.id} proposal={prop} />
                ))}
              </div>
            )}
          </div>

          {/* Sent Proposals */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Sent ({sent.length})
            </h2>
            {sent.length === 0 ? (
              <p className="text-gray-500">No proposals sent yet</p>
            ) : (
              <div className="space-y-4">
                {sent.map((prop) => (
                  <ProposalCard key={prop.id} proposal={prop} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function ProposalCard({ proposal }: { proposal: any }) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    accepted: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    completed: 'bg-blue-100 text-blue-700',
  };

  return (
    <Link
      href={`/proposal/${proposal.id}`}
      className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[proposal.status as keyof typeof statusColors]}`}>
          {proposal.status}
        </span>
        <span className="text-sm text-gray-500">
          {new Date(proposal.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-4 items-center">
        {/* Your item */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">
            {proposal.isSender ? 'You offer' : 'They offer'}
          </p>
          <img
            src={proposal.fromProduct?.imageUrl || 'https://placehold.co/100'}
            alt={proposal.fromProduct?.title}
            className="w-20 h-20 object-cover rounded mx-auto mb-2"
          />
          <p className="font-medium text-sm">{proposal.fromProduct?.title}</p>
        </div>

        {/* Arrow */}
        <div className="text-center text-2xl text-gray-400">⇄</div>

        {/* Their item */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-2">
            {proposal.isSender ? 'They offer' : 'You offer'}
          </p>
          <img
            src={proposal.toProduct?.imageUrl || 'https://placehold.co/100'}
            alt={proposal.toProduct?.title}
            className="w-20 h-20 object-cover rounded mx-auto mb-2"
          />
          <p className="font-medium text-sm">{proposal.toProduct?.title}</p>
        </div>
      </div>

      {proposal.message && (
        <p className="mt-3 text-sm text-gray-600 italic">
          "{proposal.message}"
        </p>
      )}
    </Link>
  );
}