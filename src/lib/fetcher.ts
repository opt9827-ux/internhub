import axios from "axios"
import * as cheerio from "cheerio"

export interface Internship {
  title: string
  company: string
  platform: string
  location: string
  stipend: string | null
  deadline: string | null
  description: string | null
  apply_url: string
  source_id: string
  category: string
  remote: boolean
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9",
}

async function fetchWithRetry(url: string, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios.get(url, { headers: HEADERS })
    } catch {
      if (i === retries - 1) throw new Error("Request failed")
      await delay(1000)
    }
  }
}

/* ---------------- CSE FILTER ---------------- */

function isCSInternship(title: string) {
  const keywords = [
    "software",
    "developer",
    "engineer",
    "backend",
    "frontend",
    "full stack",
    "ai",
    "ml",
    "data",
    "cloud",
    "devops",
    "cybersecurity",
    "mobile",
  ]

  return keywords.some((k) => title.toLowerCase().includes(k))
}

/* ---------------- LOCATION FILTER ---------------- */

function isValidLocation(location: string) {
  const loc = location.toLowerCase()

  return (
    loc.includes("hyderabad") ||
    loc.includes("remote") ||
    loc.includes("online") ||
    loc.includes("work from home")
  )
}

/* ---------------- INTERN SHALA SCRAPER ---------------- */

async function fetchInternshala(): Promise<Partial<Internship>[]> {
  try {
    const res = await fetchWithRetry(
      "https://internshala.com/internships/computer-science-internships"
    )

    if (!res) return []

    const $ = cheerio.load(res.data)

    const internships: Partial<Internship>[] = []

    $(".individual_internship").each((_, el) => {
      const title = $(el).find(".job-title-href").text().trim()
      const company = $(el).find(".company-name").text().trim()

      const location =
        $(el).find(".location_link").text().trim() || "Remote"

      const stipend = $(el).find(".stipend").text().trim()

      const link = $(el).find(".job-title-href").attr("href")

      if (!title || !company || !link) return

      if (!isCSInternship(title)) return

      if (!isValidLocation(location)) return

      const apply_url = "https://internshala.com" + link

      internships.push({
        title,
        company,
        platform: "Internshala",
        location,
        stipend,
        apply_url,
        source_id: "internshala-" + apply_url.split("/").pop(),
        category: "Computer Science",
        remote: location.toLowerCase().includes("remote"),
        description: null,
        deadline: null,
      })
    })

    return internships
  } catch (err) {
    console.error("Internshala scraper failed:", err)
    return []
  }
}

/* ---------------- LINKEDIN SCRAPER ---------------- */

async function fetchLinkedIn(): Promise<Partial<Internship>[]> {
  try {
    const url =
      "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=software%20intern"

    const res = await fetchWithRetry(url)

    if (!res) return []

    const $ = cheerio.load(res.data)

    const internships: Partial<Internship>[] = []

    $(".base-card").each((_, el) => {
      const title = $(el).find(".base-search-card__title").text().trim()

      const company = $(el)
        .find(".base-search-card__subtitle")
        .text()
        .trim()

      const location = $(el)
        .find(".job-search-card__location")
        .text()
        .trim()

      const link = $(el).find("a.base-card__full-link").attr("href")

      if (!title || !company || !link) return

      if (!isCSInternship(title)) return

      if (!isValidLocation(location)) return

      internships.push({
        title,
        company,
        platform: "LinkedIn",
        location,
        stipend: null,
        apply_url: link,
        source_id: "linkedin-" + link.split("/").pop(),
        category: "Computer Science",
        remote: location.toLowerCase().includes("remote"),
        description: null,
        deadline: null,
      })
    })

    return internships
  } catch (err) {
    console.error("LinkedIn scraper failed:", err)
    return []
  }
}

/* ---------------- MAIN SCRAPER ---------------- */

export async function fetchAllInternships(): Promise<Partial<Internship>[]> {
  console.log("Running internship scrapers...")

  const scrapers = [fetchInternshala, fetchLinkedIn]

  const results = await Promise.allSettled(scrapers.map((s) => s()))

  const all: Partial<Internship>[] = []

  results.forEach((r) => {
    if (r.status === "fulfilled") {
      all.push(...r.value)
    }
  })

  /* -------- DEDUPLICATE -------- */

  const unique = new Map()

  all.forEach((job) => {
    if (!job.source_id) return

    if (!unique.has(job.source_id)) {
      unique.set(job.source_id, job)
    }
  })

  return Array.from(unique.values())
}