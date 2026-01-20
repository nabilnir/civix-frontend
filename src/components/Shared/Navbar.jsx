import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router';
import { FiMenu, FiX, FiUser, FiLogOut, FiGrid } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import toast from 'react-hot-toast';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logOut } = useAuth();
  const { role } = useRole();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get dashboard path based on role
  const getDashboardPath = () => {
    if (role === 'admin') return '/admin-dashboard';
    if (role === 'staff') return '/staff-dashboard';
    return '/dashboard';
  };

  const handleLogout = async () => {
    try {
      await logOut();
      setIsProfileOpen(false);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Issues', path: '/allissues' },
    { name: 'Announcements', path: '/announcements' },
    { name: 'About', path: '/aboutUs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-base-100 border-b border-base-300 sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-['Satoshi'] font-medium text-sm transition-colors ${isActive
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-base-content hover:text-primary'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <>


                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 hover:bg-base-200 rounded-lg p-1 pr-3 transition-colors"
                    aria-label="Profile menu"
                  >
                    <img
                      src={user?.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
                      alt={user?.displayName || 'User'}
                      className="w-9 h-9 rounded-lg object-cover border-2 border-primary"
                      onError={(e) => {
                        e.target.src = 'https://i.ibb.co/2W8Py4W/default-avatar.png';
                      }}
                    />
                    <span className="font-['Satoshi'] font-medium text-sm text-base-content hidden lg:block">
                      {user?.displayName?.split(' ')[0] || 'User'}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-xl shadow-lg border border-base-300 py-2 z-50 animate-fadeIn">
                      <div className="px-4 py-3 border-b border-base-200">
                        <p className="font-['Satoshi'] font-semibold text-sm text-base-content truncate">
                          {user?.displayName || 'User'}
                        </p>
                        <p className="font-['Satoshi'] text-xs text-base-content/70 mt-1 truncate">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        to={getDashboardPath()}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-base-200 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FiGrid className="text-primary" />
                        <span className="font-['Satoshi'] text-sm text-base-content">
                          {role === 'admin' ? 'Admin Dashboard' : role === 'staff' ? 'Staff Dashboard' : 'Dashboard'}
                        </span>
                      </Link>

                      <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-base-200 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FiUser className="text-primary" />
                        <span className="font-['Satoshi'] text-sm text-base-content">
                          Profile
                        </span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-error/10 transition-colors border-t border-base-200 mt-2"
                      >
                        <FiLogOut className="text-red-500" />
                        <span className="font-['Satoshi'] text-sm text-red-500">
                          Logout
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="btn btn-primary btn-sm rounded-lg font-['Satoshi'] font-medium text-white transition-colors shadow-sm hover:shadow-md border-none"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-neutral btn-sm rounded-lg font-['Satoshi'] font-medium text-white transition-colors shadow-sm hover:shadow-md border-none"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9 rounded-lg bg-base-200 hover:bg-base-300 flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FiX className="text-base-content text-xl" />
              ) : (
                <FiMenu className="text-base-content text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fadeIn">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-['Satoshi'] font-medium text-sm transition-colors ${isActive
                    ? 'bg-[#238ae9] text-white'
                    : 'text-[#242424] hover:bg-[#f4f6f8]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Login and Sign Up Buttons */}
            {!user && (
              <div className="px-4 mt-4 flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 bg-[#238ae9] hover:bg-[#1e7acc] text-white px-4 py-3 rounded-lg font-['Satoshi'] font-medium text-sm text-center transition-colors shadow-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 bg-[#242424] hover:bg-[#1a1a1a] text-white px-4 py-3 rounded-lg font-['Satoshi'] font-medium text-sm text-center transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Logout Button */}
            {user && (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-3 rounded-lg font-['Satoshi'] font-medium text-sm text-red-500 hover:bg-red-50 transition-colors mt-2 flex items-center gap-2"
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}