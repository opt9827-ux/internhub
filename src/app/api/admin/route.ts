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

        const body = await request.json()
        const { title, link } = body

        if (!title || !link) {
            return NextResponse.json({ error: "Title and link required" }, { status: 400 })
        }

        const slug = generateSlug(title)

        const { data, error } = await supabase
            .from("internships")
            .insert([
                {
                    title: title,
                    slug: slug,
                    company: "Company",
                    location: "Remote",
                    stipend: null,
                    deadline: null,
                    description: null,
                    apply_url: link,
                    source_id: `manual-${Date.now()}`,
                    platform: "Manual",
                    category: "Computer Science",
                    remote: true,
                    is_active: true,
                    created_at: new Date().toISOString()
                }
            ])

        if (error) throw error

        await sendTelegramMessage(
`🚀 New Internship Posted!

${title}

Apply here:
${link}

🌐 https://internhub-iota.vercel.app`
        )

        return NextResponse.json({
            success: true,
            internship: data
        })

    } catch (error) {

        console.error(error)

        return NextResponse.json({
            error: "Failed to import internship"
        })
    }
}
