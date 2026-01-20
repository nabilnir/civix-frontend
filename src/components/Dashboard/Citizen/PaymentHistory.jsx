import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiDownload, FiFilter, FiCreditCard } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { generateInvoicePDF } from '../../../Utils/pdfGenerator';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [typeFilter, setTypeFilter] = useState('');

  // Fetch payment history
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['paymentHistory', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/payments/user/${user.email}`);
      return res.data.data || [];
    },
    enabled: !!user?.email,
  });

  // Filter payments
  const filteredPayments = payments.filter((payment) => {
    if (!typeFilter) return true;
    return payment.type === typeFilter;
  });

  // Calculate totals
  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);

  const handleDownloadInvoice = async (payment) => {
    try {
      await generateInvoicePDF(payment, user);
    } catch (error) {
      console.error('Failed to generate invoice:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-base-content font-['Satoshi'] mb-2">
            Payment History
          </h1>
          <p className="text-base-content/70 font-['Satoshi']">
            View all your transaction history
          </p>
        </div>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-[#238ae9] to-[#1e7acc] rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-['Satoshi'] text-sm opacity-90 mb-1">Total Spent</p>
            <p className="font-['Satoshi'] text-3xl font-bold">{totalAmount} tk</p>
          </div>
          <div className="bg-white/20 rounded-full p-4">
            <FiCreditCard className="text-3xl" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <FiFilter className="text-primary" />
            <span className="font-['Satoshi'] font-semibold text-sm text-base-content">Filter:</span>
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-base-300 bg-base-100 text-base-content rounded-lg font-['Satoshi'] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Payments</option>
            <option value="boost">Issue Boost</option>
            <option value="subscription">Premium Subscription</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      {filteredPayments.length > 0 ? (
        <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {filteredPayments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-base-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-['Satoshi'] text-sm text-base-content">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                      <p className="font-['Satoshi'] text-xs text-base-content/60">
                        {new Date(payment.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold font-['Satoshi'] ${payment.type === 'subscription'
                          ? 'bg-secondary/10 text-secondary'
                          : 'bg-warning/10 text-warning'
                        }`}>
                        {payment.type === 'subscription' ? 'Premium' : 'Boost'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-['Satoshi'] font-semibold text-base-content">
                        {payment.amount} tk
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-['Satoshi'] text-sm text-base-content/70">
                        {payment.invoiceId || 'N/A'}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1 bg-success/10 text-success rounded-full text-xs font-bold font-['Satoshi']">
                        {payment.status || 'Completed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDownloadInvoice(payment)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-content rounded-lg font-['Satoshi'] text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        <FiDownload /> Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-base-100 rounded-xl p-12 text-center shadow-sm border border-base-300">
          <FiCreditCard className="text-6xl text-base-content/30 mx-auto mb-4" />
          <p className="text-base-content/60 font-['Satoshi'] text-lg">
            No payment history found
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
