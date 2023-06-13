import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {FaUser} from "react-icons/fa"
import {register, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: ""
  })

  const {firstName, lastName, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }

    if(isSuccess || user) {
      navigate("/") //navigate to homepage
    }

    dispatch(reset)

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(password !== password2) {
      toast.error("Passwords do not match")
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Create an account!
        </h1>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>

          <div className="form-group" >
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={firstName}
              placeholder="Enter your first name"
              onChange={onChange}
            />
          </div>

          <div className="form-group" >
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={lastName}
              placeholder="Enter your last name"
              onChange={onChange}
            />
          </div>

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
              <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
              />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-block">Sign Up!</button>

          </div>

        </form>

      </section>

  </>)
}

export default Register