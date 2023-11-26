import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CookiesProvider } from 'react-cookie'
import { Cookies } from './contexts/Cookies.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CookiesProvider>
      <Cookies>
        <App />
      </Cookies>
    </CookiesProvider>
  </React.StrictMode>,
)
