import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FiClock, FiMapPin, FiTag, FiArrowRight } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import StatusBadge from '../../Issues/StatusBadge';
import EmptyState from '../../Shared/EmptyState';

const TodayTasks = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch assigned issues and filter for today's tasks
  const { data: assignedIssues = [], isLoading } = useQuery({
    queryKey: ['assignedIssues', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/staff/${user?.email}/assigned-issues`);
      return res.data.data || [];
    },
    enabled: !!user?.email,
  });

  // Filter issues assigned today or updated today
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTasks = assignedIssues.filter((task) => {
    const assignedDate = new Date(task.assignedAt || task.updatedAt || task.createdAt);
    assignedDate.setHours(0, 0, 0, 0);
    return assignedDate.getTime() === today.getTime();
  });

  const isLoadingTasks = isLoading;

  if (isLoadingTasks) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-xl p-6 shadow-sm border border-base-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-base-content font-['Satoshi']">
          Today's Tasks
        </h3>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold font-['Satoshi']">
          {todayTasks.length} tasks
        </span>
      </div>

      {todayTasks.length === 0 ? (
        <EmptyState
          message="No tasks assigned for today"
          description="You're all caught up! Check back later for new assignments."
        />
      ) : (
        <div className="space-y-3">
          {todayTasks.map((task) => (
            <Link
              key={task._id}
              to={`/issue/${task._id}`}
              className="block p-4 bg-base-200 rounded-lg hover:bg-base-300 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-['Satoshi'] font-semibold text-sm text-base-content mb-2 group-hover:text-primary transition-colors truncate">
                    {task.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-base-content/70 font-['Satoshi']">
                    <span className="flex items-center gap-1">
                      <FiTag size={12} />
                      {task.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMapPin size={12} />
                      {task.location || 'N/A'}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock size={12} />
                      {new Date(task.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={task.status} />
                  <FiArrowRight
                    size={16}
                    className="text-base-content/50 group-hover:text-primary transition-colors"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayTasks;

