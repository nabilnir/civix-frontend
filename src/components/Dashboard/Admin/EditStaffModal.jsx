import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Modal from '../../Shared/Modal';
import FormInput from '../../Shared/FormInput';
import Select from '../../Shared/Select';

const EditStaffModal = ({ isOpen, onClose, staff }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: '',
  });

  const departments = [
    'Public Works',
    'Water & Sewerage',
    'Electrical',
    'Roads & Transportation',
    'Parks & Recreation',
    'Building & Safety',
    'General Services',
  ];

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || '',
        phone: staff.phone || '',
        department: staff.department || '',
      });
    }
  }, [staff]);

  const updateStaffMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.patch(`/api/staff/${staff.email}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['staff']);
      toast.success('Staff member updated successfully');
      handleClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update staff member');
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.department) {
      toast.error('Please fill in all required fields');
      return;
    }
    updateStaffMutation.mutate(formData);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      department: '',
    });
    onClose();
  };

  if (!staff) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Staff Member" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-gray-600 font-['Satoshi']">
            <FiMail size={14} />
            <span>{staff.email}</span>
          </div>
        </div>

        <FormInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter staff name"
          required
        />

        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          icon={FiPhone}
        />

        <Select
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          options={departments.map((dept) => ({ value: dept, label: dept }))}
          placeholder="Select department"
          required
        />

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updateStaffMutation.isPending}
            className="px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] text-sm hover:bg-[#1e7acc] transition-colors disabled:opacity-50"
          >
            {updateStaffMutation.isPending ? 'Updating...' : 'Update Staff'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditStaffModal;

