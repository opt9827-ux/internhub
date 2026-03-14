import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

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

function checkAuth(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false
  }
  const base64Credentials = authHeader.split(" ")[1]
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii")
  const [username, password] = credentials.split(":")
  return username === "internhubvce" && password === "Vmeg@777"
}

export async function POST(request: Request) {

  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {

    const body = await request.json()
    const { link } = body

    if (!link) {
      return NextResponse.json({ error: "Link required" }, { status: 400 })
    }

    /* ---------- PLATFORM DETECTION ---------- */

    let platform = "Manual"

    if (link.includes("linkedin.com")) platform = "LinkedIn"
    if (link.includes("internshala.com")) platform = "Internshala"
    if (link.includes("wellfound.com")) platform = "Wellfound"
    if (link.includes("indeed.com")) platform = "Indeed"

    const title = "Internship Opportunity"

    const slug = generateSlug(title)

    const { data, error } = await supabase
      .from("internships")
      .insert([
        {
          title,
          slug,
          company: "Company",
          location: "Remote",
          stipend: null,
          deadline: null,
          description: null,
          apply_url: link,
          source_id: `manual-${Date.now()}`,
          platform,
          category: "Computer Science",
          remote: true,
          is_active: true,
          created_at: new Date().toISOString()
        }
      ])

    if (error) throw error

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