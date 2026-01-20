import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import StaffRoute from './StaffRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import MainLayout from '../layouts/MainLayout'
import { createBrowserRouter } from 'react-router'
import Register from '../pages/SignUp/Register'
import About from '../pages/About'
import Contact from '../pages/Contact'
import AllIssues from '../pages/AllIssues'
import Announcements from '../pages/Announcements'
import HelpCenter from '../pages/HelpCenter'
import TermsOfService from '../pages/TermsOfService'
import AppPrivacy from '../pages/AppPrivacy'
import CommunityGuidelines from '../pages/CommunityGuidelines'
import FAQPage from '../pages/FAQPage'

// Citizen Dashboard Components
import CitizenOverview from '../components/Dashboard/Citizen/CitizenOverview'
import MyIssues from '../components/Dashboard/Citizen/MyIssues'
import ReportIssue from '../components/Dashboard/Citizen/ReportIssue'
import CitizenProfile from '../components/Dashboard/Citizen/CitizenProfile'
import PaymentHistory from '../components/Dashboard/Citizen/PaymentHistory'

// Admin Dashboard Components (to be created)
import AdminOverview from '../components/Dashboard/Admin/AdminOverview'
import AdminAllIssues from '../components/Dashboard/Admin/AdminAllIssues'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import ManageStaff from '../components/Dashboard/Admin/ManageStaff'
import AdminPayments from '../components/Dashboard/Admin/AdminPayments'
import AdminProfile from '../components/Dashboard/Admin/AdminProfile'

// Staff Dashboard Components (to be created)
import StaffOverview from '../components/Dashboard/Staff/StaffOverview'
import AssignedIssues from '../components/Dashboard/Staff/AssignedIssues'
import StaffProfile from '../components/Dashboard/Staff/StaffProfile'

import IssueDetails from '../components/Issues/IssueDetails'
import PaymentSuccessPage from '../pages/Payment/PaymentSuccessPage'
import PaymentCancelPage from '../pages/Payment/PaymentCancelPage'

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
        path: '/aboutUs',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },

      {
        path: '/allissues',
        element: <AllIssues />
      },
      {
        path: '/announcements',
        element: (
          <PrivateRoute>
            <Announcements />
          </PrivateRoute>
        )
      },


      {
        path: '/issue/:id',
        element: (
          <PrivateRoute>
            <IssueDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/payment/success',
        element: (
          <PrivateRoute>
            <PaymentSuccessPage />
          </PrivateRoute>
        ),
      },
      {
        path: '/payment/cancel',
        element: <PaymentCancelPage />,
      },
      {
        path: '/help',
        element: <HelpCenter />,
      },
      {
        path: '/terms',
        element: <TermsOfService />,
      },
      {
        path: '/privacy',
        element: <AppPrivacy />,
      },
      {
        path: '/community-guidelines',
        element: <CommunityGuidelines />,
      },
      {
        path: '/faq',
        element: <FAQPage />,
      },

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
    children: [
      {
        path: '/dashboard',
        element: <CitizenOverview />
      },
      {
        path: '/dashboard/my-issues',
        element: <MyIssues />
      },
      {
        path: '/dashboard/report-issue',
        element: <ReportIssue />
      },
      {
        path: '/dashboard/payment-history',
        element: <PaymentHistory />
      },
      {
        path: '/dashboard/profile',
        element: <CitizenProfile />
      },
    ],
  },
  {
    path: '/admin-dashboard',
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: '/admin-dashboard',
        element: <AdminOverview />
      },
      {
        path: '/admin-dashboard/all-issues',
        element: <AdminAllIssues />
      },
      {
        path: '/admin-dashboard/manage-users',
        element: <ManageUsers />
      },
      {
        path: '/admin-dashboard/manage-staff',
        element: <ManageStaff />
      },
      {
        path: '/admin-dashboard/payments',
        element: <AdminPayments />
      },
      {
        path: '/admin-dashboard/profile',
        element: <AdminProfile />
      },
    ],
  },
  {
    path: '/staff-dashboard',
    element: (
      <StaffRoute>
        <DashboardLayout />
      </StaffRoute>
    ),
    children: [
      {
        path: '/staff-dashboard',
        element: <StaffOverview />
      },
      {
        path: '/staff-dashboard/assigned-issues',
        element: <AssignedIssues />
      },
      {
        path: '/staff-dashboard/profile',
        element: <StaffProfile />
      },
    ],
  },
])