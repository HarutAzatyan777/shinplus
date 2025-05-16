import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">ShinPlus</div>
    <ul className="navbar-links">
      <li><Link to="/">Գլխավոր</Link></li>
      <li><a href="#services">Ծառայություններ</a></li>
      <li><a href="#portfolio">Պրոյեկտներ</a></li>
      <li><a href="#about">Մեր Մասին</a></li>
      <li><a href="#contact">Կապ</a></li>
    </ul>
  </nav>
)

export default Navbar
