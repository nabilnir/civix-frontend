import React from 'react';
import { FiCheckCircle, FiClock, FiUser, FiAlertCircle } from 'react-icons/fi';

const TimelineItem = ({ entry }) => {
  if (!entry) return null;

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('resolved') || statusLower.includes('closed')) {
      return <FiCheckCircle className="text-green-500" size={12} />;
    }
    if (statusLower.includes('progress') || statusLower.includes('working')) {
      return <FiClock className="text-blue-500" size={12} />;
    }
    if (statusLower.includes('pending')) {
      return <FiAlertCircle className="text-yellow-500" size={12} />;
    }
    return <FiClock className="text-gray-500" size={12} />;
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('resolved') || statusLower.includes('closed')) {
      return 'bg-green-500';
    }
    if (statusLower.includes('progress') || statusLower.includes('working')) {
      return 'bg-blue-500';
    }
    if (statusLower.includes('pending')) {
      return 'bg-yellow-500';
    }
    return 'bg-gray-500';
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'staff':
        return 'bg-blue-100 text-blue-700';
      case 'citizen':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="relative">
      {/* Timeline Dot */}
      <span
        className={`absolute -left-[41px] top-1 h-5 w-5 rounded-full ${getStatusColor(
          entry.status
        )} border-4 border-white shadow-sm flex items-center justify-center`}
      >
        <div className="text-white">
          {getStatusIcon(entry.status)}
        </div>
      </span>

      {/* Timeline Content */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div className="flex-1">
          {/* Date */}
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider font-['Satoshi']">
            {formatDate(entry.date)}
          </span>

          {/* Status */}
          <h4 className="text-base font-bold text-gray-800 mt-1 font-['Satoshi'] capitalize">
            {entry.status?.replace('-', ' ') || 'Status Updated'}
          </h4>

          {/* Message/Note */}
          {entry.message && (
            <p className="text-sm text-gray-600 mt-1 font-['Satoshi']">
              {entry.message}
            </p>
          )}
          {entry.note && !entry.message && (
            <p className="text-sm text-gray-600 mt-1 font-['Satoshi']">
              {entry.note}
            </p>
          )}
        </div>

        {/* Updated By */}
        <div className="mt-2 sm:mt-0 flex items-center gap-2">
          <span
            className={`inline-block px-2 py-1 rounded text-xs font-medium font-['Satoshi'] ${getRoleBadgeColor(
              entry.updatedByRole
            )}`}
          >
            <FiUser className="inline mr-1" size={12} />
            {entry.updatedByRole || 'User'}
          </span>
          {entry.updatedBy && (
            <span className="text-xs text-gray-500 font-['Satoshi'] truncate max-w-[120px]">
              {entry.updatedBy}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;

