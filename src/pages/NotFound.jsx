import React from 'react';
import { Link } from 'react-router';
import { FiHome, FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center">
            <FiAlertTriangle className="text-red-600" size={64} />
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-9xl font-bold text-[#242424] font-['Satoshi'] mb-4">
          404
        </h1>

        {/* Error Message */}
        <h2 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 font-['Satoshi'] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors"
          >
            <FiHome size={20} />
            Go to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-[#242424] rounded-lg font-['Satoshi'] font-semibold hover:bg-gray-50 transition-colors"
          >
            <FiArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600 font-['Satoshi'] mb-4">
            You might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/allissues"
              className="text-[#238ae9] hover:underline font-['Satoshi'] text-sm"
            >
              All Issues
            </Link>
            <Link
              to="/dashboard"
              className="text-[#238ae9] hover:underline font-['Satoshi'] text-sm"
            >
              Dashboard
            </Link>
            <Link
              to="/aboutUs"
              className="text-[#238ae9] hover:underline font-['Satoshi'] text-sm"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-[#238ae9] hover:underline font-['Satoshi'] text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

