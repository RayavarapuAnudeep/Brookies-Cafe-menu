import React from 'react';
import { ComboItem } from '../types/menu';
import { Sparkles } from 'lucide-react';
import { formatINR } from '../utils/menuUtils';
import { getItemImage } from '../data/foodImages';

interface ComboCardProps {
  combo: ComboItem;
}

export const ComboCard: React.FC<ComboCardProps> = ({ combo }) => {
  const image = getItemImage(combo.id, 'combos', combo.name);
  return (
    <div className="bg-gradient-to-b from-[#1E110C] via-[#140A07] to-[#0A0503] border border-[#F5C76B]/40 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(245,199,107,0.15),0_8px_30px_rgba(0,0,0,0.9)] flex flex-col justify-between hover:border-[#FFB52E] hover:shadow-[0_0_30px_rgba(255,181,46,0.3)] transition-all duration-300">
      <img src={image} alt={combo.name} className="w-full h-40 sm:h-48 object-cover" loading="lazy" />
      <div className="p-5 sm:p-6">
      <div>
        {/* Header row: Combo title & price */}
        <div className="flex items-start justify-between gap-3 mb-2 pb-3.5 border-b border-[#F5C76B]/20">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#FFB52E] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Royal Banquet Deal</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#FFF5E5]">
              {combo.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#F5C76B] tabular-nums drop-shadow-[0_0_10px_rgba(245,199,107,0.45)]">
              {formatINR(combo.price)}
            </span>
          </div>
        </div>

        <div className="mt-4 mb-2">
          <p className="text-sm text-[#EFE3D5] leading-relaxed">{combo.description}</p>
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-5 pt-3 border-t border-[#F5C76B]/15 text-[11px] text-[#A69385] flex items-center justify-between">
        <span>Prepared fresh for your table</span>
        <span className="text-[#F5C76B] font-medium">Chef's Selection</span>
      </div>
      </div>
    </div>
  );
};
