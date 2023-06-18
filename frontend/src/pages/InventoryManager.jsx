import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import '../css/DashboardButton.css'
import '../css/InventoryManagerGrid.css'
import InventoryUploader from '../components/InventoryUploader'
import ManageInventory from '../components/ManageInventory'

function InventoryManager() {
  const [currentWindow, setCurrentWindow] = useState('View')

  // checking if user is logged in
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: location.pathname } })
    }
  }, [user, navigate, location])

  const handleButtonClick = (window) => {
    setCurrentWindow(window)
  };

  return (
    <div>
      <h1 >Inventory Manager</h1>
      <Sidebar />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-80px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleButtonClick('Manage')}
            className={currentWindow === 'Manage' ? 'button active' : 'button'}
          >
            Manage Inventory
          </button>
          <button
            onClick={() => handleButtonClick('Upload')}
            className={currentWindow === 'Upload' ? 'button active' : 'button'}
          >
            Upload Inventory
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {currentWindow === 'Manage' && (
        <div className="window">
          <ManageInventory />
        </div>
      )}

      {currentWindow === 'Upload' && (
        <div className="window">
          <InventoryUploader />
        </div>
      )}
      </div>
      
    </div>
  )
}

export default InventoryManager
