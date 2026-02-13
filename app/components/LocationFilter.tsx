// app/components/LocationFilter.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { ALGERIAN_CITIES } from '@/lib/location';

export default function LocationFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
  const [distance, setDistance] = useState(searchParams.get('distance') || '50');

  const handleFilter = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.set('city', selectedCity);
    if (distance) params.set('distance', distance);
    
    router.push(`/?${params.toString()}`);
  };

  const handleClear = () => {
    setSelectedCity('');
    setDistance('50');
    router.push('/');
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="w-5 h-5 text-red-600" />
        <h3 className="font-semibold text-gray-900">Filter by Location</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
            <option value="">All cities</option>
            {ALGERIAN_CITIES.map(city => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Distance (km)
          </label>
          <select
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full text-gray-700 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          >
            <option value="10">10 km</option>
            <option value="25">25 km</option>
            <option value="50">50 km</option>
            <option value="100">100 km</option>
            <option value="200">200 km</option>
          </select>
        </div>

        <div className="flex items-end gap-2">
          <button
            onClick={handleFilter}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
          >
            Apply
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}