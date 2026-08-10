"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Sparkles,
  Calendar,
  Clock,
  CheckCircle2,
  Phone,
  User,
  Scissors,
  StickyNote,
  MapPin,
  Star,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

// ── Zod Schema ─────────────────────────────────────────────────────────────
const bookingSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(60, { message: "Name must be under 60 characters." }),
  phone: z
    .string()
    .min(7, { message: "Enter a valid phone number." })
    .regex(/^[+\d\s\-()]+$/, { message: "Only digits, spaces and + - () are allowed." }),
  service: z.string({ required_error: "Please select a service." }).min(1, {
    message: "Please select a service.",
  }),
  date: z.string({ required_error: "Please choose a preferred date." }).min(1, {
    message: "Please choose a preferred date.",
  }),
  time: z.string({ required_error: "Please choose a preferred time." }).min(1, {
    message: "Please choose a preferred time.",
  }),
  notes: z.string().max(500, { message: "Notes must be under 500 characters." }).optional(),
})

type BookingFormValues = z.infer<typeof bookingSchema>

// ── Services list ──────────────────────────────────────────────────────────
const SERVICES = [
  { value: "haircut", label: "✂️  Haircut & Styling" },
  { value: "facial", label: "🌿  Facial & Skincare" },
  { value: "bridal", label: "💍  Bridal Makeup" },
  { value: "nails", label: "💅  Nail Art" },
  { value: "waxing", label: "🌸  Waxing" },
  { value: "coloring", label: "🎨  Hair Coloring" },
  { value: "massage", label: "🧖  Relaxation Massage" },
  { value: "threading", label: "🪡  Threading" },
]

// ── Time slots ─────────────────────────────────────────────────────────────
const TIME_SLOTS = [
  "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM",
  "07:00 PM", "07:30 PM",
]

