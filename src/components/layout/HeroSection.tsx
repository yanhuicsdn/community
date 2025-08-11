"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

const heroSlides = [
  {
    id: 1,
    title: "【案例实践】云原生时代的DevOps最佳实践",
    subtitle: "开发者空间体验新升级，配置翻倍开发效率提升1倍！",
    image: "https://ext.same-assets.com/3583378434/3509567426.png",
    cta: "立即体验"
  },
  {
    id: 2,
    title: "AI智能开发助手全新上线",
    subtitle: "让代码编写更智能，开发效率提升300%",
    image: "https://ext.same-assets.com/3583378434/3936907249.png",
    cta: "免费试用"
  },
  {
    id: 3,
    title: "AON AI Agent 开发者大会",
    subtitle: "探索云原生前沿技术，与行业专家面对面交流",
    image: "https://ext.same-assets.com/3583378434/51345951.png",
    cta: "立即报名"
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative">
          {/* Current slide */}
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                {heroSlides[currentSlide].subtitle}
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                {heroSlides[currentSlide].cta}
              </Button>
            </div>

            <div className="hidden lg:block flex-1">
              <div className="relative w-full h-80">
                <Image
                  src={heroSlides[currentSlide].image}
                  alt={heroSlides[currentSlide].title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
