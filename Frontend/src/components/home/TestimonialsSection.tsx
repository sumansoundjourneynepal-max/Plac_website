"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

interface Testimonial {
  _id: string
  name: string
  profession: string
  location?: string
  image?: string
  quote: string
  rating: number
  isActive: boolean
}

const TestimonialsSection = () => {

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [loading, setLoading] = useState(true)

  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })



  /* =========================
     Fetch testimonials
  ========================= */
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // const res = await fetch("http://localhost:5000/api/testimonials")
        const API_URL = import.meta.env.VITE_API_BASE_URL
        const res = await fetch(`${API_URL}/testimonials`)
        if (!res.ok) throw new Error("Failed to fetch testimonials")
        const data: Testimonial[] = await res.json()
        // Only show active testimonials
        const activeTestimonials = data.filter((t) => t.isActive)
        setTestimonials(activeTestimonials)
        setCurrentIndex(0) // reset index on new data
      } catch (err) {
        console.error("Failed to fetch testimonials", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  /* =========================
     Clamp currentIndex if testimonials change
  ========================= */
  useEffect(() => {
    const maxIndex = Math.max(Math.ceil(testimonials.length / 3) - 1, 0)
    if (currentIndex > maxIndex) setCurrentIndex(0)
  }, [testimonials, currentIndex])

  /* =========================
     Auto play
  ========================= */
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = Math.ceil(testimonials.length / 3) - 1
        return prev >= maxIndex ? 0 : prev + 1
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials])

  const maxIndex = Math.max(Math.ceil(testimonials.length / 3) - 1, 0)

  const nextTestimonials = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    setIsAutoPlaying(false)
  }

  const prevTestimonials = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const getCurrentTestimonials = () => {
    const startIndex = currentIndex * 3
    return testimonials.slice(startIndex, startIndex + 3)
  }

  /* =========================
     Animations
  ========================= */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  /* =========================
     Guards
  ========================= */
  if (loading) {
    return (
      <section className="min-h-screen bg-charcoal flex items-center justify-center">
        <p className="text-ivory/70 text-xl">Loading testimonials…</p>
      </section>
    )
  }

  if (testimonials.length === 0) return null

  /* =========================
     Render
  ========================= */
  return (
    <section ref={sectionRef} className="min-h-screen bg-charcoal relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border border-gold rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-24 h-24 border border-ivory rotate-45" />
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-gold rounded-full" />
        <div className="absolute bottom-20 right-20 w-20 h-20 border border-ivory rounded-full animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 px-6 md:px-12 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-20">
            <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-serif text-gold mb-6">
              Testimonials & Use Cases
            </motion.h2>
            <motion.div variants={itemVariants} className="w-24 h-1 bg-gold mx-auto mb-8" />
            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-ivory/80 max-w-3xl mx-auto">
              Hear from professionals who use our singing bowls in their practice
            </motion.p>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Arrows */}
            <button onClick={prevTestimonials} className="carousel-arrow left-0 z-20">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextTestimonials} className="carousel-arrow right-0 z-20">
              <ChevronRight size={24} />
            </button>

            <div className="overflow-hidden rounded-3xl">
              <AnimatePresence mode="wait">
                {getCurrentTestimonials().length > 0 && (
                  <motion.div
                    key={currentIndex} // OK now because index is clamped
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {getCurrentTestimonials().map((testimonial, i) => (
                      <motion.div
                        key={testimonial._id} // stable key
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -8 }}
                        className="group bg-gradient-to-br from-navy/60 to-navy/40 border border-gold/20 rounded-3xl p-8 shadow-2xl relative"
                      >
                        <Quote className="absolute top-6 right-6 text-gold" />

                        <div className="flex items-center gap-4 mb-6">
                          <img
                            src={testimonial.image || "/placeholder.svg"}
                            className="w-16 h-16 rounded-2xl object-cover"
                          />
                          <div>
                            <h3 className="text-xl font-serif text-gold">{testimonial.name}</h3>
                            <p className="text-ivory/70 text-sm">{testimonial.profession}</p>
                            {testimonial.location && (
                              <p className="text-ivory/50 text-xs">{testimonial.location}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                          ))}
                        </div>

                        <blockquote className="text-ivory italic">
                          “{testimonial.quote}”
                        </blockquote>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-12 gap-3">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-3 h-3 rounded-full ${i === currentIndex ? "bg-gold" : "bg-gold/30"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TestimonialsSection
