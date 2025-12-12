import React from 'react';

const Switch = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizes = {
    sm: {
      track: 'w-9 h-5',
      thumb: 'w-4 h-4',
      translate: 'translate-x-4',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7',
    },
  };

  const sizeConfig = sizes[size] || sizes.md;

  const handleToggle = () => {
    if (!disabled && onChange) {
      onChange(!checked);
    }
  };

  return (
    <label
      className={`
        inline-flex items-center gap-3 cursor-pointer
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      <div className="relative inline-block">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleToggle}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`
            ${sizeConfig.track}
            ${checked ? 'bg-[#238ae9]' : 'bg-gray-300'}
            rounded-full transition-colors duration-200 ease-in-out
            ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
          onClick={handleToggle}
        >
          <div
            className={`
              ${sizeConfig.thumb}
              ${checked ? sizeConfig.translate : 'translate-x-0.5'}
              absolute top-0.5 left-0.5
              bg-white rounded-full
              shadow-md
              transition-transform duration-200 ease-in-out
            `}
          />
        </div>
      </div>
      {label && (
        <span className="text-sm font-medium text-[#242424] font-['Satoshi']">
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;

