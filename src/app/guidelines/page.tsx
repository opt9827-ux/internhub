"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function GuidelinesPage() {
  const [isChecked, setIsChecked] = useState(false)
  const router = useRouter()

  const handleAcknowledge = () => {
    if (isChecked) {
      localStorage.setItem("guidelines_read", "true")
      router.push("/")
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl w-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 sm:p-12 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-800 mb-4 tracking-wide uppercase">
            Mandatory Reading
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Student Internship Guidelines</h1>
          <p className="mt-3 text-gray-500 font-medium text-lg">
            Please read the following guidelines carefully before accessing the platform.
          </p>
        </div>

        <div className="prose prose-blue max-w-none space-y-4 text-gray-700 bg-gray-50 p-6 sm:p-8 rounded-xl border border-gray-100 mb-10 text-base sm:text-lg">
          <ul className="space-y-3 list-disc pl-5">
            <li>Each student should prepare <strong>3 resumes</strong>:
              <ol className="list-decimal pl-5 mt-2 space-y-1">
                <li>Product based companies</li>
                <li>Service based companies</li>
                <li>Startup companies (Zomato / Swiggy type)</li>
              </ol>
            </li>
            <li>No company sends WhatsApp messages before selection.</li>
            <li>No legitimate company asks you to pay money before joining an internship. <strong className="text-red-600">If any company asks for money, avoid it.</strong></li>
            <li>If the deadline is over, companies automatically terminate applications.</li>
            <li>Your resume should contain <strong>at least 4 projects</strong>: 2 original projects + 2 optional practice projects.</li>
            <li>For fake/practice projects you must understand <strong>at least 50% of the implementation</strong>.</li>
            <li>For original projects you must have <strong>complete end-to-end knowledge</strong>.</li>
            <li>Optimize your <strong>LinkedIn profile</strong> and connect with professionals.</li>
            <li>Maintain an active <strong>GitHub profile</strong>.</li>
            <li>Building connections with employees can help you get <strong>referrals</strong>.</li>
            <li>Some companies conduct <strong>AI interviews</strong>, others conduct <strong>1-to-1 interviews</strong>.</li>
            <li>AI interviews are usually easier.</li>
            <li>For live interviews you must prepare properly.</li>
            <li>Students with backlogs may still get internships but <strong>jobs usually require no backlogs</strong>.</li>
            <li>Some companies offer <strong>fixed stipends</strong>, others offer <strong>performance-based stipends</strong>.</li>
            <li>Selected candidates receive an <strong>Offer Letter</strong>, followed later by a <strong>Joining Letter</strong>.</li>
            <li>Clarify all stipend and role details before accepting the offer.</li>
            <li>Some offers may be fake — if money is requested it is likely fake.</li>
            <li>Never share <strong>credentials or personal information</strong> with unknown recruiters.</li>
            <li>Hiring distribution is roughly: 
              <br/>
              <span className="inline-block mt-2 font-semibold">30% referrals | 30% strong candidates | 40% opportunity through internships.</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <label className="flex items-start cursor-pointer group">
            <div className="flex items-center h-6">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer transition-all"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
            </div>
            <div className="ml-3">
              <span className="text-gray-900 font-medium group-hover:text-blue-700 transition-colors">
                I have read and understood the internship guidelines
              </span>
            </div>
          </label>

          <button
            onClick={handleAcknowledge}
            disabled={!isChecked}
            className={`whitespace-nowrap px-8 py-3.5 rounded-xl font-bold transition-all duration-200 shadow-sm
              ${isChecked 
                ? 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md transform hover:-translate-y-0.5' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Access Platform
          </button>
        </div>
      </div>
    </main>
  )
}
