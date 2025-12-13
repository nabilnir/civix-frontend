import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { 
  FiHome, FiFileText, FiPlusCircle, FiUser, FiCreditCard, 
  FiUsers, FiSettings, FiBriefcase, FiList, FiMenu, FiX, FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import Logo from '../../Shared/Logo';

export default function Sidebar() {
  const { user } = useAuth();
  const { role } = useRole();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved !== null) {
      setIsCollapsed(JSON.parse(saved));
    }
  }, []);

  
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

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

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
    <div className={`flex min-h-full flex-col items-start bg-white border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Logo Header */}
      <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-6'} border-b border-gray-200 relative`}>
        {!isCollapsed && (
          <>
            <Logo size="md" showText={true} />
            <p className="ml-3 mt-1 text-xs text-gray-500 font-['Satoshi'] capitalize">{role} Panel</p>
          </>
        )}
        {isCollapsed && <Logo size="sm" showText={false} />}
        
        {/* Collapse Toggle Button - Desktop Only */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-gray-200 rounded-full items-center justify-center shadow-md hover:bg-[#f4f6f8] hover:border-[#238ae9] transition-colors z-10"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <FiChevronRight className="w-3 h-3 text-gray-600" />
          ) : (
            <FiChevronLeft className="w-3 h-3 text-gray-600" />
          )}
        </button>
      </div>

      {/* User Info */}
      <div className={`p-4 border-b border-gray-100 w-full ${isCollapsed ? 'flex justify-center' : ''}`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <img
            src={user?.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
            alt={user?.displayName}
            className={`${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg object-cover border-2 border-[#238ae9] flex-shrink-0`}
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-['Satoshi'] font-semibold text-sm text-[#242424] truncate">
                {user?.displayName}
              </p>
              <p className="font-['Satoshi'] text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={`flex-1 w-full ${isCollapsed ? 'px-2' : 'px-4'} py-4 space-y-1 overflow-y-auto`}>
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
          <span className={isCollapsed ? 'text-lg' : ''}>{isCollapsed ? '🏠' : 'Back to Home'}</span>
          {/* Tooltip for collapsed state */}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
              Back to Home
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}