import React from 'react';
import {
  Pizza,
  Sandwich,
  Soup,
  Utensils,
  CookingPot,
  Flame,
  Sparkles,
  Coffee,
  Heart,
  Crown,
  Grid,
  Layers,
  Cookie,
  Package,
  SquareCode,
  CupSoda,
  GlassWater,
  Boxes,
  LucideIcon,
} from 'lucide-react';

interface CategoryIconProps {
  iconName: string;
  className?: string;
}

const iconRegistry: Record<string, LucideIcon> = {
  Pizza,
  Sandwich,
  Soup,
  Utensils,
  CookingPot,
  Flame,
  Sparkles,
  Coffee,
  Heart,
  Crown,
  Grid,
  Layers,
  Cookie,
  Package,
  SquareCode,
  CupSoda,
  GlassWater,
  Boxes,
};

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  iconName,
  className = 'w-5 h-5',
}) => {
  const IconComponent = iconRegistry[iconName] || Utensils;
  return <IconComponent className={className} />;
};
