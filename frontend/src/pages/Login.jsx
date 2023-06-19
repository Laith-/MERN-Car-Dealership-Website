import { useState, useEffect } from "react"
import { FaSignInAlt } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { login, reset } from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })


  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    document.title = 'Login - Tulu Canada'
    const from = location.state?.from 

    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
    console.log(from)
    navigate(from || "/") // Redirect back to the original location OR "/"
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, location, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>

          <div className="form-group">
              <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter you email"
              onChange={onChange}
              />
          </div>
          
          <div className="form-group">
              <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter a password"
              onChange={onChange}
              />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">Login!</button>

          </div>

        </form>

      </section>

  </>)
}

export default Login