import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX, FiAlertTriangle } from 'react-icons/fi';

const Alert = ({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
  showIcon = true,
  ...props
}) => {
  const variants = {
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <FiCheckCircle className="text-green-600" size={20} />,
      titleColor: 'text-green-900',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <FiAlertCircle className="text-red-600" size={20} />,
      titleColor: 'text-red-900',
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <FiAlertTriangle className="text-yellow-600" size={20} />,
      titleColor: 'text-yellow-900',
    },
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <FiInfo className="text-blue-600" size={20} />,
      titleColor: 'text-blue-900',
    },
  };

  const variant = variants[type] || variants.info;

  return (
    <div
      className={`
        ${variant.bg} ${variant.border} border rounded-lg p-4
        ${className}
      `}
      {...props}
    >
      <div className="flex items-start gap-3">
        {showIcon && (
          <div className="flex-shrink-0 mt-0.5">{variant.icon}</div>
        )}
        <div className="flex-1 min-w-0">
          {title && (
            <h4
              className={`font-semibold mb-1 font-['Satoshi'] ${variant.titleColor}`}
            >
              {title}
            </h4>
          )}
          {message && (
            <p className={`text-sm font-['Satoshi'] ${variant.text}`}>
              {message}
            </p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 p-1 hover:bg-black/10 rounded transition-colors ${variant.text}`}
            aria-label="Close alert"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;

