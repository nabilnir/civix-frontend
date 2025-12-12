import React from 'react';

const Skeleton = ({
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
  circle = false,
  ...props
}) => {
  const baseClasses = `
    bg-gray-200 animate-pulse
    ${circle ? 'rounded-full' : 'rounded'}
    ${className}
  `;

  const variants = {
    text: 'h-4',
    title: 'h-6',
    subtitle: 'h-5',
    avatar: 'w-10 h-10 rounded-full',
    button: 'h-10',
    image: 'h-48',
    card: 'h-64',
  };

  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`
              ${baseClasses}
              ${variants[variant] || variants.text}
            `}
            style={index === 0 ? style : {}}
            {...props}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`
        ${baseClasses}
        ${variants[variant] || variants.text}
      `}
      style={style}
      {...props}
    />
  );
};

export default Skeleton;

