import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import Select from '../../Shared/Select';
import SearchInput from '../../Shared/SearchInput';
import Badge from '../../Shared/Badge';

const PaymentFilters = ({
  filters = {},
  onFilterChange,
  onSearchChange,
  onClearFilters,
}) => {
  const activeFiltersCount = Object.values(filters).filter((val) => val !== '' && val !== null)
    .length;

  const paymentTypes = [
    { value: '', label: 'All Types' },
    { value: 'premium_subscription', label: 'Premium Subscription' },
    { value: 'boost', label: 'Issue Boost' },
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'success', label: 'Success' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
  ];

  const dateRangeOptions = [
    { value: '', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiFilter className="text-[#238ae9]" size={20} />
          <h3 className="font-['Satoshi'] font-bold text-lg text-[#242424]">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeFiltersCount} active
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-red-600 font-['Satoshi'] transition-colors"
          >
            <FiX size={14} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <SearchInput
            placeholder="Search by user, transaction ID..."
            value={filters.search || ''}
            onChange={onSearchChange}
            debounceMs={300}
          />
        </div>

        <Select
          label="Payment Type"
          name="type"
          value={filters.type || ''}
          onChange={(e) => onFilterChange('type', e.target.value)}
          options={paymentTypes}
          placeholder="Select type"
        />

        <Select
          label="Status"
          name="status"
          value={filters.status || ''}
          onChange={(e) => onFilterChange('status', e.target.value)}
          options={statusOptions}
          placeholder="Select status"
        />

        <Select
          label="Date Range"
          name="dateRange"
          value={filters.dateRange || ''}
          onChange={(e) => onFilterChange('dateRange', e.target.value)}
          options={dateRangeOptions}
          placeholder="Select range"
        />
      </div>
    </div>
  );
};

export default PaymentFilters;

