import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAAL Pharmacy - When you need it, we supply it",
  description:
    "Leading pharmacy chain providing quality medications, healthcare products, and expert pharmaceutical services. Trusted by thousands of patients.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/img/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/img/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/img/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
