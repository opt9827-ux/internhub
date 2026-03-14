"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Clock, DollarSign, Building, Bookmark, ExternalLink } from 'lucide-react';
import { Internship } from '@/lib/fetcher';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface Props {
    internship: Internship & { slug: string };
}

export default function InternshipCard({ internship }: Props) {
    const [timeLeft, setTimeLeft] = useState<string>('');

    useEffect(() => {
        if (internship.deadline) {
            const updateTime = () => {
                const deadline = new Date(internship.deadline as string);
                if (deadline.getTime() > Date.now()) {
                    setTimeLeft(formatDistanceToNow(deadline, { addSuffix: true }).replace('in ', ''));
                } else {
                    setTimeLeft('Expired');
                }
            };
            updateTime();
            const interval = setInterval(updateTime, 60000);
            return () => clearInterval(interval);
        }
    }, [internship.deadline]);

    return (
        <div
            className="group relative w-full flex flex-col justify-between rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)]"
        >
            <div className="absolute top-6 right-6 flex items-center space-x-2">
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {internship.platform}
                </span>
            </div>

            <div className="flex-1">
                <Link href={`/internships/${internship.slug}`} className="block focus:outline-none">
                    <div className="flex items-center space-x-4 mb-5">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100 text-2xl font-bold text-gray-700 shadow-sm">
                            {internship.company.charAt(0)}
                        </div>
                        <div className="flex-1 pr-16">
                            <h3 className="text-xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                {internship.title}
                            </h3>
                            <div className="flex items-center text-sm font-medium text-gray-500 mt-1">
                                <Building className="mr-1.5 h-4 w-4" />
                                {internship.company}
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-5">
                        {internship.description || 'No description available for this role. Apply to learn more.'}
                    </p>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6">
                        <div className="flex items-center text-sm font-medium text-gray-600">
                            <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                            <span className="truncate">{internship.location}</span>
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-600">
                            <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
                            <span className="truncate">{internship.stipend || 'Unpaid'}</span>
                        </div>
                        {timeLeft && (
                            <div className={cn("flex items-center text-sm font-medium col-span-2", timeLeft === 'Expired' ? 'text-red-500' : 'text-orange-500')}>
                                <Clock className="mr-2 h-4 w-4" />
                                <span>
                                    {timeLeft === 'Expired' ? 'Expired' : `${timeLeft} left`}
                                </span>
                            </div>
                        )}
                    </div>
                </Link>
            </div>

            <div className="mt-2 flex items-center justify-between pt-5 border-t border-gray-100">
                <button className="p-2.5 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50">
                    <Bookmark className="h-5 w-5" />
                </button>
                <a
                    href={internship.apply_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95 shadow-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                </a>
            </div>
        </div>
    );
}
