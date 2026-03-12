"use client"

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams?.get('search') || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (query.trim()) {
      params.set('search', query.trim());
    } else {
      params.delete('search');
    }
    router.push(`/?${params.toString()}#feed`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xs md:max-w-sm hidden sm:block">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search internships..."
          className="w-full rounded-full border border-white/20 bg-background/50 py-1.5 pl-9 pr-4 text-sm outline-none focus:border-white/40 focus:ring-1 focus:ring-white/40 transition-all text-primary-foreground placeholder:text-muted-foreground"
        />
        <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground" />
      </div>
    </form>
  )
}
