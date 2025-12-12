import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiCheckCircle, FiZap, FiUsers, FiTrendingUp, FiShield } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import PaymentModal from './PaymentModal';

const SubscriptionPayment = ({ onSuccess }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const premiumPrice = 1000; // BDT

  const subscribeMutation = useMutation({
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
          amount: premiumPrice,
          type: 'premium_subscription',
          status: 'success',
        });

        // Update user to premium
        const res = await axiosSecure.patch(`/api/users/${user.email}/premium`);
        return res.data;
      }
      throw new Error('Payment failed');
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userRole']);
      queryClient.invalidateQueries(['userProfile']);
      toast.success('Premium subscription activated!');
      if (onSuccess) {
        onSuccess();
      }
      setIsModalOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to process subscription');
    },
  });

  const handleSubscribe = () => {
    Swal.fire({
      title: 'Upgrade to Premium?',
      html: `
        <div class="text-left">
          <p class="mb-4">Unlock unlimited issue reports for <strong>${premiumPrice} BDT</strong> (one-time payment)</p>
          <div class="bg-amber-50 p-4 rounded-lg text-sm space-y-2">
            <p class="font-semibold mb-2">Premium Benefits:</p>
            <div class="flex items-start gap-2">
              <i class="fas fa-check text-green-600 mt-0.5"></i>
              <span>Unlimited issue reports</span>
            </div>
            <div class="flex items-start gap-2">
              <i class="fas fa-check text-green-600 mt-0.5"></i>
              <span>Priority support</span>
            </div>
            <div class="flex items-start gap-2">
              <i class="fas fa-check text-green-600 mt-0.5"></i>
              <span>Free issue boosting</span>
            </div>
            <div class="flex items-start gap-2">
              <i class="fas fa-check text-green-600 mt-0.5"></i>
              <span>Advanced analytics</span>
            </div>
          </div>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#238ae9',
      cancelButtonColor: '#6b7280',
      confirmButtonText: `Pay ${premiumPrice} BDT`,
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        setIsModalOpen(true);
      }
    });
  };

  const handlePaymentSuccess = () => {
    subscribeMutation.mutate();
  };

  const premiumBenefits = [
    { icon: <FiZap size={18} />, text: 'Unlimited issue reports' },
    { icon: <FiUsers size={18} />, text: 'Priority support' },
    { icon: <FiTrendingUp size={18} />, text: 'Free issue boosting' },
    { icon: <FiShield size={18} />, text: 'Advanced analytics' },
  ];

  return (
    <>
      <button
        onClick={handleSubscribe}
        disabled={subscribeMutation.isPending}
        className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-['Satoshi'] font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <FiCheckCircle size={20} />
        <span>Subscribe to Premium - {premiumPrice} BDT</span>
      </button>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={premiumPrice}
        type="premium_subscription"
        description="Premium Subscription - Unlimited Issue Reports"
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default SubscriptionPayment;

