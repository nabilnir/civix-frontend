import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiChevronDown, FiCheckCircle, FiClock, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Modal from '../../Shared/Modal';
import Textarea from '../../Shared/Textarea';

const ChangeStatusDropdown = ({ issue, onStatusChange }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [message, setMessage] = useState('');

  const statusOptions = [
    { value: 'pending', label: 'Pending', icon: <FiClock />, color: 'text-yellow-600' },
    { value: 'in-progress', label: 'In Progress', icon: <FiClock />, color: 'text-blue-600' },
    { value: 'resolved', label: 'Resolved', icon: <FiCheckCircle />, color: 'text-green-600' },
    { value: 'rejected', label: 'Rejected', icon: <FiX />, color: 'text-red-600' },
  ];

  const updateStatusMutation = useMutation({
    mutationFn: async ({ status, message: statusMessage }) => {
      const res = await axiosSecure.patch(`/api/issues/${issue._id}/status`, {
        status,
        message: statusMessage,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['assignedIssues']);
      queryClient.invalidateQueries(['issues']);
      toast.success('Status updated successfully');
      setShowMessageModal(false);
      setMessage('');
      setIsOpen(false);
      if (onStatusChange) {
        onStatusChange();
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update status');
    },
  });

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    if (status === 'resolved' || status === 'rejected') {
      setShowMessageModal(true);
    } else {
      updateStatusMutation.mutate({ status, message: '' });
    }
    setIsOpen(false);
  };

  const handleSubmitMessage = () => {
    if (!message.trim() && (selectedStatus === 'resolved' || selectedStatus === 'rejected')) {
      toast.error('Please provide a message');
      return;
    }
    updateStatusMutation.mutate({ status: selectedStatus, message });
  };

  const currentStatus = statusOptions.find((opt) => opt.value === issue.status);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg border font-['Satoshi'] text-sm
            transition-colors
            ${currentStatus?.color || 'text-gray-600'}
            ${isOpen ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'}
            border-gray-300
          `}
        >
          {currentStatus?.icon}
          <span>{currentStatus?.label || issue.status}</span>
          <FiChevronDown
            size={16}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-50 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleStatusSelect(option.value)}
                  disabled={option.value === issue.status}
                  className={`
                    w-full flex items-center gap-2 px-4 py-2 text-left font-['Satoshi'] text-sm
                    transition-colors
                    ${option.value === issue.status ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-50'}
                    ${option.color}
                  `}
                >
                  {option.icon}
                  <span>{option.label}</span>
                  {option.value === issue.status && (
                    <span className="ml-auto text-xs text-gray-500">(Current)</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Message Modal */}
      <Modal
        isOpen={showMessageModal}
        onClose={() => {
          setShowMessageModal(false);
          setMessage('');
          setSelectedStatus(null);
        }}
        title={`Update Status to ${selectedStatus === 'resolved' ? 'Resolved' : 'Rejected'}`}
      >
        <div className="space-y-4">
          <Textarea
            label="Progress Message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter update message..."
            rows={4}
            required
          />
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                setShowMessageModal(false);
                setMessage('');
                setSelectedStatus(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] text-sm hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitMessage}
              disabled={updateStatusMutation.isPending}
              className="px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] text-sm hover:bg-[#1e7acc] transition-colors disabled:opacity-50"
            >
              {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ChangeStatusDropdown;

