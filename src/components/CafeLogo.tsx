import React from 'react';
import brookiesLogo from '../assets/images/brookies-logo.jpg';

interface CafeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  imageSrc?: string;
}

export const CafeLogo: React.FC<CafeLogoProps> = ({
  size = 'md',
  className = '',
  imageSrc = brookiesLogo,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-11 h-11 text-xs',
    lg: 'w-16 h-16 text-sm',
    hero: 'w-24 h-24 sm:w-28 sm:h-28 text-base',
  };

  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 border-2 border-[#F5C76B]/80 shadow-[0_0_18px_rgba(245,199,107,0.35)] ${sizeMap[size]} ${className}`}
    >
      <img
        src={imageSrc}
        alt="Brookies Cafe Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};
