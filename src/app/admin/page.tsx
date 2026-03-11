"use client"

import { useState } from "react"

export default function AdminPage() {
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [deadline, setDeadline] = useState("")
  const [description, setDescription] = useState("")
  const [sourceCollege, setSourceCollege] = useState("")
  const [location, setLocation] = useState("")
  const [amount, setAmount] = useState("")
  
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: null, message: "" })
    try {
      console.log("Initiating fetch to /api/admin with payload:", { title, link, deadline, description, source_college: sourceCollege, location, amount })
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, link, deadline, description, source_college: sourceCollege, location, amount }),
      })
      console.log("Received response with status:", res.status)
      
      const data = await res.json()
      console.log("Response JSON data:", data)
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit")
      }
      setStatus({ type: "success", message: "Internship added successfully!" })
      setTitle("")
      setLink("")
      setDeadline("")
      setDescription("")
      setSourceCollege("")
      setLocation("")
      setAmount("")
    } catch (error: any) {
      setStatus({ type: "error", message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 p-6 border border-gray-100">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Post an Internship</h1>
          <p className="text-gray-500 mt-2">Add a new opportunity with full details to the platform.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group 1: Core Details */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase border-b pb-2">Core Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  placeholder="e.g. Software Engineer Internship - Google"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="link">
                  Application Link <span className="text-red-500">*</span>
                </label>
                <input
                  id="link"
                  type="url"
                  required
                  placeholder="https://boards.greenhouse.io/..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Group 2: Role Logistics */}
          <div className="space-y-4 pt-2">
            <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase border-b pb-2">Location & Compensation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="location">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  required
                  placeholder="e.g. Remote, Bangalore, UK"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="amount">
                  Stipend Amount <span className="text-red-500">*</span>
                </label>
                <input
                  id="amount"
                  type="text"
                  required
                  placeholder="e.g. 50000, 0 for Unpaid"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Group 3: Additional Info */}
          <div className="space-y-4 pt-2">
             <h2 className="text-sm font-semibold text-gray-800 tracking-wide uppercase border-b pb-2">Additional Information</h2>
             
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                Role Description <span className="text-gray-400 font-normal text-xs ml-1">(Optional)</span>
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Brief description of the internship responsibilities, requirements, and perks..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors resize-y"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="deadline">
                  Expiry Deadline <span className="text-gray-400 font-normal text-xs ml-1">(Optional)</span>
                </label>
                <input
                  id="deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="sourceCollege">
                  Source College <span className="text-gray-400 font-normal text-xs ml-1">(Optional)</span>
                </label>
                <input
                  id="sourceCollege"
                  type="text"
                  placeholder="e.g. IIT Bombay, NIT Trichy"
                  value={sourceCollege}
                  onChange={(e) => setSourceCollege(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center h-[52px]"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : null}
              {loading ? "Publishing..." : "Submit Internship"}
            </button>
          </div>

          {status.message && (
            <div className={`mt-4 p-4 rounded-lg text-sm font-medium ${status.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </main>
  )
}
