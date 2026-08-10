"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import {
  Scissors,
  Sparkles,
  Heart,
  Palette,
  Zap,
  Droplets,
  ArrowRight,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "haircut-styling",
    icon: Scissors,
    name: "Haircut & Styling",
    description:
      "Expert cuts and personalised styling tailored to your face shape, texture, and lifestyle — every single visit.",
    price: "25",
    tag: "Most Popular",
    gradient: "from-rose-400 to-pink-500",
    glow: "group-hover:shadow-rose-200",
    iconBg: "bg-rose-50 group-hover:bg-rose-100",
    iconColor: "text-rose-500",
    accent: "bg-rose-500",
  },
  {
    id: "facial-skincare",
    icon: Sparkles,
    name: "Facial & Skincare",
    description:
      "Revitalising facials designed to restore your natural glow, hydrate deeply, and combat the signs of ageing.",
    price: "45",
    tag: "Best Seller",
    gradient: "from-fuchsia-400 to-purple-500",
    glow: "group-hover:shadow-purple-200",
    iconBg: "bg-fuchsia-50 group-hover:bg-fuchsia-100",
    iconColor: "text-fuchsia-500",
    accent: "bg-fuchsia-500",
  },
  {
    id: "bridal-makeup",
    icon: Heart,
    name: "Bridal Makeup",
    description:
      "Flawless, long-lasting bridal transformations that capture your vision for the most important day of your life.",
    price: "150",
    tag: "Premium",
    gradient: "from-amber-400 to-orange-500",
    glow: "group-hover:shadow-amber-200",
    iconBg: "bg-amber-50 group-hover:bg-amber-100",
    iconColor: "text-amber-500",
    accent: "bg-amber-500",
  },
  {
    id: "nail-art",
    icon: Palette,
    name: "Nail Art",
    description:
      "From classic French manicures to intricate, hand-painted nail art — express yourself with stunning detail.",
    price: "20",
    tag: null,
    gradient: "from-pink-400 to-rose-500",
    glow: "group-hover:shadow-pink-200",
    iconBg: "bg-pink-50 group-hover:bg-pink-100",
    iconColor: "text-pink-500",
    accent: "bg-pink-500",
  },
  {
    id: "waxing",
    icon: Zap,
    name: "Waxing",
    description:
      "Smooth, long-lasting hair removal using premium-grade wax in a comfortable, hygienic environment.",
    price: "15",
    tag: null,
    gradient: "from-teal-400 to-cyan-500",
    glow: "group-hover:shadow-teal-200",
    iconBg: "bg-teal-50 group-hover:bg-teal-100",
    iconColor: "text-teal-500",
    accent: "bg-teal-500",
  },
  {
    id: "hair-coloring",
    icon: Droplets,
    name: "Hair Coloring",
    description:
      "Vibrant balayage, highlights, ombré, and full-colour treatments using premium, hair-safe professional products.",
    price: "55",
    tag: "Trending",
    gradient: "from-violet-400 to-indigo-500",
    glow: "group-hover:shadow-violet-200",
    iconBg: "bg-violet-50 group-hover:bg-violet-100",
    iconColor: "text-violet-500",
    accent: "bg-violet-500",
  },
]

/** Reveal card when it enters the viewport */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const { ref, inView } = useInView()
  const Icon = service.icon

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={cn(
        "transition-all duration-700",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div
        className={cn(
          "group relative flex flex-col h-full rounded-2xl bg-white border border-stone-100",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-2 hover:shadow-2xl",
          service.glow,
          "hover:border-transparent"
        )}
      >
        {/* Gradient top accent bar */}
        <div
          className={cn(
            "absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300",
            service.gradient
          )}
        />

        {/* Popular / tag badge */}
        {service.tag && (
          <span
            className={cn(
              "absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white",
              `bg-gradient-to-r ${service.gradient}`
            )}
          >
            <Star className="w-2.5 h-2.5 fill-white" />
            {service.tag}
          </span>
        )}

        <div className="flex flex-col flex-1 p-6 gap-4">
          {/* Icon bubble */}
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300",
              service.iconBg
            )}
          >
            <Icon className={cn("w-5 h-5 transition-transform duration-300 group-hover:scale-110", service.iconColor)} />
          </div>

          {/* Name */}
          <h3 className="text-[17px] font-bold text-stone-800 group-hover:text-stone-900 transition-colors leading-snug">
            {service.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-stone-500 leading-relaxed flex-1">
            {service.description}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-stone-100 via-stone-200 to-stone-100" />

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">
                Starting from
              </span>
              <div className="flex items-baseline gap-0.5">
                <span className={cn("text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent", service.gradient)}>
                  ${service.price}
                </span>
              </div>
            </div>

            <Link
              href="#contact"
              id={`service-book-${service.id}`}
              className={cn(
                "group/btn inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white",
                "transition-all duration-200 hover:gap-2.5 hover:shadow-md",
                `bg-gradient-to-r ${service.gradient}`
              )}
            >
              Book
              <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Services() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2)

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-gradient-to-b from-rose-50/50 via-white to-white overflow-hidden"
      aria-label="Our services"
    >
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-rose-100/40 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-100/30 translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div
          ref={headerRef}
          className={cn(
            "text-center max-w-2xl mx-auto mb-16 transition-all duration-700",
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-600 text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3 h-3" />
            What We Offer
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
            Premium{" "}
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
              Beauty Services
            </span>
          </h2>

          <p className="text-base text-stone-500 leading-relaxed">
            From everyday grooming to wedding-day perfection — our expert team delivers
            world-class treatments tailored entirely to you.
          </p>
        </div>

        {/* ── Services grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className={cn(
            "mt-16 text-center transition-all duration-700 delay-500",
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <p className="text-stone-500 text-sm mb-5">
            Not sure which service is right for you?
          </p>
          <Link
            href="#contact"
            id="services-consultation-btn"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Get a Free Consultation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
