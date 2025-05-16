import React, { useState, useEffect } from 'react'
import '../styles/Portfolio.css'

const works = Array.from({ length: 20 }, (_, i) => ({
  image: `/images/work/work${i + 1}.png`,
}))

const Portfolio = () => {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [visibleSlides, setVisibleSlides] = useState(3)

  // Update visibleSlides based on screen width
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth
      if (width <= 480) setVisibleSlides(1)
      else if (width <= 768) setVisibleSlides(2)
      else setVisibleSlides(3)
    }

    updateSlides()
    window.addEventListener('resize', updateSlides)
    return () => window.removeEventListener('resize', updateSlides)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % works.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [isPaused])

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + works.length) % works.length)
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % works.length)
  }

  const getVisibleSlides = () => {
    let slides = []
    for (let i = 0; i < visibleSlides; i++) {
      slides.push(works[(current + i) % works.length])
    }
    return slides
  }

  return (
    <section id="portfolio" className="portfolio">
      <h2>Կատարված Աշխատանքներ</h2>
      <div 
        className="slider"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button className="slider-btn prev" onClick={prevSlide}>&#10094;</button>
        
        <div className="slides-container">
          {getVisibleSlides().map((work, index) => (
            <div key={index} className="slide">
              <img 
                src={work.image} 
                alt={`Աշխատանք ${current + index + 1}`} 
                className="slide-image" 
              />
            </div>
          ))}
        </div>
        
        <button className="slider-btn next" onClick={nextSlide}>&#10095;</button>
      </div>
    </section>
  )
}

export default Portfolio
