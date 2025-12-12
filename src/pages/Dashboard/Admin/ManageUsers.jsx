import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiUserX, FiUserCheck, FiSearch, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch all citizens
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['allCitizens', searchTerm, statusFilter],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/admin/users', {
        params: { search: searchTerm, status: statusFilter }
      });
      return res.data.data || [];
    },
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
      title: user.isBlocked ? 'Unblock User?' : 'Block User?',
      text: user.isBlocked
        ? `Are you sure you want to unblock ${user.name}? They will be able to use the platform again.`
        : `Are you sure you want to block ${user.name}? They will not be able to submit, edit, upvote, or boost issues.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: user.isBlocked ? '#10b981' : '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: user.isBlocked ? 'Yes, Unblock' : 'Yes, Block',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        toggleBlockMutation.mutate({
          email: user.email,
          isBlocked: user.isBlocked || false
        });
      }
    });
  };

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      !statusFilter || 
      (statusFilter === 'blocked' && user.isBlocked) ||
      (statusFilter === 'active' && !user.isBlocked) ||
      (statusFilter === 'premium' && user.isPremium);

    return matchesSearch && matchesStatus;
  });

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
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-[#242424] font-['Satoshi'] mb-2">
          Manage Citizens
        </h1>
        <p className="text-gray-600 font-['Satoshi']">
          View and manage all registered citizens. Block or unblock users as needed.
        </p>
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
                              <span className="text-amber-500" title="Premium User">
                                👑
                              </span>
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
                          <span>👑</span> Premium
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
                        {user.issuesCount || 0} reported
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
    </div>
  );
};

export default ManageUsers;
