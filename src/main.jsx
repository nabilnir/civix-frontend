import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Routing
import { RouterProvider } from 'react-router'
import { router } from './routes/Routes.jsx'

// State Management (TanStack Query)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Authentication
import AuthProvider from './Context/AuthProvider.jsx'

// UI Components & Animation
import { Toaster } from 'react-hot-toast'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Initialize Query Client
const queryClient = new QueryClient()


const Main = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'ease-in-out',
    })
  }, [])

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position='top-right' reverseOrder={false} />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Main />)