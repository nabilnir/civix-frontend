import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { SITE_INFO } from '../Utils/constants';

// Page title mapping based on routes
const getPageTitle = (pathname) => {
  const titleMap = {
    '/': 'Home',
    '/aboutUs': 'About Us',
    '/contact': 'Contact',
    '/allissues': 'All Issues',
    '/login': 'Login',
    '/register': 'Sign Up',
    '/dashboard': 'Dashboard',
    '/dashboard/my-issues': 'My Issues',
    '/dashboard/report-issue': 'Report Issue',
    '/dashboard/payment-history': 'Payment History',
    '/dashboard/profile': 'Profile',
    '/admin-dashboard': 'Admin Dashboard',
    '/admin-dashboard/all-issues': 'All Issues - Admin',
    '/admin-dashboard/manage-users': 'Manage Users',
    '/admin-dashboard/manage-staff': 'Manage Staff',
    '/admin-dashboard/payments': 'Payments - Admin',
    '/admin-dashboard/profile': 'Admin Profile',
    '/staff-dashboard': 'Staff Dashboard',
    '/staff-dashboard/assigned-issues': 'Assigned Issues',
    '/staff-dashboard/profile': 'Staff Profile',
    '/payment/success': 'Payment Success',
    '/payment/cancel': 'Payment Cancelled',
  };

  // Check for dynamic routes (e.g., /issue/:id)
  if (pathname.startsWith('/issue/')) {
    return 'Issue Details';
  }

  // Return mapped title or default
  return titleMap[pathname] || 'Page';
};

const useTitle = (customTitle = null) => {
  const location = useLocation();

  useEffect(() => {
    // Use custom title if provided, otherwise get from route
    const pageTitle = customTitle || getPageTitle(location.pathname);
    
    // Set document title
    document.title = `${pageTitle} | ${SITE_INFO.NAME}`;
    
    // Cleanup: reset to default when component unmounts
    return () => {
      document.title = SITE_INFO.FULL_NAME;
    };
  }, [location.pathname, customTitle]);
};

export default useTitle;

