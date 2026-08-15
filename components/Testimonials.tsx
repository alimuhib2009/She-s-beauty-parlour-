"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// ── Review Data ──────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 1,
    name: "Ayesha Raza",
    role: "Regular Client",
    rating: 5,
    text: "She's Beauty Parlour completely transformed my look for my sister's wedding. The bridal makeup artist was incredibly skilled — she listened to every detail and the result was absolutely stunning. I cried (happy tears!) when I saw myself in the mirror.",
    initials: "AR",
    gradient: "from-rose-400 to-pink-500",
    service: "Bridal Makeup",
  },
  {
    id: 2,
    name: "Mehwish Tariq",
    role: "Monthly Visitor",
    rating: 5,
    text: "I've been coming here for facials for over two years and my skin has never been better. The estheticians genuinely understand skin health, not just surface treatments. The products they use are premium and cruelty-free — which matters a lot to me.",
    initials: "MT",
    gradient: "from-amber-400 to-orange-500",
    service: "Facial & Skincare",
  },
  {
    id: 3,
    name: "Sana Imran",
    role: "Loyal Customer",
    rating: 5,
    text: "The hair colouring team here is absolutely phenomenal. I asked for a balayage I'd seen on Pinterest and they nailed it perfectly — the blending, the tones, everything. My hair looked like a professional photoshoot. Worth every rupee!",
    initials: "SI",
    gradient: "from-fuchsia-400 to-purple-500",
    service: "Hair Coloring",
  },
  {
    id: 4,
    name: "Rabia Hassan",
    role: "First-time Client",
    rating: 5,
    text: "I was nervous about trying a new parlour but the staff made me feel so welcome from the moment I walked in. The ambiance is luxurious yet cozy. I got a haircut and blow-dry and left feeling like a completely new person. Already booked my next appointment!",
    initials: "RH",
    gradient: "from-teal-400 to-cyan-500",
    service: "Haircut & Styling",
  },
  {
    id: 5,
    name: "Zara Malik",
    role: "Regular Client",
    rating: 5,
    text: "The nail art team here is incredibly creative. I showed them a complex geometric design and they recreated it flawlessly. The gel polish lasts for weeks without chipping. This is the only place I trust with my nails now — absolute perfection.",
    initials: "ZM",
    gradient: "from-emerald-400 to-green-500",
    service: "Nail Art",
  },
  {
    id: 6,
    name: "Nadia Khalid",
    role: "Monthly Visitor",
    rating: 5,
    text: "The relaxation massage was exactly what I needed after months of stress. The therapist was professional and incredibly skilled — I walked out feeling like I was floating. The steam room experience beforehand was an added bonus. Pure bliss!",
    initials: "NK",
    gradient: "from-violet-400 to-indigo-500",
    service: "Relaxation Massage",
  },
  {
    id: 7,
    name: "Hira Baig",
    role: "Bride",
    rating: 5,
    text: "Getting ready at She's on my wedding day was the best decision I made. The whole team — hair, makeup, nails — worked seamlessly together. I felt like royalty. My mother-in-law couldn't stop complimenting me. Truly a once-in-a-lifetime experience.",
    initials: "HB",
    gradient: "from-rose-500 to-red-400",
    service: "Bridal Package",
  },
  {
    id: 8,
    name: "Fatima Sheikh",
    role: "Weekly Regular",
    rating: 5,
    text: "I've been getting my threading done here for years and I will never go anywhere else. The precision and speed is unmatched, and they always keep the shape consistent. The brow tinting service they offer alongside it is a game changer for my daily look.",
    initials: "FS",
    gradient: "from-pink-400 to-rose-600",
    service: "Threading",
  },
]

// Split into two rows for dual-marquee effect
const ROW_ONE = REVIEWS.slice(0, 4)
const ROW_TWO = [...REVIEWS.slice(4), ...REVIEWS.slice(0, 4)] // shift offset

