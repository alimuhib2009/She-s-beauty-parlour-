"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Award,
  Users,
  Clock,
  Star,
  CheckCircle2,
  ArrowRight,
  Quote,
} from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  {
    id: "years",
    icon: Clock,
    value: 12,
    suffix: "+",
    label: "Years of Excellence",
    gradient: "from-rose-400 to-pink-500",
    bg: "bg-rose-50",
    border: "border-rose-100",
    iconColor: "text-rose-500",
  },
  {
    id: "clients",
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Happy Clients",
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    border: "border-amber-100",
    iconColor: "text-amber-500",
  },
  {
    id: "staff",
    icon: Award,
    value: 30,
    suffix: "+",
    label: "Expert Staff",
    gradient: "from-fuchsia-400 to-purple-500",
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-100",
    iconColor: "text-fuchsia-500",
  },
  {
    id: "rating",
    icon: Star,
    value: 4.9,
    suffix: "★",
    label: "Average Rating",
    gradient: "from-teal-400 to-cyan-500",
    bg: "bg-teal-50",
    border: "border-teal-100",
    iconColor: "text-teal-500",
  },
]

const highlights = [
  "Certified beauty professionals with international training",
  "Premium, cruelty-free products only",
  "Personalised consultations before every service",
  "Hygienic, relaxing and welcoming environment",
  "Latest techniques — from balayage to K-beauty facials",
]

/** Animated counter hook */
function useCounter(target: number, inView: boolean, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const isDecimal = target % 1 !== 0
    const start = performance.now()
    const raf = requestAnimationFrame(function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = isDecimal
        ? parseFloat((eased * target).toFixed(1))
        : Math.round(eased * target)
      setCount(current)
      if (progress < 1) requestAnimationFrame(tick)
    })
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return count
}

/** Intersection Observer hook */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

/** Individual animated stat card */
function StatCard({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const count = useCounter(stat.value, inView)
  const Icon = stat.icon

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        stat.bg, stat.border
      )}
    >
      <div className={cn(
        "w-11 h-11 rounded-xl flex items-center justify-center shrink-0",
        `bg-gradient-to-br ${stat.gradient}`
      )}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="flex items-baseline gap-0.5">
          <span className={cn(
            "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
            stat.gradient
          )}>
            {stat.id === "rating" ? (count as number).toFixed(1) : count.toLocaleString()}
          </span>
          <span className={cn(
            "text-sm font-semibold bg-gradient-to-r bg-clip-text text-transparent",
            stat.gradient
          )}>
            {stat.suffix}
          </span>
        </div>
        <p className="text-xs text-stone-500 font-medium leading-tight">{stat.label}</p>
      </div>
    </div>
  )
}

export default function About() {
  const { ref: sectionRef, inView } = useInView(0.1)
  const { ref: imageRef, inView: imageInView } = useInView(0.15)

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-gradient-to-b from-white via-rose-50/20 to-white overflow-hidden"
      aria-label="About She's Beauty Parlour"
    >
      {/* Decorative blobs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-rose-100/30 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-amber-100/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: Image column ── */}
          <div
            ref={imageRef}
            className={cn(
              "relative transition-all duration-1000",
              imageInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}
          >
            {/* Main image frame */}
            <div className="relative">
              {/* Decorative background card */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl bg-gradient-to-br from-rose-200 to-pink-200 z-0" />
              <div className="absolute -top-4 -left-4 w-32 h-32 rounded-2xl bg-gradient-to-br from-amber-200 to-orange-200 z-0" />

              {/* Image */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/50 aspect-[4/5]">
                <Image
                  src="/about-salon.png"
                  alt="She's Beauty Parlour interior — a luxurious and welcoming space"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Soft vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Floating badge — top right */}
              <div className="absolute top-6 -right-5 z-20 bg-white rounded-2xl shadow-xl shadow-rose-100 px-4 py-3 flex items-center gap-3 border border-rose-50">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-bold text-stone-800">Award Winning</p>
                  <p className="text-[10px] text-stone-400">Salon of the Year 2024</p>
                </div>
              </div>

              {/* Floating quote card — bottom left */}
              <div className="absolute -bottom-5 -left-5 z-20 bg-white rounded-2xl shadow-xl shadow-amber-100/80 px-4 py-3 max-w-[200px] border border-amber-50">
                <Quote className="w-4 h-4 text-amber-400 mb-1.5 fill-amber-100" />
                <p className="text-[11px] text-stone-600 leading-relaxed font-medium italic">
                  &ldquo;Where every woman feels like a queen.&rdquo;
                </p>
                <p className="text-[10px] text-stone-400 mt-1.5 font-semibold">— Our Promise</p>
              </div>
            </div>

            {/* Experience pill */}
            <div className="mt-10 flex justify-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 text-white text-sm font-semibold shadow-lg shadow-pink-200">
                <Image src="/logo.png" alt="" width={16} height={16} className="object-contain rounded-full" />
                Serving with love since 2012
              </div>
            </div>
          </div>

          {/* ── RIGHT: Content column ── */}
          <div
            ref={sectionRef}
            className={cn(
              "flex flex-col gap-8 transition-all duration-1000 delay-200",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-600 text-xs font-semibold tracking-widest uppercase">
              <Image src="/logo.png" alt="" width={12} height={12} className="object-contain rounded-full" />
              Our Story
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
                More Than a Salon —{" "}
                <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                  A Sanctuary
                </span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-rose-400 to-amber-400" />
            </div>

            {/* Story paragraphs */}
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                Founded in 2012 by <strong className="text-stone-800 font-semibold">Shehnaz Malik</strong>, She&apos;s Beauty Parlour was born from a single dream — to create a space where every woman could walk in feeling ordinary and walk out feeling extraordinary.
              </p>
              <p>
                Over a decade later, we&apos;ve grown from a cosy neighbourhood studio into a full-service luxury beauty destination, serving thousands of clients across the city. Our philosophy is simple: <em className="text-rose-600">beauty is personal</em>, and every treatment we offer reflects that belief.
              </p>
              <p>
                Our team of internationally trained experts brings passion, precision, and warmth to every appointment — whether it&apos;s your everyday blowout or the most important day of your life.
              </p>
            </div>

            {/* Highlights checklist */}
            <ul className="space-y-3">
              {highlights.map((item, i) => (
                <li
                  key={i}
                  className={cn(
                    "flex items-start gap-3 text-sm text-stone-600 transition-all duration-500",
                    inView
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  )}
                  style={{ transitionDelay: `${300 + i * 80}ms` }}
                >
                  <CheckCircle2 className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <StatCard key={stat.id} stat={stat} inView={inView} />
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#contact"
                id="about-book-visit-btn"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                <Image src="/logo.png" alt="" width={16} height={16} className="object-contain rounded-full" />
                Book a Visit
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#services"
                id="about-explore-services-btn"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-stone-700 border border-stone-200 bg-white hover:border-rose-300 hover:text-rose-600 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
