import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiTrendingUp, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import PaymentModal from './PaymentModal';

const BoostPayment = ({ issue, onSuccess, onCancel }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const boostPrice = 100; // BDT

  const boostMutation = useMutation({
    mutationFn: async () => {
      // Simulate payment
      const paymentResult = await new Promise((resolve) => {
        // In real app, integrate with payment gateway
        setTimeout(() => {
          resolve({ success: true, transactionId: `TXN-${Date.now()}` });
        }, 1000);
      });

      if (paymentResult.success) {
        // Record payment
        await axiosSecure.post('/api/payments', {
          amount: boostPrice,
          type: 'boost',
          issueId: issue._id,
          status: 'success',
        });

        // Update issue priority
        const res = await axiosSecure.patch(`/api/issues/${issue._id}/boost`);
        return res.data;
      }
      throw new Error('Payment failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['issues']);
      queryClient.invalidateQueries(['issue', issue._id]);
      toast.success('Issue boosted successfully!');
      if (onSuccess) {
        onSuccess();
      }
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to boost issue');
    },
  });

  const handleBoost = () => {
    Swal.fire({
      title: 'Boost Issue Priority?',
      html: `
        <div class="text-left">
          <p class="mb-3">Boost this issue to <strong>High Priority</strong> for <strong>${boostPrice} BDT</strong></p>
          <div class="bg-blue-50 p-3 rounded-lg text-sm">
            <p class="font-semibold mb-1">Benefits:</p>
            <ul class="list-disc list-inside space-y-1">
              <li>Higher visibility in issue lists</li>
              <li>Faster staff assignment</li>
              <li>Priority status badge</li>
            </ul>
          </div>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Pay ${boostPrice} BDT to Boost`,
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsModalOpen(true);
      }
    });
  };

  const handlePaymentSuccess = () => {
    boostMutation.mutate();
  };

  if (issue.priority === 'high' || issue.priority === 'High') {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg">
        <FiCheckCircle size={18} />
        <span className="font-['Satoshi'] font-semibold text-sm">
          This issue is already boosted
        </span>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={handleBoost}
        disabled={boostMutation.isPending || issue.status === 'resolved'}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-['Satoshi'] font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiTrendingUp size={18} />
        <span>Boost Priority ({boostPrice} BDT)</span>
      </button>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          if (onCancel) onCancel();
        }}
        amount={boostPrice}
        type="boost"
        description={`Boost issue: ${issue.title}`}
        issueId={issue._id}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default BoostPayment;

