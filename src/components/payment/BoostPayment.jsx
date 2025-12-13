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

  // Create Stripe checkout session for boost
  const createBoostCheckoutMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post('/api/payments/create-checkout-session', {
        amount: boostPrice,
        type: 'boost',
        issueId: issue._id,
      });
      return res.data;
    },
    onSuccess: (data) => {
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Failed to create checkout session');
      }
    },
    onError: (error) => {
      console.error('Checkout session error:', error);
      toast.error(error.response?.data?.message || 'Failed to create checkout session. Please try again.');
    },
  });

  const handleBoost = () => {
    Swal.fire({
      title: 'Boost Issue Priority?',
      html: `
        <div class="text-left">
          <p class="mb-3">Boost this issue to <strong>High Priority</strong> for <strong>${boostPrice} BDT</strong></p>
          <p class="mb-3 text-sm text-gray-600">You will be redirected to Stripe to complete the payment.</p>
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
        createBoostCheckoutMutation.mutate();
      }
    });
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
        disabled={createBoostCheckoutMutation.isPending || issue.status === 'resolved'}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-['Satoshi'] font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FiTrendingUp size={18} />
        <span>Boost Priority ({boostPrice} BDT)</span>
      </button>
    </>
  );
};

export default BoostPayment;

