import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import App from './App.jsx'
import AuthProvider from './contexts/AuthContext.jsx'
import { MedicalProfileProvider } from '#contexts/MedicalProfileContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <MedicalProfileProvider>
        <App />
      </MedicalProfileProvider>
    </AuthProvider>
  </StrictMode>,
)
