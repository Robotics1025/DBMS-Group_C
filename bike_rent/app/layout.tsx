import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { Providers } from "./providers" // Wraps ThemeProvider, AuthProvider, etc.

// Load Google Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// Metadata for the site
export const metadata: Metadata = {
  title: "Bike Rental",
  description: "A comprehensive bike renting system",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "var(--toast-background, #333)",
                color: "var(--toast-foreground, #fff)",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}