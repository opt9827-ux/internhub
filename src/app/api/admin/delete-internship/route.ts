import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function DELETE(request: Request) {

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