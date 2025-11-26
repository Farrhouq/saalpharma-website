"use client"

import type React from "react"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { ref: sectionRef, isVisible } = useScrollAnimation()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", phone: "", message: "" })
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const contactInfo = [
    { icon: Phone, title: "Phone", content: "+233 30 123 4567", subtext: "Available 24/7" },
    { icon: Mail, title: "Email", content: "info@saalpharmacy.com.gh", subtext: "Response within 2 hours" },
    { icon: MapPin, title: "Main Location", content: "123 Independence Avenue", subtext: "Accra, Ghana" },
    { icon: Clock, title: "Hours", content: "9 AM - 10 PM Daily", subtext: "Open on weekends" },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className={`text-center space-y-4 mb-16 animate-on-scroll ${isVisible ? "visible" : ""}`}>
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-secondary">
            Contact <span className="text-primary">Us Today</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have questions? We'd love to hear from you. Reach out to us anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className={`space-y-8 animate-slide-left ${isVisible ? "visible" : ""}`}>
            <div className="space-y-6">
              {contactInfo.map((item, index) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className={`flex gap-4 group cursor-default p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 animate-on-scroll stagger-${index + 1} ${isVisible ? "visible" : ""}`}
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon size={24} className="text-primary group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-secondary mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-700">{item.content}</p>
                      <p className="text-sm text-gray-500">{item.subtext}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="rounded-2xl overflow-hidden h-64 bg-gradient-to-br from-primary/10 to-primary/5 border border-gray-200 flex items-center justify-center group hover:shadow-lg transition-all duration-300">
              <div className="text-center">
                <MapPin
                  size={48}
                  className="text-primary/30 mx-auto mb-4 group-hover:scale-110 group-hover:text-primary/50 transition-all duration-300"
                />
                <p className="text-gray-500 group-hover:text-primary transition-colors">Store Location Map</p>
              </div>
            </div>
          </div>

          <div className={`animate-slide-right ${isVisible ? "visible" : ""}`}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-500"
            >
              {["name", "email", "phone"].map((field, index) => (
                <div key={field} className={`animate-on-scroll stagger-${index + 1} ${isVisible ? "visible" : ""}`}>
                  <label className="block text-sm font-semibold text-secondary mb-2 capitalize">
                    {field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Phone Number"}
                  </label>
                  <input
                    type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white transition-all duration-300"
                    placeholder={
                      field === "name" ? "John Doe" : field === "email" ? "john@example.com" : "+233 00 000 0000"
                    }
                    required={field !== "phone"}
                  />
                </div>
              ))}

              <div className={`animate-on-scroll stagger-4 ${isVisible ? "visible" : ""}`}>
                <label className="block text-sm font-semibold text-secondary mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary bg-white transition-all duration-300 resize-none"
                  placeholder="Tell us how we can help..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 btn-animated ${
                  isSubmitted
                    ? "bg-green-500 text-white"
                    : "bg-primary text-white hover:bg-primary/90 hover:scale-[1.02]"
                }`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={20} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">We'll get back to you as soon as possible</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
