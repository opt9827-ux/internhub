"use client"

import { FileText, Download, Briefcase, Code, Rocket } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ResumesPage() {
  const resumes = [
    {
      id: "product",
      title: "Product Based Resume",
      description: "Optimized for top tech product companies. Emphasizes deep technical impact, scalability, and complex problem-solving.",
      icon: <Code className="w-8 h-8 text-blue-500" />,
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50"
    },
    {
      id: "service",
      title: "Service Based Resume",
      description: "Ideal for consulting and service giants like TCS, Infosys, Wipro. Highlights teamwork, client delivery, and broad tech stacks.",
      icon: <Briefcase className="w-8 h-8 text-emerald-500" />,
      gradient: "from-emerald-400 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50"
    },
    {
      id: "startup",
      title: "Startup Resume (Zomato/Swiggy)",
      description: "Designed for fast-paced unicorns. Showcases hustle, end-to-end ownership, moving fast, and rapid prototyping.",
      icon: <Rocket className="w-8 h-8 text-orange-500" />,
      gradient: "from-orange-400 to-red-500",
      bgGradient: "from-orange-50 to-red-50"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto py-16 px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16 max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                Winning <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Resume Templates</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium">
                Stand out from the crowd. Download our structure-optimized templates specifically tailored to the type of company you're targeting.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {resumes.map((resume) => (
                <div key={resume.id} className="group flex flex-col bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Visual Preview Area */}
                    <div className={`h-64 bg-gradient-to-br ${resume.bgGradient} flex items-center justify-center relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        <div className={`w-32 h-40 bg-white shadow-md rounded-lg flex flex-col items-center justify-center border-t-4 border-t-current ${resume.gradient.split(' ')[0].replace('from-', 'text-')} transform group-hover:-translate-y-2 transition-transform duration-500`}>
                            {resume.icon}
                            <div className="mt-4 w-16 h-1 bg-gray-100 rounded-full"></div>
                            <div className="mt-2 w-12 h-1 bg-gray-100 rounded-full"></div>
                            <div className="mt-2 w-20 h-1 bg-gray-100 rounded-full"></div>
                            <div className="mt-4 w-24 h-12 bg-gray-50 rounded border border-gray-100"></div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <h3 className="text-2xl font-bold text-gray-900">{resume.title}</h3>
                        </div>
                        <p className="text-gray-500 font-medium flex-1 mb-8">
                            {resume.description}
                        </p>
                        
                        <a 
                            href={`/resumes/${resume.id}-resume.pdf`}
                            download
                            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white shadow-sm hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 bg-gradient-to-r ${resume.gradient} resume-card`}
                        >
                            <Download className="w-5 h-5" />
                            Download PDF Template
                        </a>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
