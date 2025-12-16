import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { 
  FiHome, FiFileText, FiPlusCircle, FiUser, FiCreditCard, 
  FiUsers, FiSettings, FiBriefcase, FiList
} from 'react-icons/fi';
import { FaHouseChimney } from "react-icons/fa6";
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Logo from '../../Shared/Logo';

export default function Sidebar() {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed by default
  const [isHovered, setIsHovered] = useState(false);

  // Fetch user profile data from database to get the correct photoURL
  const { data: profileData } = useQuery({
    queryKey: ['userProfile', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      try {
        const res = await axiosSecure.get(`/api/auth/users/${user.email}`);
        return res.data.data;
      } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
    },
    enabled: !!user?.email,
  });

  // Auto-expand on hover, collapse when not hovered
  useEffect(() => {
    if (isHovered) {
      setIsCollapsed(false);
    } else {
      // Small delay before collapsing to prevent flickering
      const timer = setTimeout(() => {
        setIsCollapsed(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isHovered]);

  
  const isPathActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Citizen Menu Items
  const citizenMenu = [
    { name: 'Overview', path: '/dashboard', icon: <FiHome />, exact: true },
    { name: 'My Issues', path: '/dashboard/my-issues', icon: <FiFileText /> },
    { name: 'Report Issue', path: '/dashboard/report-issue', icon: <FiPlusCircle /> },
    { name: 'Payment History', path: '/dashboard/payment-history', icon: <FiCreditCard /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <FiUser /> },
  ];

  // Staff Menu Items
  const staffMenu = [
    { name: 'Overview', path: '/staff-dashboard', icon: <FiHome />, exact: true },
    { name: 'Assigned Issues', path: '/staff-dashboard/assigned-issues', icon: <FiList /> },
    { name: 'Profile', path: '/staff-dashboard/profile', icon: <FiUser /> },
  ];

  // Admin Menu Items
  const adminMenu = [
    { name: 'Overview', path: '/admin-dashboard', icon: <FiHome />, exact: true },
    { name: 'All Issues', path: '/admin-dashboard/all-issues', icon: <FiFileText /> },
    { name: 'Manage Users', path: '/admin-dashboard/manage-users', icon: <FiUsers /> },
    { name: 'Manage Staff', path: '/admin-dashboard/manage-staff', icon: <FiBriefcase /> },
    { name: 'Payments', path: '/admin-dashboard/payments', icon: <FiCreditCard /> },
    { name: 'Profile', path: '/admin-dashboard/profile', icon: <FiUser /> },
  ];

  // Select menu based on role
  const menuItems = 
    role === 'admin' ? adminMenu :
    role === 'staff' ? staffMenu :
    citizenMenu;


  // Close mobile drawer when clicking a link
  const handleNavClick = () => {
    if (window.innerWidth < 1024) {
      const drawerCheckbox = document.getElementById('dashboard-drawer');
      if (drawerCheckbox) {
        drawerCheckbox.checked = false;
      }
    }
  };

  return (
    <>
      {/* Hide scrollbar when collapsed */}
      <style>{`
        .sidebar-nav-collapsed::-webkit-scrollbar {
          display: none;
        }
        .sidebar-nav-collapsed {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div 
        className={`flex min-h-full flex-col items-start bg-white border-r border-gray-200 transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Logo Header */}
      <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-6'} border-b border-gray-200 relative`}>
        {!isCollapsed && (
          <>
            <Logo size="md" showText={true} />
            <p className="ml-3 mt-1 text-xs text-gray-500 font-['Satoshi'] capitalize">{role} Panel</p>
          </>
        )}
        {isCollapsed && <Logo size="sm" showText={false} />}
      </div>

      {/* User Info */}
      <div className={`p-4 border-b border-gray-100 w-full ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <img
            src={profileData?.photoURL || user?.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
            alt={profileData?.name || user?.displayName}
            className={`${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg object-cover border-2 border-[#238ae9] flex-shrink-0`}
            onError={(e) => {
              e.target.src = 'https://i.ibb.co/2W8Py4W/default-avatar.png';
            }}
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-['Satoshi'] font-semibold text-sm text-[#242424] truncate">
                {profileData?.name || user?.displayName}
              </p>
              <p className="font-['Satoshi'] text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav 
        className={`flex-1 w-full ${isCollapsed ? 'px-2 overflow-hidden sidebar-nav-collapsed' : 'px-4 overflow-y-auto'} py-4 space-y-1`}
        style={!isCollapsed ? {
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 transparent'
        } : {}}
      >
        {menuItems.map((item) => {
          const isActive = isPathActive(item.path, item.exact);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={handleNavClick}
              className={({ isActive }) => {
                const baseClasses = `flex items-center gap-3 px-4 py-3 rounded-lg font-['Satoshi'] font-medium text-sm transition-all relative group ${
                  isCollapsed ? 'justify-center px-2' : ''
                }`;
                const activeClasses = isActive
                  ? 'bg-[#238ae9] text-white shadow-md'
                  : 'text-gray-700 hover:bg-[#f4f6f8]';
                return `${baseClasses} ${activeClasses}`;
              }}
              title={isCollapsed ? item.name : undefined}
            >
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
              {isCollapsed && isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"></div>
              )}
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Back to Home */}
      <div className={`w-full border-t border-gray-200 ${isCollapsed ? 'p-2' : 'p-4'}`}>
        <Link
          to="/"
          onClick={handleNavClick}
          className={`flex items-center justify-center gap-2 px-4 py-2 bg-[#f4f6f8] hover:bg-gray-200 rounded-lg font-['Satoshi'] text-sm text-gray-700 transition-colors group relative ${
            isCollapsed ? 'px-2' : ''
          }`}
          title={isCollapsed ? "Back to Home" : undefined}
        >
          {!isCollapsed && <span>←</span>}
          <span className={isCollapsed ? 'text-lg' : ''}>{isCollapsed ? <FaHouseChimney /> : 'Back to Home'}</span>
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
              Back to Home
            </div>
          )}
        </Link>
      </div>
    </div>
    </>
  );
}