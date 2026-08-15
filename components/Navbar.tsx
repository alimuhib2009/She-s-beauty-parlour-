"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState("Home")

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-white/80 backdrop-blur-lg shadow-[0_4px_30px_rgba(236,72,153,0.08)] border-b border-rose-100/60"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">

            {/* ── Logo ── */}
            <Link
              href="#home"
              className="flex items-center gap-2 group select-none"
              onClick={() => setActiveLink("Home")}
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-amber-300 shadow-md shadow-pink-200 group-hover:scale-110 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={36}
                  height={36}
                  className="object-contain rounded-full p-0.5"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[11px] font-medium tracking-[0.18em] text-rose-400 uppercase">
                  She&apos;s
                </span>
                <span className="text-[17px] font-bold tracking-tight bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                  Beauty Parlour
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Primary navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200",
                    "hover:text-rose-500",
                    activeLink === link.label
                      ? "text-rose-500"
                      : "text-stone-600"
                  )}
                >
                  {link.label}
                  {/* Animated underline indicator */}
                  <span
                    className={cn(
                      "absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 transition-all duration-300",
                      activeLink === link.label ? "w-4 opacity-100" : "w-0 opacity-0"
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* ── Desktop CTA Button ── */}
            <div className="hidden md:flex items-center">
              <Link
                href="#contact"
                id="book-appointment-btn"
                onClick={() => setActiveLink("Contact")}
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-pink-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
              >
                {/* Gradient background */}
                <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 transition-all duration-300 group-hover:from-rose-600 group-hover:via-pink-600 group-hover:to-amber-500" />
                {/* Shimmer overlay */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.25)_50%,transparent_80%)] bg-[length:200%_100%] animate-[shimmer_1.5s_ease_infinite]" />
                <Image src="/logo.png" alt="" width={16} height={16} className="relative object-contain rounded-full" />
                <span className="relative">Book Appointment</span>
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              id="mobile-menu-toggle"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-full bg-rose-50 border border-rose-100 text-rose-500 hover:bg-rose-100 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              <span
                className={cn(
                  "absolute transition-all duration-300",
                  isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"
                )}
              >
                <X className="w-5 h-5" />
              </span>
              <span
                className={cn(
                  "absolute transition-all duration-300",
                  isOpen ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
                )}
              >
                <Menu className="w-5 h-5" />
              </span>
            </button>

          </div>
        </div>
      </header>

      {/* ── Mobile Drawer Overlay ── */}
      <div
        role="presentation"
        className={cn(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* ── Mobile Drawer ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[75vw] max-w-xs bg-white shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-rose-100">
          <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 via-pink-400 to-amber-300 flex items-center justify-center overflow-hidden">
                <Image src="/logo.png" alt="" width={28} height={28} className="object-contain rounded-full" />
              </div>
            <span className="text-sm font-bold bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
              She&apos;s Beauty Parlour
            </span>
          </div>
          <button
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-rose-50 text-rose-400 hover:bg-rose-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col gap-1 px-4 pt-6 flex-1" aria-label="Mobile navigation">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveLink(link.label)
                setIsOpen(false)
              }}
              style={{ transitionDelay: isOpen ? `${i * 60}ms` : "0ms" }}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                isOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                activeLink === link.label
                  ? "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-600 border border-rose-100"
                  : "text-stone-600 hover:bg-rose-50 hover:text-rose-500"
              )}
            >
              {activeLink === link.label && (
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-rose-400 to-amber-400 shrink-0" />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Drawer CTA */}
        <div className="px-6 pb-8 pt-4">
          <Link
            href="#contact"
            id="mobile-book-appointment-btn"
            onClick={() => {
              setActiveLink("Contact")
              setIsOpen(false)
            }}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 shadow-md shadow-pink-200 hover:shadow-lg hover:shadow-pink-300 transition-all duration-300 active:scale-95"
          >
            <Image src="/logo.png" alt="" width={16} height={16} className="object-contain rounded-full" />
            Book Appointment
          </Link>
          <p className="text-center text-xs text-stone-400 mt-3">
            Premium beauty services awaiting you ✨
          </p>
        </div>
      </div>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
    </>
  )
}
