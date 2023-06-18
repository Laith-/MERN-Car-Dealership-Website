import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
///import PrivateRoute from "./components/PrivateRoute"
import Header from "./components/Header"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import InventoryManager from "./pages/InventoryManager"
import Settings from "./pages/Settings"
import CarEdit from "./pages/CarEdit"
import CarView from "./pages/CarView"
import PageNotFound from "./pages/PageNotFound"


function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
          <Route path="/" element={<Homepage location="/"/>} />
          <Route path="/dashboard" element={<Dashboard location="/dashboard" />} />
          <Route path="/dashboard/inventorymanager" element={<InventoryManager location="/dashboard/inventorymanager" />} />
          <Route path="/dashboard/settings" element={<Settings location="/dashboard/settings" />} />
          <Route path="/login" element={<Login location="/login" />} />
          <Route path="/register" element={<Register location="/register" />} />
          <Route path="/dashboard/inventorymanager/edit/:itemId" element={<CarEdit />} />
          <Route path="/vehicle/:itemId" element={<CarView />} />

          <Route path="*" element={<PageNotFound />} /> {/* Catch-all route */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
