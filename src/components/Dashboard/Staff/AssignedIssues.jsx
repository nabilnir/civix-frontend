import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { FiFilter, FiChevronDown, FiEye, FiMap, FiList } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import StatusBadge from '../../Issues/StatusBadge';
import IssuesMap from '../../Issues/IssuesMap';

const AssignedIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [showStatusDropdown, setShowStatusDropdown] = useState({});
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

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
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['assignedIssues']);
      queryClient.invalidateQueries(['staffStats']);
      queryClient.invalidateQueries(['issues']);
      // Invalidate latest resolved issues if status changed to resolved
      if (variables.status === 'resolved') {
        queryClient.invalidateQueries(['latestResolvedIssues']);
      }
      // Also invalidate issue detail query
      queryClient.invalidateQueries(['issue', variables.issueId]);
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
    setSelectedIssue(issues.find(i => i._id === issueId));
    setSelectedStatus(newStatus);
    setShowMessageModal(true);
    setShowStatusDropdown({});
  };

  const handleStatusSubmit = (e) => {
    e.preventDefault();
    const message = e.target.message.value || `Status updated to ${selectedStatus}`;
    
    updateStatusMutation.mutate({
      issueId: selectedIssue._id,
      status: selectedStatus,
      message: message,
    });
    
    setShowMessageModal(false);
    setSelectedIssue(null);
    setSelectedStatus('');
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-base-content font-['Satoshi'] mb-2">
          Assigned Issues
        </h1>
        <p className="text-base-content/70 font-['Satoshi']">
          Manage and update status of issues assigned to you
        </p>
      </div>

      {/* filters */}
      <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300 flex flex-col xl:flex-row justify-between xl:items-center gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <FiFilter className="text-primary" />
            <span className="font-['Satoshi'] font-semibold text-sm">Filters:</span>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-base-300 rounded-lg font-['Satoshi'] text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-base-200 text-base-content"
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
            className="px-4 py-2 border border-base-300 rounded-lg font-['Satoshi'] text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-base-200 text-base-content"
          >
            <option value="">All Priority</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* View Toggle */}
        <div className="bg-base-200 p-1 rounded-lg border border-base-300 inline-flex shadow-sm mt-4 lg:mt-0">
          <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-md font-semibold transition-colors ${viewMode === 'list' ? 'bg-primary text-primary-content shadow-sm' : 'text-base-content/60 hover:bg-base-300'}`}
          >
              <FiList /> List View
          </button>
          <button 
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm rounded-md font-semibold transition-colors ${viewMode === 'map' ? 'bg-primary text-primary-content shadow-sm' : 'text-base-content/60 hover:bg-base-300'}`}
          >
              <FiMap /> Map View
          </button>
        </div>
      </div>

      {/* issues table or map */}
      {filteredIssues.length > 0 ? (
        viewMode === 'list' ? (
          <div className="bg-base-100 rounded-xl shadow-sm border border-base-300 overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-base-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content font-['Satoshi'] uppercase min-w-[300px]">
                    Issue
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content font-['Satoshi'] uppercase whitespace-nowrap">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content font-['Satoshi'] uppercase whitespace-nowrap min-w-[120px]">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content font-['Satoshi'] uppercase whitespace-nowrap min-w-[100px]">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content font-['Satoshi'] uppercase min-w-[200px]">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-base-content font-['Satoshi'] uppercase whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
              {filteredIssues.map((issue) => {
              const availableStatuses = getAvailableStatuses(issue.status);
              const fullDescription = issue.description || '';
              const shortDescription =
                fullDescription.length > 160
                  ? `${fullDescription.slice(0, 160)}...`
                  : fullDescription;
              return (
                    <tr key={issue._id} className="hover:bg-base-200">
                      <td className="px-6 py-4">
                        <div>
                          <h4 className="font-['Satoshi'] font-semibold text-sm text-base-content mb-1">
                            {issue.title}
                          </h4>
                          <p className="font-['Satoshi'] text-xs text-base-content/60">
                            {shortDescription}
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
                          <span className="px-2 py-1 badge badge-error text-xs font-bold font-['Satoshi'] whitespace-nowrap">
                            High
                          </span>
                        ) : (
                          <span className="px-2 py-1 badge badge-ghost text-xs font-['Satoshi'] whitespace-nowrap">
                            Normal
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-['Satoshi'] text-sm text-base-content/70">
                          {issue.location}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <button
                              onClick={() => toggleDropdown(issue._id)}
                              disabled={availableStatuses.length === 0 || updateStatusMutation.isPending}
                              className="flex items-center gap-1 px-4 py-2 bg-primary text-primary-content rounded-lg font-['Satoshi'] text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                              Change Status
                              <FiChevronDown />
                            </button>
                            
                            {showStatusDropdown[issue._id] && availableStatuses.length > 0 && (
                              <div className="absolute right-0 mt-2 w-48 bg-base-100 rounded-lg shadow-lg border border-base-300 z-10">
                                {availableStatuses.map((status) => (
                                  <button
                                    key={status}
                                    onClick={() => handleStatusChange(issue._id, status)}
                                    className="w-full text-left px-4 py-2 hover:bg-base-200 font-['Satoshi'] text-sm text-base-content first:rounded-t-lg last:rounded-b-lg"
                                  >
                                    {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          {/* view details button */}
                          <button
                            onClick={() => navigate(`/issue/${issue._id}`)}
                            className="px-3 py-2 bg-base-200 text-base-content rounded-lg font-['Satoshi'] text-sm font-medium hover:bg-base-300 transition-colors flex items-center gap-1"
                          >
                            <FiEye /> View
                          </button>
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
          <div className="mb-4 border border-base-300 rounded-xl overflow-hidden">
            <IssuesMap issues={filteredIssues} />
          </div>
        )
      ) : (
        <div className="bg-base-100 rounded-xl p-12 text-center shadow-sm border border-base-300">
          <p className="text-base-content/60 font-['Satoshi'] text-lg">
            {issues.length === 0
              ? "You don't have any assigned issues yet."
              : 'No issues match your filters.'}
          </p>
        </div>
      )}

      {/* Status Update Modal with Message */}
      {showMessageModal && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-md m-4">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-base-content font-['Satoshi'] mb-4">
                Update Status
              </h2>
              <p className="text-base-content/70 font-['Satoshi'] mb-4">
                Updating status for: <strong>{selectedIssue.title}</strong>
              </p>
              <p className="text-sm text-base-content/60 mb-4 font-['Satoshi']">
                New Status: <span className="font-bold text-primary capitalize">
                  {selectedStatus.replace('-', ' ')}
                </span>
              </p>
              
              <form onSubmit={handleStatusSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-base-content font-['Satoshi'] mb-2">
                    Progress Update / Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 border border-base-300 rounded-lg font-['Satoshi'] bg-base-200 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Add a note about the progress or status change..."
                  />
                  <p className="text-xs text-base-content/60 mt-1 font-['Satoshi']">
                    This will be added to the issue timeline
                  </p>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowMessageModal(false);
                      setSelectedIssue(null);
                      setSelectedStatus('');
                    }}
                    className="flex-1 px-4 py-2 border border-base-300 rounded-lg font-['Satoshi'] font-semibold text-base-content hover:bg-base-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateStatusMutation.isPending}
                    className="flex-1 px-4 py-2 bg-primary text-primary-content rounded-lg font-['Satoshi'] font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
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

export default AssignedIssues;
