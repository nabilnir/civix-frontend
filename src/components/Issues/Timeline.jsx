import React from 'react';
import TimelineItem from './TImelineItem';

const Timeline = ({ timeline = [], issueStatus }) => {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="bg-base-100 rounded-xl shadow-sm p-6 md:p-8 border border-base-300">
        <h3 className="text-xl font-bold text-base-content mb-6 font-['Satoshi']">
          Issue Lifecycle
        </h3>
        <div className="text-center py-8">
          <p className="text-base-content/60 font-['Satoshi'] italic">
            No timeline entries yet. Updates will appear here as the issue progresses.
          </p>
        </div>
      </div>
    );
  }

  // Sort timeline: Latest at top
  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

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

  return (
    <div className="bg-base-100 rounded-xl shadow-sm p-6 md:p-8 border border-base-300">
      <h3 className="text-xl font-bold text-base-content mb-6 font-['Satoshi']">
        Issue Lifecycle & Timeline
      </h3>

      <div className="relative border-l-2 border-base-300 ml-3 pl-8 space-y-8">
        {sortedTimeline.map((entry, idx) => (
          <TimelineItem key={idx} entry={entry} />
        ))}
      </div>

      {/* Current Status Badge */}
      {issueStatus && (
        <div className="mt-6 pt-6 border-t border-base-300">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-base-content/70 font-['Satoshi']">
              Current Status:
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold font-['Satoshi'] capitalize ${getStatusColor(
                issueStatus
              )} text-white`}
            >
              {issueStatus.replace('-', ' ')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
