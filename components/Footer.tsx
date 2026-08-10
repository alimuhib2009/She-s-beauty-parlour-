"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  CheckCircle2,
  Heart,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Inline SVG brand icons (lucide-react v1.x dropped brand icons) ─────────
const IconInstagram = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const IconFacebook = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const IconYoutube = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
  </svg>
)

const IconTwitterX = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// ── Static data ───────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Home",         href: "#home" },
  { label: "Services",     href: "#services" },
  { label: "Gallery",      href: "#gallery" },
  { label: "About Us",     href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book Now",     href: "#contact" },
]

const SERVICES_LINKS = [
  { label: "Haircut & Styling",   href: "#services" },
  { label: "Bridal Makeup",       href: "#services" },
  { label: "Facial & Skincare",   href: "#services" },
  { label: "Nail Art",            href: "#services" },
  { label: "Hair Coloring",       href: "#services" },
  { label: "Relaxation Massage",  href: "#services" },
]

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    Icon: IconInstagram,
    gradient: "from-rose-500 via-fuchsia-500 to-orange-400",
    hoverShadow: "hover:shadow-rose-500/30",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    Icon: IconFacebook,
    gradient: "from-blue-600 to-blue-500",
    hoverShadow: "hover:shadow-blue-500/30",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    Icon: IconYoutube,
    gradient: "from-red-600 to-red-500",
    hoverShadow: "hover:shadow-red-500/30",
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    Icon: IconTwitterX,
    gradient: "from-sky-500 to-sky-400",
    hoverShadow: "hover:shadow-sky-500/30",
  },
]

const HOURS = [
  { days: "Monday – Friday",  time: "9:00 AM – 8:00 PM" },
  { days: "Saturday",         time: "9:00 AM – 9:00 PM" },
  { days: "Sunday",           time: "10:00 AM – 6:00 PM" },
  { days: "Public Holidays",  time: "11:00 AM – 5:00 PM" },
]

// ── Newsletter form ───────────────────────────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail]   = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setError] = useState("")

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.")
      setStatus("error")
      return
    }
    setStatus("loading")
    setError("")
    await new Promise((r) => setTimeout(r, 1000))
    setStatus("success")
    setEmail("")
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-emerald-300">You&apos;re subscribed! 🎉</p>
          <p className="text-xs text-white/50 mt-0.5">Exclusive deals and beauty tips are heading your way.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate id="footer-newsletter-form">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
          <input
            id="footer-newsletter-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); setError("") }}
            placeholder="Your email address"
            aria-label="Email address for newsletter"
            className={cn(
              "w-full h-11 pl-9 pr-4 rounded-xl bg-white/8 border text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200",
              "focus:bg-white/12 focus:border-rose-400/60 focus:ring-2 focus:ring-rose-400/20",
              status === "error"
                ? "border-red-400/60 bg-red-400/5"
                : "border-white/10 hover:border-white/20"
            )}
          />
        </div>
        <button
          id="footer-newsletter-submit"
          type="submit"
          disabled={status === "loading"}
          className="group relative h-11 px-5 rounded-xl text-white text-sm font-semibold overflow-hidden shrink-0 disabled:opacity-60 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-500/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 group-hover:from-rose-600 group-hover:to-amber-500 transition-all duration-300" />
          <span className="relative flex items-center gap-1.5">
            {status === "loading" ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : (
              <>
                Subscribe
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </>
            )}
          </span>
        </button>
      </div>
      {errorMsg && (
        <p role="alert" className="text-xs text-red-400 mt-2 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-400 shrink-0 inline-block" />
          {errorMsg}
        </p>
      )}
    </form>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────
function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-white font-bold text-sm tracking-wide mb-5 flex items-center gap-2">
      <span className="inline-block w-5 h-0.5 rounded-full bg-gradient-to-r from-rose-400 to-amber-400" />
      {children}
    </h3>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors duration-200 py-0.5"
      >
        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-rose-400 shrink-0" />
        <span className="group-hover:translate-x-0.5 transition-transform duration-200">{children}</span>
      </Link>
    </li>
  )
}

