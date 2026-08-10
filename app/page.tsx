import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Gallery from "@/components/Gallery"
import About from "@/components/About"
import Testimonials from "@/components/Testimonials"
import Booking from "@/components/Booking"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Testimonials />
      <Booking />
    </div>
  )
}
