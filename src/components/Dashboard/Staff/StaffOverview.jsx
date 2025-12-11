import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiFileText, FiCheckCircle, FiClock, FiList } from 'react-icons/fi';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import StatCard from '../Shared/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StaffOverview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // get staff stats
  const { data: stats, isLoading } = useQuery({
    queryKey: ['staffStats', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/staff/${user.email}/stats`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  // get assigned issues for today's tasks
  const { data: assignedIssues = [] } = useQuery({
    queryKey: ['assignedIssues', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/staff/${user.email}/assigned-issues`);
      return res.data.data || [];
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  const statsData = stats || {};
  const assignedCount = statsData.assignedIssues || 0;
  const resolvedCount = statsData.resolvedIssues || 0;
  const pendingCount = statsData.pendingIssues || 0;
  const inProgressCount = statsData.inProgressIssues || 0;

  // today's tasks - issues that are pending or in-progress
  const todaysTasks = assignedIssues.filter(issue => 
    issue.status === 'pending' || issue.status === 'in-progress' || issue.status === 'working'
  ).length;

  // chart data
  const chartData = [
    { name: 'Pending', count: pendingCount },
    { name: 'In Progress', count: inProgressCount },
    { name: 'Resolved', count: resolvedCount },
  ];

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-2">
          Staff Dashboard
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
          Overview of your assigned issues and work progress
        </p>
      </div>

      {/* stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Assigned Issues"
          value={assignedCount}
          icon={<FiList />}
          color="blue"
        />
        <StatCard
          title="Resolved Issues"
          value={resolvedCount}
          icon={<FiCheckCircle />}
          color="green"
        />
        <StatCard
          title="Today's Tasks"
          value={todaysTasks}
          icon={<FiClock />}
          color="yellow"
        />
        <StatCard
          title="In Progress"
          value={inProgressCount}
          icon={<FiFileText />}
          color="purple"
        />
      </div>

      {/* chart section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
            Issues Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#238ae9" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* recent assigned issues */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
            Recent Assigned Issues
          </h3>
          {assignedIssues.length > 0 ? (
            <div className="space-y-3">
              {assignedIssues.slice(0, 5).map((issue) => (
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
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8 font-['Satoshi']">
              No assigned issues yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffOverview;
