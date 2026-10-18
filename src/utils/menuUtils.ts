import type { MenuCategory, MenuItem, PriceOption, DietaryType } from '../types/menu.ts';

/**
 * Format a number as Indian Currency (INR) with ₹ symbol.
 * Adheres to Indian number formatting rules.
 */
export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  // Standard Indian rupee formatting
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(amount);
  return `₹${formatted}`;
}

/**
 * Total item count across all categories (published only)
 */
export function getTotalItemCount(categories: MenuCategory[]): number {
  return categories.reduce((total, cat) => {
    const published = cat.items.filter((item) => item.status === 'published');
    return total + published.length;
  }, 0);
}

/**
 * Filter categories by dietary type
 */
export function filterCategoriesByDietary(
  categories: MenuCategory[],
  filter: DietaryType | 'all'
): MenuCategory[] {
  if (filter === 'all') {
    return categories;
  }
  return categories.filter((cat) => cat.dietary === filter);
}

export interface SearchResult {
  item: MenuItem;
  categoryName: string;
  categorySlug: string;
}

/**
 * Search items across all categories
 */
export function searchMenuItems(
  categories: MenuCategory[],
  query: string
): SearchResult[] {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  const results: SearchResult[] = [];

  for (const category of categories) {
    for (const item of category.items) {
      if (item.status !== 'published') continue;
      const matchesName = item.name.toLowerCase().includes(cleanQuery);
      const matchesCat = category.name.toLowerCase().includes(cleanQuery);

      if (matchesName || matchesCat) {
        results.push({
          item,
          categoryName: category.name,
          categorySlug: category.slug,
        });
      }
    }
  }

  return results;
}

/**
 * Helper to display prices for single or multi-portion items cleanly
 */
export function getPriceSummary(item: MenuItem): string {
  if (item.price !== undefined) {
    return formatINR(item.price);
  }
  if (item.portions && item.portions.length > 0) {
    return item.portions.map((p) => `${p.label} ${formatINR(p.price)}`).join(' / ');
  }
  return 'Price upon request';
}
