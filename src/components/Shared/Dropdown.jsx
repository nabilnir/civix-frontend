import React, { useState, useRef, useEffect } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(
    (opt) => opt.value === value || opt === value
  );

  const handleSelect = (option) => {
    const optionValue = typeof option === 'object' ? option.value : option;
    if (onChange) {
      onChange(optionValue, option);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-semibold text-[#242424] font-['Satoshi'] mb-2">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-4 py-3 rounded-lg border font-['Satoshi'] text-left
          flex items-center justify-between
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'}
          focus:outline-none focus:ring-2 focus:ring-[#238ae9] focus:ring-offset-1
          transition-colors
        `}
        {...props}
      >
        <span className={selectedOption ? 'text-[#242424]' : 'text-gray-400'}>
          {selectedOption
            ? typeof selectedOption === 'object'
              ? selectedOption.label
              : selectedOption
            : placeholder}
        </span>
        <FiChevronDown
          size={20}
          className={`text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 font-['Satoshi'] text-center">
              No options available
            </div>
          ) : (
            options.map((option, index) => {
              const optionValue = typeof option === 'object' ? option.value : option;
              const optionLabel = typeof option === 'object' ? option.label : option;
              const isSelected = value === optionValue;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`
                    w-full px-4 py-3 text-left font-['Satoshi'] text-sm
                    transition-colors
                    ${
                      isSelected
                        ? 'bg-[#238ae9] text-white'
                        : 'text-[#242424] hover:bg-gray-50'
                    }
                  `}
                >
                  {optionLabel}
                </button>
              );
            })
          )}
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 mt-1 font-['Satoshi']">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;

