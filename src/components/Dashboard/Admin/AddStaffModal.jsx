import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiX, FiUser, FiMail, FiPhone, FiBriefcase } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Modal from '../../Shared/Modal';
import FormInput from '../../Shared/FormInput';
import Select from '../../Shared/Select';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import app from '../../../firebase/firebase.config';

const AddStaffModal = ({ isOpen, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const auth = getAuth(app);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    password: '',
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

  const addStaffMutation = useMutation({
    mutationFn: async (data) => {
      // Create Firebase account first
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Then create staff in database
      const res = await axiosSecure.post('/api/staff', {
        name: data.name,
        email: data.email,
        phone: data.phone,
        department: data.department,
        firebaseUid: userCredential.user.uid,
        role: 'staff',
      });

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['staff']);
      toast.success('Staff member added successfully');
      handleClose();
    },
    onError: (error) => {
      console.error('Add staff error:', error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already registered');
      } else {
        toast.error(error.response?.data?.message || 'Failed to add staff member');
      }
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
    if (!formData.name || !formData.email || !formData.password || !formData.department) {
      toast.error('Please fill in all required fields');
      return;
    }
    addStaffMutation.mutate(formData);
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      password: '',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Staff Member" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter staff name"
          required
          icon={FiUser}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          required
          icon={FiMail}
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

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password (min 6 characters)"
          required
          minLength={6}
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
            disabled={addStaffMutation.isPending}
            className="px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] text-sm hover:bg-[#1e7acc] transition-colors disabled:opacity-50"
          >
            {addStaffMutation.isPending ? 'Adding...' : 'Add Staff'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStaffModal;

