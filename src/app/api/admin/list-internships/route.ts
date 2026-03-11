import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {

  const { data, error } = await supabase
    .from("internships")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch internships" })
  }

  return NextResponse.json({
    internships: data
  })
}