import React, { useState, useMemo } from 'react';
import { MenuCategory, DietaryType } from '../types/menu';
import { DietaryBadge } from './DietaryBadge';
import { Search, ChevronRight, X, Sparkles, Utensils } from 'lucide-react';
import { searchMenuItems } from '../utils/menuUtils';
import { CATEGORY_IMAGE_MAP, getItemImage } from '../data/foodImages';

interface CategoryGridProps {
  categories: MenuCategory[];
  onSelectCategory: (category: MenuCategory) => void;
  onSelectCombo: () => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  onSelectCategory,
  onSelectCombo,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<DietaryType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Filter categories by dietary type
  const filteredCategories = useMemo(() => {
    if (selectedFilter === 'all') return categories;
    return categories.filter((c) => c.dietary === selectedFilter);
  }, [categories, selectedFilter]);

  // Live item search results
  const searchResults = useMemo(() => {
    return searchMenuItems(categories, searchQuery);
  }, [categories, searchQuery]);

  const filterTabs: { label: string; value: DietaryType | 'all'; count: number }[] = [
    { label: 'All Categories', value: 'all', count: categories.length },
    { label: 'Veg', value: 'veg', count: categories.filter((c) => c.dietary === 'veg').length },
    { label: 'Non-Veg', value: 'non-veg', count: categories.filter((c) => c.dietary === 'non-veg').length },
    { label: 'Desserts', value: 'dessert', count: categories.filter((c) => c.dietary === 'dessert').length },
    { label: 'Beverages', value: 'beverage', count: categories.filter((c) => c.dietary === 'beverage').length },
    { label: 'Combos', value: 'combo', count: categories.filter((c) => c.dietary === 'combo').length },
  ];

