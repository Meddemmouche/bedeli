'use client';

import { useActionState } from 'react';
import { postProduct } from '@/app/actions/products';

const CATEGORIES = ['Gaming', 'Electronics', 'Toys', 'Fashion', 'Collectibles', 'Books', 'Sports', 'Other'];
const CONDITIONS = ['New', 'Like New', 'Excellent', 'Good', 'Fair'];

export default function PostProductForm() {
  const [state, formAction, pending] = useActionState(postProduct, undefined);

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      {state?.error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            required
            maxLength={100}
            placeholder="e.g., PlayStation 5 Console"
            className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            required
            className="w-full text-gray-500 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Condition *
          </label>
          <select
            name="condition"
            required
            className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select condition</option>
            {CONDITIONS.map(cond => (
              <option key={cond} value={cond}>{cond}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            required
            rows={5}
            maxLength={1000}
            placeholder="Describe your item and what you're looking to trade for..."
            className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-sm text-gray-500 mt-1">
            Mention what you're looking for in exchange
          </p>
        </div>

        {/* Image URL (temporary - we'll add upload later) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Image URL (optional)
          </label>
          <input
            type="url"
            name="imageUrl"
            placeholder="https://example.com/image.jpg"
            className="text-gray-500 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-sm text-gray-500 mt-1">
            We'll add image upload soon. For now, paste an image URL
          </p>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={pending}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? 'Posting...' : 'Post Item'}
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}