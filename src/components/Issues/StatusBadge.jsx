import React from 'react';

const StatusBadge = ({ status }) => {
  if (!status) return null;

  const statusLower = status.toLowerCase();
  
  // Determine badge styling based on status
  let badgeClass = 'text-gray-600 bg-gray-100';
  let displayText = status;

  if (statusLower.includes('pending')) {
    badgeClass = 'text-yellow-700 bg-yellow-100';
    displayText = 'Pending';
  } else if (statusLower.includes('in-progress') || statusLower.includes('in progress')) {
    badgeClass = 'text-blue-700 bg-blue-100';
    displayText = 'In Progress';
  } else if (statusLower.includes('working')) {
    badgeClass = 'text-indigo-700 bg-indigo-100';
    displayText = 'Working';
  } else if (statusLower.includes('resolved')) {
    badgeClass = 'text-green-700 bg-green-100';
    displayText = 'Resolved';
  } else if (statusLower.includes('closed')) {
    badgeClass = 'text-gray-700 bg-gray-200';
    displayText = 'Closed';
  } else if (statusLower.includes('rejected')) {
    badgeClass = 'text-red-700 bg-red-100';
    displayText = 'Rejected';
  }

  return (
    <span className={`px-2 py-1 text-xs font-bold rounded-full font-['Satoshi'] capitalize ${badgeClass}`}>
      {displayText}
    </span>
  );
};

export default StatusBadge;
