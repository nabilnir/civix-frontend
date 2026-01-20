import React from 'react';
import { FiCheckCircle, FiArrowRight, FiLock, FiStar } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
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
      <div className="bg-error/10 border-2 border-error/20 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <FiLock className="text-error" size={24} />
          <h3 className="text-xl font-bold text-error font-['Satoshi']">
            Account Blocked
          </h3>
        </div>
        <p className="text-error/80 font-['Satoshi'] mb-4">
          Your account has been blocked by the administrator. You cannot report issues or access premium features.
        </p>
        <p className="text-sm text-error/60 font-['Satoshi']">
          Please contact the authorities for assistance.
        </p>
      </div>
    );
  }

  if (isPremium) {
    return (
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl p-4 md:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-amber-500 rounded-full p-1.5 md:p-2 flex items-center justify-center flex-shrink-0">
              <FaCrown className="text-white" size={18} />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg md:text-xl font-bold text-amber-900 font-['Satoshi'] truncate">
                Premium Member
              </h3>
              <p className="text-xs md:text-sm text-amber-700 font-['Satoshi']">
                You have unlimited access
              </p>
            </div>
          </div>
          <span className="px-2 md:px-3 py-1 bg-amber-500 text-white rounded-full text-xs font-bold font-['Satoshi'] flex-shrink-0">
            ACTIVE
          </span>
        </div>

        <div className="space-y-2 mb-4 md:mb-6">
          {premiumBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <FiCheckCircle className="text-amber-600 flex-shrink-0" size={16} />
              <span className="text-amber-900 font-['Satoshi'] text-xs md:text-sm">{benefit}</span>
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
    <div className="bg-base-100 border-2 border-base-300 rounded-xl p-4 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-lg md:text-xl font-bold text-base-content font-['Satoshi'] mb-1">
            Free Plan
          </h3>
          <p className="text-xs md:text-sm text-base-content/60 font-['Satoshi']">
            {issueCount} / 3 issues reported
          </p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xl md:text-2xl font-bold text-primary font-['Satoshi']">1000</p>
          <p className="text-xs text-base-content/60 font-['Satoshi']">BDT / one-time</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-base-content/60 mb-1 font-['Satoshi']">
          <span>Issue Limit</span>
          <span>{issueCount} / 3</span>
        </div>
        <div className="w-full bg-base-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${issueCount >= 3
                ? 'bg-error'
                : issueCount >= 2
                  ? 'bg-warning'
                  : 'bg-success'
              }`}
            style={{ width: `${Math.min((issueCount / 3) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-2 mb-4 md:mb-6">
        {premiumBenefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2">
            <FiCheckCircle className="text-base-content/40 flex-shrink-0" size={14} />
            <span className="text-base-content/60 font-['Satoshi'] text-xs md:text-sm">{benefit}</span>
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
        className="w-full px-4 md:px-6 py-2.5 md:py-3 text-sm md:text-base bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-['Satoshi'] font-bold hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </>
        ) : (
          <>
            <FaCrown className="text-lg" />
            Upgrade to Premium
            <FiArrowRight size={18} />
          </>
        )}
      </button>

      {issueCount >= 3 && (
        <p className="text-xs text-error text-center mt-3 font-['Satoshi']">
          You've reached the free limit. Upgrade to continue reporting issues.
        </p>
      )}
    </div>
  );
};

export default SubscriptionCard;

