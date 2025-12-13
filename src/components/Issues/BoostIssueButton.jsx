import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiTrendingUp } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import BoostPayment from '../payment/BoostPayment';

const BoostIssueButton = ({ issue }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Check if issue is already boosted
  const isBoosted = issue?.priority === 'High' && issue?.isBoosted;
  
  // Check if user owns the issue
  const isOwner = issue?.userEmail === user?.email || issue?.reporterEmail === user?.email;

  // Check if user is logged in
  if (!user) {
    return (
      <button
        onClick={() => {
          toast.error('Please login to boost issues');
          // Navigate to login could be added here
        }}
        className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-['Satoshi'] font-semibold hover:bg-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiTrendingUp />
        Boost Issue (Login Required)
      </button>
    );
  }

  // If already boosted
  if (isBoosted) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg font-['Satoshi'] font-semibold cursor-not-allowed opacity-75"
      >
        <FiTrendingUp />
        Already Boosted
      </button>
    );
  }

  // If not owner
  if (!isOwner) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-['Satoshi'] font-semibold cursor-not-allowed"
        title="Only issue owner can boost"
      >
        <FiTrendingUp />
        Boost Issue (Owner Only)
      </button>
    );
  }

  // If issue is not pending
  if (issue?.status !== 'Pending') {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-lg font-['Satoshi'] font-semibold cursor-not-allowed"
        title="Can only boost pending issues"
      >
        <FiTrendingUp />
        Boost Issue (Pending Only)
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowPaymentModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-['Satoshi'] font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
      >
        <FiTrendingUp />
        Boost Priority (100 BDT)
      </button>

      {showPaymentModal && (
        <BoostPayment
          issue={issue}
          onSuccess={() => {
            setShowPaymentModal(false);
            queryClient.invalidateQueries(['issue', issue._id]);
            queryClient.invalidateQueries(['issues']);
          }}
          onCancel={() => setShowPaymentModal(false)}
        />
      )}
    </>
  );
};

export default BoostIssueButton;

