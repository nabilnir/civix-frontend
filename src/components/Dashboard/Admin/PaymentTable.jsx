import React from 'react';
import { FiDollarSign, FiCalendar, FiUser, FiFileText, FiDownload } from 'react-icons/fi';
import { formatDate } from '../../../utils/formatDate';
import Badge from '../../Shared/Badge';
import EmptyState from '../../Shared/EmptyState';
import { generateInvoicePDF } from '../../../utils/pdfGenerator';

const PaymentTable = ({ payments = [], isLoading = false }) => {
  const handleDownloadInvoice = (payment, user) => {
    try {
      generateInvoicePDF(payment, user);
    } catch (error) {
      console.error('Failed to generate invoice:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <EmptyState
        message="No payments found"
        description="Payment records will appear here once transactions are made."
      />
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Transaction
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              User
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider font-['Satoshi']">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {payments.map((payment) => (
            <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FiFileText className="text-gray-400" size={16} />
                  <div>
                    <p className="font-['Satoshi'] font-semibold text-sm text-[#242424]">
                      {payment.transactionId || payment._id.slice(-8)}
                    </p>
                    <p className="font-['Satoshi'] text-xs text-gray-500">
                      {payment.paymentMethod || 'N/A'}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FiUser className="text-gray-400" size={14} />
                  <div>
                    <p className="font-['Satoshi'] text-sm text-[#242424]">
                      {payment.userName || 'N/A'}
                    </p>
                    <p className="font-['Satoshi'] text-xs text-gray-500">
                      {payment.userEmail || 'N/A'}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge
                  variant={
                    payment.type === 'premium_subscription'
                      ? 'warning'
                      : payment.type === 'boost'
                      ? 'info'
                      : 'default'
                  }
                  size="sm"
                >
                  {payment.type === 'premium_subscription'
                    ? 'Premium'
                    : payment.type === 'boost'
                    ? 'Boost'
                    : payment.type}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <FiDollarSign className="text-green-600" size={14} />
                  <span className="font-['Satoshi'] font-bold text-sm text-green-600">
                    {payment.amount || 0}
                  </span>
                  <span className="font-['Satoshi'] text-xs text-gray-500">BDT</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-gray-400" size={14} />
                  <span className="font-['Satoshi'] text-sm text-gray-600">
                    {formatDate(payment.createdAt, 'datetime')}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge
                  variant={payment.status === 'success' ? 'success' : 'danger'}
                  size="sm"
                >
                  {payment.status || 'pending'}
                </Badge>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() =>
                    handleDownloadInvoice(payment, {
                      name: payment.userName,
                      email: payment.userEmail,
                    })
                  }
                  className="p-2 text-[#238ae9] hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label="Download invoice"
                >
                  <FiDownload size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;

