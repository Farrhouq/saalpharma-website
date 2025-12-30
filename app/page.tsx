import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import Products from "@/components/products"
import About from "@/components/about"
import Team from "@/components/team"
import MissionVision from "@/components/mission-vision"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navigation />
      <Hero />
      <Products />
      <About />
      <MissionVision />
      {/* <Team /> */}
      <Contact />
      <Footer />
    </main>
  )
}
