import React from 'react';
import { FiChevronDown, FiAlertCircle } from 'react-icons/fi';

const Select = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-semibold text-[#242424] font-['Satoshi']"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-3 pr-10 rounded-lg border font-['Satoshi']
            appearance-none bg-white
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#238ae9]'}
            focus:outline-none focus:ring-2 focus:ring-offset-1
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-colors
          `}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value || option}
              value={option.value || option}
            >
              {option.label || option}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <FiChevronDown
            size={20}
            className={`text-gray-400 ${disabled ? 'opacity-50' : ''}`}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 text-sm font-['Satoshi']">
          <FiAlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Select;

