import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import {
  FiHome, FiFileText, FiPlusCircle, FiUser, FiCreditCard,
  FiUsers, FiSettings, FiBriefcase, FiList
} from 'react-icons/fi';
import { ChartPie } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Logo from '../../Shared/Logo';
import ThemeToggle from '../../Shared/ThemeToggle';

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
    let timer;

    if (isHovered) {
      // Use setTimeout to avoid synchronous setState in effect
      timer = setTimeout(() => {
        setIsCollapsed(false);
      }, 0);
    } else {
      // Small delay before collapsing to prevent flickering
      timer = setTimeout(() => {
        setIsCollapsed(true);
      }, 200);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isHovered]);


  const isPathActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Citizen Menu Items
  const citizenMenu = [
    { name: 'Overview', path: '/dashboard', icon: <ChartPie size={20} />, exact: true },
    { name: 'My Issues', path: '/dashboard/my-issues', icon: <FiFileText /> },
    { name: 'Report Issue', path: '/dashboard/report-issue', icon: <FiPlusCircle /> },
    { name: 'Payment History', path: '/dashboard/payment-history', icon: <FiCreditCard /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <FiUser /> },
  ];

  // Staff Menu Items
  const staffMenu = [
    { name: 'Overview', path: '/staff-dashboard', icon: <ChartPie size={20} />, exact: true },
    { name: 'Assigned Issues', path: '/staff-dashboard/assigned-issues', icon: <FiList /> },
    { name: 'Profile', path: '/staff-dashboard/profile', icon: <FiUser /> },
  ];

  // Admin Menu Items
  const adminMenu = [
    { name: 'Overview', path: '/admin-dashboard', icon: <ChartPie size={20} />, exact: true },
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
        className={`flex min-h-full flex-col items-start bg-base-100 border-r border-base-300 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo Header */}
        <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center px-2' : 'justify-between px-6'} border-b border-base-200 relative`}>
          {!isCollapsed && (
            <>
              <Logo size="md" showText={true} />
              <p className="ml-3 mt-1 text-xs text-base-content/50 font-['Satoshi'] capitalize">{role} Panel</p>
            </>
          )}
          {isCollapsed && <Logo size="sm" showText={false} />}
        </div>

        {/* User Info */}
        <div className={`p-4 border-b border-base-200 w-full ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <img
              src={profileData?.photoURL || user?.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
              alt={profileData?.name || user?.displayName}
              className={`${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'} rounded-lg object-cover border-2 border-primary shrink-0`}
              onError={(e) => {
                e.target.src = 'https://i.ibb.co/2W8Py4W/default-avatar.png';
              }}
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-['Satoshi'] font-semibold text-sm text-base-content truncate">
                  {profileData?.name || user?.displayName}
                </p>
                <p className="font-['Satoshi'] text-xs text-base-content/70 truncate">
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
            scrollbarColor: 'var(--color-base-300) transparent'
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
                  const baseClasses = `flex items-center gap-3 px-4 py-3 rounded-lg font-['Satoshi'] font-medium text-sm transition-all relative group ${isCollapsed ? 'justify-center px-2' : ''
                    }`;
                  const activeClasses = isActive
                    ? 'bg-primary text-primary-content shadow-md'
                    : 'text-base-content/70 hover:bg-base-200 hover:text-base-content';
                  return `${baseClasses} ${activeClasses}`;
                }}
                title={isCollapsed ? item.name : undefined}
              >
                <span className="text-lg shrink-0">{item.icon}</span>
                {!isCollapsed && <span>{item.name}</span>}
                {isCollapsed && isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-base-100 rounded-r-full"></div>
                )}
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-neutral text-neutral-content text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                    {item.name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className={`w-full border-t border-base-200 ${isCollapsed ? 'p-2' : 'p-4'}`}>
          <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center mb-2`}>
            {!isCollapsed && <span className="text-xs text-base-content/50 font-medium ml-1">Theme</span>}
            <ThemeToggle />
          </div>
          <Link
            to="/"
            onClick={handleNavClick}
            className={`flex items-center justify-center gap-2 px-4 py-2 bg-base-200 hover:bg-base-300 rounded-lg font-['Satoshi'] text-sm text-base-content transition-colors group relative ${isCollapsed ? 'px-2' : ''
              }`}
            title={isCollapsed ? "Back to Home" : undefined}
          >
            {!isCollapsed && <span>←</span>}
            <span className={isCollapsed ? 'text-lg' : ''}>{isCollapsed ? <FiHome size={20} /> : 'Back to Home'}</span>
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-neutral text-neutral-content text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 pointer-events-none">
                Back to Home
              </div>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}