import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiThumbsUp } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const UpVoteButton = ({ issue, size = 'default', showCount = true }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user has already upvoted (this would need backend support)
  const hasUpvoted = issue.upvotedBy?.includes(user?.email) || false;

  const upvoteMutation = useMutation({
    mutationFn: async (issueId) => {
      const res = await axiosSecure.post(`/api/issues/${issueId}/upvote`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['issues']);
      queryClient.invalidateQueries(['issue', issue._id]);
      queryClient.invalidateQueries(['latestResolvedIssues']);
      toast.success('Issue upvoted successfully!');
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message;
      if (errorMessage?.includes('already upvoted') || errorMessage?.includes('duplicate')) {
        toast.error('You have already upvoted this issue');
      } else {
        toast.error(errorMessage || 'Failed to upvote');
      }
    },
  });

  const handleUpvote = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    if (!user) {
      toast.error('Please login to upvote');
      navigate('/login', { state: { from: location } });
      return;
    }

    // Check if user is trying to upvote their own issue
    const isOwnIssue = user.email === issue.userEmail || user.email === issue.reporterEmail;
    if (isOwnIssue) {
      toast.error('You cannot upvote your own issue');
      return;
    }

    // Check if already upvoted
    if (hasUpvoted) {
      toast.error('You have already upvoted this issue');
      return;
    }

    // Execute upvote
    upvoteMutation.mutate(issue._id);
  };

  const sizeClasses = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg',
  };

  const iconSizes = {
    small: 16,
    default: 18,
    large: 20,
  };

  return (
    <button
      onClick={handleUpvote}
      disabled={upvoteMutation.isPending || hasUpvoted || !user || user.email === issue.userEmail || user.email === issue.reporterEmail}
      className={`flex items-center gap-1.5 transition-all font-['Satoshi'] ${
        hasUpvoted
          ? 'text-[#238ae9] cursor-not-allowed'
          : user && user.email !== issue.userEmail && user.email !== issue.reporterEmail
          ? 'text-gray-500 hover:text-[#238ae9] hover:scale-110'
          : 'text-gray-300 cursor-not-allowed'
      } ${sizeClasses[size]} disabled:opacity-50`}
      title={
        !user
          ? 'Login to upvote'
          : user.email === issue.userEmail || user.email === issue.reporterEmail
          ? "You can't upvote your own issue"
          : hasUpvoted
          ? 'Already upvoted'
          : 'Upvote this issue'
      }
    >
      <FiThumbsUp
        size={iconSizes[size]}
        className={`transition-transform ${
          hasUpvoted ? 'fill-[#238ae9]' : ''
        }`}
      />
      {showCount && (
        <span className="font-bold">
          {issue.upvotes || issue.upvoteCount || 0}
        </span>
      )}
    </button>
  );
};

export default UpVoteButton;
