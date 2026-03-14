"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function GuidelineRedirect() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if the user has read the guidelines
    const hasRead = localStorage.getItem("guidelines_read")
    
    // Force redirect if not read, skipping the guidelines page itself and admin routes
    if (!hasRead && pathname !== "/guidelines" && !pathname?.startsWith("/admin")) {
      router.push("/guidelines")
    }
  }, [pathname, router])

  return null
}
