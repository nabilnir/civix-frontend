import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchInput = ({
  placeholder = 'Search...',
  value,
  onChange,
  onClear,
  debounceMs = 300,
  className = '',
  ...props
}) => {
  const [searchValue, setSearchValue] = useState(value || '');

  useEffect(() => {
    setSearchValue(value || '');
  }, [value]);

  useEffect(() => {
    if (debounceMs > 0) {
      const timer = setTimeout(() => {
        if (onChange) {
          onChange(searchValue);
        }
      }, debounceMs);

      return () => clearTimeout(timer);
    } else {
      if (onChange) {
        onChange(searchValue);
      }
    }
  }, [searchValue, debounceMs, onChange]);

  const handleClear = () => {
    setSearchValue('');
    if (onClear) {
      onClear();
    }
    if (onChange) {
      onChange('');
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <FiSearch size={20} />
      </div>

      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300
          focus:outline-none focus:ring-2 focus:ring-[#238ae9] focus:ring-offset-1
          font-['Satoshi'] text-sm
          transition-colors
        `}
        {...props}
      />

      {searchValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Clear search"
        >
          <FiX size={18} className="text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;

