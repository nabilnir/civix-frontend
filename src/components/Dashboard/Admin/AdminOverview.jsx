import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiFileText, FiClock, FiCheckCircle, FiXCircle, FiUsers, FiDollarSign } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import StatCard from '../Shared/StatCard';

const AdminOverview = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch dashboard stats
  const { data: stats = {}, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/admin/stats');
      return res.data.data || {};
    },
  });

  // Fetch latest data
  const { data: latestData = {}, isLoading: latestLoading } = useQuery({
    queryKey: ['adminLatest'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/admin/latest');
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
          Overview of system statistics and recent activities
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Issues"
          value={issues.total || 0}
          icon={<FiFileText />}
          color="blue"
        />
        <StatCard
          title="Pending Issues"
          value={issues.pending || 0}
          icon={<FiClock />}
          color="yellow"
        />
        <StatCard
          title="Resolved Issues"
          value={issues.resolved || 0}
          icon={<FiCheckCircle />}
          color="green"
        />
        <StatCard
          title="Rejected Issues"
          value={issues.rejected || 0}
          icon={<FiXCircle />}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={users.total || 0}
          icon={<FiUsers />}
          color="purple"
        />
        <StatCard
          title="Premium Users"
          value={users.premium || 0}
          icon={<FiUsers />}
          color="amber"
        />
        <StatCard
          title="Total Staff"
          value={staff || 0}
          icon={<FiUsers />}
          color="indigo"
        />
        <StatCard
          title="Total Revenue"
          value={`${payments.revenue || 0} tk`}
          icon={<FiDollarSign />}
          color="green"
        />
      </div>

      {/* Charts and Latest Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Latest Issues */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
            Latest Issues
          </h3>
          <div className="space-y-3">
            {latestIssues.length > 0 ? (
              latestIssues.map((issue) => (
                <div key={issue._id} className="flex items-center justify-between p-3 bg-[#f4f6f8] rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-['Satoshi'] font-semibold text-sm text-[#242424] truncate">
                      {issue.title}
                    </h4>
                    <p className="font-['Satoshi'] text-xs text-gray-600">{issue.category}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-['Satoshi'] font-semibold ${
                    issue.status === 'resolved' ? 'bg-green-100 text-green-700' :
                    issue.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {issue.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4 font-['Satoshi']">No issues yet</p>
            )}
          </div>
        </div>

        {/* Latest Payments */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
            Latest Payments
          </h3>
          <div className="space-y-3">
            {latestPayments.length > 0 ? (
              latestPayments.map((payment) => (
                <div key={payment._id} className="flex items-center justify-between p-3 bg-[#f4f6f8] rounded-lg">
                  <div>
                    <p className="font-['Satoshi'] font-semibold text-sm text-[#242424]">
                      {payment.userName}
                    </p>
                    <p className="font-['Satoshi'] text-xs text-gray-600">
                      {payment.type === 'subscription' ? 'Premium' : 'Boost'}
                    </p>
                  </div>
                  <p className="font-['Satoshi'] font-bold text-[#242424]">
                    {payment.amount} tk
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4 font-['Satoshi']">No payments yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Latest Users */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
          Latest Registered Users
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestUsers.length > 0 ? (
            latestUsers.map((user) => (
              <div key={user._id} className="flex items-center gap-3 p-3 bg-[#f4f6f8] rounded-lg">
                <img
                  src={user.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-['Satoshi'] font-semibold text-sm text-[#242424] truncate">
                    {user.name}
                  </p>
                  <p className="font-['Satoshi'] text-xs text-gray-600 truncate">
                    {user.email}
                  </p>
                </div>
                {user.isPremium && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">
                    Premium
                  </span>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4 font-['Satoshi'] col-span-full">
              No users yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;