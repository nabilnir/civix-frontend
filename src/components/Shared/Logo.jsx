import React from 'react';
import { Link } from 'react-router';
import logoImage from '../../assets/images/logo.png';

const Logo = ({
  showText = true,
  size = 'md',
  className = '',
  linkTo = '/',
  onClick,
}) => {
  const sizes = {
    sm: {
      image: 'w-8 h-8',
      text: 'text-lg',
    },
    md: {
      image: 'w-10 h-10',
      text: 'text-xl',
    },
    lg: {
      image: 'w-12 h-12',
      text: 'text-2xl',
    },
    xl: {
      image: 'w-16 h-16',
      text: 'text-3xl',
    },
  };

  const sizeConfig = sizes[size] || sizes.md;

  const [imageError, setImageError] = React.useState(false);

  const logoContent = (
    <div
      className={`flex items-center gap-2 group ${className}`}
      onClick={onClick}
    >
      {!imageError ? (
        <img
          src={logoImage}
          alt="Civix Logo"
          className={`${sizeConfig.image} object-contain transition-transform group-hover:scale-105`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`${sizeConfig.image} bg-gradient-to-br from-[#238ae9] to-[#1e7acc] rounded-xl flex items-center justify-center shadow-md`}
        >
          <span className={`text-white font-bold font-['Satoshi'] ${sizeConfig.text}`}>
            C
          </span>
        </div>
      )}
      {showText && (
        <span
          className={`text-[#242424] font-['Satoshi'] font-bold tracking-tight ${sizeConfig.text}`}
        >
          Civix
        </span>
      )}
    </div>
  );

  if (onClick) {
    return <div className="cursor-pointer">{logoContent}</div>;
  }

  return <Link to={linkTo}>{logoContent}</Link>;
};

export default Logo;

