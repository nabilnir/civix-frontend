import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiUserPlus, FiX, FiEye, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import StatusBadge from '../../Issues/StatusBadge';
import Swal from 'sweetalert2';

const AdminAllIssues = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  // get all issues
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ['adminIssues'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/admin/issues');
      return res.data.data || [];
    },
  });

  // get all staff for assign dropdown
  const { data: staffList = [] } = useQuery({
    queryKey: ['allStaff'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/staff');
      return res.data.data || [];
    },
  });

  // assign staff mutation
  const assignStaffMutation = useMutation({
    mutationFn: async ({ issueId, staffEmail }) => {
      const res = await axiosSecure.patch(`/api/admin/issues/${issueId}/assign`, {
        staffEmail,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminIssues']);
      toast.success('Staff assigned successfully');
      setShowAssignModal(false);
      setSelectedIssue(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to assign staff');
    },
  });

  // reject issue mutation
  const rejectIssueMutation = useMutation({
    mutationFn: async ({ issueId, reason }) => {
      const res = await axiosSecure.patch(`/api/admin/issues/${issueId}/reject`, {
        reason,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminIssues']);
      toast.success('Issue rejected successfully');
      setShowRejectModal(false);
      setSelectedIssue(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to reject issue');
    },
  });

  // delete issue mutation
  const deleteIssueMutation = useMutation({
    mutationFn: async (issueId) => {
      const res = await axiosSecure.delete(`/api/admin/issues/${issueId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['adminIssues']);
      queryClient.invalidateQueries(['issues']);
      queryClient.invalidateQueries(['latestResolvedIssues']);
      toast.success('Issue deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete issue');
    },
  });

  const handleAssignClick = (issue) => {
    setSelectedIssue(issue);
    setShowAssignModal(true);
  };

  const handleRejectClick = (issue) => {
    setSelectedIssue(issue);
    setShowRejectModal(true);
  };

  const handleDeleteClick = (issue) => {
    Swal.fire({
      title: 'Are you sure?',
      html: `
        <p class="mb-2">You are about to permanently delete this issue:</p>
        <p class="font-semibold text-gray-800">${issue.title}</p>
        <p class="mt-4 text-sm text-red-600">This action cannot be undone. The issue will be removed from both the UI and database.</p>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteIssueMutation.mutate(issue._id);
      }
    });
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    const staffEmail = e.target.staffEmail.value;
    if (!staffEmail) {
      toast.error('Please select a staff member');
      return;
    }
    assignStaffMutation.mutate({
      issueId: selectedIssue._id,
      staffEmail,
    });
  };

  const handleRejectSubmit = (e) => {
    e.preventDefault();
    const reason = e.target.reason.value || 'No reason provided';

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
          issueId: selectedIssue._id,
          reason,
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-base-content font-['Satoshi'] mb-2">
          All Issues
        </h1>
        <p className="text-base-content/70 font-['Satoshi']">
          Manage and assign issues to staff members
        </p>
      </div>

      {/* issues table */}
      {issues.length > 0 ? (
        <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase min-w-[300px]">
                    Issue
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase whitespace-nowrap">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase whitespace-nowrap min-w-[120px]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase whitespace-nowrap min-w-[100px]">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase min-w-[180px]">
                    Assigned Staff
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content/70 font-['Satoshi'] uppercase whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {issues.map((issue) => (
                  <tr key={issue._id} className="hover:bg-base-200">
                    <td className="px-6 py-4">
                      <div>
                        <h4 className="font-['Satoshi'] font-semibold text-sm text-base-content">
                          {issue.title}
                        </h4>
                        <p className="font-['Satoshi'] text-xs text-base-content/50 line-clamp-1">
                          {issue.location}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-base-200 text-base-content rounded text-xs font-['Satoshi']">
                        {issue.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={issue.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {(issue.priority === 'high' || issue.priority === 'High') ? (
                        <span className="px-2 py-1 bg-error/10 text-error rounded text-xs font-bold font-['Satoshi'] whitespace-nowrap">
                          High
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-base-200 text-base-content rounded text-xs font-['Satoshi'] whitespace-nowrap">
                          Normal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {issue.assignedStaff ? (
                        <div className="flex items-center gap-2">
                          <img
                            src={issue.assignedStaff.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
                            alt={issue.assignedStaff.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="font-['Satoshi'] text-sm text-base-content">
                            {issue.assignedStaff.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-base-content/40 text-sm font-['Satoshi']">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/issue/${issue._id}`)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FiEye />
                        </button>

                        {!issue.assignedStaff && (
                          <button
                            onClick={() => handleAssignClick(issue)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-content rounded-lg font-['Satoshi'] text-sm font-medium hover:bg-primary/80 transition-colors"
                          >
                            <FiUserPlus /> Assign Staff
                          </button>
                        )}

                        {issue.status === 'pending' && (
                          <button
                            onClick={() => handleRejectClick(issue)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-error/10 text-error rounded-lg font-['Satoshi'] text-sm font-medium hover:bg-error/20 transition-colors"
                          >
                            <FiX /> Reject
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteClick(issue)}
                          className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"
                          title="Remove Issue"
                          disabled={deleteIssueMutation.isPending}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-base-100 rounded-xl p-12 text-center shadow-sm border border-base-300">
          <p className="text-base-content/50 font-['Satoshi'] text-lg">No issues found</p>
        </div>
      )}

      {/* Assign Staff Modal */}
      {showAssignModal && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-md m-4">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                Assign Staff
              </h2>
              <p className="text-base-content/70 font-['Satoshi'] mb-4">
                Assign staff member to: <strong>{selectedIssue.title}</strong>
              </p>

              <form onSubmit={handleAssignSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-base-content font-['Satoshi'] mb-2">
                    Select Staff Member
                  </label>
                  <select
                    name="staffEmail"
                    required
                    className="w-full px-4 py-3 border border-base-300 bg-base-100 text-base-content rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Choose a staff member...</option>
                    {staffList.map((staff) => (
                      <option key={staff.email} value={staff.email}>
                        {staff.name} ({staff.email})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAssignModal(false);
                      setSelectedIssue(null);
                    }}
                    className="flex-1 px-4 py-2 border border-base-300 rounded-lg font-['Satoshi'] font-semibold text-base-content hover:bg-base-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={assignStaffMutation.isPending}
                    className="flex-1 px-4 py-2 bg-primary text-primary-content rounded-lg font-['Satoshi'] font-semibold hover:bg-primary/80 transition-colors disabled:opacity-50"
                  >
                    {assignStaffMutation.isPending ? 'Assigning...' : 'Assign'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Reject Issue Modal */}
      {showRejectModal && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-md m-4">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                Reject Issue
              </h2>
              <p className="text-base-content/70 font-['Satoshi'] mb-4">
                Reject issue: <strong>{selectedIssue.title}</strong>
              </p>

              <form onSubmit={handleRejectSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-base-content font-['Satoshi'] mb-2">
                    Reason (Optional)
                  </label>
                  <textarea
                    name="reason"
                    rows="3"
                    className="w-full px-4 py-3 border border-base-300 bg-base-100 text-base-content rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter rejection reason..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRejectModal(false);
                      setSelectedIssue(null);
                    }}
                    className="flex-1 px-4 py-2 border border-base-300 rounded-lg font-['Satoshi'] font-semibold text-base-content hover:bg-base-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={rejectIssueMutation.isPending}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {rejectIssueMutation.isPending ? 'Rejecting...' : 'Reject Issue'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllIssues;
