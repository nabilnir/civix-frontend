import React from 'react';
import { FiUser } from 'react-icons/fi';
import { Clock, CheckCircle2, UserCheck, Loader2, Wrench, XCircle, AlertCircle } from 'lucide-react';

const TimelineItem = ({ entry }) => {
  if (!entry) return null;

  const getStatusIcon = (status) => {
    const statusLower = status?.toLowerCase() || '';
    const iconSize = 20;
    const iconClass = 'text-white';

    if (statusLower.includes('resolved')) {
      return <CheckCircle2 className={iconClass} size={iconSize} />;
    }
    if (statusLower.includes('closed')) {
      return <XCircle className={iconClass} size={iconSize} />;
    }
    if (statusLower.includes('in-progress') || statusLower.includes('in progress')) {
      return <Loader2 className={`${iconClass} animate-spin`} size={iconSize} />;
    }
    if (statusLower.includes('working')) {
      return <Wrench className={iconClass} size={iconSize} />;
    }
    if (statusLower.includes('assigned')) {
      return <UserCheck className={iconClass} size={iconSize} />;
    }
    if (statusLower.includes('pending')) {
      return <Clock className={iconClass} size={iconSize} />;
    }
    return <AlertCircle className={iconClass} size={iconSize} />;
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || '';
    if (statusLower.includes('resolved')) {
      return 'bg-green-500';
    }
    if (statusLower.includes('closed')) {
      return 'bg-gray-600';
    }
    if (statusLower.includes('progress') || statusLower.includes('working')) {
      return 'bg-blue-500';
    }
    if (statusLower.includes('assigned')) {
      return 'bg-purple-500';
    }
    if (statusLower.includes('pending')) {
      return 'bg-yellow-500';
    }
    return 'bg-gray-500';
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-error/10 text-error';
      case 'staff':
        return 'bg-info/10 text-info';
      case 'citizen':
        return 'bg-success/10 text-success';
      default:
        return 'bg-base-200 text-base-content/70';
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
      {/* Timeline Icon */}
      <div
        className={`absolute -left-[45px] top-0 h-10 w-10 rounded-full ${getStatusColor(
          entry.status
        )} border-4 border-base-100 shadow-lg flex items-center justify-center`}
      >
        {getStatusIcon(entry.status)}
      </div>

      {/* Timeline Content */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div className="flex-1">
          {/* Date */}
          <span className="text-xs font-bold text-base-content/40 uppercase tracking-wider font-['Satoshi']">
            {formatDate(entry.date)}
          </span>

          {/* Status */}
          <h4 className="text-base font-bold text-base-content mt-1 font-['Satoshi'] capitalize">
            {entry.status?.replace('-', ' ') || 'Status Updated'}
          </h4>

          {/* Message/Note */}
          {entry.message && (
            <p className="text-sm text-base-content/70 mt-1 font-['Satoshi']">
              {entry.message}
            </p>
          )}
          {entry.note && !entry.message && (
            <p className="text-sm text-base-content/70 mt-1 font-['Satoshi']">
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
            <span className="text-xs text-base-content/50 font-['Satoshi'] truncate max-w-[120px]">
              {entry.updatedBy}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;
