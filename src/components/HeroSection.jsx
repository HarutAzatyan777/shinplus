import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/HeroSection.css'

const HeroSection = () => {
  const navigate = useNavigate()

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' })
  }

  const goToCalculators = () => {
    navigate('/calculators')
  }

  return (
    <section className="hero-section">
      <div className="overlay" />
      <div className="hero-content fade-in">
        <h1>Շինարարություն վստահությամբ</h1>
        <p>ShinPlus — Մասնագիտացված շինարարական ծառայություններ ամբողջ Հայաստանում</p>
        <div className="hero-buttons">
          <button onClick={scrollToContact}>Հարցում կատարել</button>
          <button className="outline" onClick={goToCalculators}>Հաշվիչներ</button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
