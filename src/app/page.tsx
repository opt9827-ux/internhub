import { Suspense } from 'react';
export const dynamic = 'force-dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ExpiringTicker from '@/components/ExpiringTicker';
import FilterBar from '@/components/FilterBar';
import InternshipCard from '@/components/InternshipCard';
import TelegramBanner from '@/components/TelegramBanner';
import PlatformsSection from '@/components/PlatformsSection';
import { Internship } from '@/lib/fetcher';
import { supabase } from '@/lib/supabase';

async function getInternships(searchParams: { [key: string]: string | undefined }) {
  let query = supabase
    .from('internships')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (searchParams.search) {
    const s = searchParams.search;
    query = query.or(`title.ilike.%${s}%,company.ilike.%${s}%,platform.ilike.%${s}%,source_college.ilike.%${s}%`);
  }
  if (searchParams.platform) {
    query = query.eq('platform', searchParams.platform);
  }
  if (searchParams.remote === 'true') {
    query = query.eq('remote', true);
  }
  if (searchParams.category) {
    query = query.ilike('category', `%${searchParams.category}%`);
  }

  // Handle expiring filtering
  if (searchParams.expiring === 'true') {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setHours(now.getHours() + 24);
    query = query
      .gte('deadline', now.toISOString())
      .lte('deadline', tomorrow.toISOString());
  }

  try {
    const { data, error } = await query;
    if (error) throw error;
    return { internships: (data || []) as (Internship & { slug: string })[], error: null };
  } catch (error) {
    console.error("Supabase query error:", error);
    return { internships: [], error };
  }
}

async function InternshipFeed({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const { internships, error } = await getInternships(searchParams);

  if (error) {
    return <div className="text-center py-20 text-red-500 font-medium bg-red-50 rounded-3xl">Failed to load internships.</div>;
  }

  if (internships.length === 0) {
    return (
      <div className="text-center py-32 rounded-3xl border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No internships found</h3>
        <p className="text-gray-500 font-medium">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const expiringInternships = internships.filter(job => {
    if (!job.deadline) return false;
    const deadline = new Date(job.deadline);
    return deadline >= now && deadline <= tomorrow;
  });

  const otherInternships = internships.filter(job => {
    if (!job.deadline) return true;
    const deadline = new Date(job.deadline);
    return deadline < now || deadline > tomorrow;
  });

  const sortedInternships = [...expiringInternships, ...otherInternships];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedInternships.map(internship => (
        <InternshipCard key={internship.slug} internship={internship} />
      ))}
    </div>
  );
}

export default function Home({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const hasFilters = Object.keys(searchParams).length > 0;

  return (
    <main className="flex min-h-screen flex-col bg-white text-gray-900 font-sans">
      <Navbar />

      {/* ExpiringTicker will internally decide to render based on data */}
      <ExpiringTicker />

      <div className="flex-1 container mx-auto px-4 py-8 md:py-16 space-y-16">
        <section className="text-center space-y-8 max-w-4xl mx-auto py-12 md:py-24">
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-600 mb-4 transition-colors hover:bg-gray-100 cursor-pointer">
            ✨ Your fast-track into tech
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900">
            Find Your Dream
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              CS Internship
            </span>
          </h1>
          <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
            The automated internship aggregator. Let the best opportunities come to you, perfectly curated and organized.
          </p>

          <div className="pt-8">
            <Suspense fallback={<div className="h-16 w-full animate-pulse bg-gray-100 rounded-3xl"></div>}>
              <FilterBar />
            </Suspense>
          </div>
        </section>

        <section id="feed" className="scroll-mt-32 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                {hasFilters ? 'Search Results' : 'Latest Opportunities'}
              </h2>
              <p className="text-gray-500 font-medium mt-1">Updated automatically from top platforms</p>
            </div>
          </div>

          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-72 rounded-3xl bg-gray-50 border border-gray-100 animate-pulse"></div>)}
            </div>
          }>
            <InternshipFeed searchParams={searchParams} />
          </Suspense>
        </section>

        <section className="py-16 max-w-7xl mx-auto">
          <TelegramBanner />
        </section>

        <div className="max-w-7xl mx-auto w-full pb-16">
          <PlatformsSection />
        </div>
      </div>

      <Footer />
    </main>
  );
}
