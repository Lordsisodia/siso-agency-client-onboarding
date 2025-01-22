import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

// Create a client with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
})

// Configure allowed origins for postMessage
const ALLOWED_ORIGINS = [
  'https://gptengineer.app',
  'http://localhost:3000',
  'https://lovable.dev',
  'https://www.siso.agency',
  'https://siso.agency' // Added this
];

// Set allowed origins on window object
window.ALLOWED_ORIGINS = ALLOWED_ORIGINS;

// Wrap the entire app with StrictMode and QueryClientProvider
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)