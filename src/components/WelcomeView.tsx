import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Clock, MapPin, Phone, Sparkles, X } from 'lucide-react';
import { tableHeroImage } from '../data/foodImages';
import brookiesLogo from '../assets/images/brookies-logo.jpg';

interface WelcomeViewProps {
  onExploreMenu: () => void;
  onOpenOwnerChecklist: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onExploreMenu }) => {
  const [showInfoModal, setShowInfoModal] = useState<'about' | 'contact' | null>(null);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#080706] text-[#FFF5E5] overflow-hidden select-none">
      <div className="absolute inset-0 z-0">
        <img src={tableHeroImage} alt="Brookies Cafe dining table" className="w-full h-full object-cover object-bottom brightness-75" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080706]/80 via-[#080706]/45 to-[#080706]/90" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F5C76B]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <header className="relative z-20 w-full bg-[#0C0806]/70 backdrop-blur-md border-b border-[#F5C76B]/25">
        <nav className="max-w-7xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-center gap-5 sm:gap-9 text-xs sm:text-sm font-medium text-[#E0D0C0]" aria-label="Welcome Navigation">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[#F5C76B] font-semibold hover:text-[#FFD888]">Home</button>
          <button onClick={onExploreMenu} className="hover:text-[#F5C76B] transition-colors">Menu</button>
          <button onClick={() => setShowInfoModal('about')} className="hover:text-[#F5C76B] transition-colors">About</button>
          <button onClick={() => setShowInfoModal('contact')} className="hover:text-[#F5C76B] transition-colors">Contact</button>
        </nav>
      </header>

      <main className="relative z-10 flex-1 w-full flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full flex flex-col items-center text-center">
          <div className="relative mb-5 sm:mb-7 rounded-full p-2 border border-[#F5C76B]/70 bg-[#210F16]/55 shadow-[0_0_34px_rgba(245,199,107,0.45),0_0_80px_rgba(255,181,46,0.17)]">
            <img
              src={brookiesLogo}
              alt="Brookies Cafe logo"
              className="w-48 h-48 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full object-cover border border-[#F5C76B]/60 shadow-inner"
              loading="eager"
            />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFF5E5] drop-shadow-[0_3px_18px_rgba(0,0,0,0.9)]">
            Brookies Cafe
          </h1>
          <p className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-[0.24em] text-[#F5C76B]">
            Good Food&nbsp; • &nbsp;Good Mood&nbsp; • &nbsp;Good Times
          </p>
          <p className="mt-3 max-w-md text-sm sm:text-base text-[#E0D0C0] leading-relaxed">
            A little chocolate, a little spice, and a whole lot of happiness.
          </p>

          <button
            onClick={onExploreMenu}
            className="mt-7 inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-[#140A06] bg-gradient-to-r from-[#F5C76B] via-[#FFB52E] to-[#E5A826] hover:from-[#FFD888] hover:to-[#F5B833] rounded-full shadow-[0_0_25px_rgba(255,181,46,0.45),0_8px_30px_rgba(0,0,0,0.8)] hover:shadow-[0_0_38px_rgba(255,181,46,0.7)] transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFB52E]"
          >
            <span>Discover Menu</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </main>

      <div className="relative z-10 w-full px-4 sm:px-8 py-4 border-t border-[#F5C76B]/20 bg-[#080706]/75 backdrop-blur-sm flex items-center justify-between">
        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#D6C4B2]/75">Artisanal Dining</span>
        <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#F5C76B]" aria-hidden="true">
          Browse dishes <ChevronDown className="w-3.5 h-3.5" />
        </div>
        <span className="font-display italic text-sm sm:text-base text-[#F5C76B]">Eat • Share • Enjoy</span>
      </div>

      {showInfoModal && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#140A07] border border-[#F5C76B]/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_35px_rgba(245,199,107,0.25)] text-[#FFF5E5]">
            <button onClick={() => setShowInfoModal(null)} className="absolute top-5 right-5 p-1.5 rounded-lg bg-[#22130D] text-[#CFC0B0] hover:text-white" aria-label="Close dialog"><X className="w-5 h-5" /></button>
            {showInfoModal === 'about' ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#F5C76B] uppercase tracking-wider mb-2"><Sparkles className="w-4 h-4" /><span>About Brookies Cafe</span></div>
                <h2 className="font-display text-2xl font-bold mb-2">Artisanal Dessert & Dining Lounge</h2>
                <p className="text-xs sm:text-sm text-[#CFC0B0] leading-relaxed mb-4">Brookies Cafe blends the richness of European chocolate boutiques with vibrant savoury specialties. From stone-fired pizzas and crispy momos to chocolate bowls and sizzling brownies, there is something to share.</p>
                <div className="p-3 bg-[#1C0E0A] rounded-xl border border-[#F5C76B]/25 text-xs text-[#D1C0B0]"><strong>Tagline:</strong> Good Food • Good Mood • Good Times</div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#F5C76B] uppercase tracking-wider mb-2"><Phone className="w-4 h-4" /><span>Contact & Dine-In Info</span></div>
                <h2 className="font-display text-2xl font-bold mb-3">Visit Brookies Cafe</h2>
                <div className="space-y-3 text-xs sm:text-sm text-[#CFC0B0]">
                  <div className="flex items-start gap-2.5"><MapPin className="w-4 h-4 text-[#F5C76B] shrink-0 mt-0.5" /><span>Brookies Cafe Table QR Service • Dine-In & Takeaway</span></div>
                  <div className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-[#F5C76B] shrink-0" /><span>Open Daily: 11:00 AM – 11:00 PM</span></div>
                  <div className="flex items-center gap-2.5"><Phone className="w-4 h-4 text-[#F5C76B] shrink-0" /><span>For inquiries, speak directly with your table steward.</span></div>
                </div>
              </div>
            )}
            <button onClick={() => { setShowInfoModal(null); onExploreMenu(); }} className="mt-6 w-full py-3 text-xs font-bold text-[#140A06] bg-gradient-to-r from-[#F5C76B] to-[#FFB52E] rounded-xl shadow-md transition-all active:scale-95">Discover Menu</button>
          </div>
        </div>
      )}
    </div>
  );
};
