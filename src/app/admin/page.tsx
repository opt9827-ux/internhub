"use client"

import { useEffect, useState } from "react"

type Internship = {
id: string
title: string
company: string
platform: string
apply_url: string
}

export default function AdminPage() {

const [link, setLink] = useState("")
const [internships, setInternships] = useState<Internship[]>([])
const [message, setMessage] = useState("")

async function loadInternships() {


try {

  const res = await fetch("/api/admin/list-internships")
  const data = await res.json()

  setInternships(data.internships || [])

} catch (error) {

  console.error(error)

}


}

async function addInternship() {

if (!link) {
  setMessage("Please paste a link first")
  return
}

setMessage("Adding internship...")

try {

  const res = await fetch("/api/admin/add-by-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ link })
  })

  const data = await res.json()

  if (data.success) {

    setMessage("✅ Internship added successfully")
    setLink("")
    loadInternships()

  } else {

    setMessage("❌ Failed to add internship")

  }

} catch {

  setMessage("❌ Server error")

}


}

async function deleteInternship(id: string) {


const confirmDelete = confirm("Delete this internship?")
if (!confirmDelete) return

await fetch(`/api/admin/delete-internship?id=${id}`, {
  method: "DELETE"
})

loadInternships()


}

useEffect(() => {
loadInternships()
}, [])

return (


<div style={{
  minHeight: "100vh",
  background: "#f5f5f7",
  padding: "40px",
  fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto"
}}>

  <h1 style={{
    fontSize: "28px",
    marginBottom: "30px",
    color: "#111"
  }}>
    InternHub Admin
  </h1>

  {/* Add Internship */}

  <div style={{
    background: "white",
    padding: "24px",
    borderRadius: "12px",
    marginBottom: "30px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
  }}>

    <h2 style={{marginBottom:"15px", color:"#111"}}>
      Add Internship
    </h2>

    <input
      type="text"
      placeholder="Paste internship link..."
      value={link}
      onChange={(e)=>setLink(e.target.value)}
      style={{
        width:"100%",
        padding:"12px",
        borderRadius:"8px",
        border:"1px solid #ddd",
        marginBottom:"15px",
        fontSize:"14px",
        color:"#111"
      }}
    />

    <button
      onClick={addInternship}
      style={{
        background:"#0071e3",
        color:"white",
        padding:"10px 20px",
        border:"none",
        borderRadius:"8px",
        cursor:"pointer"
      }}
    >
      Add Internship
    </button>

    {message && (
      <p style={{marginTop:"12px", color:"#333"}}>
        {message}
      </p>
    )}

  </div>

  {/* Internship List */}

  <div style={{
    background:"white",
    padding:"24px",
    borderRadius:"12px",
    boxShadow:"0 8px 20px rgba(0,0,0,0.06)"
  }}>

    <h2 style={{marginBottom:"20px", color:"#111"}}>
      All Internships
    </h2>

    {internships.length === 0 && (
      <p style={{color:"#555"}}>
        No internships found.
      </p>
    )}

    {internships.map((job)=>(
      <div
        key={job.id}
        style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          padding:"14px 0",
          borderBottom:"1px solid #eee"
        }}
      >

        <div>

          <strong style={{color:"#111"}}>
            {job.title}
          </strong>

          <p style={{
            fontSize:"14px",
            color:"#666",
            margin:"4px 0"
          }}>
            {job.company} • {job.platform}
          </p>

          <a
            href={job.apply_url}
            target="_blank"
            style={{
              fontSize:"13px",
              color:"#0071e3"
            }}
          >
            {job.apply_url}
          </a>

        </div>

        <button
          onClick={()=>deleteInternship(job.id)}
          style={{
            background:"#ff3b30",
            color:"white",
            border:"none",
            padding:"6px 12px",
            borderRadius:"6px",
            cursor:"pointer"
          }}
        >
          Delete
        </button>

      </div>
    ))}

  </div>

</div>


)
}
