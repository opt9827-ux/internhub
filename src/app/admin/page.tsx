"use client"

import { useState } from "react"

export default function AdminPage() {
    const [title, setTitle] = useState("")
    const [link, setLink] = useState("")
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
                body: JSON.stringify({ title, link }),
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || "Failed to submit")
            }

            setStatus({ type: "success", message: "Internship added successfully!" })
            setTitle("")
            setLink("")
        } catch (error: any) {
            setStatus({ type: "error", message: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center pt-20">
            <h1 className="text-3xl font-bold mb-8 tracking-tight">Admin Portal</h1>
            
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl flex flex-col gap-6 backdrop-blur-xl">
                {status.message && (
                    <div className={`p-4 rounded-xl text-sm ${status.type === "success" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                        {status.message}
                    </div>
                )}
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-sm font-medium text-zinc-300">Internship Title</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Software Engineer Intern at Apple"
                        required
                        className="bg-black border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder:text-zinc-600"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="link" className="text-sm font-medium text-zinc-300">Application Link</label>
                    <input
                        id="link"
                        type="url"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://..."
                        required
                        className="bg-black border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all placeholder:text-zinc-600"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 bg-white text-black font-semibold rounded-xl p-3 hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                >
                    {loading ? "Adding..." : "Add Internship"}
                </button>
            </form>
        </div>
    )
}
