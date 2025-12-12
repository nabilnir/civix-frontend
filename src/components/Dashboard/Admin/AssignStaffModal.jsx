import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Modal from '../../Shared/Modal';
import Select from '../../Shared/Select';
import Avatar from '../../Shared/Avatar';
import Badge from '../../Shared/Badge';

const AssignStaffModal = ({ isOpen, onClose, issue }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedStaff, setSelectedStaff] = useState('');

  const { data: staffList = [], isLoading } = useQuery({
    queryKey: ['staffList'],
    queryFn: async () => {
      const res = await axiosSecure.get('/api/staff');
      return res.data || [];
    },
    enabled: isOpen,
  });

  const assignMutation = useMutation({
    mutationFn: async (staffEmail) => {
      const res = await axiosSecure.patch(`/api/issues/${issue._id}/assign`, {
        staffEmail,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['issues']);
      queryClient.invalidateQueries(['issue', issue._id]);
      toast.success('Staff assigned successfully');
      setSelectedStaff('');
      onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to assign staff');
    },
  });

  const handleAssign = () => {
    if (!selectedStaff) {
      toast.error('Please select a staff member');
      return;
    }
    assignMutation.mutate(selectedStaff);
  };

  const handleClose = () => {
    setSelectedStaff('');
    onClose();
  };

  if (!issue) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Assign Staff Member" size="lg">
      <div className="space-y-6">
        {/* Issue Info */}
        <div className="bg-[#f4f6f8] rounded-lg p-4">
          <h4 className="font-['Satoshi'] font-semibold text-sm text-gray-600 mb-2">
            Issue Details
          </h4>
          <p className="font-['Satoshi'] font-bold text-[#242424]">{issue.title}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="info" size="sm">
              {issue.category}
            </Badge>
            {issue.status && (
              <Badge variant="default" size="sm">
                {issue.status}
              </Badge>
            )}
          </div>
        </div>

        {/* Staff Selection */}
        <div>
          <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-3">
            Select Staff Member
          </label>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#238ae9]"></div>
            </div>
          ) : staffList.length === 0 ? (
            <div className="text-center py-8 text-gray-500 font-['Satoshi']">
              No staff members available
            </div>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {staffList.map((staff) => (
                <button
                  key={staff._id}
                  onClick={() => setSelectedStaff(staff.email)}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors font-['Satoshi']
                    ${
                      selectedStaff === staff.email
                        ? 'border-[#238ae9] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <Avatar src={staff.photoURL} name={staff.name} size="md" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm text-[#242424]">{staff.name}</p>
                    <p className="text-xs text-gray-600">{staff.email}</p>
                    {staff.department && (
                      <Badge variant="info" size="sm" className="mt-1">
                        {staff.department}
                      </Badge>
                    )}
                  </div>
                  {selectedStaff === staff.email && (
                    <div className="w-5 h-5 bg-[#238ae9] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-lg font-['Satoshi'] text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedStaff || assignMutation.isPending}
            className="px-4 py-2 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] text-sm hover:bg-[#1e7acc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {assignMutation.isPending ? 'Assigning...' : 'Assign Staff'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignStaffModal;

