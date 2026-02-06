// app/proposal/[id]/ProposalActions.tsx
'use client';

import { acceptProposal, rejectProposal } from '@/app/actions/proposals';
import { useState } from 'react';

export default function ProposalActions({ proposalId }: { proposalId: number }) {
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    if (!confirm('Are you sure you want to accept this trade?')) return;
    
    setLoading(true);
    try {
      await acceptProposal(proposalId);
    } catch (error) {
      alert('Failed to accept proposal');
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!confirm('Are you sure you want to decline this trade?')) return;
    
    setLoading(true);
    try {
      await rejectProposal(proposalId);
    } catch (error) {
      alert('Failed to reject proposal');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Respond to Proposal</h3>
      <div className="flex gap-4">
        <button
          onClick={handleAccept}
          disabled={loading}
          className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : '✓ Accept Trade'}
        </button>
        <button
          onClick={handleReject}
          disabled={loading}
          className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : '✗ Decline Trade'}
        </button>
      </div>
    </div>
  );
}