import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FiArrowRight, FiClock, FiTag, FiUser } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import StatusBadge from '../../Issues/StatusBadge';
import { formatDate } from '../../../utils/formatDate';
import EmptyState from '../../Shared/EmptyState';

const LatestIssuesWidget = ({ limit = 5 }) => {
  const axiosSecure = useAxiosSecure();

  const { data: latestIssues = [], isLoading } = useQuery({
    queryKey: ['latestIssues', limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/issues?limit=${limit}&sort=-createdAt`);
      return res.data.issues || [];
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
          Latest Issues
        </h3>
        <Link
          to="/admin-dashboard/all-issues"
          className="text-sm text-[#238ae9] hover:underline font-['Satoshi'] flex items-center gap-1"
        >
          View All
          <FiArrowRight size={14} />
        </Link>
      </div>

      {latestIssues.length === 0 ? (
        <EmptyState
          message="No issues yet"
          description="Newly reported issues will appear here."
        />
      ) : (
        <div className="space-y-3">
          {latestIssues.map((issue) => (
            <Link
              key={issue._id}
              to={`/issue/${issue._id}`}
              className="block p-4 bg-[#f4f6f8] rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-['Satoshi'] font-semibold text-sm text-[#242424] mb-2 group-hover:text-[#238ae9] transition-colors truncate">
                    {issue.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 font-['Satoshi']">
                    <span className="flex items-center gap-1">
                      <FiTag size={12} />
                      {issue.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUser size={12} />
                      {issue.reporterName || 'Anonymous'}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock size={12} />
                      {formatDate(issue.createdAt, 'relative')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={issue.status} />
                  <FiArrowRight
                    size={14}
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

export default LatestIssuesWidget;

