import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"

function Dashboard() {
  // checking if user is logged in
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()
  
  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } })
    }
  }, [user, navigate, location])

  return (
    <div>
        <h1>Dashboard</h1>
      <Sidebar />
    </div>
  )
}
export default Dashboard