// ── Main Footer Export ────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-[#0d0d0f] overflow-hidden" aria-label="Site footer">
      {/* Ambient glow blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-64 h-64 rounded-full bg-pink-500/4 blur-3xl pointer-events-none" />

      {/* Top gradient rule */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-rose-500/40 to-transparent" />

      {/* ── Newsletter Banner ── */}
      <div className="relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold tracking-widest uppercase mb-3">
                <Sparkles className="w-2.5 h-2.5" />
                Newsletter
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Stay Gorgeous.{" "}
                <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                  Stay In the Know.
                </span>
              </h2>
              <p className="text-sm text-white/50 mt-2 max-w-md mx-auto lg:mx-0">
                Get exclusive beauty tips, seasonal offers, and early access to our new
                services — delivered straight to your inbox. No spam, ever.
              </p>
            </div>
            <div className="w-full lg:max-w-md">
              <NewsletterForm />
              <p className="text-xs text-white/25 mt-2 text-center lg:text-left">
                By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main 4-col Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Column 1 — Brand + Contact + Social */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-6">
            <Link href="#home" className="flex items-center gap-2.5 group w-fit" aria-label="She's Beauty Parlour — back to top">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 via-pink-400 to-amber-300 flex items-center justify-center shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-medium tracking-[0.2em] text-rose-400 uppercase">She&apos;s</span>
                <span className="text-[16px] font-bold tracking-tight bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">
                  Beauty Parlour
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/45 leading-relaxed">
              Your premium destination for beauty &amp; wellness since 2012. Where every
              visit is a luxurious escape and every client leaves feeling extraordinary.
            </p>

            {/* Contact */}
            <address className="not-italic flex flex-col gap-3">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-address-link"
                className="flex items-start gap-3 text-sm text-white/50 hover:text-white group transition-colors duration-200"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 group-hover:bg-rose-500/20 transition-colors duration-200">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <span>123 Rose Lane, Beauty District<br />New York, NY 10001</span>
              </a>
              <a
                href="tel:+18005554569"
                id="footer-phone-link"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white group transition-colors duration-200"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 group-hover:bg-rose-500/20 transition-colors duration-200">
                  <Phone className="w-3.5 h-3.5 text-rose-400" />
                </div>
                +1 (800) 555-GLOW
              </a>
              <a
                href="mailto:hello@shesbeautyparlour.com"
                id="footer-email-link"
                className="flex items-center gap-3 text-sm text-white/50 hover:text-white group transition-colors duration-200"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 group-hover:bg-rose-500/20 transition-colors duration-200">
                  <Mail className="w-3.5 h-3.5 text-rose-400" />
                </div>
                hello@shesbeautyparlour.com
              </a>
            </address>

            {/* Social icons */}
            <div>
              <p className="text-xs text-white/30 font-semibold tracking-widest uppercase mb-3">Follow Us</p>
              <div className="flex gap-2.5">
                {SOCIAL_LINKS.map(({ label, href, Icon, gradient, hoverShadow }) => (
                  <a
                    key={label}
                    href={href}
                    id={`footer-social-${label.toLowerCase().split("/")[0].trim()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${label}`}
                    className={cn(
                      "group relative w-9 h-9 rounded-xl flex items-center justify-center",
                      "border border-white/8 bg-white/5",
                      "hover:border-transparent hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200",
                      hoverShadow
                    )}
                  >
                    <span
                      className={cn(
                        "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 bg-gradient-to-br transition-opacity duration-200",
                        gradient
                      )}
                    />
                    <Icon className="w-4 h-4 text-white/50 group-hover:text-white relative z-10 transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-1">
              {QUICK_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div>
            <FooterHeading>Our Services</FooterHeading>
            <ul className="space-y-1">
              {SERVICES_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
              ))}
            </ul>
            <Link
              href="#contact"
              id="footer-book-cta"
              className="group mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 shadow-md shadow-rose-500/20 hover:shadow-lg hover:shadow-rose-500/30 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              <Sparkles className="w-3 h-3" />
              Book Appointment
              <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Column 4 — Business Hours */}
          <div>
            <FooterHeading>Business Hours</FooterHeading>
            <div className="space-y-3">
              {HOURS.map(({ days, time }) => (
                <div key={days} className="flex items-start justify-between gap-4 text-sm">
                  <span className="text-white/50 leading-snug">{days}</span>
                  <div className="text-right shrink-0">
                    <span className="text-white/70 font-medium leading-snug block">{time}</span>
                    <span className="text-[10px] font-semibold text-emerald-400 flex items-center justify-end gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      Open
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Walk-in callout */}
            <div className="mt-6 p-3 rounded-xl bg-white/4 border border-white/6">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-xs font-semibold text-white/70">Walk-ins Welcome</span>
              </div>
              <p className="text-xs text-white/35 leading-relaxed">
                Appointments recommended for bridal &amp; specialty services.
                Call ahead for same-day availability.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25 text-center sm:text-left">
            © {year} She&apos;s Beauty Parlour. All rights reserved.
          </p>
          <p className="text-xs text-white/20 flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for beauty lovers everywhere
          </p>
          <div className="flex items-center gap-4 text-xs text-white/25">
            <Link href="#" className="hover:text-white/50 transition-colors duration-200">Privacy Policy</Link>
            <span className="text-white/10">·</span>
            <Link href="#" className="hover:text-white/50 transition-colors duration-200">Terms of Service</Link>
            <span className="text-white/10">·</span>
            <Link href="#" className="hover:text-white/50 transition-colors duration-200">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
