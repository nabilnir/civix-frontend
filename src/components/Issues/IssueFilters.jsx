import React from 'react';
import { FiFilter, FiX, FiLayers, FiTag, FiAlertTriangle, FiSearch } from 'react-icons/fi';

const IssueFilters = ({
  filterState,
  onFilterChange,
  onSearchChange,
  onClearFilters,
  showSearch = true,
  showCategory = true,
  showStatus = true,
  showPriority = true,
  className = '',
}) => {
  const hasActiveFilters = 
    filterState.status || 
    filterState.category || 
    filterState.priority || 
    filterState.search;

  const categories = [
    'Roads',
    'Lighting',
    'Plumbing',
    'Garbage',
    'Safety',
    'Footpath',
    'Other',
  ];

  const statuses = [
    'Pending',
    'In-Progress',
    'Working',
    'Resolved',
    'Closed',
    'Rejected',
  ];

  const priorities = ['High', 'Normal', 'Low'];

  const handleFilterToggle = (type, value) => {
    const currentValue = filterState[type];
    const newValue = currentValue === value ? '' : value;
    onFilterChange(type, newValue);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FiFilter className="text-[#238ae9]" size={20} />
          <h3 className="font-['Satoshi'] font-bold text-lg text-[#242424]">
            Filters
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-red-600 font-['Satoshi'] font-medium transition-colors"
          >
            <FiX size={16} />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search Bar */}
        {showSearch && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-['Satoshi']">
              Search Issues
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                value={filterState.search || ''}
                onChange={(e) => onSearchChange(e)}
                placeholder="Search by title, location, or description..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg font-['Satoshi'] focus:outline-none focus:ring-2 focus:ring-[#238ae9] focus:border-transparent transition-all"
              />
              {filterState.search && (
                <button
                  onClick={() => onSearchChange({ target: { value: '' } })}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={18} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Category Filter */}
        {showCategory && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiLayers className="text-[#238ae9]" size={18} />
              <label className="block text-sm font-semibold text-gray-700 font-['Satoshi']">
                Category
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilterToggle('category', cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-['Satoshi'] font-medium transition-all ${
                    filterState.category === cat
                      ? 'bg-[#238ae9] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Status Filter */}
        {showStatus && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiTag className="text-[#238ae9]" size={18} />
              <label className="block text-sm font-semibold text-gray-700 font-['Satoshi']">
                Status
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleFilterToggle('status', status)}
                  className={`px-4 py-2 rounded-lg text-sm font-['Satoshi'] font-medium transition-all ${
                    filterState.status === status
                      ? 'bg-[#238ae9] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Priority Filter */}
        {showPriority && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <FiAlertTriangle className="text-[#238ae9]" size={18} />
              <label className="block text-sm font-semibold text-gray-700 font-['Satoshi']">
                Priority
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => (
                <button
                  key={priority}
                  onClick={() => handleFilterToggle('priority', priority)}
                  className={`px-4 py-2 rounded-lg text-sm font-['Satoshi'] font-medium transition-all ${
                    filterState.priority === priority
                      ? 'bg-[#238ae9] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 font-['Satoshi'] mb-2">
            Active Filters:
          </p>
          <div className="flex flex-wrap gap-2">
            {filterState.search && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-['Satoshi'] font-medium">
                Search: {filterState.search}
              </span>
            )}
            {filterState.category && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-['Satoshi'] font-medium">
                Category: {filterState.category}
              </span>
            )}
            {filterState.status && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-['Satoshi'] font-medium">
                Status: {filterState.status}
              </span>
            )}
            {filterState.priority && (
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-['Satoshi'] font-medium">
                Priority: {filterState.priority}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IssueFilters;
