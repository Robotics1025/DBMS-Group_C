"use client"

import * as React from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = React.useState<{ id: string; email: string } | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Read sessionId from cookie
    const cookies = document.cookie.split("; ").reduce((acc: any, curr) => {
      const [key, value] = curr.split("=")
      acc[key] = value
      return acc
    }, {})

    const sessionId = cookies["sessionId"]

    if (!sessionId) {
      router.push("/login")
      return
    }

    // Optionally, you can fetch user info if needed
    // But if middleware sets headers, server-side props can handle this
    setUser({ id: sessionId, email: "" }) // minimal user info
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) return null // just in case

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar with mobile toggle */}
      <SidebarNav
        user={user}
        onLogout={() => {
          document.cookie = "sessionId=; path=/; max-age=0" // clear session
          router.push("/login")
        }}
      />

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
