import React from 'react';
import { useParams } from 'react-router';
import IssueDetails from '../components/Issues/IssueDetails';

const IssueDetailsPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#f4f6f8] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <IssueDetails issueId={id} />
      </div>
    </div>
  );
};

export default IssueDetailsPage;

