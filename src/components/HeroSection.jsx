import React from 'react'
import '../styles/HeroSection.css'

const HeroSection = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  }

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('portfolio');
    if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className="hero-section">
      <div className="overlay" />
      <div className="hero-content fade-in">
        <h1>Շինարարություն վստահությամբ</h1>
        <p>ShinPlus — Մասնագիտացված շինարարական ծառայություններ ամբողջ Հայաստանում</p>
        <div className="hero-buttons">
          <button onClick={scrollToContact}>Հարցում կատարել</button>
          <button className="outline" onClick={scrollToProjects}>Դիտել նախագծերը</button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
