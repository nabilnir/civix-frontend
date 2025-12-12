import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const FormInput = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  icon: Icon,
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
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={20} />
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`
            w-full px-4 py-3 rounded-lg border font-['Satoshi']
            ${Icon ? 'pl-11' : 'pl-4'}
            ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#238ae9]'}
            focus:outline-none focus:ring-2 focus:ring-offset-1
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-colors
          `}
          {...props}
        />
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

export default FormInput;

