// components/dashboard/shared/Sidebar.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { 
  FiHome, FiFileText, FiPlusCircle, FiUser, FiCreditCard, 
  FiUsers, FiSettings, FiBriefcase, FiList, FiMenu, FiX 
} from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

export default function Sidebar() {
  const { user } = useAuth();
  const { role } = useRole();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 w-10 h-10 bg-[#238ae9] text-white rounded-lg flex items-center justify-center shadow-lg"
      >
        {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-200">
          <div className="w-10 h-10 bg-gradient-to-br from-[#238ae9] to-[#1e7acc] rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white text-xl font-bold font-['Satoshi']">C</span>
          </div>
          <div>
            <h1 className="text-[#242424] font-['Satoshi'] font-bold text-lg">Civix</h1>
            <p className="text-xs text-gray-500 font-['Satoshi'] capitalize">{role} Panel</p>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img
              src={user?.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
              alt={user?.displayName}
              className="w-12 h-12 rounded-lg object-cover border-2 border-[#238ae9]"
            />
            <div className="flex-1 min-w-0">
              <p className="font-['Satoshi'] font-semibold text-sm text-[#242424] truncate">
                {user?.displayName}
              </p>
              <p className="font-['Satoshi'] text-xs text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-['Satoshi'] font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-[#238ae9] text-white shadow-md'
                    : 'text-gray-700 hover:bg-[#f4f6f8]'
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Back to Home */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#f4f6f8] hover:bg-gray-200 rounded-lg font-['Satoshi'] text-sm text-gray-700 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}