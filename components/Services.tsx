"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Scissors,
  Droplets,
  Sparkles,
  Heart,
  Zap,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Data ──────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: "hair-styling",
    label: "Hair Styling",
    icon: Scissors,
    gradient: "from-rose-400 to-pink-500",
    lightBg: "bg-rose-50",
    border: "border-rose-200",
    activeBg: "bg-gradient-to-r from-rose-500 to-pink-500",
    iconColor: "text-rose-500",
    accentText: "text-rose-600",
    pillBg: "bg-rose-100",
    services: [
      { name: "Haircut & Trim", price: "Rs. 800" },
      { name: "Hair Wash & Blow Dry", price: "Rs. 1,200" },
      { name: "Hair Straightening", price: "Rs. 3,500" },
      { name: "Hair Curling / Styling", price: "Rs. 2,000" },
      { name: "Keratin Treatment", price: "Rs. 6,000" },
    ],
  },
  {
    id: "hair-coloring",
    label: "Hair Coloring",
    icon: Droplets,
    gradient: "from-violet-400 to-purple-500",
    lightBg: "bg-violet-50",
    border: "border-violet-200",
    activeBg: "bg-gradient-to-r from-violet-500 to-purple-500",
    iconColor: "text-violet-500",
    accentText: "text-violet-600",
    pillBg: "bg-violet-100",
    services: [
      { name: "Root Touch Up", price: "Rs. 2,500" },
      { name: "Full Hair Color", price: "Rs. 4,500" },
      { name: "Highlights / Balayage", price: "Rs. 6,500" },
      { name: "Hair Color + Treatment", price: "Rs. 8,000" },
      { name: "Ombré / Fashion Colors", price: "Rs. 7,500" },
    ],
  },
  {
    id: "facial-skincare",
    label: "Facial & Skincare",
    icon: Sparkles,
    gradient: "from-amber-400 to-orange-500",
    lightBg: "bg-amber-50",
    border: "border-amber-200",
    activeBg: "bg-gradient-to-r from-amber-400 to-orange-500",
    iconColor: "text-amber-500",
    accentText: "text-amber-600",
    pillBg: "bg-amber-100",
    services: [
      { name: "Classic Facial", price: "Rs. 1,800" },
      { name: "Whitening Facial", price: "Rs. 2,500" },
      { name: "Gold Facial", price: "Rs. 3,500" },
      { name: "Anti-Aging Facial", price: "Rs. 4,000" },
      { name: "Acne Treatment Facial", price: "Rs. 3,000" },
    ],
  },
  {
    id: "bridal-makeup",
    label: "Bridal Makeup",
    icon: Heart,
    gradient: "from-pink-500 to-rose-600",
    lightBg: "bg-pink-50",
    border: "border-pink-200",
    activeBg: "bg-gradient-to-r from-pink-500 to-rose-600",
    iconColor: "text-pink-500",
    accentText: "text-pink-600",
    pillBg: "bg-pink-100",
    services: [
      { name: "Party Makeup", price: "Rs. 3,500" },
      { name: "Engagement Makeup", price: "Rs. 8,000" },
      { name: "Bridal Makeup (Basic)", price: "Rs. 15,000" },
      { name: "Bridal Makeup (Premium)", price: "Rs. 25,000" },
      { name: "Bridal Package (Hair + Makeup)", price: "Rs. 35,000" },
    ],
  },
  {
    id: "waxing",
    label: "Waxing",
    icon: Zap,
    gradient: "from-teal-400 to-cyan-500",
    lightBg: "bg-teal-50",
    border: "border-teal-200",
    activeBg: "bg-gradient-to-r from-teal-400 to-cyan-500",
    iconColor: "text-teal-500",
    accentText: "text-teal-600",
    pillBg: "bg-teal-100",
    services: [
      { name: "Full Arms", price: "Rs. 600" },
      { name: "Full Legs", price: "Rs. 900" },
      { name: "Full Body Waxing", price: "Rs. 2,500" },
      { name: "Face Waxing", price: "Rs. 400" },
      { name: "Bikini Waxing", price: "Rs. 1,200" },
    ],
  },
]

