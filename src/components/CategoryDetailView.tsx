import React, { useEffect, useRef } from 'react';
import { MenuCategory } from '../types/menu';
import { CategoryIcon } from './CategoryIcon';
import { DietaryBadge } from './DietaryBadge';
import { ComboCard } from './ComboCard';
import { MenuItemCard } from './MenuItemCard';
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { COMBOS_DATA } from '../data/menuData';
import { CATEGORY_IMAGE_MAP } from '../data/foodImages';

interface CategoryDetailViewProps {
  category: MenuCategory;
  allCategories: MenuCategory[];
  onBack: () => void;
  onSelectCategory: (category: MenuCategory) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  allCategories,
  onBack,
  onSelectCategory,
}) => {
  const isCombosCategory = category.id === 'combos';
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const categoryImage = CATEGORY_IMAGE_MAP[category.slug] || CATEGORY_IMAGE_MAP['veg-pizzas'];

  // Auto-scroll the active category button into view in the horizontal switcher
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (categoryScrollRef.current) {
      const activeBtn = categoryScrollRef.current.querySelector('[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [category.id]);

  // Current category index for quick prev/next navigation
  const currentIndex = allCategories.findIndex((c) => c.id === category.id);
  const prevCategory = currentIndex > 0 ? allCategories[currentIndex - 1] : null;
  const nextCategory = currentIndex < allCategories.length - 1 ? allCategories[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-5 pb-28">
      
      {/* Top Navigation Row: Back Button & Category Counter */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#FFF5E5] bg-[#1B100D] hover:bg-[#281813] border border-[#F5C76B]/40 hover:border-[#F5C76B] rounded-xl transition-all shadow-[0_0_12px_rgba(245,199,107,0.15)] active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52E] min-h-[44px]"
          aria-label="Back to all categories"
        >
          <ArrowLeft className="w-4 h-4 text-[#F5C76B]" />
          <span>All Categories</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-[#A69385]">
          <span className="text-[#F5C76B] font-semibold">{currentIndex + 1}</span>
          <span>of {allCategories.length} categories</span>
        </div>
      </div>

      {/* Horizontal Category Quick Switcher with Gold Neon Highlight */}
      <div className="relative mb-6">
        <div
          ref={categoryScrollRef}
          className="flex items-center gap-2 overflow-x-auto pb-2.5 no-scrollbar scroll-smooth"
        >
          {allCategories.map((c) => {
            const isActive = c.id === category.id;
            return (
              <button
                key={c.id}
                data-active={isActive ? 'true' : 'false'}
                onClick={() => onSelectCategory(c)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 min-h-[38px] ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F5C76B] to-[#FFB52E] text-[#140A06] font-bold shadow-[0_0_16px_rgba(255,181,46,0.35)]'
                    : 'bg-[#160D0A] hover:bg-[#22140E] text-[#CFC0B0] border border-[#F5C76B]/20 hover:border-[#F5C76B]/40'
                }`}
              >
                <CategoryIcon iconName={c.iconName} className="w-3.5 h-3.5" />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Hero Banner with Food Image Backdrop & Luminous Glass */}
      <div className="relative rounded-2xl overflow-hidden border border-[#F5C76B]/40 shadow-[0_0_25px_rgba(245,199,107,0.18),0_10px_35px_rgba(0,0,0,0.9)] mb-6 bg-[#0E0705]">
        {/* Background Image with Dark Gradient Scrim */}
        <div className="absolute inset-0">
          <img
            src={categoryImage}
            alt={category.name}
            className="w-full h-full object-cover opacity-25 filter blur-xs scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0604] via-[#120805]/95 to-[#0C0604]/80" />
        </div>

        {/* Content over Banner */}
        <div className="relative p-5 sm:p-7 flex items-start gap-4 z-10">
          <div className="w-12 h-12 rounded-xl bg-[#28150E] text-[#F5C76B] border border-[#F5C76B]/50 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(245,199,107,0.3)]">
            <CategoryIcon iconName={category.iconName} className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <DietaryBadge type={category.dietary} showLabel={true} />
              <span className="text-xs text-[#8F796B]" aria-hidden="true">·</span>
              <span className="text-xs text-[#CFC0B0] font-medium">
                {category.items.length} {category.items.length === 1 ? 'Delicacy' : 'Delicacies'}
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#FFF5E5] tracking-tight leading-tight">
              {category.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#CFC0B0] mt-1.5 leading-relaxed max-w-xl">
              {category.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content: Either Combos View OR Image-Left / Details-Right Menu Item Cards */}
      {isCombosCategory ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {COMBOS_DATA.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      ) : (
        <div className="space-y-3.5 sm:space-y-4">
          {category.items
            .filter((item) => item.status === 'published')
            .map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                categorySlug={category.slug}
              />
            ))}
        </div>
      )}

      {/* Prev / Next Category Floating Navigation Bar */}
      <div className="mt-9 pt-6 border-t border-[#F5C76B]/20 flex items-center justify-between gap-4">
        {prevCategory ? (
          <button
            onClick={() => onSelectCategory(prevCategory)}
            className="flex items-center gap-2 text-xs text-[#FFF5E5] hover:text-[#F5C76B] transition-colors py-2.5 px-3.5 rounded-xl bg-[#160D0A] border border-[#F5C76B]/30 hover:border-[#F5C76B] min-h-[44px] shadow-sm"
          >
            <ChevronLeft className="w-4 h-4 text-[#F5C76B]" />
            <span className="text-left">
              <span className="block text-[9px] text-[#A69385] uppercase tracking-wider">Previous</span>
              <span className="font-bold truncate max-w-[120px] sm:max-w-none block">{prevCategory.name}</span>
            </span>
          </button>
        ) : <div />}

        {nextCategory ? (
          <button
            onClick={() => onSelectCategory(nextCategory)}
            className="flex items-center gap-2 text-xs text-[#FFF5E5] hover:text-[#F5C76B] transition-colors py-2.5 px-3.5 rounded-xl bg-[#160D0A] border border-[#F5C76B]/30 hover:border-[#F5C76B] min-h-[44px] ml-auto shadow-sm"
          >
            <span className="text-right">
              <span className="block text-[9px] text-[#A69385] uppercase tracking-wider">Next</span>
              <span className="font-bold truncate max-w-[120px] sm:max-w-none block">{nextCategory.name}</span>
            </span>
            <ChevronRight className="w-4 h-4 text-[#F5C76B]" />
          </button>
        ) : <div />}
      </div>

    </div>
  );
};
