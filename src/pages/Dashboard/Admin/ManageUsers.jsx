import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiUserX, FiUserCheck, FiSearch, FiFilter } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch all citizens
  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ['allCitizens', searchTerm, statusFilter],
    queryFn: async () => {
      try {
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (statusFilter) params.status = statusFilter;
        
        const res = await axiosSecure.get('/api/admin/users', { params });
        
        if (!res.data.success) {
          throw new Error(res.data.message || 'Failed to fetch users');
        }
        
        return res.data.data || [];
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to fetch users');
        throw err;
      }
    },
    retry: 2,
    refetchOnWindowFocus: true,
    staleTime: 0, // Always consider data stale to allow refetch
  });

  // Block/Unblock mutation
  const toggleBlockMutation = useMutation({
    mutationFn: async ({ email, isBlocked }) => {
      const res = await axiosSecure.patch(`/api/admin/users/${email}/block`, {
        isBlocked: !isBlocked
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['allCitizens']);
      toast.success(
        variables.isBlocked 
          ? 'User unblocked successfully' 
          : 'User blocked successfully'
      );
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update user status');
    },
  });

  const handleBlockToggle = (user) => {
    Swal.fire({
      title: user.isBlocked ? 'Unblock User?' : '⚠️ Block User?',
      html: user.isBlocked
        ? `
          <div style="text-align: left;">
            <p style="margin-bottom: 10px;"><strong>User Details:</strong></p>
            <p style="margin-bottom: 5px;">Name: <strong>${user.name}</strong></p>
            <p style="margin-bottom: 15px;">Email: <strong>${user.email}</strong></p>
            <p>Are you sure you want to <strong>unblock</strong> this user? They will be able to use the platform again.</p>
          </div>
        `
        : `
          <div style="text-align: left;">
            <p style="margin-bottom: 10px;"><strong>User Details:</strong></p>
            <p style="margin-bottom: 5px;">Name: <strong>${user.name}</strong></p>
            <p style="margin-bottom: 15px;">Email: <strong>${user.email}</strong></p>
            <p style="color: #ef4444; font-weight: bold; margin-bottom: 10px;">⚠️ Warning: This action will:</p>
            <ul style="text-align: left; margin-left: 20px; color: #ef4444;">
              <li>Prevent the user from submitting new issues</li>
              <li>Prevent the user from editing existing issues</li>
              <li>Prevent the user from upvoting issues</li>
              <li>Prevent the user from boosting issues</li>
            </ul>
            <p style="margin-top: 15px;">Are you sure you want to <strong>block</strong> this user?</p>
          </div>
        `,
      icon: user.isBlocked ? 'question' : 'warning',
      iconColor: user.isBlocked ? '#10b981' : '#ef4444',
      showCancelButton: true,
      confirmButtonColor: user.isBlocked ? '#10b981' : '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: user.isBlocked ? 'Yes, Unblock User' : 'Yes, Block User',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      focusConfirm: false,
      allowOutsideClick: false,
      allowEscapeKey: true,
    }).then((result) => {
      if (result.isConfirmed) {
        toggleBlockMutation.mutate({
          email: user.email,
          isBlocked: user.isBlocked || false
        });
      }
    });
  };

  // Users are already filtered by backend, but we can do additional client-side filtering if needed
  // For now, use users directly since backend handles filtering
  const filteredUsers = users;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 font-['Satoshi'] mb-2">Error loading users</p>
          <p className="text-gray-500 font-['Satoshi'] text-sm">
            {error?.response?.data?.message || error?.message || 'Please try again'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-[#242424] font-['Satoshi'] mb-2">
          Manage Citizens
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
          View and manage all registered citizens. Block or unblock users as needed.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-600 font-['Satoshi'] text-sm mb-1">Total Users</p>
          <p className="text-2xl font-bold text-[#242424] font-['Satoshi']">
            {users.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-600 font-['Satoshi'] text-sm mb-1">Premium Users</p>
          <p className="text-2xl font-bold text-amber-600 font-['Satoshi']">
            {users.filter(u => u.isPremium).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-600 font-['Satoshi'] text-sm mb-1">Active Users</p>
          <p className="text-2xl font-bold text-green-600 font-['Satoshi']">
            {users.filter(u => !u.isBlocked).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-gray-600 font-['Satoshi'] text-sm mb-1">Blocked Users</p>
          <p className="text-2xl font-bold text-red-600 font-['Satoshi']">
            {users.filter(u => u.isBlocked).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9] appearance-none bg-white"
            >
              <option value="">All Users</option>
              <option value="active">Active</option>
              <option value="blocked">Blocked</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f4f6f8]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider font-['Satoshi']">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider font-['Satoshi']">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider font-['Satoshi']">
                    Subscription
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider font-['Satoshi']">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider font-['Satoshi']">
                    Issues
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider font-['Satoshi']">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id || user.email} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-['Satoshi'] font-semibold text-sm text-[#242424] flex items-center gap-2">
                            {user.name}
                            {user.isPremium && (
                              <FaCrown className="text-amber-500" title="Premium User" />
                            )}
                          </p>
                          <p className="font-['Satoshi'] text-xs text-gray-500">
                            Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-['Satoshi'] text-sm text-gray-600">{user.email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isPremium ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold font-['Satoshi']">
                          <FaCrown /> Premium
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold font-['Satoshi']">
                          Free
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isBlocked ? (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold font-['Satoshi']">
                          Blocked
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold font-['Satoshi']">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-['Satoshi'] text-sm text-gray-600">
                        {user.issuesCount || user.issueCount || 0} reported
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleBlockToggle(user)}
                        disabled={toggleBlockMutation.isPending}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-['Satoshi'] text-sm font-semibold transition-colors disabled:opacity-50 ${
                          user.isBlocked
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        {user.isBlocked ? (
                          <>
                            <FiUserCheck /> Unblock
                          </>
                        ) : (
                          <>
                            <FiUserX /> Block
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-gray-500 font-['Satoshi'] text-lg">
              {searchTerm || statusFilter
                ? 'No users match your filters.'
                : 'No citizens registered yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
