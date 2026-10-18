import React from 'react';
import { CafeLogo } from './CafeLogo';
import { ArrowUp, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenOwnerChecklist: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenOwnerChecklist,
  onNavigateHome,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0A0605] border-t border-[#F5C76B]/20 py-8 px-4 sm:px-6 transition-colors shadow-[0_-4px_25px_rgba(0,0,0,0.8)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2.5 focus:outline-none group"
            aria-label="Brookies Cafe Home"
          >
            <CafeLogo size="sm" />
            <span className="font-display font-bold text-base text-[#FFF5E5] group-hover:text-[#F5C76B] transition-colors">
              Brookies Cafe
            </span>
          </button>
          <span className="hidden sm:inline text-xs text-[#F5C76B]/50">·</span>
          <p className="text-xs text-[#CFC0B0] tracking-wide">
            Good Food • Good Mood • Great Times
          </p>
        </div>

        {/* Unboxed Metadata & Touchpoints */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#A69385]">
          <span>Royal Dine-In & QR Service</span>
          <span className="text-[#F5C76B]/50" aria-hidden="true">·</span>
          <span>Open Daily 11 AM – 11 PM</span>
          <span className="text-[#F5C76B]/50" aria-hidden="true">·</span>
          <button
            onClick={onOpenOwnerChecklist}
            className="text-[#F5C76B] hover:text-[#FFB52E] hover:underline flex items-center gap-1 transition-colors drop-shadow-[0_0_6px_rgba(245,199,107,0.3)]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Owner POS Checklist</span>
          </button>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs text-[#FFF5E5] hover:text-[#F5C76B] bg-[#180E0B] hover:bg-[#24140F] border border-[#F5C76B]/30 hover:border-[#F5C76B]/60 rounded-xl transition-all focus:outline-none shadow-[0_0_10px_rgba(0,0,0,0.6)]"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#F5C76B]" />
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-4 border-t border-[#1C100B] text-center text-[11px] text-[#7A6759]">
        Digital Table Menu • Brookies Cafe © {new Date().getFullYear()} • Prices in Indian Rupees (₹)
      </div>
    </footer>
  );
};
