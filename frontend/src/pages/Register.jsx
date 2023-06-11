import {useState, useEffect} from "react"

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    LastName: "",
    email: "",
    password: "",
    password2: ""
  })

  return (<div>Register</div>)
}

export default Register