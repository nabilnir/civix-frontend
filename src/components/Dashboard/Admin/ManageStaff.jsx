import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import app from '../../../firebase/firebase.config';
import { validatePassword } from '../../../Utils/passwordValidation';

const ManageStaff = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const auth = getAuth(app);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  // get all staff
  const { data: staffList = [], isLoading } = useQuery({
    queryKey: ['allStaff'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/staff');
      return res.data.data || [];
    },
  });

  // add staff mutation
  const addStaffMutation = useMutation({
    mutationFn: async (staffData) => {
      // first create firebase account
      const firebaseUser = await createUserWithEmailAndPassword(
        auth,
        staffData.email,
        staffData.password
      );

      // then create in database
      const res = await axiosSecure.post('/api/staff', {
        ...staffData,
        photoURL: staffData.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png',
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allStaff']);
      toast.success('Staff member added successfully');
      setShowAddModal(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add staff member');
    },
  });

  // update staff mutation
  const updateStaffMutation = useMutation({
    mutationFn: async ({ email, updates }) => {
      const res = await axiosSecure.patch(`/api/staff/${email}`, updates);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allStaff']);
      toast.success('Staff member updated successfully');
      setShowEditModal(false);
      setSelectedStaff(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update staff member');
    },
  });

  // delete staff mutation
  const deleteStaffMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.delete(`/api/staff/${email}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allStaff']);
      toast.success('Staff member deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete staff member');
    },
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    
    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message);
      return;
    }
    
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      password: password,
      photoURL: e.target.photoURL.value || 'https://i.ibb.co/2W8Py4W/default-avatar.png',
    };
    addStaffMutation.mutate(formData);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updates = {
      name: e.target.name.value,
      phone: e.target.phone.value,
      photoURL: e.target.photoURL.value || selectedStaff.photoURL,
    };
    updateStaffMutation.mutate({
      email: selectedStaff.email,
      updates,
    });
  };

  const handleDelete = (staff) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Delete ${staff.name}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStaffMutation.mutate(staff.email);
      }
    });
  };

  const handleEditClick = (staff) => {
    setSelectedStaff(staff);
    setShowEditModal(true);
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#242424] font-['Satoshi'] mb-2">
            Manage Staff
          </h1>
          <p className="text-gray-600 font-['Satoshi']">
            Add, edit, or remove staff members
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors"
        >
          <FiPlus /> Add Staff
        </button>
      </div>

      {/* staff table */}
      {staffList.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f4f6f8]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Staff Member
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Assigned Issues
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Resolved
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 font-['Satoshi'] uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {staffList.map((staff) => (
                  <tr key={staff._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={staff.photoURL || 'https://i.ibb.co/2W8Py4W/default-avatar.png'}
                          alt={staff.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-['Satoshi'] font-semibold text-[#242424]">
                          {staff.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-['Satoshi'] text-sm text-gray-600">
                        {staff.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-['Satoshi'] text-sm text-gray-600">
                        {staff.phone || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-['Satoshi'] text-sm text-[#242424]">
                        {staff.assignedIssuesCount || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-['Satoshi'] text-sm text-[#242424]">
                        {staff.resolvedIssuesCount || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(staff)}
                          className="p-2 text-[#238ae9] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDelete(staff)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
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
        <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-100">
          <p className="text-gray-500 font-['Satoshi'] text-lg">No staff members found</p>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#242424] font-['Satoshi']">
                  Add Staff Member
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX />
                </button>
              </div>
              
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={8}
                    placeholder="Enter a strong password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
                  />
                  <p className="text-xs text-gray-500 mt-1 font-['Satoshi']">
                    Must be 8+ characters with uppercase, lowercase, number, and special character
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
                    placeholder="https://..."
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={addStaffMutation.isPending}
                    className="flex-1 px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors disabled:opacity-50"
                  >
                    {addStaffMutation.isPending ? 'Adding...' : 'Add Staff'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditModal && selectedStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#242424] font-['Satoshi']">
                  Edit Staff Member
                </h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedStaff(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX />
                </button>
              </div>
              
              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedStaff.name}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={selectedStaff.email}
                    disabled
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg font-['Satoshi'] text-gray-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    defaultValue={selectedStaff.phone}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    defaultValue={selectedStaff.photoURL}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9]"
                  />
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedStaff(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateStaffMutation.isPending}
                    className="flex-1 px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] font-semibold hover:bg-[#1e7acc] transition-colors disabled:opacity-50"
                  >
                    {updateStaffMutation.isPending ? 'Updating...' : 'Update Staff'}
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

export default ManageStaff;
