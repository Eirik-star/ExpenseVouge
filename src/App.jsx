import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './pages/auth/Login'
import { ExpenseVouge } from './pages/ExpenseVouge'
import { useContext } from 'react'
import { cookiesContext } from './contexts/Cookies'
import Register from './pages/auth/Register'
import notFound from './pages/notFound'
import ForgotPassword from './pages/auth/ForgotPassword';
import Logout from './pages/auth/Logout'
import EditTransaction from "../src/pages/ExpenseVouge/edit/[...id]";


function App() {
  const { isLoggedInState } = useContext(cookiesContext)

  return (
    <div className="App h-max">
        <Router>
          <Routes>
            <Route exact path="/" element={isLoggedInState ? <ExpenseVouge /> : <Navigate to="/login" />} /> 
            <Route path="/login" exact element={isLoggedInState ? <Navigate to="/" /> :  <Login />} />
            <Route path="/logout" exact Component={Logout} />
            <Route path="/reset-password" exact element={isLoggedInState ? <Navigate to="/" /> :  <ForgotPassword />} />
            <Route path="/register" exact element={isLoggedInState ? <Navigate to="/" /> : <Register />} />
            <Route path="/edit/:id" element={<EditTransaction/>} />
            <Route path="*" Component={notFound}/>
          </Routes>
        </Router>
    </div>
  )
}

export default App
