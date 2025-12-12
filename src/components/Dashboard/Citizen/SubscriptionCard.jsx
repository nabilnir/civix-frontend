import React from 'react';
import { FiCrown, FiCheckCircle, FiArrowRight, FiLock } from 'react-icons/fi';
import { useNavigate } from 'react-router';

const SubscriptionCard = ({
  isPremium = false,
  isBlocked = false,
  issueCount = 0,
  onSubscribe,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  const premiumBenefits = [
    'Unlimited issue reports',
    'Priority support',
    'Free issue boosting',
    'Advanced analytics',
    'Early access to features',
  ];

  if (isBlocked) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <FiLock className="text-red-600" size={24} />
          <h3 className="text-xl font-bold text-red-800 font-['Satoshi']">
            Account Blocked
          </h3>
        </div>
        <p className="text-red-700 font-['Satoshi'] mb-4">
          Your account has been blocked by the administrator. You cannot report issues or access premium features.
        </p>
        <p className="text-sm text-red-600 font-['Satoshi']">
          Please contact the authorities for assistance.
        </p>
      </div>
    );
  }

  if (isPremium) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 rounded-full p-2">
              <FiCrown className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900 font-['Satoshi']">
                Premium Member
              </h3>
              <p className="text-sm text-amber-700 font-['Satoshi']">
                You have unlimited access
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold font-['Satoshi']">
            ACTIVE
          </span>
        </div>

        <div className="space-y-2 mb-6">
          {premiumBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <FiCheckCircle className="text-amber-600 flex-shrink-0" size={18} />
              <span className="text-amber-900 font-['Satoshi'] text-sm">{benefit}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-amber-200">
          <p className="text-xs text-amber-700 font-['Satoshi'] text-center">
            Thank you for being a premium member! 🎉
          </p>
        </div>
      </div>
    );
  }

  // Free user - show upgrade option
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-[#242424] font-['Satoshi'] mb-1">
            Free Plan
          </h3>
          <p className="text-sm text-gray-600 font-['Satoshi']">
            {issueCount} / 3 issues reported
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#238ae9] font-['Satoshi']">1000</p>
          <p className="text-xs text-gray-500 font-['Satoshi']">BDT / one-time</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1 font-['Satoshi']">
          <span>Issue Limit</span>
          <span>{issueCount} / 3</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${
              issueCount >= 3
                ? 'bg-red-500'
                : issueCount >= 2
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${Math.min((issueCount / 3) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-2 mb-6">
        {premiumBenefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2">
            <FiCheckCircle className="text-gray-400 flex-shrink-0" size={16} />
            <span className="text-gray-600 font-['Satoshi'] text-sm">{benefit}</span>
          </div>
        ))}
      </div>

      {/* Upgrade Button */}
      <button
        onClick={() => {
          if (onSubscribe) {
            onSubscribe();
          } else {
            navigate('/dashboard/profile');
          }
        }}
        disabled={isLoading}
        className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-['Satoshi'] font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          <>
            <FiCrown size={18} />
            Upgrade to Premium
            <FiArrowRight size={18} />
          </>
        )}
      </button>

      {issueCount >= 3 && (
        <p className="text-xs text-red-600 text-center mt-3 font-['Satoshi']">
          You've reached the free limit. Upgrade to continue reporting issues.
        </p>
      )}
    </div>
  );
};

export default SubscriptionCard;

