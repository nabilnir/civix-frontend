import { Link } from 'react-router';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiLinkedin, FiGithub } from 'react-icons/fi';
import { FaXTwitter } from "react-icons/fa6";
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-100 border-t border-base-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Column */}
          <div className="space-y-4">
            <div className="mb-2">
              <Logo size="md" showText={true} />
            </div>
            <p className="font-['Satoshi'] text-sm text-base-content/70 leading-relaxed">
              Empowering citizens to report, track, and resolve infrastructure issues.
              Building better communities together.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-base-200 hover:bg-primary flex items-center justify-center transition-colors group"
              >
                <FiFacebook className="text-base-content group-hover:text-primary-content transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-base-200 hover:bg-primary flex items-center justify-center transition-colors group"
              >
                <FaXTwitter className="text-base-content group-hover:text-primary-content transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-base-200 hover:bg-primary flex items-center justify-center transition-colors group"
              >
                <FiLinkedin className="text-base-content group-hover:text-primary-content transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-base-200 hover:bg-primary flex items-center justify-center transition-colors group"
              >
                <FiGithub className="text-base-content group-hover:text-primary-content transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-['Satoshi'] font-bold text-base-content text-sm mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allissues"
                  className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  All Issues
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutUs"
                  className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-['Satoshi'] font-bold text-base-content text-sm mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/help"
                  className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/community-guidelines"
                  className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                >
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-['Satoshi'] font-bold text-base-content text-sm mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FiMail className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-['Satoshi'] text-xs text-base-content/50">Email</p>
                  <a
                    href="mailto:support@civix.com"
                    className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                  >
                    support@civix.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-['Satoshi'] text-xs text-base-content/50">Phone</p>
                  <a
                    href="tel:+8801234567890"
                    className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
                  >
                    +880 123 456 7890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-['Satoshi'] text-xs text-base-content/50">Address</p>
                  <p className="font-['Satoshi'] text-sm text-base-content/70">
                    Kafrul, Dhaka Division<br />Bangladesh
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-['Satoshi'] text-sm text-base-content/70 text-center sm:text-left">
              © {currentYear} Civix. All rights reserved. Built with  for better communities.
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/sitemap"
                className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
              >
                Sitemap
              </Link>
              <Link
                to="/accessibility"
                className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
              >
                Accessibility
              </Link>
              <Link
                to="/cookies"
                className="font-['Satoshi'] text-sm text-base-content/70 hover:text-primary transition-colors"
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