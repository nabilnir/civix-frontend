import React from 'react';
import { FiUser } from 'react-icons/fi';

const Avatar = ({
  src,
  alt = 'Avatar',
  name,
  size = 'md',
  shape = 'circle',
  status,
  className = '',
  ...props
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };

  const shapes = {
    circle: 'rounded-full',
    square: 'rounded-lg',
  };

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4',
  };

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  return (
    <div className={`relative inline-block ${className}`} {...props}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`
            ${sizes[size] || sizes.md}
            ${shapes[shape] || shapes.circle}
            object-cover border-2 border-white
          `}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
      ) : null}
      <div
        className={`
          ${sizes[size] || sizes.md}
          ${shapes[shape] || shapes.circle}
          ${src ? 'hidden' : 'flex'}
          items-center justify-center
          bg-gradient-to-br from-[#238ae9] to-[#1e7acc]
          text-white font-bold font-['Satoshi']
          border-2 border-white
        `}
      >
        {name ? (
          getInitials(name)
        ) : (
          <FiUser size={parseInt(sizes[size]?.match(/\d+/)?.[0]) / 2 || 20} />
        )}
      </div>

      {status && (
        <span
          className={`
            absolute bottom-0 right-0
            ${statusSizes[size] || statusSizes.md}
            ${statusColors[status] || statusColors.online}
            ${shapes[shape] || shapes.circle}
            border-2 border-white
          `}
        />
      )}
    </div>
  );
};

export default Avatar;

