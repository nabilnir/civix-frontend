import React from 'react';

const Divider = ({
  text,
  orientation = 'horizontal',
  variant = 'solid',
  className = '',
  ...props
}) => {
  const variants = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  if (orientation === 'vertical') {
    return (
      <div
        className={`
          inline-block h-full w-px bg-gray-200
          ${className}
        `}
        {...props}
      />
    );
  }

  if (text) {
    return (
      <div
        className={`
          flex items-center gap-4 my-4
          ${className}
        `}
        {...props}
      >
        <div
          className={`
            flex-1 h-px bg-gray-200
            ${variants[variant] || variants.solid}
          `}
        />
        <span className="text-sm text-gray-500 font-['Satoshi'] px-2">
          {text}
        </span>
        <div
          className={`
            flex-1 h-px bg-gray-200
            ${variants[variant] || variants.solid}
          `}
        />
      </div>
    );
  }

  return (
    <hr
      className={`
        border-0 h-px bg-gray-200 my-4
        ${variants[variant] || variants.solid}
        ${className}
      `}
      {...props}
    />
  );
};

export default Divider;

