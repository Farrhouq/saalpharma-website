"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-secondary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-xl">+</span>
              </div>
              <span className="font-bold text-xl group-hover:text-primary transition-colors">SAAL PHARMA</span>
            </div>
            <p className="text-white/70 text-sm">Your trusted partner in healthcare since 1998.</p>
            <div className="flex gap-3 pt-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <button
                  key={index}
                  className="p-2.5 bg-white/10 hover:bg-primary rounded-lg transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {[
            { title: "Company", links: ["About Us", "Our Team", "Careers", "Blog"] },
            { title: "Services", links: ["Prescription Meds", "Wellness", "Consultations", "Emergency Care"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Contact"] },
          ].map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-bold text-lg">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-white/70 hover:text-primary transition-colors inline-block hover:translate-x-1 duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>© 2025 S.A.A Legacy Pharmaceuticals Limited. All rights reserved.</p>
            <p>Designed with care for your health</p>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg transition-all duration-500 hover:scale-110 hover:shadow-xl z-50 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  )
}
