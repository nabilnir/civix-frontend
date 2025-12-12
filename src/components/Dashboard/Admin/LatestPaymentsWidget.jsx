import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FiDollarSign, FiUser, FiCalendar, FiArrowRight } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Badge from '../../Shared/Badge';
import { formatDate } from '../../../utils/formatDate';
import EmptyState from '../../Shared/EmptyState';

const LatestPaymentsWidget = ({ limit = 5 }) => {
  const axiosSecure = useAxiosSecure();

  const { data: latestPayments = [], isLoading } = useQuery({
    queryKey: ['latestPayments', limit],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/payments?limit=${limit}&sort=-createdAt`);
      return res.data.payments || [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#238ae9]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-['Satoshi'] font-bold text-lg text-[#242424]">
          Latest Payments
        </h3>
        <a
          href="/admin-dashboard/payments"
          className="text-sm text-[#238ae9] hover:underline font-['Satoshi'] flex items-center gap-1"
        >
          View All
          <FiArrowRight size={14} />
        </a>
      </div>

      {latestPayments.length === 0 ? (
        <EmptyState
          message="No payments yet"
          description="Payment transactions will appear here."
        />
      ) : (
        <div className="space-y-3">
          {latestPayments.map((payment) => (
            <div
              key={payment._id}
              className="p-4 bg-[#f4f6f8] rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        payment.type === 'premium_subscription'
                          ? 'warning'
                          : payment.type === 'boost'
                          ? 'info'
                          : 'default'
                      }
                      size="sm"
                    >
                      {payment.type === 'premium_subscription'
                        ? 'Premium'
                        : payment.type === 'boost'
                        ? 'Boost'
                        : payment.type}
                    </Badge>
                    <Badge
                      variant={payment.status === 'success' ? 'success' : 'danger'}
                      size="sm"
                    >
                      {payment.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 font-['Satoshi']">
                    <span className="flex items-center gap-1">
                      <FiUser size={12} />
                      {payment.userName || 'N/A'}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiCalendar size={12} />
                      {formatDate(payment.createdAt, 'relative')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <FiDollarSign className="text-green-600" size={16} />
                  <span className="font-['Satoshi'] font-bold text-sm text-green-600">
                    {payment.amount || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LatestPaymentsWidget;

