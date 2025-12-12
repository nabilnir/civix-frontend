import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiLock, FiUnlock } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const BlockUserButton = ({ user, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const blockMutation = useMutation({
    mutationFn: async ({ email, isBlocked }) => {
      const res = await axiosSecure.patch(`/api/users/${email}/block`, {
        isBlocked: !isBlocked,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['users']);
      queryClient.invalidateQueries(['userRole']);
      toast.success(
        variables.isBlocked
          ? 'User unblocked successfully'
          : 'User blocked successfully'
      );
      if (onUpdate) {
        onUpdate();
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update user status');
    },
  });

  const handleToggleBlock = () => {
    const action = user.isBlocked ? 'unblock' : 'block';
    const actionText = user.isBlocked ? 'unblock' : 'block';

    Swal.fire({
      title: `${actionText.charAt(0).toUpperCase() + actionText.slice(1)} User?`,
      text: `Are you sure you want to ${actionText} ${user.name || user.email}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: user.isBlocked ? '#10b981' : '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Yes, ${actionText}!`,
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        blockMutation.mutate({
          email: user.email,
          isBlocked: user.isBlocked || false,
        });
      }
    });
  };

  return (
    <button
      onClick={handleToggleBlock}
      disabled={blockMutation.isPending}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-lg font-['Satoshi'] text-sm
        transition-colors
        ${user.isBlocked
          ? 'bg-green-50 text-green-700 hover:bg-green-100'
          : 'bg-red-50 text-red-700 hover:bg-red-100'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {user.isBlocked ? (
        <>
          <FiUnlock size={16} />
          <span>Unblock</span>
        </>
      ) : (
        <>
          <FiLock size={16} />
          <span>Block</span>
        </>
      )}
    </button>
  );
};

export default BlockUserButton;

