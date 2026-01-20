import React from 'react';

const StatusBadge = ({ status }) => {
  if (!status) return null;

  const statusLower = status.toLowerCase();

  // Determine badge styling based on status
  let badgeClass = 'text-gray-600 bg-gray-100';
  let displayText = status;

  if (statusLower.includes('pending')) {
    badgeClass = 'badge badge-warning gap-1';
    displayText = 'Pending';
  } else if (statusLower.includes('in-progress') || statusLower.includes('in progress')) {
    badgeClass = 'badge badge-info gap-1 text-white';
    displayText = 'In Progress';
  } else if (statusLower.includes('working')) {
    badgeClass = 'badge badge-primary gap-1';
    displayText = 'Working';
  } else if (statusLower.includes('resolved')) {
    badgeClass = 'badge badge-success gap-1 text-white';
    displayText = 'Resolved';
  } else if (statusLower.includes('closed')) {
    badgeClass = 'badge badge-neutral gap-1';
    displayText = 'Closed';
  } else if (statusLower.includes('rejected')) {
    badgeClass = 'badge badge-error gap-1 text-white';
    displayText = 'Rejected';
  }

  return (
    <span className={`px-3 py-1 text-xs font-bold rounded-full font-['Satoshi'] capitalize whitespace-nowrap border-none ${badgeClass}`}>
      {displayText}
    </span>
  );
};

export default StatusBadge;
