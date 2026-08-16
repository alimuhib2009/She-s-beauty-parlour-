"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import { ZoomIn, X, ChevronLeft, ChevronRight, Camera } from "lucide-react"
import { cn } from "@/lib/utils"

type Category = "All" | "Hair" | "Makeup" | "Skin"

interface GalleryItem {
  id: number
  src: string
  alt: string
  category: Exclude<Category, "All">
  label: string
  span: "normal" | "wide" | "tall"
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "/gallery-1.png",
    alt: "Balayage hair coloring result",
    category: "Hair",
    label: "Rose Gold Balayage",
    span: "tall",
  },
  {
    id: 2,
    src: "/gallery-2.png",
    alt: "Flawless bridal makeup look",
    category: "Makeup",
    label: "Bridal Glam",
    span: "wide",
  },

  {
    id: 4,
    src: "/gallery-4.png",
    alt: "Luxury facial skincare treatment",
    category: "Skin",
    label: "Gold Facial Glow",
    span: "normal",
  },
  {
    id: 5,
    src: "/gallery-5.png",
    alt: "Elegant bridal updo hairstyle",
    category: "Hair",
    label: "Bridal Updo",
    span: "wide",
  },
  {
    id: 6,
    src: "/gallery-6.png",
    alt: "Beauty salon premium ambiance",
    category: "Skin",
    label: "Salon Ambiance",
    span: "tall",
  },
]

const categories: Category[] = ["All", "Hair", "Makeup", "Skin"]

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

/* ─────────────── Lightbox ─────────────── */
interface LightboxProps {
  items: GalleryItem[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ items, index, onClose, onPrev, onNext }: LightboxProps) {
  const current = items[index]

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose, onPrev, onNext])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery image: ${current.alt}`}
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl w-full mx-4 animate-in zoom-in-95 duration-200">
        {/* Top bar */}
        <div className="flex items-center justify-between w-full mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium border border-white/10">
              <Camera className="w-3 h-3" />
              {current.label}
            </span>
            <span className="text-white/40 text-xs">
              {index + 1} / {items.length}
            </span>
          </div>
          <button
            aria-label="Close lightbox"
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-stone-900 shadow-2xl"
          style={{ maxHeight: "75vh", aspectRatio: "16/9" }}>
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className="object-cover"
            sizes="90vw"
            priority
          />
          {/* Gradient overlay bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white/80 text-sm font-medium">
            {current.category}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-5">
          <button
            aria-label="Previous image"
            onClick={onPrev}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 disabled:opacity-30 transition-all hover:-translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to image ${i + 1}`}
                onClick={() => {
                  /* handled via index prop — call appropriate nav */
                  if (i < index) for (let k = index; k > i; k--) onPrev()
                  if (i > index) for (let k = index; k < i; k++) onNext()
                }}
                className={cn(
                  "rounded-full transition-all duration-200",
                  i === index
                    ? "w-5 h-2 bg-gradient-to-r from-rose-400 to-amber-400"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                )}
              />
            ))}
          </div>

          <button
            aria-label="Next image"
            onClick={onNext}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all hover:translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── Gallery Card ─────────────── */
function GalleryCard({
  item,
  index,
  onOpen,
  inView,
}: {
  item: GalleryItem
  index: number
  onOpen: () => void
  inView: boolean
}) {
  const spanClass =
    item.span === "wide"
      ? "col-span-2"
      : item.span === "tall"
      ? "row-span-2"
      : ""

  const heightClass =
    item.span === "tall"
      ? "h-full min-h-[480px]"
      : item.span === "wide"
      ? "h-64"
      : "h-56"

  return (
    <div
      className={cn("relative group cursor-pointer rounded-2xl overflow-hidden", spanClass)}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl transition-all duration-700",
          heightClass,
          inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}
        onClick={onOpen}
        role="button"
        tabIndex={0}
        aria-label={`Open ${item.alt} in lightbox`}
        onKeyDown={(e) => e.key === "Enter" && onOpen()}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Default overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-3 scale-75 group-hover:scale-100 transition-transform duration-300">
            <ZoomIn className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-xs font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            View Full
          </span>
        </div>

        {/* Label bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-medium">
            {item.label}
          </span>
        </div>

        {/* Category chip top-right */}
        <div className="absolute top-3 right-3">
          <span className="px-2.5 py-0.5 rounded-full bg-black/30 backdrop-blur-sm text-white/80 text-[10px] font-semibold uppercase tracking-widest border border-white/10">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────── Main Section ─────────────── */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const { ref: headerRef, inView: headerInView } = useInView(0.2)
  const { ref: gridRef, inView: gridInView } = useInView(0.05)

  const filtered =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory)

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null)),
    [filtered.length]
  )
  const nextImage = useCallback(
    () => setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null)),
    [filtered.length]
  )

  return (
    <>
      {/* Lightbox Portal */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <section
        id="gallery"
        className="relative py-24 md:py-32 bg-gradient-to-b from-white via-rose-50/30 to-white overflow-hidden"
        aria-label="Gallery"
      >
        {/* Decorative blobs */}
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-pink-100/40 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-amber-100/30 -translate-x-1/3 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div
            ref={headerRef}
            className={cn(
              "text-center max-w-2xl mx-auto mb-12 transition-all duration-700",
              headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-600 text-xs font-semibold tracking-widest uppercase">
              <Camera className="w-3 h-3" />
              Our Work
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight mb-4">
              Beauty{" "}
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                Transformations
              </span>
            </h2>
            <p className="text-base text-stone-500 leading-relaxed">
              Browse our portfolio of stunning looks crafted by our expert team.
              Each image tells a story of confidence and elegance.
            </p>
          </div>

          {/* ── Filter tabs ── */}
          <div
            className={cn(
              "flex flex-wrap items-center justify-center gap-2 mb-10 transition-all duration-700 delay-150",
              headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                id={`gallery-filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400",
                  activeCategory === cat
                    ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-pink-200"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-rose-300 hover:text-rose-500"
                )}
              >
                {cat}
                {cat !== "All" && (
                  <span className={cn(
                    "ml-2 text-[10px] font-semibold",
                    activeCategory === cat ? "text-white/70" : "text-stone-400"
                  )}>
                    {galleryItems.filter((i) => i.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Masonry Grid ── */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-4 lg:gap-5 grid-flow-dense"
          >
            {filtered.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={index}
                inView={gridInView}
                onOpen={() => openLightbox(index)}
              />
            ))}
          </div>

          {/* ── Bottom CTA ── */}
          <div
            className={cn(
              "mt-14 text-center transition-all duration-700 delay-500",
              headerInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            )}
          >
            <p className="text-stone-400 text-xs mb-4 flex items-center justify-center gap-1.5">
              <Image src="/logo.png" alt="" width={12} height={12} className="object-contain rounded-full" />
              All transformations are performed by our certified beauty experts
            </p>
            <a
              href="#contact"
              id="gallery-book-your-look-btn"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
            >
              <Camera className="w-4 h-4" />
              Book Your Transformation
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
