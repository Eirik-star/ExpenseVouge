import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from './pages/auth/Login'
import { ExpenseVouge } from './pages/ExpenseVouge'
import { useContext } from 'react'
import { cookiesContext } from './contexts/Cookies'
import Register from './pages/auth/Register'
import notFound from './pages/notFound'
import ForgotPassword from './pages/auth/ForgotPassword';
import Logout from './pages/auth/Logout'
import EditTransaction from "../src/pages/ExpenseVouge/edit/[...id]"
import { useMedia } from "./hooks/useMedia"
import { Graph } from "./components/Graph"
import chart from "./pages/ExpenseVouge/chart"
import bar from './pages/ExpenseVouge/bar'


function App() {
  const { isLoggedInState } = useContext(cookiesContext)
  const { isDesktop } = useMedia()

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
            {
              !isDesktop && (
                <>
                  <Route path="/chart" exact Component={chart} />
                  <Route path="/graph" exact Component={bar} />
                </>
              )
            }
          </Routes>
        </Router>
    </div>
  )
}

export default App
