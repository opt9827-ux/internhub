import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

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

export async function GET(request: Request) {

  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

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