  const handleImageError = (slug: string) => {
    setFailedImages((prev) => ({ ...prev, [slug]: true }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24">
      
      {/* Category Section Header with Royal Golden Accent */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-[#FFB52E]" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#F5C76B] font-bold drop-shadow-[0_0_8px_rgba(245,199,107,0.4)]">
            Royal Dining Collection
          </p>
        </div>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-[#FFF5E5] tracking-tight">
          Explore Our Menu
        </h2>
        <p className="text-sm text-[#CFC0B0] mt-1.5 max-w-xl">
          Select a category to explore handcrafted dishes, portion selections, and prices in Indian Rupees.
        </p>
      </div>

      {/* Luxury Search Input Bar with Neon Ring */}
      <div className="relative mb-6">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-[#F5C76B] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pizza, momos, kunafa, waffle, mocktail..."
            className="w-full h-12 pl-10 pr-10 text-sm bg-[#160D0A]/95 border border-[#F5C76B]/35 focus:border-[#FFB52E] focus:ring-2 focus:ring-[#F5C76B]/30 rounded-xl text-[#FFF5E5] placeholder-[#947D6D] shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all outline-none"
            aria-label="Search menu items"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 p-1 text-[#CFC0B0] hover:text-[#FFF5E5] focus:outline-none"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Real-time search matches overlay */}
        {searchQuery.trim().length > 0 && (
          <div className="mt-3 bg-[#170E0B] border border-[#F5C76B]/40 rounded-2xl p-3.5 shadow-[0_0_30px_rgba(0,0,0,0.95)] max-h-84 overflow-y-auto z-30 divide-y divide-[#2F1B13]">
            <div className="text-xs text-[#A89586] pb-2 px-1 flex items-center justify-between">
              <span className="text-[#F5C76B] font-medium">{searchResults.length} {searchResults.length === 1 ? 'item found' : 'items found'}</span>
              <span>Tap item to view category</span>
            </div>

            {searchResults.length === 0 ? (
              <p className="text-sm text-[#947D6D] py-5 text-center">
                No items match "{searchQuery}". Try searching for "pizza", "momos", "kunafa", or "brownie".
              </p>
            ) : (
              searchResults.map(({ item, categoryName, categorySlug }) => {
                const targetCategory = categories.find((c) => c.slug === categorySlug);
                const itemImg = getItemImage(item.id, categorySlug, item.name);

                return (
                  <button
                    key={item.id}
                    onClick={() => targetCategory && onSelectCategory(targetCategory)}
                    className="w-full py-2.5 px-2 flex items-center justify-between text-left hover:bg-[#25150F] rounded-xl transition-all group gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 border border-[#F5C76B]/30 bg-[#0A0503]">
                        <img
                          src={itemImg}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <DietaryBadge type={item.dietary} />
                          <span className="text-sm font-semibold text-[#FFF5E5] group-hover:text-[#F5C76B] transition-colors truncate">
                            {item.name}
                          </span>
                        </div>
                        <div className="text-xs text-[#9E8878] truncate">
                          in {categoryName}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-[#F5C76B] tabular-nums whitespace-nowrap drop-shadow-[0_0_6px_rgba(245,199,107,0.3)]">
                      {item.price ? `₹${item.price}` : item.portions ? `from ₹${item.portions[0].price}` : ''}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Dietary Filter Buttons (Interactive Tab Bar) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-7 no-scrollbar" role="tablist">
        {filterTabs.map((tab) => {
          const isActive = selectedFilter === tab.value;
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedFilter(tab.value)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52E] min-h-[42px] flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-[#F5C76B] via-[#FFB52E] to-[#E5A826] text-[#140A06] font-bold shadow-[0_0_18px_rgba(255,181,46,0.35)]'
                  : 'bg-[#180E0B] hover:bg-[#23140F] text-[#D1C0B0] border border-[#F5C76B]/20 hover:border-[#F5C76B]/40'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] ${isActive ? 'text-[#140A06]/85 font-extrabold' : 'text-[#8E7869]'}`}>
                ({tab.count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Royal category cards grouped under the supplied menu sections */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredCategories.map((category) => {
          const isCombo = category.id === 'combos';
          const isSpecial = category.section === 'Special';
          const cardImg = CATEGORY_IMAGE_MAP[category.slug];
          const hasImgFailed = failedImages[category.slug];
          const categoryIndex = filteredCategories.indexOf(category);
          const previousCategory = filteredCategories[categoryIndex - 1];
          const showSectionHeading = !searchQuery.trim() && (!previousCategory || previousCategory.section !== category.section);

          return (
            <React.Fragment key={category.id}>
              {showSectionHeading && (
                <div className="col-span-full pt-2 first:pt-0">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5C76B]">{category.sectionTitle || category.section}</h3>
                  {category.sectionDescription && <p className="text-xs sm:text-sm text-[#B5A192] mt-1">{category.sectionDescription}</p>}
                </div>
              )}
              <button
                onClick={() => {
                  if (isCombo) onSelectCombo();
                  else onSelectCategory(category);
                }}
                className={`text-left rounded-2xl border transition-all duration-300 group flex flex-col justify-between relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52E] active:scale-[0.985] min-h-[220px] ${
                  isSpecial
                    ? 'bg-gradient-to-b from-[#24130D] to-[#120805] border-[#FFB52E] shadow-[0_0_22px_rgba(255,181,46,0.28),0_6px_25px_rgba(0,0,0,0.85)] hover:shadow-[0_0_30px_rgba(255,181,46,0.45)]'
                    : 'bg-gradient-to-b from-[#180E0B] via-[#120A07] to-[#0A0504] border-[#F5C76B]/35 shadow-[0_0_15px_rgba(245,199,107,0.12),0_6px_20px_rgba(0,0,0,0.85)] hover:border-[#F5C76B]/70 hover:shadow-[0_0_24px_rgba(245,199,107,0.28),0_10px_30px_rgba(0,0,0,0.9)] hover:-translate-y-1'
                }`}
              >
              {/* Category Card Image Header (Top 48% height) */}
              <div className="relative w-full h-34 sm:h-36 overflow-hidden bg-[#0A0503] shrink-0 border-b border-[#F5C76B]/20">
                {!hasImgFailed ? (
                  <img
                    src={cardImg}
                    alt={category.name}
                    onError={() => handleImageError(category.slug)}
                    className="w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-600 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#1B0F0B] text-[#F5C76B]">
                    <Utensils className="w-8 h-8 opacity-70" />
                  </div>
                )}
                
                {/* Dark Vignette Overlay for rich contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#140A07] via-transparent to-black/30 pointer-events-none" />

                {/* Dietary badge pill on image top-right */}
                <div className="absolute top-2.5 right-2.5 bg-[#0A0503]/85 backdrop-blur-md px-2 py-1 rounded-md border border-[#F5C76B]/30 flex items-center gap-1.5 shadow-md">
                  <DietaryBadge type={category.dietary} showLabel={false} />
                  <span className="text-[10px] text-[#D4C3B2] font-medium capitalize">
                    {category.dietary}
                  </span>
                </div>

                {/* Special Tag for signature categories */}
                {isSpecial && (
                  <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-[#F5C76B] to-[#FFB52E] text-[#140A06] text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Special</span>
                  </div>
                )}
                {isCombo && (
                  <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-[#F5C76B] to-[#FFB52E] text-[#140A06] text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded shadow-md flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Value Deal</span>
                  </div>
                )}
              </div>

              {/* Card Body & Information */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-bold text-[#FFF5E5] group-hover:text-[#F5C76B] transition-colors leading-tight mb-1">
                    {category.name}
                  </h3>

                  <p className="text-xs text-[#B5A192] line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Card Footer: Items count and luminous view button */}
                <div className="mt-4 pt-3 border-t border-[#F5C76B]/15 flex items-center justify-between text-xs text-[#9E8878]">
                  <span className="font-medium text-[#CFC0B0]">
                    {category.items.length} {category.items.length === 1 ? 'Delicacy' : 'Delicacies'}
                  </span>
                  <span className="flex items-center gap-1 text-[#F5C76B] font-bold group-hover:translate-x-1 transition-transform drop-shadow-[0_0_6px_rgba(245,199,107,0.4)]">
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#FFB52E]" />
                  </span>
                </div>
              </div>
              </button>
            </React.Fragment>
          );
        })}
      </div>

    </div>
  );
};
