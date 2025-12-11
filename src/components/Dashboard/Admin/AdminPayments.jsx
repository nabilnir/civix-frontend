import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiDownload, FiFilter, FiDollarSign } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { generateInvoicePDF } from '../../../Utils/pdfGenerator';
import useAuth from '../../../hooks/useAuth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminPayments = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [typeFilter, setTypeFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');

  // get all payments
  const { data: paymentsData, isLoading } = useQuery({
    queryKey: ['adminPayments', typeFilter, monthFilter],
    queryFn: async () => {
      const params = {};
      if (typeFilter) params.type = typeFilter;
      if (monthFilter) params.month = monthFilter;
      
      const res = await axiosSecure.get('/api/payments', { params });
      return res.data.data || {};
    },
  });

  // get payment stats
  const { data: statsData } = useQuery({
    queryKey: ['paymentStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/payments/stats');
      return res.data.data || {};
    },
  });

  const payments = paymentsData?.payments || [];
  const totalRevenue = paymentsData?.totalRevenue || 0;
  const stats = statsData || {};

  // chart data by month
  const chartData = stats.paymentsByMonth 
    ? Object.entries(stats.paymentsByMonth).map(([month, amount]) => ({
        month,
        amount,
      }))
    : [];

  const handleDownloadInvoice = (payment) => {
    // create a mock user object for pdf generator
    const mockUser = {
      displayName: payment.userName,
      email: payment.userEmail,
    };
    generateInvoicePDF(payment, mockUser);
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
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-2">
          Payments Management
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
          View and manage all payment transactions
        </p>
      </div>

      {/* stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-[#238ae9] to-[#1e7acc] rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-['Satoshi'] text-sm opacity-90 mb-1">Total Revenue</p>
              <p className="font-['Satoshi'] text-3xl font-bold">{totalRevenue} tk</p>
            </div>
            <div className="bg-white/20 rounded-full p-4">
              <FiDollarSign className="text-3xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="font-['Satoshi'] text-sm text-gray-600 mb-1">Total Payments</p>
          <p className="font-['Satoshi'] text-3xl font-bold text-[#242424]">
            {stats.totalPayments || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="font-['Satoshi'] text-sm text-gray-600 mb-1">Boost Payments</p>
          <p className="font-['Satoshi'] text-3xl font-bold text-[#242424]">
            {stats.boostPayments || 0}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <p className="font-['Satoshi'] text-sm text-gray-600 mb-1">Subscriptions</p>
          <p className="font-['Satoshi'] text-3xl font-bold text-[#242424]">
            {stats.subscriptionPayments || 0}
          </p>
        </div>
      </div>

      {/* chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
            Revenue by Month
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#238ae9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <FiFilter className="text-[#238ae9]" />
            <span className="font-['Satoshi'] font-semibold text-sm">Filters:</span>
          </div>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] text-sm focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
          >
            <option value="">All Types</option>
            <option value="boost">Issue Boost</option>
            <option value="subscription">Premium Subscription</option>
          </select>

          <select
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] text-sm focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
          >
            <option value="">All Months</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>

      {/* payments table */}
      {payments.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f4f6f8]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Transaction ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Invoice ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-['Satoshi'] text-sm text-[#242424]">
                        {new Date(payment.createdAt).toLocaleDateString()}
                      </p>
                      <p className="font-['Satoshi'] text-xs text-gray-500">
                        {new Date(payment.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-['Satoshi'] font-semibold text-sm text-[#242424]">
                          {payment.userName}
                        </p>
                        <p className="font-['Satoshi'] text-xs text-gray-500">
                          {payment.userEmail}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold font-['Satoshi'] ${
                        payment.type === 'subscription'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {payment.type === 'subscription' ? 'Premium' : 'Boost'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-['Satoshi'] font-semibold text-[#242424]">
                        {payment.amount} tk
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-['Satoshi'] text-sm text-gray-600">
                        {payment.transactionId}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-['Satoshi'] text-sm text-gray-600">
                        {payment.invoiceId || 'N/A'}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDownloadInvoice(payment)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] text-sm font-medium hover:bg-[#1e7acc] transition-colors"
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
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <FiDollarSign className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-['Satoshi'] text-lg">
            No payment records found
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminPayments;