// ── Star Rating Component ────────────────────────────────────────────────────
function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3.5 h-3.5",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-stone-200 text-stone-200"
          )}
        />
      ))}
    </div>
  )
}

// ── Review Card Component ────────────────────────────────────────────────────
function ReviewCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <article
      className="group relative flex-shrink-0 w-80 sm:w-96 bg-white rounded-2xl border border-stone-100 p-6 shadow-[0_2px_16px_rgb(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgb(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 mx-3"
      aria-label={`Review by ${review.name}`}
    >
      {/* Quote icon */}
      <div className="absolute top-5 right-5 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Quote className="w-10 h-10 text-rose-400 fill-rose-300" />
      </div>

      {/* Service badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-100 mb-4">
        <Image src="/logo.png" alt="" width={10} height={10} className="object-contain rounded-full" />
        <span className="text-[10px] font-semibold text-rose-500 tracking-wide uppercase">
          {review.service}
        </span>
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Review text */}
      <p className="mt-3 text-sm text-stone-600 leading-relaxed line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Divider */}
      <div className="my-4 h-px bg-gradient-to-r from-transparent via-stone-100 to-transparent" />

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className={cn(
            "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-sm font-bold shadow-sm shrink-0",
            review.gradient
          )}
          aria-hidden="true"
        >
          {review.initials}
        </div>
        <div>
          <p className="text-sm font-bold text-stone-800 leading-tight">
            {review.name}
          </p>
          <p className="text-xs text-stone-400 font-medium">{review.role}</p>
        </div>
        {/* Verified badge */}
        <div className="ml-auto flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
          <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="6" fill="#10b981" />
            <path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Verified
        </div>
      </div>
    </article>
  )
}

// ── Marquee Row ──────────────────────────────────────────────────────────────
function MarqueeRow({
  reviews,
  direction = "left",
  paused,
}: {
  reviews: (typeof REVIEWS)[0][]
  direction?: "left" | "right"
  paused: boolean
}) {
  // Triple-duplicate to ensure seamless looping
  const items = [...reviews, ...reviews, ...reviews]

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div
        className={cn(
          "flex w-max",
          direction === "left"
            ? "animate-marquee-left"
            : "animate-marquee-right"
        )}
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {items.map((review, idx) => (
          <ReviewCard key={`${review.id}-${idx}`} review={review} />
        ))}
      </div>
    </div>
  )
}

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

