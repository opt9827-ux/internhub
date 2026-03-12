"use client"

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get('search') || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (val.trim()) {
      params.set('search', val.trim());
    } else {
      params.delete('search');
    }
    router.replace(`/?${params.toString()}#feed`, { scroll: false });
  };

  return (
    <div className="relative w-full mb-6">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search internships..."
          className="w-full rounded-2xl border border-gray-300 bg-white py-3.5 pl-12 pr-4 text-base outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-gray-900 placeholder:text-gray-400 shadow-sm"
        />
        <Search className="absolute left-4 h-5 w-5 text-gray-400" />
      </div>
    </div>
  )
}
