import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { WelcomeView } from './components/WelcomeView';
import { CategoryGrid } from './components/CategoryGrid';
import { CategoryDetailView } from './components/CategoryDetailView';
import { OwnerVerificationModal } from './components/OwnerVerificationModal';
import { Footer } from './components/Footer';
import { MENU_CATEGORIES } from './data/menuData';
import { MenuCategory } from './types/menu';

export default function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'categories' | 'detail'>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);
  const [isOwnerChecklistOpen, setIsOwnerChecklistOpen] = useState(false);

  // Synchronize view with URL query parameters for QR code direct links and browser back navigation
  const updateUrl = useCallback((view: 'welcome' | 'categories' | 'detail', categorySlug?: string) => {
    const url = new URL(window.location.href);
    if (view === 'welcome') {
      url.searchParams.delete('view');
      url.searchParams.delete('category');
    } else if (view === 'categories') {
      url.searchParams.set('view', 'menu');
      url.searchParams.delete('category');
    } else if (view === 'detail' && categorySlug) {
      url.searchParams.set('view', 'menu');
      url.searchParams.set('category', categorySlug);
    }
    window.history.pushState({ view, categorySlug }, '', url.toString());
  }, []);

  // Initialize from URL params (e.g. ?view=menu, ?autostart=1, or ?category=waffles)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    const autostart = params.get('autostart');
    const categorySlug = params.get('category');

    if (categorySlug) {
      const match = MENU_CATEGORIES.find((c) => c.slug === categorySlug);
      if (match) {
        setSelectedCategory(match);
        setCurrentView('detail');
        return;
      }
    }

    if (viewParam === 'menu' || autostart === '1') {
      setCurrentView('categories');
    } else {
      setCurrentView('welcome');
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        setCurrentView(event.state.view || 'welcome');
        if (event.state.categorySlug) {
          const match = MENU_CATEGORIES.find((c) => c.slug === event.state.categorySlug);
          setSelectedCategory(match || null);
        } else {
          setSelectedCategory(null);
        }
      } else {
        // Fallback to parsing query
        const p = new URLSearchParams(window.location.search);
        const cSlug = p.get('category');
        if (cSlug) {
          const match = MENU_CATEGORIES.find((c) => c.slug === cSlug);
          setSelectedCategory(match || null);
          setCurrentView('detail');
        } else if (p.get('view') === 'menu') {
          setCurrentView('categories');
          setSelectedCategory(null);
        } else {
          setCurrentView('welcome');
          setSelectedCategory(null);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigateHome = () => {
    setCurrentView('welcome');
    setSelectedCategory(null);
    updateUrl('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreMenu = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    updateUrl('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (category: MenuCategory) => {
    setSelectedCategory(category);
    setCurrentView('detail');
    updateUrl('detail', category.slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCombos = () => {
    const combosCategory = MENU_CATEGORIES.find((c) => c.id === 'combos');
    if (combosCategory) {
      handleSelectCategory(combosCategory);
    }
  };

  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    updateUrl('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080706] text-[#FFF5E5] flex flex-col font-sans selection:bg-[#F5C76B] selection:text-[#140A06] mobile-royal-frame relative">
      {/* Top Bar Header for Menu & Category Views */}
      {currentView !== 'welcome' && (
        <Header
          currentView={currentView}
          onNavigateHome={handleNavigateHome}
          onNavigateCategories={handleExploreMenu}
          onNavigateCombos={handleSelectCombos}
          onOpenSearch={handleExploreMenu}
          onOpenOwnerChecklist={() => setIsOwnerChecklistOpen(true)}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'welcome' && (
          <WelcomeView
            onExploreMenu={handleExploreMenu}
            onOpenOwnerChecklist={() => setIsOwnerChecklistOpen(true)}
          />
        )}

        {currentView === 'categories' && (
          <CategoryGrid
            categories={MENU_CATEGORIES}
            onSelectCategory={handleSelectCategory}
            onSelectCombo={handleSelectCombos}
          />
        )}

        {currentView === 'detail' && selectedCategory && (
          <CategoryDetailView
            category={selectedCategory}
            allCategories={MENU_CATEGORIES}
            onBack={handleBackToCategories}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </main>

      {/* Site Footer */}
      {currentView !== 'welcome' && (
        <Footer
          onOpenOwnerChecklist={() => setIsOwnerChecklistOpen(true)}
          onNavigateHome={handleNavigateHome}
        />
      )}

      {/* Owner Verification Checklist Modal */}
      <OwnerVerificationModal
        isOpen={isOwnerChecklistOpen}
        onClose={() => setIsOwnerChecklistOpen(false)}
      />
    </div>
  );
}
