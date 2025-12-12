import React, { useState } from 'react';
import { FiX, FiCreditCard, FiLock, FiCheckCircle } from 'react-icons/fi';
import Modal from '../Shared/Modal';
import { handlePayment } from '../../Utils/payment';
import toast from 'react-hot-toast';

const PaymentModal = ({
  isOpen,
  onClose,
  amount,
  type,
  description,
  onSuccess,
  issueId,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleSubmit = async () => {
    setIsProcessing(true);
    try {
      const result = await handlePayment(amount, type, issueId);
      if (result.success) {
        toast.success('Payment processed successfully!');
        if (onSuccess) {
          onSuccess(result);
        }
        onClose();
      } else {
        toast.error(result.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { value: 'card', label: 'Credit/Debit Card', icon: <FiCreditCard /> },
    { value: 'mobile', label: 'Mobile Banking', icon: <FiCreditCard /> },
    { value: 'bank', label: 'Bank Transfer', icon: <FiCreditCard /> },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Complete Payment" size="md">
      <div className="space-y-6">
        {/* Payment Summary */}
        <div className="bg-[#f4f6f8] rounded-lg p-4">
          <h4 className="font-['Satoshi'] font-semibold text-sm text-gray-600 mb-3">
            Payment Summary
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-['Satoshi'] text-sm text-gray-600">{description}</span>
              <span className="font-['Satoshi'] font-bold text-lg text-[#242424]">
                {amount} BDT
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 font-['Satoshi']">
              <span>Payment Type:</span>
              <span className="capitalize">{type}</span>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-3">
            Select Payment Method
          </label>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.value}
                onClick={() => setPaymentMethod(method.value)}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-colors font-['Satoshi']
                  ${
                    paymentMethod === method.value
                      ? 'border-[#238ae9] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div
                  className={`${
                    paymentMethod === method.value ? 'text-[#238ae9]' : 'text-gray-400'
                  }`}
                >
                  {method.icon}
                </div>
                <span className="flex-1 text-left text-sm font-medium text-[#242424]">
                  {method.label}
                </span>
                {paymentMethod === method.value && (
                  <FiCheckCircle className="text-[#238ae9]" size={20} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
          <FiLock className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
          <p className="text-xs text-green-700 font-['Satoshi']">
            Your payment is secure and encrypted. We do not store your card details.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-['Satoshi'] text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 bg-[#238ae9] text-white rounded-lg font-['Satoshi'] text-sm font-semibold hover:bg-[#1e7acc] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              <>
                <FiCreditCard size={16} />
                Pay {amount} BDT
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;

