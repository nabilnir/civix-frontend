import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { 
  FiFileText, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiUsers, 
  FiDollarSign,
  FiTrendingUp,
  FiArrowRight,
  FiEye
} from 'react-icons/fi';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { formatDate } from '../../../Utils/formatDate';

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch dashboard stats
  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/admin/stats');
      return res.data.data || {};
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fetch latest data
  const { data: latestData = {}, isLoading: latestLoading } = useQuery({
    queryKey: ['adminLatest'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/admin/latest');
      return res.data.data || {};
    },
  });

  // Fetch payment stats for charts
  const { data: paymentStats = {} } = useQuery({
    queryKey: ['paymentStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/payments/stats');
      return res.data.data || {};
    },
  });

  if (statsLoading || latestLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  const { issues = {}, users = {}, staff = 0, payments = {} } = stats;
  const { latestIssues = [], latestPayments = [], latestUsers = [] } = latestData;

  // Chart data for issue status
  const issueStatusData = [
    { name: 'Pending', value: issues.pending || 0, color: '#f59e0b' },
    { name: 'In Progress', value: issues.inProgress || 0, color: '#238ae9' },
    { name: 'Resolved', value: issues.resolved || 0, color: '#10b981' },
    { name: 'Rejected', value: issues.rejected || 0, color: '#ef4444' },
  ];

  // Chart data for payments by month
  const paymentsByMonth = paymentStats.paymentsByMonth || {};
  const monthlyPaymentData = Object.entries(paymentsByMonth).map(([month, amount]) => ({
    month: month.substring(0, 3),
    amount: amount,
  }));

  // Calculate percentages for issue status
  const totalIssuesCount = issues.total || 1;
  const resolvedPercentage = ((issues.resolved || 0) / totalIssuesCount * 100).toFixed(1);
  const pendingPercentage = ((issues.pending || 0) / totalIssuesCount * 100).toFixed(1);

  const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-2">
            Dashboard Overview
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
            Welcome back! Here's what's happening with your system today.
        </p>
        </div>
        <div className="text-sm text-gray-500 font-['Satoshi']">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Stats Cards - Issue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Issues */}
        <div className="bg-gradient-to-br from-[#238ae9] to-[#1e7acc] rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <FiFileText className="text-2xl" />
            </div>
            <span className="text-white/80 text-sm font-['Satoshi'] font-medium">Total</span>
          </div>
          <h3 className="text-3xl font-bold font-['Satoshi'] mb-1">{issues.total || 0}</h3>
          <p className="text-white/80 text-sm font-['Satoshi']">Total Issues Reported</p>
        </div>

        {/* Pending Issues */}
        <div className="bg-white rounded-xl p-6 border-2 border-[#238ae9]/20 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#238ae9]/10 rounded-lg flex items-center justify-center">
              <FiClock className="text-2xl text-[#238ae9]" />
            </div>
            <span className="text-[#238ae9] text-sm font-['Satoshi'] font-medium">{pendingPercentage}%</span>
          </div>
          <h3 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-1">{issues.pending || 0}</h3>
          <p className="text-gray-600 text-sm font-['Satoshi']">Pending Issues</p>
        </div>

        {/* Resolved Issues */}
        <div className="bg-white rounded-xl p-6 border-2 border-green-500/20 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FiCheckCircle className="text-2xl text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-['Satoshi'] font-medium">{resolvedPercentage}%</span>
          </div>
          <h3 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-1">{issues.resolved || 0}</h3>
          <p className="text-gray-600 text-sm font-['Satoshi']">Resolved Issues</p>
        </div>

        {/* Rejected Issues */}
        <div className="bg-white rounded-xl p-6 border-2 border-red-500/20 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FiXCircle className="text-2xl text-red-600" />
            </div>
            <span className="text-red-600 text-sm font-['Satoshi'] font-medium">
              {((issues.rejected || 0) / totalIssuesCount * 100).toFixed(1)}%
            </span>
          </div>
          <h3 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-1">{issues.rejected || 0}</h3>
          <p className="text-gray-600 text-sm font-['Satoshi']">Rejected Issues</p>
        </div>
      </div>

      {/* Stats Cards - Users & Payments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#238ae9]/10 rounded-lg flex items-center justify-center">
              <FiUsers className="text-2xl text-[#238ae9]" />
            </div>
            <FiTrendingUp className="text-[#238ae9]" />
          </div>
          <h3 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-1">{users.total || 0}</h3>
          <p className="text-gray-600 text-sm font-['Satoshi']">Total Citizens</p>
        </div>

        {/* Premium Users */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#238ae9]/10 rounded-lg flex items-center justify-center">
              <FiUsers className="text-2xl text-[#238ae9]" />
            </div>
            <span className="text-xs font-['Satoshi'] font-semibold text-[#238ae9] bg-[#238ae9]/10 px-2 py-1 rounded">
              Premium
            </span>
          </div>
          <h3 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-1">{users.premium || 0}</h3>
          <p className="text-gray-600 text-sm font-['Satoshi']">Premium Members</p>
        </div>

        {/* Total Staff */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#238ae9]/10 rounded-lg flex items-center justify-center">
              <FiUsers className="text-2xl text-[#238ae9]" />
            </div>
            <span className="text-xs font-['Satoshi'] font-semibold text-[#238ae9] bg-[#238ae9]/10 px-2 py-1 rounded">
              Staff
            </span>
          </div>
          <h3 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-1">{staff || 0}</h3>
          <p className="text-gray-600 text-sm font-['Satoshi']">Active Staff</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-gradient-to-br from-[#238ae9] to-[#1e7acc] rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <FiDollarSign className="text-2xl" />
            </div>
            <FiTrendingUp className="text-white/80" />
          </div>
          <h3 className="text-3xl font-bold font-['Satoshi'] mb-1">{payments.revenue || 0} tk</h3>
          <p className="text-white/80 text-sm font-['Satoshi']">Total Revenue</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issue Status Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#242424] font-['Satoshi']">Issue Status Distribution</h3>
            <Link 
              to="/admin-dashboard/all-issues"
              className="text-sm text-[#238ae9] font-['Satoshi'] font-medium hover:underline flex items-center gap-1"
            >
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={issueStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {issueStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Payments Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#242424] font-['Satoshi']">Monthly Revenue</h3>
            <Link 
              to="/admin-dashboard/payments"
              className="text-sm text-[#238ae9] font-['Satoshi'] font-medium hover:underline flex items-center gap-1"
            >
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {monthlyPaymentData.length > 0 ? (
              <BarChart data={monthlyPaymentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#238ae9" radius={[8, 8, 0, 0]} />
              </BarChart>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p className="font-['Satoshi']">No payment data available</p>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Latest Data Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Latest Issues */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#242424] font-['Satoshi']">Latest Issues</h3>
            <Link 
              to="/admin-dashboard/all-issues"
              className="text-sm text-[#238ae9] font-['Satoshi'] font-medium hover:underline flex items-center gap-1"
            >
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {latestIssues.length > 0 ? (
              latestIssues.map((issue) => (
                <Link
                  key={issue._id}
                  to={`/issue/${issue._id}`}
                  className="block p-3 bg-[#f4f6f8] rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-['Satoshi'] font-semibold text-sm text-[#242424] truncate group-hover:text-[#238ae9] transition-colors">
                      {issue.title}
                    </h4>
                      <p className="font-['Satoshi'] text-xs text-gray-600 mt-1">{issue.category}</p>
                      <p className="font-['Satoshi'] text-xs text-gray-500 mt-1">
                        {formatDate(issue.createdAt, 'relative')}
                      </p>
                  </div>
                    <span className={`px-2 py-1 rounded text-xs font-['Satoshi'] font-semibold flex-shrink-0 ${
                    issue.status === 'resolved' ? 'bg-green-100 text-green-700' :
                    issue.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      issue.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4 font-['Satoshi']">No issues yet</p>
            )}
          </div>
        </div>

        {/* Latest Payments */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#242424] font-['Satoshi']">Latest Payments</h3>
            <Link 
              to="/admin-dashboard/payments"
              className="text-sm text-[#238ae9] font-['Satoshi'] font-medium hover:underline flex items-center gap-1"
            >
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {latestPayments.length > 0 ? (
              latestPayments.map((payment) => (
                <div key={payment._id} className="p-3 bg-[#f4f6f8] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-['Satoshi'] font-semibold text-sm text-[#242424] truncate">
                        {payment.userName || 'Unknown'}
                    </p>
                    <p className="font-['Satoshi'] text-xs text-gray-600">
                        {payment.type === 'subscription' ? 'Premium Subscription' : 'Issue Boost'}
                      </p>
                    </div>
                    <p className="font-['Satoshi'] font-bold text-[#242424] text-sm">
                      {payment.amount} tk
                    </p>
                  </div>
                  <p className="font-['Satoshi'] text-xs text-gray-500">
                    {formatDate(payment.createdAt, 'relative')}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4 font-['Satoshi']">No payments yet</p>
            )}
        </div>
      </div>

      {/* Latest Users */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#242424] font-['Satoshi']">Latest Users</h3>
            <Link 
              to="/admin-dashboard/manage-users"
              className="text-sm text-[#238ae9] font-['Satoshi'] font-medium hover:underline flex items-center gap-1"
            >
              View All <FiArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
          {latestUsers.length > 0 ? (
            latestUsers.map((user) => (
                <Link
                  key={user._id}
                  to={`/admin-dashboard/manage-users`}
                  className="flex items-center gap-3 p-3 bg-[#f4f6f8] rounded-lg hover:bg-gray-100 transition-colors group"
                >
                <img
                  src={user.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
                  alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
                <div className="flex-1 min-w-0">
                    <p className="font-['Satoshi'] font-semibold text-sm text-[#242424] truncate group-hover:text-[#238ae9] transition-colors">
                    {user.name}
                  </p>
                  <p className="font-['Satoshi'] text-xs text-gray-600 truncate">
                    {user.email}
                  </p>
                </div>
                {user.isPremium && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold flex-shrink-0">
                    Premium
                  </span>
                )}
                </Link>
            ))
          ) : (
              <p className="text-gray-500 text-center py-4 font-['Satoshi']">No users yet</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
