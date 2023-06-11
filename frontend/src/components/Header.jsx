import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"
import {Link} from "react-router-dom"
import logoImage from '../assets/tulu-circle-40.png'

function Header() {
  return (
    <header className= "header">
        <div className="logo">
            <Link to="/">
                <img src={logoImage} alt="Tulu Canada"/>
                <span className="logo-text" style={{ position: 'absolute', marginLeft: "5px", top: '31px' }}>Canada</span>
            </Link>
        </div>
        <ul>
            <li>
                <Link to="/login">
                    <FaSignInAlt /> Login
                </Link>
            </li>
            <li>
                <Link to="/Register">
                    <FaUser /> Register
                </Link>
            </li>
        </ul>
    </header>
  )
}

export default Header