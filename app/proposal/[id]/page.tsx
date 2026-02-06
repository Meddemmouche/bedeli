// app/proposal/[id]/page.tsx
import { auth } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { getProposalById } from '@/lib/proposals';
import { db } from '@/lib/db';
import { products, users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import ProposalActions from './ProposalActions';

export default async function ProposalDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth();
  
  if (!session || !session.user || !session.user.id) {
    redirect('/connection');
  }

  const { id } = await params;
  const proposalId = parseInt(id);

  const proposal = await getProposalById(proposalId);

  if (!proposal) {
    notFound();
  }

  const userId = parseInt(session.user.id);

  // Verify user is part of this proposal
  if (proposal.fromUserId !== userId && proposal.toUserId !== userId) {
    redirect('/proposals');
  }

  // Fetch related data
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

  const isSender = proposal.fromUserId === userId;
  const isReceiver = proposal.toUserId === userId;
  const canRespond = isReceiver && proposal.status === 'pending';

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    accepted: 'bg-green-100 text-green-700 border-green-200',
    rejected: 'bg-red-100 text-red-700 border-red-200',
    completed: 'bg-blue-100 text-blue-700 border-blue-200',
    cancelled: 'bg-gray-100 text-gray-700 border-gray-200',
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back button */}
        <Link
          href="/proposals"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          ← Back to Proposals
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Trade Proposal #{proposal.id}
            </h1>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${statusColors[proposal.status as keyof typeof statusColors]}`}>
              {proposal.status.toUpperCase()}
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            Created on {new Date(proposal.createdAt).toLocaleDateString()} at {new Date(proposal.createdAt).toLocaleTimeString()}
          </p>
        </div>

        {/* Trade Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Trade Details</h2>
          
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {/* Sender's Item */}
            <div className="text-center">
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-2">
                  {isSender ? 'Your Item' : 'Their Item'}
                </span>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img
                  src={fromProduct?.imageUrl || 'https://placehold.co/300'}
                  alt={fromProduct?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{fromProduct?.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{fromProduct?.condition}</p>
              <div className="pt-3 border-t">
                <p className="text-xs text-gray-500 mb-1">Offered by</p>
                <p className="font-medium text-gray-900">
                  {fromUser?.f_name} {fromUser?.l_name}
                </p>
              </div>
            </div>

            {/* Exchange Icon */}
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
            </div>

            {/* Receiver's Item */}
            <div className="text-center">
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-2">
                  {isReceiver ? 'Your Item' : 'Their Item'}
                </span>
              </div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                <img
                  src={toProduct?.imageUrl || 'https://placehold.co/300'}
                  alt={toProduct?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{toProduct?.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{toProduct?.condition}</p>
              <div className="pt-3 border-t">
                <p className="text-xs text-gray-500 mb-1">Requested from</p>
                <p className="font-medium text-gray-900">
                  {toUser?.f_name} {toUser?.l_name}
                </p>
              </div>
            </div>
          </div>

          {/* Message */}
          {proposal.message && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold text-gray-900 mb-2">Message from {fromUser?.f_name}:</h3>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 italic">"{proposal.message}"</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {canRespond && (
          <ProposalActions proposalId={proposal.id} />
        )}

        {/* Status Messages */}
        {proposal.status === 'accepted' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-2">✅ Trade Accepted!</h3>
            <p className="text-green-700">
              Both parties have agreed to this trade. Please coordinate with {isSender ? toUser?.f_name : fromUser?.f_name} to arrange the exchange.
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-green-800">
                <strong>Next steps:</strong>
              </p>
              <ol className="list-decimal list-inside text-sm text-green-700 space-y-1">
                <li>Message each other to arrange a meetup location</li>
                <li>Meet in a safe, public place</li>
                <li>Exchange items and verify condition</li>
                <li>Mark as completed once done</li>
              </ol>
            </div>
          </div>
        )}

        {proposal.status === 'rejected' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="font-semibold text-red-900 mb-2">❌ Trade Declined</h3>
            <p className="text-red-700">
              This proposal was declined. You can browse other items or wait for new proposals.
            </p>
          </div>
        )}

        {proposal.status === 'pending' && isSender && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-900 mb-2">⏳ Waiting for Response</h3>
            <p className="text-yellow-700">
              Your proposal has been sent to {toUser?.f_name}. They'll receive a notification and can accept or decline.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}