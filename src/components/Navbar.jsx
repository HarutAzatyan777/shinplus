import { useState } from 'react'
import '../styles/Navbar.css'
import Logo from './Logo'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <Logo />
      <div
        className={`burger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="line line1" />
        <div className="line line2" />
        <div className="line line3" />
      </div>
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="#services">Ծառայություններ</a></li>
        <li><a href="#portfolio">Պրոյեկտներ</a></li>
        <li><a href="#about">Մեր Մասին</a></li>
        <li><a href="#contact">Կապ</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
