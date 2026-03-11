"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, MapPin, Briefcase, Filter } from 'lucide-react';

export default function FilterBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [platform, setPlatform] = useState(searchParams.get('platform') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [remote, setRemote] = useState(searchParams.get('remote') === 'true');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (platform) params.set('platform', platform);
        if (category) params.set('category', category);
        if (remote) params.set('remote', 'true');

        router.push(`/?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="w-full bg-white/70 border border-gray-200 p-2.5 rounded-3xl flex flex-col md:flex-row items-center gap-3 shadow-lg shadow-black/5 backdrop-blur-xl">
            <div className="flex-1 flex items-center w-full px-5 h-12">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                    type="text"
                    placeholder="Search roles or companies..."
                    className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 font-medium"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="h-px w-full md:w-px md:h-8 bg-gray-200 hidden md:block"></div>

            <div className="flex w-full md:w-auto items-center gap-2 px-2">
                <div className="relative flex-1 md:w-36 h-12 flex items-center bg-gray-50 md:bg-transparent rounded-2xl md:rounded-none px-4">
                    <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
                    <select
                        className="w-full bg-transparent appearance-none border-none outline-none text-sm font-medium text-gray-700 cursor-pointer"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                    >
                        <option value="">Platform</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Internshala">Internshala</option>
                        <option value="Wellfound">Wellfound</option>
                        <option value="Indeed">Indeed</option>
                    </select>
                </div>

                <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

                <div className="relative flex-1 md:w-36 h-12 flex items-center bg-gray-50 md:bg-transparent rounded-2xl md:rounded-none px-4">
                    <Filter className="w-4 h-4 text-gray-500 mr-2" />
                    <select
                        className="w-full bg-transparent appearance-none border-none outline-none text-sm font-medium text-gray-700 cursor-pointer"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Category</option>
                        <option value="Software">Software</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Full Stack">Full Stack</option>
                        <option value="AI / ML">AI / ML</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                    </select>
                </div>

                <div className="h-8 w-px bg-gray-200 hidden md:block"></div>

                <label className="flex items-center space-x-3 cursor-pointer h-12 px-4 rounded-2xl bg-gray-50 md:bg-transparent transition-colors hover:bg-gray-100">
                    <input
                        type="checkbox"
                        className="rounded-md border-gray-300 w-4 h-4 text-blue-600 focus:ring-blue-500"
                        checked={remote}
                        onChange={(e) => setRemote(e.target.checked)}
                    />
                    <span className="text-sm font-semibold text-gray-700">Remote</span>
                </label>

                <button
                    type="submit"
                    className="h-12 px-8 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm hidden md:block"
                >
                    Search
                </button>
            </div>
            <button
                type="submit"
                className="w-full h-12 rounded-2xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-sm md:hidden mt-2"
            >
                Search
            </button>
        </form>
    );
}
