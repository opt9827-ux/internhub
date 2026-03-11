import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { sendTelegramMessage } from "@/lib/telegram"

function generateSlug(title: string) {
    return (
        title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") +
        "-" +
        Date.now()
    )
}

export async function POST(request: Request) {

    try {
        console.log("[API /admin] Received POST request.")
        
        const body = await request.json()
        console.log("[API /admin] Parsed body:", body)
        
        const { title, link, deadline, description, source_college } = body

        if (!title || typeof title !== "string" || title.trim().length === 0) {
            console.log("[API /admin] Validation failed: Invalid Title")
            return NextResponse.json({ error: "Title is required and must be a valid string." }, { status: 400 })
        }

        if (!link || typeof link !== "string" || !link.startsWith("http")) {
            console.log("[API /admin] Validation failed: Invalid Link")
            return NextResponse.json({ error: "Apply link is required and must be a valid URL starting with http." }, { status: 400 })
        }

        const slug = generateSlug(title)
        console.log(`[API /admin] Generated slug: ${slug}`)

        const payload = {
            title: title,
            slug: slug,
            company: "Company",
            location: "Remote",
            stipend: null,
            deadline: deadline || null,
            description: description || null,
            apply_url: link,
            source_id: `manual-${Date.now()}`,
            platform: "Manual",
            category: "Computer Science",
            remote: true,
            is_active: true,
            created_at: new Date().toISOString(),
            source_college: source_college || null
        }
        
        console.log("[API /admin] Inserting into Supabase:", payload)

        const { data, error } = await supabase
            .from("internships")
            .insert([payload])

        if (error) {
            console.error("[API /admin] Supabase insert error:", error)
            throw new Error(`Database Error: ${error.message}`)
        }
        
        console.log("[API /admin] Insert successful:", data)
        console.log("[API /admin] Triggering Telegram notification...")

        try {
            await sendTelegramMessage(
`🚀 New Internship Posted!

${title}

Apply here:
${link}

🎓 Shared via ${source_college || 'Manual'}

🌐 https://internhub-iota.vercel.app`
            )
            console.log("[API /admin] Telegram notification sent successfully.")
        } catch (telegramError) {
            console.error("[API /admin] Telegram notification failed:", telegramError)
            // Note: We don't throw here to ensure the internship is still considered successfully added
        }

        return NextResponse.json({
            success: true,
            internship: data
        })

    } catch (error: any) {
        console.error("[API /admin] Catch block error:", error)
        return NextResponse.json({
            error: error.message || "Failed to import internship"
        }, { status: 500 })
    }
}
