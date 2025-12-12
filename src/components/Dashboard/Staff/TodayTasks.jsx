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

  const { data: todayTasks = [], isLoading } = useQuery({
    queryKey: ['todayTasks', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/staff/today-tasks/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#242424] font-['Satoshi']">
          Today's Tasks
        </h3>
        <span className="px-3 py-1 bg-[#238ae9]/10 text-[#238ae9] rounded-full text-xs font-semibold font-['Satoshi']">
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
              className="block p-4 bg-[#f4f6f8] rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="font-['Satoshi'] font-semibold text-sm text-[#242424] mb-2 group-hover:text-[#238ae9] transition-colors truncate">
                    {task.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 font-['Satoshi']">
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
                    className="text-gray-400 group-hover:text-[#238ae9] transition-colors"
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

