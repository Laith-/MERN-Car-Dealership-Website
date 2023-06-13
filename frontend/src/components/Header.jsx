import {FaSignInAlt, FaSignOutAlt, FaUser} from "react-icons/fa"
import {Link, useNavigate} from "react-router-dom"
import logoImage from '../assets/tulu-circle-40.png'
import {useSelector, useDispatch} from "react-redux"
import {logout, reset} from "../features/auth/authSlice"

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate("/")
    }

  return (
    <header className= "header">
        <div className="logo">
            <Link to="/">
                <img src={logoImage} alt="Tulu Canada"/>
                <span className="logo-text" style={{ position: 'absolute', marginLeft: "5px", top: '31px' }}>Canada</span>
            </Link>
        </div>
        <ul>
            {user ? (
                <>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <button className="btn" onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                    </button>
                </li>
                </>
            ) : (
                <>
                <li>
                    <Link to="/login">
                    <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                    <FaUser /> Register
                    </Link>
                </li>
                </>
            )}
        </ul>

    </header>
  )
}

export default Header