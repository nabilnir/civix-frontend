import React from 'react';
import IssueCard from './IssueCard';
import { FiInbox } from 'react-icons/fi';

const IssueList = ({
  issues = [],
  onUpvote,
  isLoading = false,
  emptyMessage = 'No issues found',
  gridCols = 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
}) => {

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-10 h-10 border-4 border-[#238ae9] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!issues || issues.length === 0) {
    return (
      <div className="p-16 bg-white rounded-xl text-center shadow-lg border-2 border-dashed border-gray-200">
        <FiInbox className="mx-auto text-gray-400 mb-4" size={48} />
        <h3 className="font-['Satoshi'] text-xl font-bold text-gray-700 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500 font-['Satoshi']">
          Try adjusting your search or filters to find more issues.
        </p>
      </div>
    );
  }

  // Sort issues: Boosted/High priority first, then by date
  const sortedIssues = [...issues].sort((a, b) => {
    // Boosted issues first
    const aHigh = a.priority === 'high' || a.priority === 'High';
    const bHigh = b.priority === 'high' || b.priority === 'High';
    if (aHigh && !bHigh) return -1;
    if (!aHigh && bHigh) return 1;
    
    // Then by date (newest first)
    const dateA = new Date(a.date || a.createdAt || 0);
    const dateB = new Date(b.date || b.createdAt || 0);
    return dateB - dateA;
  });

  return (
    <div className={`grid ${gridCols} gap-6 md:gap-8`}>
      {sortedIssues.map((issue, index) => (
        <IssueCard
          key={issue._id || index}
          issue={issue}
          index={index}
          onUpvote={() => {
            if (onUpvote) {
              onUpvote(issue);
            }
          }}
        />
      ))}
    </div>
  );
};

export default IssueList;