// ── Featured (manual) slider ──────────────────────────────────────────────────
function FeaturedSlider() {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = useCallback(
    (next: number) => {
      if (animating) return
      setAnimating(true)
      setTimeout(() => {
        setActive((next + REVIEWS.length) % REVIEWS.length)
        setAnimating(false)
      }, 250)
    },
    [animating]
  )

  const prev = () => go(active - 1)
  const next = () => go(active + 1)

  // Auto-advance every 5 seconds
  useEffect(() => {
    intervalRef.current = setInterval(() => go(active + 1), 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [active, go])

  const review = REVIEWS[active]

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Card */}
      <div
        className={cn(
          "bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-stone-100 relative overflow-hidden transition-opacity duration-250",
          animating ? "opacity-0" : "opacity-100"
        )}
      >
        {/* Decorative gradient corner */}
        <div
          className={cn(
            "absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2 bg-gradient-to-br",
            review.gradient
          )}
        />

        {/* Large quote mark */}
        <Quote className="w-10 h-10 text-rose-200 fill-rose-100 mb-4" />

        {/* Stars */}
        <StarRating rating={review.rating} />

        {/* Review text */}
        <blockquote className="mt-4 text-stone-700 text-base sm:text-lg leading-relaxed font-medium">
          &ldquo;{review.text}&rdquo;
        </blockquote>

        {/* Service pill */}
        <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-100">
          <Image src="/logo.png" alt="" width={12} height={12} className="object-contain rounded-full" />
          <span className="text-xs font-semibold text-rose-500">{review.service}</span>
        </div>

        {/* Author row */}
        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-stone-100">
          <div
            className={cn(
              "w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white text-lg font-bold shadow-md shrink-0",
              review.gradient
            )}
          >
            {review.initials}
          </div>
          <div>
            <p className="font-bold text-stone-900 text-base">{review.name}</p>
            <p className="text-sm text-stone-400 font-medium">{review.role}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
            <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="6" fill="#10b981" />
              <path d="M3.5 6l1.8 1.8L8.5 4.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified Review
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        {/* Prev / Next */}
        <div className="flex gap-2">
          <button
            id="testimonials-prev-btn"
            onClick={prev}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:border-rose-300 hover:text-rose-500 hover:shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            id="testimonials-next-btn"
            onClick={next}
            aria-label="Next review"
            className="w-10 h-10 rounded-full border border-stone-200 bg-white flex items-center justify-center text-stone-500 hover:border-rose-300 hover:text-rose-500 hover:shadow-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Review navigation">
          {REVIEWS.map((r, i) => (
            <button
              key={r.id}
              id={`testimonials-dot-${i}`}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to review ${i + 1}`}
              onClick={() => go(i)}
              className={cn(
                "rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400",
                i === active
                  ? "w-6 h-2 bg-gradient-to-r from-rose-500 to-pink-500"
                  : "w-2 h-2 bg-stone-200 hover:bg-stone-300"
              )}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-xs text-stone-400 font-medium tabular-nums">
          <span className="text-stone-700 font-bold">{active + 1}</span>
          <span className="mx-1">/</span>
          {REVIEWS.length}
        </p>
      </div>
    </div>
  )
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function Testimonials() {
  const { ref, inView } = useInView(0.05)
  const [marqueesPaused, setMarqueesPaused] = useState(false)

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-32 bg-gradient-to-b from-stone-50/80 via-white to-rose-50/30 overflow-hidden"
      aria-label="Client Testimonials"
    >
      {/* ── Background decoration ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-rose-50/60 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-amber-50/40 translate-x-1/2 translate-y-1/2 blur-3xl pointer-events-none" />

      {/* ── Section header ── */}
      <div
        ref={ref}
        className={cn(
          "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center transition-all duration-700",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200/80 text-rose-600 text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm">
          <Star className="w-3 h-3 fill-rose-400 text-rose-400" />
          Client Love
          <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
        </div>

        <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
          Real Stories,{" "}
          <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
            Real Transformations
          </span>
        </h2>
        <p className="text-base sm:text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
          Don&apos;t just take our word for it — hear from the thousands of clients who
          trust us with their beauty every week.
        </p>

        {/* Aggregate rating row */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-2xl font-bold text-stone-800">4.9</span>
          <span className="text-stone-400 text-sm font-medium">
            from <strong className="text-stone-600">500+</strong> verified reviews
          </span>
        </div>
      </div>

      {/* ── Featured slider ── */}
      <div
        className={cn(
          "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 transition-all duration-700 delay-200",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <FeaturedSlider />
      </div>

      {/* ── Marquee rows (auto-scroll wall) ── */}
      <div
        className={cn(
          "relative transition-all duration-700 delay-300",
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
        onMouseEnter={() => setMarqueesPaused(true)}
        onMouseLeave={() => setMarqueesPaused(false)}
      >
        {/* Edge fade masks */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-stone-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-stone-50 to-transparent z-10 pointer-events-none" />

        <div className="flex flex-col gap-4 py-2">
          <MarqueeRow reviews={ROW_ONE} direction="left" paused={marqueesPaused} />
          <MarqueeRow reviews={ROW_TWO} direction="right" paused={marqueesPaused} />
        </div>

        <p className="text-center text-xs text-stone-400 mt-6 font-medium">
          Hover to pause · All reviews are from real, verified clients
        </p>
      </div>
    </section>
  )
}
