import { ExternalLink } from 'lucide-react';

export default function PlatformsSection() {
    const platforms = [
        { name: "Internshala", url: "https://internshala.com" },
        { name: "LinkedIn", url: "https://linkedin.com/jobs" },
        { name: "Unstop", url: "https://unstop.com" },
        { name: "Naukri", url: "https://naukri.com" },
        { name: "Indeed", url: "https://indeed.com" },
        { name: "Glassdoor", url: "https://glassdoor.com" },
        { name: "AngelList Talent", url: "https://wellfound.com" },
        { name: "LetsIntern", url: "https://letsintern.com" },
        { name: "Twenty19", url: "http://www.twenty19.com" },
        { name: "AICTE Internship Portal", url: "https://internship.aicte-india.org" },
        { name: "Skill India Digital", url: "https://www.skillindiadigital.gov.in" },
        { name: "Google Careers", url: "https://careers.google.com/students/" },
        { name: "Microsoft Careers", url: "https://careers.microsoft.com/students" },
        { name: "Amazon Jobs", url: "https://amazon.jobs/en/business_categories/student-programs" }
    ];

    return (
        <section className="py-12 border-t border-gray-100">
            <div className="text-center mb-10 mt-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Recommended Platforms</h2>
                <p className="text-gray-500 mt-2 font-medium text-lg">Your direct links to top tech hubs and gig platforms</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {platforms.map((platform) => (
                    <a 
                        key={platform.name}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between p-5 rounded-2xl border border-gray-200 bg-white hover:border-blue-500 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                    >
                        <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {platform.name}
                        </span>
                        <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                    </a>
                ))}
            </div>
        </section>
    );
}
