import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { FiEdit2, FiTrash2, FiEye, FiFilter, FiPlus, FiCheckSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import EditIssueModal from '../../Issues/EditIssueModal';
import StatusBadge from '../../Issues/StatusBadge';

const MyIssues = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIssueIds, setSelectedIssueIds] = useState([]);

  // Fetch user's issues
  const { data: issues = [], isLoading } = useQuery({
    queryKey: ['userIssues', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      try {
        const res = await axiosSecure.get(`/api/issues/user/${user.email}`);
        return res.data.data || [];
      } catch (error) {
        console.error('Error fetching user issues:', error);
        return [];
      }
    },
    enabled: !!user?.email,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (issueIds) => {
      const idsArray = Array.isArray(issueIds) ? issueIds : [issueIds];
      await Promise.all(idsArray.map((id) => axiosSecure.delete(`/api/issues/${id}`)));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userIssues']);
      toast.success('Issue deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete issue');
    },
  });

  // Filter issues
  const filteredIssues = issues.filter((issue) => {
    const statusMatch = !statusFilter || issue.status.toLowerCase() === statusFilter.toLowerCase();
    const categoryMatch = !categoryFilter || issue.category.toLowerCase() === categoryFilter.toLowerCase();
    return statusMatch && categoryMatch;
  });

  const handleEdit = (issue) => {
    setSelectedIssue(issue);
    setIsEditModalOpen(true);
  };

  const handleDelete = (issueId) => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      deleteMutation.mutate(issueId);
    }
  };

  const handleAddNew = () => {
    navigate('/report-issue');
  };

  const toggleSelectMode = () => {
    setIsSelectMode((prev) => !prev);
    setSelectedIssueIds([]);
  };

  const toggleIssueSelection = (issueId) => {
    setSelectedIssueIds((prev) =>
      prev.includes(issueId) ? prev.filter((id) => id !== issueId) : [...prev, issueId]
    );
  };

  const handleSelectAll = () => {
    if (selectedIssueIds.length === filteredIssues.length) {
      setSelectedIssueIds([]);
    } else {
      setSelectedIssueIds(filteredIssues.map((issue) => issue._id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedIssueIds.length === 0) return;
    if (window.confirm(`Delete ${selectedIssueIds.length} selected issue(s)?`)) {
      deleteMutation.mutate(selectedIssueIds);
      setSelectedIssueIds([]);
      setIsSelectMode(false);
    }
  };

  const handleViewDetails = (issueId) => {
    navigate(`/issue/${issueId}`);
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-2">
            My Issues
          </h1>
          <p className="text-gray-600 font-['Satoshi']">
            Manage and track all your reported issues
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-medium hover:bg-[#1e7acc] transition-colors"
          >
            <FiPlus /> Add New
          </button>
          <button
            onClick={toggleSelectMode}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-['Satoshi'] font-medium transition-colors ${
              isSelectMode
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiCheckSquare /> {isSelectMode ? 'Cancel Selection' : 'Select Issues'}
          </button>
        </div>
      </div>

      {/* Filters & bulk actions */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-wrap gap-4 items-center justify-between">
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
            <option value="boosted">Boosted</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] text-sm focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
          >
            <option value="">All Categories</option>
            <option value="streetlight">Streetlight</option>
            <option value="pothole">Pothole</option>
            <option value="water">Water Leakage</option>
            <option value="garbage">Garbage</option>
            <option value="footpath">Footpath</option>
            <option value="other">Other</option>
          </select>
          </div>

          {isSelectMode && filteredIssues.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="px-3 py-2 text-sm rounded-lg border border-gray-300 font-['Satoshi'] hover:bg-gray-50"
              >
                {selectedIssueIds.length === filteredIssues.length ? 'Clear All' : 'Select All'}
              </button>
              <button
                onClick={handleBulkDelete}
                disabled={selectedIssueIds.length === 0}
                className="px-4 py-2 text-sm rounded-lg bg-red-100 text-red-700 font-['Satoshi'] font-medium hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete Selected ({selectedIssueIds.length})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Issues List */}
      {filteredIssues.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredIssues.map((issue) => {
            const isChecked = selectedIssueIds.includes(issue._id);
            return (
            <div
              key={issue._id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {isSelectMode && (
                  <div className="self-start md:self-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-[#238ae9] border-gray-300 rounded focus:ring-[#238ae9]"
                      checked={isChecked}
                      onChange={() => toggleIssueSelection(issue._id)}
                    />
                  </div>
                )}
                {/* Issue Image */}
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full md:w-32 h-32 object-cover rounded-lg"
                />

                {/* Issue Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-start gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[#242424] font-['Satoshi']">
                      {issue.title}
                    </h3>
                    <StatusBadge status={issue.status} />
                    {(issue.priority === 'high' || issue.priority === 'High') && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                        High Priority
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm font-['Satoshi'] mb-2 line-clamp-2">
                    {issue.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span>Category: <strong>{issue.category}</strong></span>
                    <span>Location: <strong>{issue.location}</strong></span>
                    <span>Date: {new Date(issue.date || issue.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleViewDetails(issue._id)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-medium hover:bg-[#1e7acc] transition-colors"
                  >
                    <FiEye /> View Details
                  </button>
                  
                  {issue.status === 'pending' && !isSelectMode && (
                    <button
                      onClick={() => handleEdit(issue)}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-['Satoshi'] font-medium hover:bg-amber-200 transition-colors"
                    >
                      <FiEdit2 /> Edit
                    </button>
                  )}
                  
                  {!isSelectMode && (
                    <button
                      onClick={() => handleDelete(issue._id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg font-['Satoshi'] font-medium hover:bg-red-200 transition-colors"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          )})}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 font-['Satoshi'] text-lg">
            {issues.length === 0
              ? "You haven't reported any issues yet. Start by reporting your first issue!"
              : 'No issues match your filters.'}
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedIssue && (
        <EditIssueModal
          issue={selectedIssue}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedIssue(null);
          }}
        />
      )}
    </div>
  );
};

export default MyIssues;
