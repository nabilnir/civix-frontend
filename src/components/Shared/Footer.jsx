import { Link } from 'react-router';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiLinkedin, FiGithub } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#238ae9] to-[#1e7acc] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white text-xl font-bold">C</span>
              </div>
              <span className="text-[#242424] font-['Satoshi'] font-bold text-xl tracking-tight">
                Civix
              </span>
            </div>
            <p className="font-['Satoshi'] text-sm text-gray-600 leading-relaxed">
              Empowering citizens to report, track, and resolve infrastructure issues. 
              Building better communities together.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#f4f6f8] hover:bg-[#238ae9] flex items-center justify-center transition-colors group"
              >
                <FiFacebook className="text-[#242424] group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#f4f6f8] hover:bg-[#238ae9] flex items-center justify-center transition-colors group"
              >
                <FiTwitter className="text-[#242424] group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#f4f6f8] hover:bg-[#238ae9] flex items-center justify-center transition-colors group"
              >
                <FiLinkedin className="text-[#242424] group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#f4f6f8] hover:bg-[#238ae9] flex items-center justify-center transition-colors group"
              >
                <FiGithub className="text-[#242424] group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-['Satoshi'] font-bold text-[#242424] text-sm mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-issues"
                  className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                >
                  All Issues
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-['Satoshi'] font-bold text-[#242424] text-sm mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/help"
                  className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/guidelines"
                  className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                >
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-['Satoshi'] font-bold text-[#242424] text-sm mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMail className="text-[#238ae9] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-['Satoshi'] text-xs text-gray-500">Email</p>
                  <a
                    href="mailto:support@civix.com"
                    className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                  >
                    support@civix.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="text-[#238ae9] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-['Satoshi'] text-xs text-gray-500">Phone</p>
                  <a
                    href="tel:+8801234567890"
                    className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
                  >
                    +880 123 456 7890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-[#238ae9] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-['Satoshi'] text-xs text-gray-500">Address</p>
                  <p className="font-['Satoshi'] text-sm text-gray-600">
                    Kafrul, Dhaka Division<br />Bangladesh
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-['Satoshi'] text-sm text-gray-600 text-center sm:text-left">
              © {currentYear} Civix. All rights reserved. Built with  for better communities.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/sitemap"
                className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
              >
                Sitemap
              </Link>
              <Link
                to="/accessibility"
                className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
              >
                Accessibility
              </Link>
              <Link
                to="/cookies"
                className="font-['Satoshi'] text-sm text-gray-600 hover:text-[#238ae9] transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}