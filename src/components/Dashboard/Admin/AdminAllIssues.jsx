import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiUserPlus, FiX, FiEye } from 'react-icons/fi';
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

  const handleAssignClick = (issue) => {
    setSelectedIssue(issue);
    setShowAssignModal(true);
  };

  const handleRejectClick = (issue) => {
    setSelectedIssue(issue);
    setShowRejectModal(true);
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-2">
          All Issues
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
          Manage and assign issues to staff members
        </p>
      </div>

      {/* issues table */}
      {issues.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f4f6f8]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Issue
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Assigned Staff
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {issues.map((issue) => (
                  <tr key={issue._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <h4 className="font-['Satoshi'] font-semibold text-sm text-[#242424]">
                          {issue.title}
                        </h4>
                        <p className="font-['Satoshi'] text-xs text-gray-500 line-clamp-1">
                          {issue.location}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-['Satoshi']">
                        {issue.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={issue.status} />
                    </td>
                    <td className="px-6 py-4">
                      {issue.priority === 'High' ? (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold font-['Satoshi']">
                          High
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-['Satoshi']">
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
                          <span className="font-['Satoshi'] text-sm text-[#242424]">
                            {issue.assignedStaff.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm font-['Satoshi']">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/issue/${issue._id}`)}
                          className="p-2 text-[#238ae9] hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <FiEye />
                        </button>
                        
                        {!issue.assignedStaff && (
                          <button
                            onClick={() => handleAssignClick(issue)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] text-sm font-medium hover:bg-[#1e7acc] transition-colors"
                          >
                            <FiUserPlus /> Assign Staff
                          </button>
                        )}
                        
                        {issue.status === 'pending' && (
                          <button
                            onClick={() => handleRejectClick(issue)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg font-['Satoshi'] text-sm font-medium hover:bg-red-200 transition-colors"
                          >
                            <FiX /> Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 font-['Satoshi'] text-lg">No issues found</p>
        </div>
      )}

      {/* Assign Staff Modal */}
      {showAssignModal && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#242424] font-['Satoshi'] mb-4">
                Assign Staff
              </h2>
              <p className="text-gray-600 font-['Satoshi'] mb-4">
                Assign staff member to: <strong>{selectedIssue.title}</strong>
              </p>
              
              <form onSubmit={handleAssignSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                    Select Staff Member
                  </label>
                  <select
                    name="staffEmail"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
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
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={assignStaffMutation.isPending}
                    className="flex-1 px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors disabled:opacity-50"
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
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#242424] font-['Satoshi'] mb-4">
                Reject Issue
              </h2>
              <p className="text-gray-600 font-['Satoshi'] mb-4">
                Reject issue: <strong>{selectedIssue.title}</strong>
              </p>
              
              <form onSubmit={handleRejectSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                    Reason (Optional)
                  </label>
                  <textarea
                    name="reason"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
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
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
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
