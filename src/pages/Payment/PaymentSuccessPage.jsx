import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PaymentSuccess from '../../components/payment/PaymentSuccess';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [payment, setPayment] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);

  const sessionId = searchParams.get('session_id');
  const type = searchParams.get('type') || 'premium_subscription';
  const issueId = searchParams.get('issueId');

  // Verify payment mutation
  const verifyPaymentMutation = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.post('/api/payments/verify-payment', {
        sessionId,
      });
      return res.data;
    },
    onSuccess: (data) => {
      setPayment(data.data);
      setIsVerifying(false);
      queryClient.invalidateQueries(['userRole']);
      queryClient.invalidateQueries(['userProfile']);
      queryClient.invalidateQueries(['paymentHistory', user?.email]);
      toast.success('Payment verified successfully!');
    },
    onError: (error) => {
      console.error('Payment verification error:', error);
      setIsVerifying(false);
      toast.error(error.response?.data?.message || 'Failed to verify payment');
      // Redirect to cancel page after a delay
      setTimeout(() => {
        navigate('/payment/cancel');
      }, 2000);
    },
  });

  useEffect(() => {
    if (!sessionId) {
      toast.error('Invalid payment session');
      navigate('/payment/cancel');
      return;
    }

    if (sessionId && isVerifying) {
      verifyPaymentMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#238ae9] mx-auto mb-4"></div>
          <p className="text-gray-600 font-['Satoshi']">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-['Satoshi']">Payment verification failed</p>
        </div>
      </div>
    );
  }

  return <PaymentSuccess payment={payment} type={type} />;
};

export default PaymentSuccessPage;

