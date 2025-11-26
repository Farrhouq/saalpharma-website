import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SAAL Pharmacy - Your Health, Our Priority",
  description:
    "Leading pharmacy chain providing quality medications, healthcare products, and expert pharmaceutical services. Trusted by thousands of patients.",
  generator: "v0.app",
  icons: {
    // icon: [
    //   {
    //     url: "/icon-light-32x32.png",
    //     media: "(prefers-color-scheme: light)",
    //   },
    //   {
    //     url: "/icon-dark-32x32.png",
    //     media: "(prefers-color-scheme: dark)",
    //   },
    //   {
    //     url: "/icon.svg",
    //     type: "image/svg+xml",
    //   },
    // ],
    // apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
