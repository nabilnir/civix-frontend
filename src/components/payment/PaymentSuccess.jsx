import React from 'react';
import { Link, useNavigate } from 'react-router';
import { FiCheckCircle, FiHome, FiArrowRight, FiDownload } from 'react-icons/fi';
import { formatDate } from '../../Utils/formatDate';
import { generateInvoicePDF } from '../../Utils/pdfGenerator';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const PaymentSuccess = ({ payment, type }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDownloadInvoice = async () => {
    if (!payment) {
      toast.error('Payment information not available');
      return;
    }
    try {
      await generateInvoicePDF(payment, user);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Failed to generate invoice:', error);
      toast.error('Failed to download invoice. Please try again.');
    }
  };

  const getSuccessMessage = () => {
    switch (type) {
      case 'premium_subscription':
        return {
          title: 'Welcome to Premium!',
          message: 'Your premium subscription has been activated successfully.',
          benefits: [
            'Unlimited issue reports',
            'Priority support',
            'Free issue boosting',
            'Advanced analytics',
          ],
        };
      case 'boost':
        return {
          title: 'Issue Boosted Successfully!',
          message: 'Your issue has been boosted to High Priority.',
          benefits: [
            'Higher visibility in issue lists',
            'Faster staff assignment',
            'Priority status badge displayed',
          ],
        };
      default:
        return {
          title: 'Payment Successful!',
          message: 'Your payment has been processed successfully.',
          benefits: [],
        };
    }
  };

  const successInfo = getSuccessMessage();

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <FiCheckCircle className="text-green-600" size={48} />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-[#242424] font-['Satoshi'] mb-3">
          {successInfo.title}
        </h1>
        <p className="text-gray-600 font-['Satoshi'] mb-6">{successInfo.message}</p>

        {/* Payment Details */}
        {payment && (
          <div className="bg-[#f4f6f8] rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2 text-sm font-['Satoshi']">
              <div className="flex flex-col gap-1">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-semibold text-[#242424] break-all text-xs">
                  {payment.transactionId || payment._id?.slice(-8)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-semibold text-green-600">
                  {payment.amount} BDT
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold text-[#242424]">
                  {formatDate(payment.createdAt, 'datetime')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-green-600">Success</span>
              </div>
            </div>
          </div>
        )}

        {/* Benefits List */}
        {successInfo.benefits.length > 0 && (
          <div className="mb-6 text-left">
            <h3 className="font-semibold text-[#242424] font-['Satoshi'] mb-3">
              What's Next:
            </h3>
            <ul className="space-y-2">
              {successInfo.benefits.map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700 font-['Satoshi']"
                >
                  <FiCheckCircle className="text-green-600 flex-shrink-0" size={16} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {type === 'premium_subscription' ? (
            <Link
              to="/dashboard/report-issue"
              className="w-full px-6 py-3 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors flex items-center justify-center gap-2"
            >
              Report an Issue
              <FiArrowRight size={18} />
            </Link>
          ) : type === 'boost' ? (
            <Link
              to="/dashboard/my-issues"
              className="w-full px-6 py-3 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors flex items-center justify-center gap-2"
            >
              View My Issues
              <FiArrowRight size={18} />
            </Link>
          ) : null}

          {/* Download Invoice Button */}
          {payment && (
            <button
              onClick={handleDownloadInvoice}
              className="w-full px-6 py-3 bg-white border-2 border-[#238ae9] text-[#238ae9] rounded-lg font-['Satoshi'] font-semibold hover:bg-[#238ae9] hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <FiDownload size={18} />
              Download Invoice
            </button>
          )}

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

export default PaymentSuccess;

