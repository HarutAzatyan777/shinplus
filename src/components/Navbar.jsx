import '../styles/Navbar.css'
import Logo from './Logo'

const Navbar = () => (
  <nav className="navbar">
   <Logo />
    <ul className="navbar-links">
     
      <li><a href="#services">Ծառայություններ</a></li>
      <li><a href="#portfolio">Պրոյեկտներ</a></li>
      <li><a href="#about">Մեր Մասին</a></li>
      <li><a href="#contact">Կապ</a></li>
    </ul>
  </nav>
)

export default Navbar
