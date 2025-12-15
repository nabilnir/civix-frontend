import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FiUser, FiMail, FiCalendar, FiArrowRight, FiLock, FiUnlock } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Avatar from '../../Shared/Avatar';
import Badge from '../../Shared/Badge';
import { formatDate } from '../../../utils/formatDate';
import EmptyState from '../../Shared/EmptyState';

const LatestUsersWidget = ({ limit = 5 }) => {
  const axiosSecure = useAxiosSecure();

  const { data: latestUsers = [], isLoading } = useQuery({
    queryKey: ['latestUsers', limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/users?limit=${limit}&sort=-createdAt&role=citizen`);
      return res.data.users || [];
    },
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
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-['Satoshi'] font-bold text-lg text-[#242424]">
          Latest Users
        </h3>
        <Link
          to="/admin-dashboard/manage-users"
          className="text-sm text-[#238ae9] hover:underline font-['Satoshi'] flex items-center gap-1"
        >
          View All
          <FiArrowRight size={14} />
        </Link>
      </div>

      {latestUsers.length === 0 ? (
        <EmptyState
          message="No users yet"
          description="New user registrations will appear here."
        />
      ) : (
        <div className="space-y-3">
          {latestUsers.map((user) => (
            <Link
              key={user._id}
              to={`/admin-dashboard/manage-users`}
              className="block p-4 bg-[#f4f6f8] rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Avatar
                  src={user.photoURL}
                  name={user.name}
                  size="md"
                  status={user.isBlocked ? 'offline' : 'online'}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-['Satoshi'] font-semibold text-sm text-[#242424] group-hover:text-[#238ae9] transition-colors truncate">
                      {user.name || 'Anonymous User'}
                    </h4>
                    {user.isBlocked ? (
                      <Badge variant="danger" size="sm">
                        <FiLock size={10} />
                      </Badge>
                    ) : (
                      <Badge variant="success" size="sm">
                        <FiUnlock size={10} />
                      </Badge>
                    )}
                    {user.isPremium && (
                      <Badge variant="warning" size="sm">
                        <FaCrown size={10} />
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 font-['Satoshi']">
                    <span className="flex items-center gap-1">
                      <FiMail size={12} />
                      {user.email}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCalendar size={12} />
                      {formatDate(user.createdAt, 'relative')}
                    </span>
                  </div>
                </div>
                <FiArrowRight
                  size={16}
                  className="text-gray-400 group-hover:text-[#238ae9] transition-colors"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestUsersWidget;

