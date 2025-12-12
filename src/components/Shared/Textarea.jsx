import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const Textarea = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  showCharCount = false,
  className = '',
  ...props
}) => {
  const charCount = value?.length || 0;

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
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`
            w-full px-4 py-3 rounded-lg border font-['Satoshi']
            resize-y
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#238ae9]'}
            focus:outline-none focus:ring-2 focus:ring-offset-1
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-colors
          `}
          {...props}
        />

        {showCharCount && maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 font-['Satoshi']">
            {charCount} / {maxLength}
          </div>
        )}
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

export default Textarea;

