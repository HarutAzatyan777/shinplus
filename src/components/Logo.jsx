import { Link } from 'react-router-dom'

const Logo = () => (
  <Link to="/" className="logo" style={{ display: 'inline-block' }}>
    <svg
      width="180"
      height="50"
      viewBox="0 0 360 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="60"
        fontFamily="Arial, sans-serif"
        fontSize="56"
        fontWeight="bold"
        fill="#009688"
      >
        Shin
      </text>
      <text
        x="150"
        y="60"
        fontFamily="Arial, sans-serif"
        fontSize="56"
        fontWeight="bold"
        fill="#222"
      >
        Plus
      </text>
    </svg>
  </Link>
)

export default Logo
