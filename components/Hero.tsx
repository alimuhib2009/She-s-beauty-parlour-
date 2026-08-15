"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowRight, Star, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const stats = [
  { value: "5K+", label: "Happy Clients" },
  { value: "12+", label: "Years of Excellence" },
  { value: "30+", label: "Expert Stylists" },
  { value: "100%", label: "Premium Products" },
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Trigger entrance animations after mount
    const t = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col overflow-hidden"
      aria-label="Hero section"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="Luxurious beauty salon interior"
          fill
          priority
          quality={90}
          className="object-cover object-center scale-105"
        />

        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

        {/* Soft pink tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-950/30 via-transparent to-amber-900/10" />
      </div>

      {/* ── Floating decorative orbs ── */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-rose-400/10 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-amber-300/10 blur-3xl pointer-events-none animate-pulse [animation-delay:1s]" />

      {/* ── Main Content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-2xl xl:max-w-3xl">

            {/* Badge */}
            <div
              className={cn(
                "inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-xs font-medium tracking-widest uppercase transition-all duration-700",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
              )}
            >
              <Image src="/logo.png" alt="" width={12} height={12} className="object-contain rounded-full" />
              Premium Beauty Experience
              <span className="flex h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" />
            </div>

            {/* Main heading */}
            <h1
              className={cn(
                "text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-white tracking-tight mb-6 transition-all duration-700 delay-100",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              Where{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-rose-300 via-pink-300 to-amber-300 bg-clip-text text-transparent">
                  Beauty
                </span>
                {/* Decorative underline */}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 6 Q50 2 100 5 Q150 8 198 4"
                    stroke="url(#grad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fb7185" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />
              Meets{" "}
              <span className="italic font-serif bg-gradient-to-r from-amber-200 to-rose-200 bg-clip-text text-transparent">
                Elegance
              </span>
            </h1>

            {/* Subheading */}
            <p
              className={cn(
                "text-base sm:text-lg text-white/75 leading-relaxed max-w-lg mb-10 transition-all duration-700 delay-200",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              Indulge in a world-class beauty journey — from rejuvenating skin treatments
              to flawless styling. Your transformation begins here, in an atmosphere of pure luxury.
            </p>

            {/* CTA Buttons */}
            <div
              className={cn(
                "flex flex-wrap gap-4 mb-16 transition-all duration-700 delay-300",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
            >
              {/* Primary CTA */}
              <Link
                href="#contact"
                id="hero-book-now-btn"
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/30 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 transition-all duration-300 group-hover:from-rose-600 group-hover:to-amber-500" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] transition-opacity duration-300" />
                <Image src="/logo.png" alt="" width={16} height={16} className="relative object-contain rounded-full" />
                <span className="relative">Book Now</span>
                <ArrowRight className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href="#services"
                id="hero-explore-services-btn"
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Explore Services
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Star rating trust signal */}
            <div
              className={cn(
                "flex items-center gap-3 transition-all duration-700 delay-[400ms]",
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white/50 bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center text-white text-xs font-semibold shadow"
                  >
                    {["A", "S", "M", "R"][i - 1]}
                  </div>
                ))}
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-white/70 text-sm">
                <strong className="text-white font-semibold">4.9/5</strong> from 500+ reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div
        className={cn(
          "relative z-10 border-t border-white/10 bg-black/30 backdrop-blur-md transition-all duration-700 delay-500",
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-5 px-4 text-center group hover:bg-white/5 transition-colors duration-200"
              >
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-rose-300 to-amber-300 bg-clip-text text-transparent leading-none mb-1">
                  {stat.value}
                </span>
                <span className="text-xs text-white/60 tracking-wide uppercase font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-24 right-8 md:right-12 z-10 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] tracking-[0.2em] uppercase [writing-mode:vertical-lr]">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}
