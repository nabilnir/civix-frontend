import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import ChartWrapper from '../../Shared/ChartWrapper';

const StaffCharts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['staffStats', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/staff/${user?.email}/stats`);
      return res.data.data || {};
    },
    enabled: !!user?.email,
  });

  const statusData = [
    { name: 'Pending', value: stats.pendingIssues || 0 },
    { name: 'In Progress', value: stats.inProgressIssues || 0 },
    { name: 'Resolved', value: stats.resolvedIssues || 0 },
  ];

  const categoryData = stats.categoryBreakdown || [];

  const COLORS = ['#238ae9', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status Distribution Chart */}
      <ChartWrapper
        type="pie"
        data={statusData}
        dataKey="value"
        xKey="name"
        title="Issues by Status"
        height={300}
      >
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {statusData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ChartWrapper>

      {/* Category Distribution Chart */}
      {categoryData.length > 0 && (
        <ChartWrapper
          type="bar"
          data={categoryData}
          dataKey="count"
          xKey="category"
          title="Issues by Category"
          height={300}
        >
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#238ae9" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartWrapper>
      )}
    </div>
  );
};

export default StaffCharts;

