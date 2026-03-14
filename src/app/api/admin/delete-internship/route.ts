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

export async function DELETE(request: Request) {

  if (!checkAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Missing id" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("internships")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: "Delete failed" },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true
    })

  } catch (err) {

    console.error(err)

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    )
  }

}