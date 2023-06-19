import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from "../components/Sidebar"

function InventoryManager() {
  // checking if user is logged in
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    document.title = 'Settings - Tulu Canada'
    if (!user) {
      navigate('/login', { state: { from: location.pathname } })
    }
  }, [user, navigate, location])



    return (
      <div>
          <h1>Settings</h1>
          <Sidebar />
      </div>
    )
  }
  
  export default InventoryManager