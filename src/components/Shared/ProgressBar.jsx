import React from 'react';

const ProgressBar = ({
  value = 0,
  max = 100,
  showLabel = true,
  label,
  color = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    primary: 'bg-[#238ae9]',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    purple: 'bg-purple-500',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-[#242424] font-['Satoshi']">
            {label || `${Math.round(percentage)}%`}
          </span>
          {label && (
            <span className="text-sm text-gray-600 font-['Satoshi']">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div
        className={`
          w-full bg-gray-200 rounded-full overflow-hidden
          ${sizes[size] || sizes.md}
        `}
      >
        <div
          className={`
            ${colors[color] || colors.primary}
            rounded-full transition-all duration-500 ease-out
            ${sizes[size] || sizes.md}
          `}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

