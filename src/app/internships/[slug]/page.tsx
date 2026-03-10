import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Internship } from '@/lib/fetcher';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building, MapPin, DollarSign, Clock, ExternalLink, CalendarDays, Share2 } from 'lucide-react';

async function getInternship(slug: string) {
    const { data, error } = await supabase
        .from('internships')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        return null;
    }
    return data as Internship & { slug: string, created_at: string };
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const internship = await getInternship(params.slug);
    if (!internship) return { title: 'Not Found' };

    return {
        title: `${internship.title} at ${internship.company} | InternHub`,
        description: `Apply for the ${internship.title} role at ${internship.company}. Location: ${internship.location}. Stipend: ${internship.stipend || 'Unpaid'}.`,
    };
}

export default async function InternshipPage({ params }: { params: { slug: string } }) {
    const internship = await getInternship(params.slug);

    if (!internship) {
        notFound();
    }

    // Schema.org JobPosting JSON-LD for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: internship.title,
        description: internship.description || `Internship opportunity for ${internship.title} at ${internship.company}.`,
        datePosted: internship.created_at,
        validThrough: internship.deadline,
        employmentType: 'INTERN',
        hiringOrganization: {
            '@type': 'Organization',
            name: internship.company,
            logo: 'https://internhub.example.com/default-logo.png'
        },
        jobLocation: {
            '@type': 'Place',
            address: {
                '@type': 'PostalAddress',
                addressLocality: internship.location,
                addressCountry: 'US' // Adjust based on logic if possible
            }
        },
        jobLocationType: internship.remote ? 'TELECOMMUTE' : undefined,
        baseSalary: internship.stipend ? {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: {
                '@type': 'QuantitativeValue',
                value: internship.stipend,
                unitText: 'MONTH'
            }
        } : undefined
    };

    return (
        <main className="flex min-h-screen flex-col">
            <Navbar />

            <div className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />

                {/* Header Section */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center space-x-6">
                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 text-4xl font-bold text-white shadow-inner">
                                {internship.company.charAt(0)}
                            </div>
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">{internship.title}</h1>
                                <div className="flex items-center text-lg text-muted-foreground">
                                    <Building className="mr-2 h-5 w-5" />
                                    {internship.company}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full md:w-auto">
                            <a
                                href={internship.apply_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full md:w-48 items-center justify-center rounded-xl bg-white px-6 py-4 text-base font-semibold text-black transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/20"
                            >
                                Apply Now
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/10">
                        <div>
                            <div className="text-sm text-neutral-500 mb-1 flex items-center"><MapPin className="w-4 h-4 mr-1" /> Location</div>
                            <div className="font-medium">{internship.location}</div>
                        </div>
                        <div>
                            <div className="text-sm text-neutral-500 mb-1 flex items-center"><DollarSign className="w-4 h-4 mr-1" /> Stipend</div>
                            <div className="font-medium">{internship.stipend || 'Unpaid'}</div>
                        </div>
                        <div>
                            <div className="text-sm text-neutral-500 mb-1 flex items-center"><CalendarDays className="w-4 h-4 mr-1" /> Platform</div>
                            <div className="font-medium">{internship.platform}</div>
                        </div>
                        <div>
                            <div className="text-sm text-neutral-500 mb-1 flex items-center"><Clock className="w-4 h-4 mr-1" /> Deadline</div>
                            <div className={internship.deadline && new Date(internship.deadline).getTime() < Date.now() ? 'text-red-400 font-medium' : 'text-amber-400 font-medium'}>
                                {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'Not specified'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 sm:p-12">
                    <h2 className="text-2xl font-semibold mb-6">About the Role</h2>
                    <div className="prose prose-invert max-w-none text-muted-foreground leading-relaxed">
                        {internship.description ? (
                            <div dangerouslySetInnerHTML={{ __html: internship.description.replace(/\n/g, '<br/>') }} />
                        ) : (
                            <p>No detailed description provided for this internship. Please visit the application link for more details about the role, requirements, and responsibilities.</p>
                        )}
                    </div>

                    <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                        <button className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share this opportunity
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
