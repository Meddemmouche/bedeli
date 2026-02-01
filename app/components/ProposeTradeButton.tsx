// app/components/ProposeTradeButton.tsx
'use client';

import { useState } from 'react';
import ProposeTradeModal from './ProposeTradeModal';

interface Product {
  id: number;
  title: string;
  imageUrl: string | null;
  condition: string;
}

export default function ProposeTradeButton({
  targetProduct,
  userProducts,
}: {
  targetProduct: { id: number; title: string; ownerId: number };
  userProducts: Product[];
}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors"
      >
        Propose Trade
      </button>

      {showModal && (
        <ProposeTradeModal
          targetProduct={targetProduct}
          userProducts={userProducts}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}