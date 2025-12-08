// components/shared/Navbar.jsx
import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { FiMenu, FiX, FiBell, FiMail, FiUser, FiLogOut, FiGrid } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Issues', path: '/all-issues' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#238ae9] to-[#1e7acc] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
              <span className="text-white text-xl font-bold">C</span>
            </div>
            <span className="text-[#242424] font-['Satoshi'] font-bold text-xl tracking-tight hidden sm:block">
              Civix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-['Satoshi'] font-medium text-sm transition-colors ${
                    isActive
                      ? 'text-[#238ae9] border-b-2 border-[#238ae9] pb-1'
                      : 'text-[#242424] hover:text-[#238ae9]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            
            {user ? (
              <>
                {/* Notification Icon */}
                <button className="w-9 h-9 rounded-lg bg-[#f4f6f8] hover:bg-gray-200 flex items-center justify-center transition-colors hidden sm:flex">
                  <FiBell className="text-[#242424] text-lg" />
                </button>

                {/* Messages Icon */}
                <button className="w-9 h-9 rounded-lg bg-[#f4f6f8] hover:bg-gray-200 flex items-center justify-center transition-colors hidden sm:flex">
                  <FiMail className="text-[#242424] text-lg" />
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 hover:bg-[#f4f6f8] rounded-lg p-1 pr-3 transition-colors"
                  >
                    <img
                      src={user?.photoURL || 'https://via.placeholder.com/40'}
                      alt={user?.displayName}
                      className="w-9 h-9 rounded-lg object-cover border-2 border-[#238ae9]"
                    />
                    <span className="font-['Satoshi'] font-medium text-sm text-[#242424] hidden lg:block">
                      {user?.displayName?.split(' ')[0]}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-['Satoshi'] font-semibold text-sm text-[#242424]">
                          {user?.displayName}
                        </p>
                        <p className="font-['Satoshi'] text-xs text-gray-500 mt-1">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f4f6f8] transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FiGrid className="text-[#238ae9]" />
                        <span className="font-['Satoshi'] text-sm text-[#242424]">
                          Dashboard
                        </span>
                      </Link>

                      <Link
                        to="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-[#f4f6f8] transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FiUser className="text-[#238ae9]" />
                        <span className="font-['Satoshi'] text-sm text-[#242424]">
                          Profile
                        </span>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors border-t border-gray-100 mt-2"
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
              <Link
                to="/login"
                className="bg-[#242424] hover:bg-[#1a1a1a] text-white px-5 py-2 rounded-lg font-['Satoshi'] font-medium text-sm transition-colors shadow-sm hover:shadow-md"
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9 rounded-lg bg-[#f4f6f8] hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              {isMenuOpen ? (
                <FiX className="text-[#242424] text-xl" />
              ) : (
                <FiMenu className="text-[#242424] text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg font-['Satoshi'] font-medium text-sm transition-colors ${
                    isActive
                      ? 'bg-[#238ae9] text-white'
                      : 'text-[#242424] hover:bg-[#f4f6f8]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}