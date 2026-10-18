import React, { useState } from 'react';
import { MenuItem } from '../types/menu';
import { DietaryBadge } from './DietaryBadge';
import { Sparkles, Utensils } from 'lucide-react';
import { formatINR } from '../utils/menuUtils';
import { getItemImage } from '../data/foodImages';

interface MenuItemCardProps {
  item: MenuItem;
  categorySlug: string;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, categorySlug }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = getItemImage(item.id, categorySlug, item.name);
  const hasPortions = item.portions && item.portions.length > 0;

  return (
    <div
      className={`group relative flex flex-row items-stretch rounded-2xl border transition-all duration-300 overflow-hidden ${
        item.isSpecial
          ? 'bg-gradient-to-r from-[#291610] via-[#1F100A] to-[#140805] border-[#FFB52E]/85 shadow-[0_4px_24px_rgba(0,0,0,0.9),0_0_24px_rgba(255,181,46,0.28)] hover:border-[#FFB52E] hover:shadow-[0_8px_32px_rgba(0,0,0,0.95),0_0_34px_rgba(255,181,46,0.48)] hover:-translate-y-1'
          : 'bg-gradient-to-r from-[#22130E] via-[#190D09] to-[#100704] border-[#F5C76B]/45 shadow-[0_4px_20px_rgba(0,0,0,0.85),0_0_16px_rgba(245,199,107,0.15)] hover:border-[#F5C76B]/85 hover:shadow-[0_8px_30px_rgba(0,0,0,0.95),0_0_26px_rgba(245,199,107,0.32)] hover:-translate-y-1'
      }`}
    >
      {/* Subtle radial gold illumination inside card */}
      <div className="absolute top-0 right-1/4 w-56 h-36 bg-[#F5C76B]/8 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle top edge gold highlight line for clear separation from page background */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F5C76B]/45 to-transparent pointer-events-none" />

      {/* Tiny ornamental gold corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#F5C76B]/60 rounded-tr-lg" />
      </div>

      {/* LEFT SIDE: Dedicated Food Image (35-40% width on desktop, compact proportion on mobile) */}
      <div className="relative w-32 xs:w-38 sm:w-48 md:w-56 shrink-0 overflow-hidden bg-[#0A0503] border-r border-[#F5C76B]/35">
        {!imageFailed ? (
          <img
            src={imageSrc}
            alt={item.name}
            onError={() => setImageFailed(true)}
            className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-600 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-2 bg-[#1A0F0B] text-[#F5C76B]">
            <Utensils className="w-6 h-6 opacity-60 mb-1" />
            <span className="text-[10px] text-[#A69385] text-center line-clamp-1">Freshly Made</span>
          </div>
        )}
        
        {/* Warm ambient light near image edges */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#190D09]/80 pointer-events-none" />

        {/* Dietary corner indicator */}
        <div className="absolute top-2.5 left-2.5 bg-[#0A0503]/90 backdrop-blur-md p-1 rounded-md border border-[#F5C76B]/40 shadow-md">
          <DietaryBadge type={item.dietary} showLabel={false} />
        </div>
      </div>

      {/* RIGHT SIDE: Details (Item name, Price immediately below in warm gold, Portion sizes) */}
      <div className="flex-1 p-3.5 sm:p-5 flex flex-col justify-between min-w-0">
        <div>
          {/* Header row: Complete item name & special badge */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-display text-sm sm:text-base md:text-lg font-bold text-[#FFF5E5] group-hover:text-[#F5C76B] transition-colors leading-snug">
              {item.name}
            </h3>

            {item.isSpecial && (
              <span className="shrink-0 inline-flex items-center gap-1 text-[9px] uppercase font-extrabold text-[#140A06] bg-gradient-to-r from-[#F5C76B] to-[#FFB52E] px-2 py-0.5 rounded shadow-sm">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Special</span>
              </span>
            )}
          </div>

          {/* Description if present */}
          {item.description && (
            <p className="text-[11px] sm:text-xs text-[#B5A191] line-clamp-2 mb-2.5 leading-relaxed font-normal">
              {item.description}
            </p>
          )}

          {/* Price displayed immediately below item name with warm gold glow */}
          {item.price !== undefined && (
            <div className="mt-1 flex items-center gap-2">
              <span className="font-display text-lg sm:text-2xl font-extrabold text-[#F5C76B] tabular-nums drop-shadow-[0_0_10px_rgba(245,199,107,0.45)]">
                {formatINR(item.price)}
              </span>
              <span className="text-[10px] text-[#A69385] uppercase tracking-wider hidden xs:inline">
                • Standard Portion
              </span>
            </div>
          )}

          {/* Multi-Portion Options (5 pcs / 10 pcs, Small / Medium / Large, etc.) */}
          {hasPortions && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {item.portions!.map((portion, pIdx) => (
                <div
                  key={pIdx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#22130D] border border-[#F5C76B]/35 text-xs shadow-[0_0_8px_rgba(0,0,0,0.6)]"
                >
                  <span className="text-[#D4C3B2] font-semibold text-[11px] sm:text-xs">
                    {portion.label}
                  </span>
                  <span className="text-[#8F796B]" aria-hidden="true">—</span>
                  <span className="font-extrabold text-[#F5C76B] tabular-nums text-[11px] sm:text-xs drop-shadow-[0_0_8px_rgba(245,199,107,0.4)]">
                    {formatINR(portion.price)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tiny gold separator line and serving metadata at bottom */}
        <div className="mt-3.5 pt-2 border-t border-[#F5C76B]/20 flex items-center justify-between text-[10px] text-[#9E8878]">
          <span className="capitalize">{item.category}</span>
        </div>
      </div>
    </div>
  );
};