// ── Info card data ──────────────────────────────────────────────────────────
const INFO_ITEMS = [
  {
    icon: Clock,
    title: "Opening Hours",
    lines: ["Mon – Sat: 9:00 AM – 8:00 PM", "Sunday: 10:00 AM – 6:00 PM"],
  },
  {
    icon: MapPin,
    title: "Find Us",
    lines: ["123 Rose Lane, Beauty District", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+1 (800) 555-GLOW", "WhatsApp available"],
  },
]

// ── FieldWrapper ─────────────────────────────────────────────────────────────
function FieldWrapper({
  label,
  icon: Icon,
  error,
  children,
  required,
}: {
  label: string
  icon?: React.ElementType
  error?: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-sm font-semibold text-stone-700">
        {Icon && <Icon className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-rose-500 flex items-center gap-1 mt-0.5 animate-in slide-in-from-top-1 duration-200">
          <span className="inline-block w-1 h-1 rounded-full bg-rose-400 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function Booking() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      notes: "",
    },
  })

  async function onSubmit(values: BookingFormValues) {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200))
    console.log("Booking submitted:", values)
    setIsSubmitting(false)
    setIsSubmitted(true)
    reset()
  }

  // Compute today's date string for min attribute
  const today = new Date().toISOString().split("T")[0]

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-white overflow-hidden"
      aria-label="Book an Appointment"
    >
      {/* ── Decorative background blobs ── */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-rose-50/60 translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-50/50 -translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pink-50/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── LEFT: Info & Copy ── */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-28">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-rose-100 border border-rose-200/80 text-rose-600 text-xs font-semibold tracking-widest uppercase shadow-sm">
              <Calendar className="w-3 h-3" />
              Book Now
              <span className="flex h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 leading-tight">
                Ready for your{" "}
                <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent">
                  Transformation?
                </span>
              </h2>
              <p className="text-base sm:text-lg text-stone-500 leading-relaxed max-w-md">
                Secure your spot with our expert stylists and therapists. Fill out
                the form and our team will confirm your appointment shortly.
              </p>
            </div>

            {/* Star ratings */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["A", "S", "M", "R"].map((letter, i) => (
                  <div
                    key={letter}
                    className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-rose-300 to-pink-400 flex items-center justify-center text-white text-xs font-bold shadow-sm"
                    style={{ zIndex: 4 - i }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-stone-500 text-sm">
                <strong className="text-stone-800 font-semibold">4.9</strong> · 500+ reviews
              </span>
            </div>

            {/* Info cards */}
            <div className="flex flex-col gap-4 mt-2">
              {INFO_ITEMS.map(({ icon: Icon, title, lines }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100 hover:border-rose-100 hover:bg-rose-50/30 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-stone-100 shadow-sm flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-800 mb-0.5">{title}</h4>
                    {lines.map((line) => (
                      <p key={line} className="text-xs text-stone-500 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Form card ── */}
          <div className="relative bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.06)] border border-stone-100/80 overflow-hidden">
            {/* Subtle top-right gradient accent */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-rose-100 to-pink-50 blur-2xl opacity-60 pointer-events-none" />

            {/* ── Success State ── */}
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center shadow-inner">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 rounded-full bg-emerald-400 animate-ping opacity-75" />
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">
                  Request Received! 🎉
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-xs">
                  Thank you for choosing She&apos;s Beauty Parlour. We&apos;ll call you
                  shortly to confirm your appointment.
                </p>
                <button
                  id="booking-book-another-btn"
                  onClick={() => setIsSubmitted(false)}
                  className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-all duration-200"
                >
                  <Calendar className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <>
                {/* Form header */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-stone-900 mb-1">
                    Request an Appointment
                  </h3>
                  <p className="text-sm text-stone-400">
                    All fields marked with <span className="text-rose-500">*</span> are required.
                  </p>
                </div>

                <form
                  id="booking-appointment-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="relative space-y-6"
                  noValidate
                >
                  {/* Row 1: Name + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper
                      label="Full Name"
                      icon={User}
                      error={errors.name?.message}
                      required
                    >
                      <Input
                        id="booking-name"
                        placeholder="Jane Doe"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        className={cn(
                          "rounded-xl border-stone-200 bg-stone-50/60 focus-visible:ring-rose-300/50 focus-visible:border-rose-300 h-11 px-4",
                          errors.name && "border-rose-300 bg-rose-50/40"
                        )}
                        {...register("name")}
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label="Phone Number"
                      icon={Phone}
                      error={errors.phone?.message}
                      required
                    >
                      <Input
                        id="booking-phone"
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                        autoComplete="tel"
                        aria-invalid={!!errors.phone}
                        className={cn(
                          "rounded-xl border-stone-200 bg-stone-50/60 focus-visible:ring-rose-300/50 focus-visible:border-rose-300 h-11 px-4",
                          errors.phone && "border-rose-300 bg-rose-50/40"
                        )}
                        {...register("phone")}
                      />
                    </FieldWrapper>
                  </div>

                  {/* Service dropdown */}
                  <FieldWrapper
                    label="Select Service"
                    icon={Scissors}
                    error={errors.service?.message}
                    required
                  >
                    <Controller
                      name="service"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="booking-service"
                            aria-invalid={!!errors.service}
                            className={cn(
                              "w-full rounded-xl border-stone-200 bg-stone-50/60 focus-visible:ring-rose-300/50 focus-visible:border-rose-300 h-11 px-4",
                              errors.service && "border-rose-300 bg-rose-50/40"
                            )}
                          >
                            <SelectValue placeholder="Choose a service…" />
                          </SelectTrigger>
                          <SelectContent align="start">
                            {SERVICES.map((s) => (
                              <SelectItem key={s.value} value={s.value}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </FieldWrapper>

                  {/* Row 3: Date + Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldWrapper
                      label="Preferred Date"
                      icon={Calendar}
                      error={errors.date?.message}
                      required
                    >
                      <Input
                        id="booking-date"
                        type="date"
                        min={today}
                        aria-invalid={!!errors.date}
                        className={cn(
                          "rounded-xl border-stone-200 bg-stone-50/60 focus-visible:ring-rose-300/50 focus-visible:border-rose-300 h-11 px-4 text-stone-700 [&::-webkit-calendar-picker-indicator]:opacity-40 [&::-webkit-calendar-picker-indicator]:hover:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:transition-opacity",
                          errors.date && "border-rose-300 bg-rose-50/40"
                        )}
                        {...register("date")}
                      />
                    </FieldWrapper>

                    <FieldWrapper
                      label="Preferred Time"
                      icon={Clock}
                      error={errors.time?.message}
                      required
                    >
                      <Controller
                        name="time"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger
                              id="booking-time"
                              aria-invalid={!!errors.time}
                              className={cn(
                                "w-full rounded-xl border-stone-200 bg-stone-50/60 focus-visible:ring-rose-300/50 focus-visible:border-rose-300 h-11 px-4",
                                errors.time && "border-rose-300 bg-rose-50/40"
                              )}
                            >
                              <SelectValue placeholder="Pick a time…" />
                            </SelectTrigger>
                            <SelectContent align="start">
                              {TIME_SLOTS.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                  {slot}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FieldWrapper>
                  </div>

                  {/* Notes */}
                  <FieldWrapper
                    label="Additional Notes"
                    icon={StickyNote}
                    error={errors.notes?.message}
                  >
                    <Textarea
                      id="booking-notes"
                      placeholder="Any special requests, allergies, or details for your stylist…"
                      rows={3}
                      aria-invalid={!!errors.notes}
                      className={cn(
                        "rounded-xl border-stone-200 bg-stone-50/60 focus-visible:ring-rose-300/50 focus-visible:border-rose-300 resize-none px-4 py-3",
                        errors.notes && "border-rose-300 bg-rose-50/40"
                      )}
                      {...register("notes")}
                    />
                  </FieldWrapper>

                  {/* Submit button */}
                  <button
                    id="booking-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full rounded-full py-4 text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-pink-200/60 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2"
                  >
                    {/* Gradient background */}
                    <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 transition-all duration-300 group-hover:from-rose-600 group-hover:to-amber-500" />
                    {/* Shimmer overlay on hover */}
                    <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] transition-opacity duration-300" />

                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <svg
                            className="w-4 h-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                          Booking your appointment…
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                          Request Appointment
                        </>
                      )}
                    </span>
                  </button>

                  <p className="text-center text-xs text-stone-400">
                    We&apos;ll confirm via phone within 2 hours during business hours.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
