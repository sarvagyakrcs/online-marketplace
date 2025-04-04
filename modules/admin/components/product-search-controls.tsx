'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function ProductSearchControls({
  defaultSearch = '',
  defaultSort = 'name-asc'
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="mt-6 w-full justify-between flex flex-col sm:flex-row gap-4 p-4shadow-lg rounded-xl">
      <input
        type="text"
        placeholder="Search products..."
        defaultValue={defaultSearch}
        onChange={(e) => {
          router.push('?' + createQueryString('search', e.target.value));
        }}
        className="max-w-sm sm:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm"
      />
      <select
        defaultValue={defaultSort}
        onChange={(e) => {
          router.push('?' + createQueryString('sort', e.target.value));
        }}
        className="max-w-sm sm:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all shadow-sm"
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  );
}