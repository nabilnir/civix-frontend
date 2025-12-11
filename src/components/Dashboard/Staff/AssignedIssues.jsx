import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiFilter, FiChevronDown } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import StatusBadge from '../../Issues/StatusBadge';

const AssignedIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState({});

  // fetch assigned issues
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ['assignedIssues', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/staff/${user.email}/assigned-issues`);
      return res.data.data || [];
    },
    enabled: !!user?.email,
  });

  // update status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ issueId, status, message }) => {
      const res = await axiosSecure.patch(`/api/staff/issues/${issueId}/status`, {
        status,
        message: message || `Status changed to ${status}`,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['assignedIssues']);
      queryClient.invalidateQueries(['staffStats']);
      toast.success('Status updated successfully');
      setShowStatusDropdown({});
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update status');
    },
  });

  // filter issues
  const filteredIssues = issues.filter((issue) => {
    const statusMatch = !statusFilter || issue.status.toLowerCase() === statusFilter.toLowerCase();
    const priorityMatch = !priorityFilter || issue.priority?.toLowerCase() === priorityFilter.toLowerCase();
    return statusMatch && priorityMatch;
  });

  // get available status options based on current status
  const getAvailableStatuses = (currentStatus) => {
    const statusMap = {
      'pending': ['in-progress'],
      'in-progress': ['working', 'resolved'],
      'working': ['resolved'],
      'resolved': ['closed'],
    };
    return statusMap[currentStatus] || [];
  };

  const handleStatusChange = (issueId, newStatus) => {
    updateStatusMutation.mutate({
      issueId,
      status: newStatus,
      message: `Status updated to ${newStatus}`,
    });
  };

  const toggleDropdown = (issueId) => {
    setShowStatusDropdown(prev => ({
      ...prev,
      [issueId]: !prev[issueId],
    }));
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
          Assigned Issues
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
          Manage and update status of issues assigned to you
        </p>
      </div>

      {/* filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <FiFilter className="text-[#238ae9]" />
            <span className="font-['Satoshi'] font-semibold text-sm">Filters:</span>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] text-sm focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="working">Working</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] text-sm focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
          >
            <option value="">All Priority</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      {/* issues table */}
      {filteredIssues.length > 0 ? (
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
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredIssues.map((issue) => {
                  const availableStatuses = getAvailableStatuses(issue.status);
                  return (
                    <tr key={issue._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <h4 className="font-['Satoshi'] font-semibold text-sm text-[#242424]">
                            {issue.title}
                          </h4>
                          <p className="font-['Satoshi'] text-xs text-gray-500 line-clamp-1">
                            {issue.description}
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
                        <p className="font-['Satoshi'] text-sm text-gray-600">
                          {issue.location}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(issue._id)}
                            disabled={availableStatuses.length === 0 || updateStatusMutation.isPending}
                            className="flex items-center gap-1 px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] text-sm font-medium hover:bg-[#1e7acc] transition-colors disabled:opacity-50"
                          >
                            Change Status
                            <FiChevronDown />
                          </button>
                          
                          {showStatusDropdown[issue._id] && availableStatuses.length > 0 && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                              {availableStatuses.map((status) => (
                                <button
                                  key={status}
                                  onClick={() => handleStatusChange(issue._id, status)}
                                  className="w-full text-left px-4 py-2 hover:bg-gray-100 font-['Satoshi'] text-sm text-[#242424] first:rounded-t-lg last:rounded-b-lg"
                                >
                                  {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 font-['Satoshi'] text-lg">
            {issues.length === 0
              ? "You don't have any assigned issues yet."
              : 'No issues match your filters.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AssignedIssues;
