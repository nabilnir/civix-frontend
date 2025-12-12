import React from 'react';
import { FiAlertCircle, FiX } from 'react-icons/fi';

const ErrorMessage = ({
  message = 'An error occurred. Please try again.',
  title = 'Error',
  onClose,
  variant = 'error', // 'error', 'warning', 'info'
  className = '',
  showIcon = true,
  dismissible = true,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          icon: 'text-amber-600',
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: 'text-blue-600',
        };
      default: // error
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: 'text-red-600',
        };
    }
  };

  const styles = getVariantStyles();

  if (!message) return null;

  return (
    <div
      className={`${styles.bg} ${styles.border} border rounded-lg p-4 flex items-start gap-3 ${className}`}
      role="alert"
    >
      {showIcon && (
        <FiAlertCircle
          className={`${styles.icon} flex-shrink-0 mt-0.5`}
          size={20}
        />
      )}
      <div className="flex-1">
        {title && (
          <h4 className={`font-['Satoshi'] font-bold text-sm mb-1 ${styles.text}`}>
            {title}
          </h4>
        )}
        <p className={`font-['Satoshi'] text-sm ${styles.text}`}>
          {message}
        </p>
      </div>
      {dismissible && onClose && (
        <button
          onClick={onClose}
          className={`${styles.text} hover:opacity-70 transition-opacity flex-shrink-0`}
          aria-label="Dismiss error"
        >
          <FiX size={18} />
        </button>
      )}
    </div>
  );
};

// Inline error message (for form fields)
export const InlineErrorMessage = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <p
      className={`text-red-600 text-sm mt-1 font-['Satoshi'] flex items-center gap-1 ${className}`}
      role="alert"
    >
      <FiAlertCircle size={14} />
      {message}
    </p>
  );
};

// Toast-style error (for notifications)
export const ErrorToast = ({ message, onClose }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiAlertCircle className="text-red-600" size={20} />
          <p className="text-red-800 font-['Satoshi'] text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-800"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;

