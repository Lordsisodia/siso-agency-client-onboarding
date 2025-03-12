
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './app.css'

// Configure allowed origins for postMessage
const ALLOWED_ORIGINS = [
  'https://gptengineer.app',
  'http://localhost:3000',
  'https://lovable.dev',
  'https://www.siso.agency',
  'https://siso.agency'
];

// Set allowed origins on window object
window.ALLOWED_ORIGINS = ALLOWED_ORIGINS;

// Create root and render app with correct provider order
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
