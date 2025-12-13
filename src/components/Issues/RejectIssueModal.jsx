import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const RejectIssueModal = ({ isOpen, onClose, issue }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [reason, setReason] = useState('');

  const rejectIssueMutation = useMutation({
    mutationFn: async ({ issueId, reason }) => {
      const res = await axiosSecure.patch(`/api/admin/issues/${issueId}/reject`, {
        reason: reason || 'No reason provided',
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminIssues']);
      queryClient.invalidateQueries(['issues']);
      queryClient.invalidateQueries(['issue', issue?._id]);
      toast.success('Issue rejected successfully');
      onClose();
      setReason('');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reject issue');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'This will reject the issue permanently',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reject it!',
    }).then((result) => {
      if (result.isConfirmed) {
        rejectIssueMutation.mutate({
          issueId: issue._id,
          reason,
        });
      }
    });
  };

  if (!isOpen || !issue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[#242424] font-['Satoshi']">
              Reject Issue
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Issue Info */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 font-['Satoshi'] mb-1">
              Issue Title:
            </p>
            <p className="text-[#242424] font-['Satoshi'] font-semibold">
              {issue.title}
            </p>
            {issue.category && (
              <p className="text-sm text-gray-500 font-['Satoshi'] mt-2">
                Category: <span className="font-medium">{issue.category}</span>
              </p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                Rejection Reason <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9] focus:border-transparent resize-none"
                placeholder="Enter reason for rejecting this issue..."
              />
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={onClose}
                disabled={rejectIssueMutation.isPending}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg font-['Satoshi'] font-semibold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={rejectIssueMutation.isPending}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                {rejectIssueMutation.isPending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Rejecting...
                  </span>
                ) : (
                  'Reject Issue'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RejectIssueModal;

