import { NavLink } from 'react-router-dom'
import '../css/Sidebar.css'

function Sidebar() {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <NavLink
            
            to="/dashboard/inventorymanager"
            className="sidebar-menu-link"
            activeClassName="active"
          >
            Manage Inventory
          </NavLink>
        </li>
        <li className="sidebar-menu-item">
          <NavLink
            
            to="/dashboard/settings"
            className="sidebar-menu-link"
            activeClassName="active"
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </div>
  )
}


export default Sidebar
