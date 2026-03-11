"use client"

import { useState } from "react"

export default function AdminPage() {
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [deadline, setDeadline] = useState("")
  const [description, setDescription] = useState("")
  const [sourceCollege, setSourceCollege] = useState("")
  const [status, setStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: null, message: "" })
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, link, deadline, description, source_college: sourceCollege }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit")
      }
      setStatus({ type: "success", message: "Internship added successfully!" })
      setTitle("")
      setLink("")
      setDeadline("")
      setDescription("")
      setSourceCollege("")
    } catch (error: any) {
      setStatus({ type: "error", message: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Add Internship Manually</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="link">
            Apply Link
          </label>
          <input
            id="link"
            type="url"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="description">
            Description (optional)
          </label>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="deadline">
            Deadline (optional)
          </label>
          <input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="sourceCollege">
            Source College (optional)
          </label>
          <input
            id="sourceCollege"
            type="text"
            value={sourceCollege}
            onChange={(e) => setSourceCollege(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Adding..." : "Add Internship"}
        </button>
        {status.message && (
          <p className={`mt-2 text-center ${status.type === "success" ? "text-green-600" : "text-red-600"}`}> {status.message} </p>
        )}
      </form>
    </main>
  )
}
