import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/authSlice'
import '../styles/Navbar.css'
import ConfirmModal from './ConfirmModal'
import Logo from './Logo'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const user = useSelector((state) => state.auth.user)

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
    setShowConfirm(true)
  }

  const confirmLogout = () => {
    dispatch(logout())
    navigate('/')
    setShowConfirm(false)
  }

  const cancelLogout = () => {
    setShowConfirm(false)
  }

  const goToAccount = () => {
    setMenuOpen(false)
    navigate('/account')
  }

  return (
    <>
      <nav className="navbar">
        <Logo />
        <div
          className={`burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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
            <li className="navbar-user">
              <img
                src={user?.profilePicture || '/default-avatar.png'}
                alt="User Avatar"
                className="navbar-avatar"
                onClick={goToAccount}
                style={{ cursor: 'pointer' }}
              />
              <span
                className="navbar-username"
                onClick={goToAccount}
                style={{ cursor: 'pointer', marginLeft: '8px' }}
              >
                {user?.username || 'Օգտատեր'}
              </span>
              <span
                onClick={handleLogout}
                className="login-button logout-button"
                style={{ marginLeft: '12px' }}
              >
                Ելք
              </span>
            </li>
          ) : (
            <li onClick={handleLoginClick} className="login-button">
              Մուտք
            </li>
          )}
        </ul>
      </nav>

      {showConfirm && (
        <ConfirmModal
          message="Դուք վստահ եք, որ ցանկանում եք դուրս գալ՞?"
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}
    </>
  )
}

export default Navbar
