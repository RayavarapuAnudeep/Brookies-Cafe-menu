import React from 'react';
import { DietaryType } from '../types/menu';

interface DietaryBadgeProps {
  type: DietaryType;
  showLabel?: boolean;
  className?: string;
}

export const DietaryBadge: React.FC<DietaryBadgeProps> = ({
  type,
  showLabel = false,
  className = '',
}) => {
  if (type === 'veg') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`} title="Vegetarian">
        <span
          className="w-4 h-4 rounded-xs border border-emerald-600 bg-emerald-950/40 flex items-center justify-center shrink-0"
          aria-label="Vegetarian"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
        </span>
        {showLabel && <span className="text-xs font-medium text-emerald-400">Pure Veg</span>}
      </div>
    );
  }

  if (type === 'non-veg') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`} title="Non-Vegetarian">
        <span
          className="w-4 h-4 rounded-xs border border-rose-600 bg-rose-950/40 flex items-center justify-center shrink-0"
          aria-label="Non-Vegetarian"
        >
          <span className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[7px] border-b-rose-500" />
        </span>
        {showLabel && <span className="text-xs font-medium text-rose-400">Non-Veg</span>}
      </div>
    );
  }

  if (type === 'dessert') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`} title="Artisanal Dessert">
        <span
          className="w-4 h-4 rounded-xs border border-amber-600/80 bg-amber-950/40 flex items-center justify-center shrink-0"
          aria-label="Dessert"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </span>
        {showLabel && <span className="text-xs font-medium text-amber-300">Dessert</span>}
      </div>
    );
  }

  if (type === 'beverage') {
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`} title="Beverage">
        <span
          className="w-4 h-4 rounded-xs border border-cyan-600/80 bg-cyan-950/40 flex items-center justify-center shrink-0"
          aria-label="Beverage"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </span>
        {showLabel && <span className="text-xs font-medium text-cyan-300">Beverage</span>}
      </div>
    );
  }

  return null;
};
