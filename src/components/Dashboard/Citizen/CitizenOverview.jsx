import { useQuery, useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiFileText, FiClock, FiCheckCircle, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import StatCard from '../Shared/StatCard';
import IssueCharts from './IssueCharts';

const CitizenOverview = () => {
  const { user } = useAuth();
  const { isPremium } = useRole();
  const axiosSecure = useAxiosSecure();

  // Create Stripe checkout session mutation
  const createCheckoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post('/api/payments/create-checkout-session', {
        amount: 1000,
        type: 'premium_subscription',
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Failed to create checkout session');
      }
    },
    onError: (error) => {
      console.error('Checkout session error:', error);
      toast.error(error.response?.data?.message || 'Failed to create checkout session. Please try again.');
    },
  });

  // Fetch user's issues
  const { data: issuesData, isLoading } = useQuery({
    queryKey: ['userIssues', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      try {
        const response = await axiosSecure.get(`/api/issues/user/${user.email}`);
        return response.data.data || [];
      } catch (error) {
        console.error('Error fetching user issues:', error);
        return [];
      }
    },
    enabled: !!user?.email
  });

  // Fetch user stats
  const { data: statsData } = useQuery({
    queryKey: ['userStats', user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      try {
        const response = await axiosSecure.get(`/api/users/${user.email}/stats`);
        return response.data.data || {};
      } catch (error) {
        console.error('Error fetching user stats:', error);
        return {};
      }
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
        <h1 className="text-3xl font-bold text-base-content font-['Satoshi'] mb-2">
          Welcome back, {user?.displayName?.split(' ')[0]}! 👋
        </h1>
        <p className="text-base-content/70 font-['Satoshi']">
          Here's what's happening with your reported issues today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
        <StatCard
          title="Total Payments"
          value={Stats.totalPayments || 0}
          icon={<FiDollarSign />}
          color="indigo"
        />
      </div>

      {/* Charts - Only for Premium Users */}
      {isPremium ? (
        <IssueCharts issues={issues} />
      ) : (
        <div className="bg-base-100 rounded-xl p-8 shadow-sm border border-base-300 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-base-content font-['Satoshi'] mb-2">
              Premium Analytics
            </h3>
            <p className="text-base-content/70 font-['Satoshi'] mb-4">
              Upgrade to premium to unlock detailed analytics and insights about your reported issues.
            </p>
            <p className="text-sm text-base-content/50 font-['Satoshi']">
              Get access to status distribution charts, category breakdowns, monthly trends, and more!
            </p>
            <button
              onClick={() => createCheckoutMutation.mutate()}
              disabled={createCheckoutMutation.isPending}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-['Satoshi'] font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
            >
              {createCheckoutMutation.isPending ? 'Processing...' : 'Upgrade Now'}
            </button>
          </div>
        </div>
      )}

      {/* Recent Issues */}
      <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
        <h3 className="text-lg font-bold text-base-content font-['Satoshi'] mb-4">
          Recent Issues
        </h3>
        {issues.slice(0, 5).length > 0 ? (
          <div className="space-y-3">
            {issues.slice(0, 5).map(issue => (
              <div key={issue._id} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-['Satoshi'] font-semibold text-base-content">{issue.title}</h4>
                  <p className="font-['Satoshi'] text-sm text-base-content/70">{issue.category}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-['Satoshi'] font-semibold ${issue.status === 'resolved' ? 'bg-success/10 text-success' :
                  issue.status === 'pending' ? 'bg-warning/10 text-warning' :
                    'bg-info/10 text-info'
                  }`}>
                  {issue.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base-content/50 text-center py-8 font-['Satoshi']">
            No issues reported yet. Start by reporting your first issue!
          </p>
        )}
      </div>
    </div>
  );
}

export default CitizenOverview;