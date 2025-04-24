import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

// Use a more impactful font for the poster-like design
const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] })

export const metadata: Metadata = {
  title: "ACTIVE - End of Year Party",
  description: "Culture Collective & Psyked present ACTIVE - End of Year Party",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