// ── Intersection observer hook ────────────────────────────────────────────────
function useInView(threshold = 0.1) {
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

// ── Service Row ───────────────────────────────────────────────────────────────
function ServiceRow({
  name,
  price,
  index,
  accentText,
  gradient,
  visible,
}: {
  name: string
  price: string
  index: number
  accentText: string
  gradient: string
  visible: boolean
}) {
  return (
    <div
      className={cn(
        "group flex items-center justify-between gap-4 px-5 py-4 rounded-2xl",
        "bg-white border border-stone-100 shadow-sm",
        "hover:shadow-md hover:-translate-y-0.5 hover:border-stone-200",
        "transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {/* Left: dot + name */}
      <div className="flex items-center gap-3 min-w-0">
        <span
          className={cn(
            "shrink-0 w-2 h-2 rounded-full bg-gradient-to-br",
            gradient
          )}
        />
        <span className="text-sm font-medium text-stone-700 leading-snug truncate group-hover:text-stone-900 transition-colors duration-200">
          {name}
        </span>
      </div>

      {/* Right: price */}
      <span
        className={cn(
          "shrink-0 text-sm font-bold tabular-nums",
          accentText
        )}
      >
        {price}
      </span>
    </div>
  )
}

// ── Mobile Accordion Item ─────────────────────────────────────────────────────
function AccordionItem({
  category,
  isOpen,
  onToggle,
  sectionVisible,
  catIndex,
}: {
  category: (typeof CATEGORIES)[0]
  isOpen: boolean
  onToggle: () => void
  sectionVisible: boolean
  catIndex: number
}) {
  const Icon = category.icon

  return (
    <div
      className={cn(
        "rounded-2xl border overflow-hidden transition-all duration-700",
        isOpen ? "border-stone-200 shadow-md" : "border-stone-100 shadow-sm",
        sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      style={{ transitionDelay: `${catIndex * 80}ms` }}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-5 py-4 text-left transition-all duration-300",
          isOpen
            ? cn("text-white", category.activeBg)
            : "bg-white hover:bg-stone-50 text-stone-800"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
              isOpen ? "bg-white/20" : category.lightBg
            )}
          >
            <Icon
              className={cn(
                "w-4.5 h-4.5 transition-colors duration-300",
                isOpen ? "text-white" : category.iconColor
              )}
              size={18}
            />
          </div>
          <span className="font-bold text-sm tracking-wide">
            {category.label}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              "text-[10px] font-semibold px-2 py-0.5 rounded-full transition-all duration-300",
              isOpen ? "bg-white/20 text-white" : cn(category.pillBg, category.accentText)
            )}
          >
            {category.services.length} services
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              isOpen ? "rotate-180 text-white" : "text-stone-400"
            )}
          />
        </div>
      </button>

      {/* Body */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-400 ease-in-out",
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
        style={{ transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s" }}
      >
        <div className="px-4 py-4 bg-stone-50/60 flex flex-col gap-2">
          {category.services.map((svc, i) => (
            <ServiceRow
              key={svc.name}
              name={svc.name}
              price={svc.price}
              index={i}
              accentText={category.accentText}
              gradient={category.gradient}
              visible={isOpen}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Desktop Tab Panel ─────────────────────────────────────────────────────────
function TabPanel({
  category,
  visible,
}: {
  category: (typeof CATEGORIES)[0]
  visible: boolean
}) {
  const Icon = category.icon

  return (
    <div
      className={cn(
        "transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none absolute"
      )}
    >
      {/* Panel header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0",
            `bg-gradient-to-br ${category.gradient}`
          )}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-stone-900">{category.label}</h3>
          <p className={cn("text-sm font-medium", category.accentText)}>
            {category.services.length} premium services available
          </p>
        </div>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 gap-3">
        {category.services.map((svc, i) => (
          <ServiceRow
            key={svc.name}
            name={svc.name}
            price={svc.price}
            index={i}
            accentText={category.accentText}
            gradient={category.gradient}
            visible={visible}
          />
        ))}
      </div>

      {/* Panel footer CTA */}
      <div className="mt-8 flex items-center gap-3">
        <Link
          href="#contact"
          id={`services-book-${category.id}`}
          className={cn(
            "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-md",
            "hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300",
            `bg-gradient-to-r ${category.gradient}`
          )}
        >
          <CheckCircle2 className="w-4 h-4" />
          Book This Service
          <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-xs text-stone-400">We'll confirm within 2 hrs</p>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Services() {
  const [activeTab, setActiveTab] = useState(0)
  const [openAccordion, setOpenAccordion] = useState<number | null>(0)
  const { ref: headerRef, inView: headerInView } = useInView(0.2)
  const { ref: bodyRef, inView: bodyInView } = useInView(0.05)

  const activeCategory = CATEGORIES[activeTab]

  return (
    <section
      id="services"
      className="relative py-24 md:py-32 bg-gradient-to-b from-rose-50/40 via-white to-white overflow-hidden"
      aria-label="Our Services"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-rose-100/50 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-100/40 translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-pink-50/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div
          ref={headerRef}
          className={cn(
            "text-center max-w-2xl mx-auto mb-16 transition-all duration-700",
            headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-600 text-xs font-semibold tracking-widest uppercase shadow-sm">
            <Image src="/logo.png" alt="" width={12} height={12} className="object-contain rounded-full" />
            Our Services
            <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
            Premium{" "}
            <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
              Beauty Services
            </span>
          </h2>
          <p className="text-base sm:text-lg text-stone-500 leading-relaxed">
            From everyday grooming to bridal transformations — explore our full menu
            of expertly delivered treatments, all priced transparently.
          </p>
        </div>

        {/* ══ DESKTOP: Tabs + Panel side-by-side ══════════════════════════════ */}
        <div ref={bodyRef} className="hidden md:flex gap-6 lg:gap-10 items-start">

          {/* Left: Tab list */}
          <div
            className={cn(
              "flex flex-col gap-2 w-60 lg:w-72 shrink-0 transition-all duration-700",
              bodyInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
          >
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon
              const isActive = i === activeTab
              return (
                <button
                  key={cat.id}
                  id={`services-tab-${cat.id}`}
                  onClick={() => setActiveTab(i)}
                  aria-selected={isActive}
                  role="tab"
                  className={cn(
                    "group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all duration-300 w-full",
                    isActive
                      ? cn("text-white shadow-lg", cat.activeBg)
                      : "bg-white border border-stone-100 text-stone-700 hover:border-stone-200 hover:shadow-sm hover:-translate-x-0.5"
                  )}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {/* Icon bubble */}
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                      isActive ? "bg-white/20" : cat.lightBg
                    )}
                  >
                    <Icon
                      size={18}
                      className={cn(
                        "transition-colors duration-300",
                        isActive ? "text-white" : cat.iconColor
                      )}
                    />
                  </div>

                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <p className={cn("text-sm font-bold leading-none mb-0.5 truncate")}>
                      {cat.label}
                    </p>
                    <p
                      className={cn(
                        "text-[10px] font-medium transition-colors duration-300",
                        isActive ? "text-white/70" : "text-stone-400"
                      )}
                    >
                      {cat.services.length} services
                    </p>
                  </div>

                  {/* Active indicator */}
                  {isActive && (
                    <div className="w-1.5 h-6 rounded-full bg-white/40 shrink-0" />
                  )}
                </button>
              )
            })}

            {/* Bottom note */}
            <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <p className="text-xs text-stone-500 leading-relaxed">
                <span className="font-semibold text-stone-700">💡 Prices include</span> all
                products and tools. Additional charges may apply for extra-long or thick hair.
              </p>
            </div>
          </div>

          {/* Right: Panel */}
          <div
            className={cn(
              "flex-1 relative min-h-[380px] bg-white rounded-3xl border border-stone-100 shadow-[0_4px_32px_rgb(0,0,0,0.06)] p-8 lg:p-10 transition-all duration-700",
              bodyInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            {/* Gradient corner accent */}
            <div
              className={cn(
                "absolute -top-px -right-px w-40 h-40 rounded-tr-3xl opacity-10 pointer-events-none bg-gradient-to-br",
                activeCategory.gradient
              )}
            />

            {CATEGORIES.map((cat, i) => (
              <div
                key={cat.id}
                className={cn(
                  "transition-all duration-400",
                  i === activeTab
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3 absolute inset-0 p-8 lg:p-10 pointer-events-none"
                )}
              >
                <TabPanel category={cat} visible={i === activeTab} />
              </div>
            ))}
          </div>
        </div>

        {/* ══ MOBILE: Accordion ════════════════════════════════════════════════ */}
        <div className="md:hidden flex flex-col gap-3">
          {CATEGORIES.map((cat, i) => (
            <AccordionItem
              key={cat.id}
              category={cat}
              isOpen={openAccordion === i}
              onToggle={() => setOpenAccordion(openAccordion === i ? null : i)}
              sectionVisible={bodyInView}
              catIndex={i}
            />
          ))}

          {/* Mobile note */}
          <div className="mt-2 p-4 rounded-2xl bg-stone-50 border border-stone-100">
            <p className="text-xs text-stone-500 leading-relaxed text-center">
              💡 Prices include all products & tools. Additional charges may apply for very long or thick hair.
            </p>
          </div>

          {/* Mobile CTA */}
          <Link
            href="#contact"
            id="services-mobile-book-btn"
            className="mt-2 flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 shadow-lg shadow-pink-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <Image src="/logo.png" alt="" width={16} height={16} className="object-contain rounded-full" />
            Book an Appointment
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Bottom Stats bar ── */}
        <div
          className={cn(
            "mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 transition-all duration-700 delay-300",
            bodyInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          {[
            { label: "Services Available", value: "20+", color: "text-rose-500" },
            { label: "Categories", value: "5", color: "text-violet-500" },
            { label: "Happy Clients", value: "5,000+", color: "text-amber-500" },
            { label: "Years Experience", value: "12+", color: "text-teal-500" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-5 px-4 rounded-2xl bg-white border border-stone-100 shadow-sm text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className={cn("text-2xl font-bold", stat.color)}>{stat.value}</span>
              <span className="text-xs text-stone-400 font-medium mt-1 tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
