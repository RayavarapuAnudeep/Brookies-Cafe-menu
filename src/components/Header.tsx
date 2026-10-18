import React from 'react';
import { CafeLogo } from './CafeLogo';
import { Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: 'welcome' | 'categories' | 'detail';
  onNavigateHome: () => void;
  onNavigateCategories: () => void;
  onNavigateCombos: () => void;
  onOpenSearch: () => void;
  onOpenOwnerChecklist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  onNavigateCategories,
  onNavigateCombos,
  onOpenSearch,
  onOpenOwnerChecklist,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0C0806]/92 backdrop-blur-md border-b border-[#F5C76B]/25 transition-all shadow-[0_4px_25px_rgba(0,0,0,0.85)]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4 sm:gap-8">
        
        {/* Zone 1: Brand Wordmark with circular pink badge */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76B] rounded-lg py-1 whitespace-nowrap shrink-0"
          aria-label="Brookies Cafe Home"
        >
          <CafeLogo size="sm" />
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg sm:text-xl text-[#FFF5E5] tracking-tight group-hover:text-[#F5C76B] transition-colors leading-tight">
              Brookies Cafe
            </span>
            <span className="text-[8px] uppercase tracking-[0.2em] text-[#F5C76B]/80 font-medium">
              Royal Lounge
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#D1C0B0]"
          aria-label="Main Navigation"
        >
          <button
            onClick={onNavigateCategories}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-[#F5C76B] ${
              currentView === 'categories' ? 'text-[#F5C76B] font-semibold drop-shadow-[0_0_8px_rgba(245,199,107,0.4)]' : ''
            }`}
          >
            All Categories
          </button>
          <button
            onClick={onNavigateCombos}
            className="transition-colors whitespace-nowrap shrink-0 hover:text-[#F5C76B]"
          >
            Royal Combos
          </button>
          <button
            onClick={onOpenOwnerChecklist}
            className="text-xs text-[#8A7465] hover:text-[#F5C76B] transition-colors whitespace-nowrap shrink-0"
            title="Menu verification & POS notes for owner"
          >
            Owner Checklist
          </button>
        </nav>

        {/* Zone 3: Primary Action / Quick Search */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#FFF5E5] bg-[#1B100D]/90 hover:bg-[#281813] border border-[#F5C76B]/30 hover:border-[#F5C76B]/60 rounded-lg transition-all whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C76B] shadow-[0_0_12px_rgba(245,199,107,0.1)]"
            aria-label="Search menu items"
          >
            <Search className="w-3.5 h-3.5 text-[#F5C76B]" />
            <span className="hidden sm:inline">Search Menu</span>
          </button>

          <button
            onClick={onNavigateCombos}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#FFF5E5] bg-gradient-to-r from-[#2A1711] to-[#1C0E0A] hover:border-[#F5C76B] border border-[#F5C76B]/40 rounded-lg transition-all whitespace-nowrap shrink-0 active:scale-95 shadow-[0_0_10px_rgba(245,199,107,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5C76B]" />
            <span className="hidden xs:inline">Royal Combos</span>
          </button>
        </div>
      </div>
    </header>
  );
};
