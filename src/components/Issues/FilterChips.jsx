import React from 'react';
import { FiX } from 'react-icons/fi';

const FilterChips = ({ filterState, onRemoveFilter, onClearAll, className = '' }) => {
  const activeFilters = [];

  if (filterState.search) {
    activeFilters.push({ type: 'search', label: `Search: "${filterState.search}"`, value: filterState.search });
  }
  if (filterState.category) {
    activeFilters.push({ type: 'category', label: `Category: ${filterState.category}`, value: filterState.category });
  }
  if (filterState.status) {
    activeFilters.push({ type: 'status', label: `Status: ${filterState.status}`, value: filterState.status });
  }
  if (filterState.priority) {
    activeFilters.push({ type: 'priority', label: `Priority: ${filterState.priority}`, value: filterState.priority });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  const getChipColor = (type) => {
    switch (type) {
      case 'search':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'category':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'status':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'priority':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-sm font-semibold text-gray-600 font-['Satoshi'] mr-1">
        Active Filters:
      </span>
      
      {activeFilters.map((filter, index) => (
        <span
          key={index}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-['Satoshi'] font-medium border ${getChipColor(
            filter.type
          )}`}
        >
          {filter.label}
          <button
            onClick={() => onRemoveFilter(filter.type)}
            className="hover:bg-black/10 rounded-full p-0.5 transition-colors"
            aria-label={`Remove ${filter.type} filter`}
          >
            <FiX size={14} />
          </button>
        </span>
      ))}

      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="px-3 py-1.5 text-xs font-['Satoshi'] font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

export default FilterChips;

