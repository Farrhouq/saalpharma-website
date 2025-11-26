"use client"

import { useScrollAnimation, useCountAnimation } from "@/hooks/use-scroll-animation"

export default function About() {
  const { ref: sectionRef, isVisible } = useScrollAnimation()
  const { count: emergencyCount } = useCountAnimation(24, 2000, isVisible)
  const { count: satisfactionCount } = useCountAnimation(99, 2000, isVisible)

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div ref={sectionRef} className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`order-2 md:order-1 animate-slide-left ${isVisible ? "visible" : ""}`}>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>
              <img
                src="/pharmacy-store-interior-with-professional-pharmaci.jpg"
                alt="Saal Pharmacy Store"
                className="relative w-full rounded-3xl shadow-xl group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white rounded-2xl p-6 shadow-xl animate-float">
                <p className="text-4xl font-bold">25+</p>
                <p className="text-sm opacity-90">Years Experience</p>
              </div>
            </div>
          </div>

          <div className={`order-1 md:order-2 space-y-8 animate-slide-right ${isVisible ? "visible" : ""}`}>
            <div>
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                About Us
              </div>
              <h2 className="text-4xl font-bold text-secondary mb-6">
                Caring for Your <span className="text-primary">Well-being</span> Since 1998
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 text-lg leading-relaxed">
                SAAL Pharmacy was founded on the belief that quality healthcare should be accessible to everyone.
                With over 25 years of excellence, we've grown into a trusted healthcare partner for thousands of
                families.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our team of licensed pharmacists and healthcare professionals are dedicated to providing personalized
                service, expert guidance, and genuine care to every patient who walks through our doors.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-8">
              {[
                { value: "24/7", label: "Emergency Services", animated: false },
                { value: "100%", label: "Authentic Products", animated: false },
                { value: `${satisfactionCount}.9%`, label: "Customer Satisfaction", animated: true },
                { value: "Expert", label: "Professional Team", animated: false },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`p-4 bg-gray-50 rounded-xl hover-lift cursor-default group animate-on-scroll ${isVisible ? "visible" : ""}`}
                >
                  <p className="font-bold text-primary text-xl mb-1 group-hover:scale-110 transition-transform origin-left">
                    {item.value}
                  </p>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
