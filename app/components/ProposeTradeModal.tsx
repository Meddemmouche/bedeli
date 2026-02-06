// app/components/ProposeTradeModal.tsx
'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { createProposal } from '@/app/actions/proposals';

interface Product {
  id: number;
  title: string;
  imageUrl: string | null;
  condition: string;
}

export default function ProposeTradeModal({
  targetProduct,
  userProducts,
  onClose,
}: {
  targetProduct: { id: number; title: string; ownerId: number };
  userProducts: Product[];
  onClose: () => void;
}) {
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedProductId) {
      setError('Please select an item to offer');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('toProductId', targetProduct.id.toString());
    formData.append('fromProductId', selectedProductId.toString());
    formData.append('toUserId', targetProduct.ownerId.toString());
    formData.append('message', message);

    const result = await createProposal(undefined, formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // If successful, the action will redirect
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Propose Trade</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* What they're offering */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">They're offering:</h3>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-gray-900">{targetProduct.title}</p>
            </div>
          </div>

          {/* What you're offering */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Select what you want to trade:
            </h3>
            <div className="grid gap-3">
              {userProducts.map((product) => (
                <label
                  key={product.id}
                  className={`
                    flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${selectedProductId === product.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="selectedProduct"
                    value={product.id}
                    checked={selectedProductId === product.id}
                    onChange={() => setSelectedProductId(product.id)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <img
                      src={product.imageUrl || 'https://placehold.co/80x80'}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{product.title}</p>
                      <p className="text-sm text-gray-500">{product.condition}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Optional message */}
          <div>
            <label className="block font-semibold text-gray-900 mb-2">
              Message (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              maxLength={500}
              placeholder="Add a message to explain why this is a good trade..."
              className="text-gray-700 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || !selectedProductId}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Proposal'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}