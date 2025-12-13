import React from 'react';
import { Link } from 'react-router';
import { FiXCircle, FiHome, FiArrowLeft } from 'react-icons/fi';

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Cancel Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <FiXCircle className="text-red-600" size={48} />
          </div>
        </div>

        {/* Cancel Message */}
        <h1 className="text-2xl font-bold text-[#242424] font-['Satoshi'] mb-3">
          Payment Cancelled
        </h1>
        <p className="text-gray-600 font-['Satoshi'] mb-6">
          Your payment was cancelled. No charges were made to your account.
        </p>

        {/* Info */}
        <div className="bg-[#f4f6f8] rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-700 font-['Satoshi']">
            If you experienced any issues during checkout, please try again or contact our support team for assistance.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/profile"
            className="w-full px-6 py-3 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors flex items-center justify-center gap-2"
          >
            <FiArrowLeft size={18} />
            Try Again
          </Link>

          <Link
            to="/"
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-['Satoshi'] font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <FiHome size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;

