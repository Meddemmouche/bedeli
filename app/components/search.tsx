'use client'

import handleSearch from '../actions/search';

export default function Search() {
  return (
    <form action={handleSearch} className="max-w-md mx-auto w-full">
      <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-gray-900 sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          name="search"
          className="block w-full p-3 ps-9 text-gray-900 bg-[#fcf5f5] text-sm rounded-md focus:ring-brand focus:border-brand shadow-md placeholder:text-gray-500 shadow-xs"
          placeholder="type anything"
          required
        />
        <button
          type="submit"
          className="absolute end-1.5 bottom-1.5 text-black font-mono bg-red-300 hover:bg-red-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
        >
          Search
        </button>
      </div>
    </form>
  );
}
