"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Internship } from '@/lib/fetcher';

export default function ExpiringTicker() {
    const [expiringJobs, setExpiringJobs] = useState<(Partial<Internship> & { slug?: string })[]>([]);

    useEffect(() => {
        fetch('/api/internships?expiring=true')
            .then(res => res.json())
            .then(data => {
                if (data.internships && data.internships.length > 0) {
                    setExpiringJobs(data.internships);
                }
            })
            .catch(err => console.error("Could not fetch expiring internships", err));
    }, []);

    if (expiringJobs.length === 0) return null;

    return (
        <div className="w-full bg-slate-50 border-b border-gray-200 py-2.5 overflow-hidden flex items-center">
            <div className="container mx-auto px-4 flex items-center">
                <div className="flex-shrink-0 flex items-center space-x-2 mr-4 bg-slate-50 z-10 pr-4 border-r border-gray-200">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Expiring in 24h</span>
                </div>
                <div className="flex-1 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                    <div className="flex whitespace-nowrap animate-[ticker_30s_linear_infinite] hover:[animation-play-state:paused] group">
                        {[...expiringJobs, ...expiringJobs, ...expiringJobs].map((job, idx) => {
                            const hoursLeft = job.deadline ? Math.max(0, Math.round((new Date(job.deadline).getTime() - Date.now()) / (1000 * 60 * 60))) : 0;
                            return (
                                <Link
                                    key={`${job.slug}-${idx}`}
                                    href={`/internships/${job.slug}`}
                                    className="inline-flex items-center space-x-3 mx-8 text-sm hover:text-blue-600 text-gray-600 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900">{job.company}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="font-medium">{job.title}</span>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-red-500 flex items-center font-medium"><span className="tabular-nums">{hoursLeft}</span>h left</span>
                                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600" />
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
