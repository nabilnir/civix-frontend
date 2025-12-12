import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { FiFileText, FiClock, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';
import StatCard from '../Shared/StatCard';
import IssueCharts from './IssueCharts';

const CitizenOverview = () =>{
  const { user } = useAuth();

  // Fetch user's issues
  const { data: issuesData, isLoading } = useQuery({
    queryKey: ['userIssues', user?.email],
    queryFn: async () => {
      const token = localStorage.getItem('civix-token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/issues/user/${user.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    },
    enabled: !!user?.email
  });

  // Fetch user stats
  const { data: statsData } = useQuery({
    queryKey: ['userStats', user?.email],
    queryFn: async () => {
      const token = localStorage.getItem('civix-token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/${user.email}/stats`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.data;
    },
    enabled: !!user?.email
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  const issues = issuesData || [];
  const Stats = statsData || {};

  // Calculate statistics
  const totalIssues = issues.length;
  const pendingIssues = issues.filter(i => i.status === 'pending').length;
  const inProgressIssues = issues.filter(i => ['in-progress', 'working'].includes(i.status)).length;
  const resolvedIssues = issues.filter(i => i.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-2">
          Welcome back, {user?.displayName?.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
          Here's what's happening with your reported issues today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Issues"
          value={totalIssues}
          icon={<FiFileText />}
          color="blue"
        />
        <StatCard
          title="Pending"
          value={pendingIssues}
          icon={<FiClock />}
          color="yellow"
        />
        <StatCard
          title="In Progress"
          value={inProgressIssues}
          icon={<FiTrendingUp />}
          color="purple"
        />
        <StatCard
          title="Resolved"
          value={resolvedIssues}
          icon={<FiCheckCircle />}
          color="green"
        />
      </div>

      {/* Charts */}
      <IssueCharts issues={issues} />

      {/* Recent Issues */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-[#242424] font-['Satoshi'] mb-4">
          Recent Issues
        </h3>
        {issues.slice(0, 5).length > 0 ? (
          <div className="space-y-3">
            {issues.slice(0, 5).map(issue => (
              <div key={issue._id} className="flex items-center justify-between p-4 bg-[#f4f6f8] rounded-lg">
                <div className="flex-1">
                  <h4 className="font-['Satoshi'] font-semibold text-[#242424]">{issue.title}</h4>
                  <p className="font-['Satoshi'] text-sm text-gray-600">{issue.category}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-['Satoshi'] font-semibold ${
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
            No issues reported yet. Start by reporting your first issue!
          </p>
        )}
      </div>
    </div>
  );
}

export default CitizenOverview;