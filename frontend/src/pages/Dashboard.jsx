import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Sidebar from "../components/Sidebar"

function Dashboard() {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    // Check if the user is logged in
    if (!user) {
      // Redirect to the login page
      navigate('/login')
    }
  }, [user, navigate])

  return (
    <div>
        <h1>Dashboard</h1>
      <Sidebar />
    </div>
  )
}
export default Dashboard