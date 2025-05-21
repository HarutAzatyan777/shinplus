import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import '../styles/Navbar.css'
import Logo from './Logo'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const handleLinkClick = (sectionId) => {
    setMenuOpen(false)
    navigate('/')
    setTimeout(() => {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleLoginClick = () => {
    setMenuOpen(false)
    navigate('/login')
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
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
        <li>
          <a href="/calculators">Հաշվիչներ</a>
        </li>
        {isLoggedIn ? (
          <li onClick={handleLogout} className="login-button">Ելք</li>
        ) : (
          <li onClick={handleLoginClick} className="login-button">Մուտք</li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
