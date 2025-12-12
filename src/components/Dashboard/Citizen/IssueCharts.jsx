import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';

const IssueCharts = ({ issues = [] }) => {
  // Calculate status distribution
  const statusCounts = {
    pending: 0,
    'in-progress': 0,
    working: 0,
    resolved: 0,
    closed: 0,
    rejected: 0,
  };

  issues.forEach((issue) => {
    const status = issue.status?.toLowerCase() || 'pending';
    if (Object.prototype.hasOwnProperty.call(statusCounts, status)) {
      statusCounts[status]++;
    }
  });

  const statusData = [
    { name: 'Pending', value: statusCounts.pending, color: '#f59e0b' },
    { name: 'In Progress', value: statusCounts['in-progress'], color: '#3b82f6' },
    { name: 'Working', value: statusCounts.working, color: '#8b5cf6' },
    { name: 'Resolved', value: statusCounts.resolved, color: '#10b981' },
    { name: 'Closed', value: statusCounts.closed, color: '#6b7280' },
  ].filter((item) => item.value > 0);

  // Calculate category distribution
  const categoryCounts = {};
  issues.forEach((issue) => {
    const category = issue.category || 'Other';
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });

  const categoryData = Object.entries(categoryCounts)
    .map(([category, count]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      count,
    }))
    .sort((a, b) => b.count - a.count);

  // Calculate monthly trend (last 6 months)
  const monthlyData = {};
  const now = new Date();
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return date.toISOString().slice(0, 7); // YYYY-MM format
  }).reverse();

  issues.forEach((issue) => {
    const issueDate = new Date(issue.date || issue.createdAt);
    const monthKey = issueDate.toISOString().slice(0, 7);
    if (last6Months.includes(monthKey)) {
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + 1;
    }
  });

  const trendData = last6Months.map((month) => {
    const date = new Date(month + '-01');
    return {
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      issues: monthlyData[month] || 0,
    };
  });

  // Priority distribution
  const priorityCounts = {
    High: 0,
    Normal: 0,
  };

  issues.forEach((issue) => {
    const priority = issue.priority || 'Normal';
    priorityCounts[priority] = (priorityCounts[priority] || 0) + 1;
  });

  const priorityData = [
    { name: 'High', value: priorityCounts.High, color: '#ef4444' },
    { name: 'Normal', value: priorityCounts.Normal, color: '#238ae9' },
  ].filter((item) => item.value > 0);

  if (issues.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 font-['Satoshi']">
          No data available for charts. Report your first issue to see analytics!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Distribution Pie Chart */}
      {statusData.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
            Status Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) =>
                  `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Category Bar Chart */}
      {categoryData.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
            Issues by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#238ae9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Monthly Trend Line Chart */}
      {trendData.some((d) => d.issues > 0) && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
            Monthly Trend (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="issues"
                stroke="#238ae9"
                strokeWidth={2}
                name="Issues Reported"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Priority Distribution */}
      {priorityData.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
            Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={priorityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) =>
                  `${name}: ${value} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {priorityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default IssueCharts;

