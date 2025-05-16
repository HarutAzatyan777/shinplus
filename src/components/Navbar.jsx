import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">ShinPlus</div>

      {/* Burger menu icon */}
      <div className="burger" onClick={toggleMenu}>
        <span className="line" />
        <span className="line" />
        <span className="line" />
      </div>

      <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Գլխավոր</Link></li>
        <li><a href="#services" onClick={toggleMenu}>Ծառայություններ</a></li>
        <li><a href="#portfolio" onClick={toggleMenu}>Պրոյեկտներ</a></li>
        <li><a href="#about" onClick={toggleMenu}>Մեր Մասին</a></li>
        <li><a href="#contact" onClick={toggleMenu}>Կապ</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
