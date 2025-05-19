import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import Logo from './Logo'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLinkClick = (sectionId) => {
    setMenuOpen(false)

    // Նավիգացիա դեպի home, հետո scroll
    navigate('/')

    setTimeout(() => {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100) // սպասում ենք, որ home load անի
  }

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
        <li onClick={() => handleLinkClick('services')}>Ծառայություններ</li>
        <li onClick={() => handleLinkClick('portfolio')}>Պրոյեկտներ</li>
        <li onClick={() => handleLinkClick('about')}>Մեր Մասին</li>
        <li onClick={() => handleLinkClick('contact')}>Կապ</li>
        <li onClick={handleLinkClick}>
          <a href="/calculators">Հաշվիչներ</a> {/* Մնում է հղում, քանի որ սա առանձին էջ է */}
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
