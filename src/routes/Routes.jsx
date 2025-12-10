import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import MainLayout from '../layouts/MainLayout'
import { createBrowserRouter } from 'react-router'
import Register from '../pages/SignUp/Register'
import About from '../pages/About'
import Contact from '../pages/Contact'
import AllIssues from '../pages/AllIssues'
import CitizenOverview from '../components/Dashboard/Citizen/CitizenOverview'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path:'/aboutUs',
        Component: About
      },
      {
        path:'/contact',
        Component: Contact
      },
      {
        path : '/allissues',
        Component: AllIssues
      }
      
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children:[
      {
        path:'/dashboard',
        element: <PrivateRoute>
           <CitizenOverview />
        </PrivateRoute>
      }
    ]
  },
])
