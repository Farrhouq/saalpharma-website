"use client"

import { Linkedin, Mail } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

const teamMembers = [
  { name: "Dr. Sarah Johnson", role: "Head Pharmacist", image: "/professional-woman-pharmacist-in-white-coat-smilin.jpg" },
  { name: "Dr. Michael Chen", role: "Clinical Director", image: "/professional-asian-man-doctor-in-white-coat-headsh.jpg" },
  { name: "Emma Williams", role: "Pharmacy Manager", image: "/professional-woman-healthcare-manager-headshot.jpg" },
  { name: "James Rodriguez", role: "Senior Pharmacist", image: "/professional-man-pharmacist-in-white-coat-headshot.jpg" },
  { name: "Lisa Anderson", role: "Wellness Consultant", image: "/professional-woman-wellness-health-consultant-head.jpg" },
  { name: "David Kim", role: "Operations Manager", image: "/professional-asian-man-business-operations-manager.jpg" },
]

export default function Team() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation()

  return (
    <section id="team" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center space-y-4 mb-16 animate-on-scroll ${headerVisible ? "visible" : ""}`}
        >
          <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Our Team
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-secondary">
            Meet Our <span className="text-primary">Healthcare Experts</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Dedicated professionals committed to your health and wellness
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamMemberCard({ member, index }: { member: (typeof teamMembers)[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.2)

  return (
    <div ref={ref} className={`animate-on-scroll stagger-${(index % 3) + 1} ${isVisible ? "visible" : ""}`}>
      <div className="group rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-2xl transition-all duration-500 hover-lift">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-b from-primary/10 to-primary/5">
          <img
            src={member.image || "/placeholder.svg"}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300"></div>
        </div>

        {/* Info */}
        <div className="p-6 text-center space-y-4">
          <div>
            <h3 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
              {member.name}
            </h3>
            <p className="text-primary font-medium">{member.role}</p>
          </div>

          <div className="flex justify-center gap-4 pt-4 border-t border-gray-200">
            <button className="p-2 hover:bg-primary rounded-lg transition-all duration-300 text-gray-600 hover:text-white hover:scale-110 icon-bounce">
              <Linkedin size={20} />
            </button>
            <button className="p-2 hover:bg-primary rounded-lg transition-all duration-300 text-gray-600 hover:text-white hover:scale-110 icon-bounce">
              <Mail size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
