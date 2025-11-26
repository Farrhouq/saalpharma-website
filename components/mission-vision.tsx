"use client"

import { Target, Eye, Sparkles } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const coreValues = [
  { title: "Integrity", desc: "Honest and transparent in all dealings", icon: "🤝" },
  { title: "Excellence", desc: "Highest standards in service quality", icon: "⭐" },
  { title: "Compassion", desc: "Caring for each patient individually", icon: "💚" },
  { title: "Innovation", desc: "Embracing modern healthcare solutions", icon: "💡" },
]

export default function MissionVision() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation()
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation()

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center space-y-4 mb-16 animate-on-scroll ${headerVisible ? "visible" : ""}`}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-secondary">
            Our <span className="text-primary">Mission & Vision</span>
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className={`animate-slide-left stagger-1 ${cardsVisible ? "visible" : ""}`}>
            <div className="group h-full p-12 bg-gradient-to-br from-primary/5 to-white border border-primary/20 rounded-3xl hover:shadow-2xl transition-all duration-500 hover-lift">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 animate-pulse-glow">
                  <Target size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
                    Our Mission
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To provide accessible, affordable, and high-quality pharmaceutical care that improves the health and
                    wellness of our community. We are committed to exceptional service, professional integrity, and
                    patient-centered care in everything we do.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className={`animate-slide-right stagger-2 ${cardsVisible ? "visible" : ""}`}>
            <div className="group h-full p-12 bg-gradient-to-br from-primary/5 to-white border border-primary/20 rounded-3xl hover:shadow-2xl transition-all duration-500 hover-lift">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 animate-pulse-glow">
                  <Eye size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
                    Our Vision
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To become the most trusted and innovative pharmacy chain, recognized for delivering comprehensive
                    healthcare solutions and fostering a culture of wellness. We envision a future where quality
                    healthcare is within everyone's reach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={valuesRef}
          className={`mt-20 p-12 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-3xl border border-gray-200 animate-scale-on-scroll ${valuesVisible ? "visible" : ""}`}
        >
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles size={24} className="text-primary animate-pulse" />
            <h3 className="text-2xl font-bold text-secondary text-center">Our Core Values</h3>
            <Sparkles size={24} className="text-primary animate-pulse" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {coreValues.map((value, index) => (
              <div
                key={value.title}
                className={`text-center group cursor-default animate-on-scroll stagger-${index + 1} ${valuesVisible ? "visible" : ""}`}
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {value.icon}
                </div>
                <p className="font-bold text-primary text-lg mb-2 group-hover:scale-105 transition-transform">
                  {value.title}
                </p>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
