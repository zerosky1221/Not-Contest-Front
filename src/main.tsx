import React from 'react'
import ReactDOM from 'react-dom/client'
import { HeroUIProvider } from "@heroui/react"
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { StoreProvider } from './context/StoreContext.tsx'

document.documentElement.classList.add('dark')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <Router>
        <StoreProvider>
          <App />
        </StoreProvider>
      </Router>
    </HeroUIProvider>
  </React.StrictMode>,
)
