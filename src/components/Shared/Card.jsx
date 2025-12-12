import React from 'react';

const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  className = '',
  hover = false,
  padding = true,
  ...props
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl border border-gray-100 shadow-sm
        ${hover ? 'hover:shadow-lg transition-shadow' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Header */}
      {(title || subtitle || headerAction) && (
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-lg font-bold text-[#242424] font-['Satoshi']">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1 font-['Satoshi']">
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Content */}
      <div className={padding ? 'p-6' : ''}>{children}</div>

      {/* Footer */}
      {footer && (
        <div className="px-6 py-4 border-t border-gray-100">{footer}</div>
      )}
    </div>
  );
};

export default Card;

