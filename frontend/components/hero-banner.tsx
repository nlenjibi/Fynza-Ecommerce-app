"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    title: "New Year Sale",
    subtitle: "UP TO 60% OFF",
    description: "Shop the best deals on electronics, fashion, and more",
    cta: "Shop Now",
    ctaLink: "/search?q=sale",
    bgColor: "bg-gradient-to-r from-[#FF6700] to-[#FF8C33]",
  },
  {
    id: 2,
    title: "Free Delivery",
    subtitle: "ON ORDERS OVER GHC 100",
    description: "Get your favorite products delivered for free",
    cta: "Start Shopping",
    ctaLink: "/",
    bgColor: "bg-gradient-to-r from-[#00A859] to-[#00C853]",
  },
  {
    id: 3,
    title: "Flash Sales",
    subtitle: "UP TO 70% OFF",
    description: "Limited time offers on top brands",
    cta: "View Deals",
    ctaLink: "/flash-sales",
    bgColor: "bg-gradient-to-r from-[#E30613] to-[#FF4444]",
  },
  {
    id: 4,
    title: "Sell on Fynza",
    subtitle: "START YOUR BUSINESS TODAY",
    description: "Reach millions of customers across Africa",
    cta: "Become a Seller",
    ctaLink: "/sell",
    bgColor: "bg-gradient-to-r from-[#6200EA] to-[#9C27B0]",
  },
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrev = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }

  const goToNext = () => {
    goToSlide((currentSlide + 1) % slides.length)
  }

  return (
    <div 
      className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 ${slide.bgColor} transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
              {/* Text Content */}
              <div className="text-white space-y-4 text-center lg:text-left">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">
                  <span className="font-semibold text-sm md:text-base">{slide.subtitle}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{slide.title}</h1>
                <p className="text-white/90 text-sm md:text-lg max-w-md mx-auto lg:mx-0">
                  {slide.description}
                </p>
                <Link href={slide.ctaLink}>
                  <button className="mt-4 bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    {slide.cta}
                  </button>
                </Link>
              </div>

              {/* Image/Visual */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-white/20 rounded-full"></div>
                  <div className="absolute inset-8 bg-white/30 rounded-full flex items-center justify-center">
                    <span className="text-6xl">🛍️</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
