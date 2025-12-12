import React from 'react';
import { useQuery } from '@tanstack/react-query';
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
import ChartWrapper from '../../Shared/ChartWrapper';

const AdminCharts = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/admin/stats');
      return res.data;
    },
  });

  const COLORS = ['#238ae9', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  const statusData = [
    { name: 'Pending', value: stats.pendingIssues || 0 },
    { name: 'In Progress', value: stats.inProgressIssues || 0 },
    { name: 'Resolved', value: stats.resolvedIssues || 0 },
    { name: 'Rejected', value: stats.rejectedIssues || 0 },
  ];

  const categoryData = stats.categoryBreakdown || [];
  const monthlyData = stats.monthlyData || [];
  const paymentData = stats.paymentBreakdown || [];

  return (
    <div className="space-y-6">
      {/* Issue Status Distribution */}
      <ChartWrapper
        type="pie"
        data={statusData}
        dataKey="value"
        xKey="name"
        title="Issues by Status"
        height={350}
      >
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
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

      {/* Category Distribution */}
      {categoryData.length > 0 && (
        <ChartWrapper
          type="bar"
          data={categoryData}
          dataKey="count"
          xKey="category"
          title="Issues by Category"
          height={350}
        >
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#238ae9" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ChartWrapper>
      )}

      {/* Monthly Trends */}
      {monthlyData.length > 0 && (
        <ChartWrapper
          type="line"
          data={monthlyData}
          dataKey="count"
          xKey="month"
          title="Monthly Issue Trends"
          height={350}
        >
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#238ae9"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ChartWrapper>
      )}

      {/* Payment Breakdown */}
      {paymentData.length > 0 && (
        <ChartWrapper
          type="pie"
          data={paymentData}
          dataKey="amount"
          xKey="type"
          title="Revenue by Payment Type"
          height={350}
        >
          <PieChart>
            <Pie
              data={paymentData}
              dataKey="amount"
              nameKey="type"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {paymentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ChartWrapper>
      )}
    </div>
  );
};

export default AdminCharts;

