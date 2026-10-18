import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatINR,
  getTotalItemCount,
  filterCategoriesByDietary,
  searchMenuItems,
  getPriceSummary,
} from './menuUtils.ts';
import type { MenuCategory } from '../types/menu.ts';

const mockCategories: MenuCategory[] = [
  {
    id: 'veg-pizzas',
    name: 'Veg Pizzas',
    slug: 'veg-pizzas',
    dietary: 'veg',
    description: 'Fresh pizzas',
    iconName: 'Pizza',
    items: [
      { id: '1', name: 'Margherita Pizza', category: 'Veg Pizzas', dietary: 'veg', price: 190, status: 'published' },
      { id: '2', name: 'Peri Peri Veg Pizza', category: 'Veg Pizzas', dietary: 'veg', price: 170, status: 'published' },
      { id: '3', name: 'Draft Pizza', category: 'Veg Pizzas', dietary: 'veg', price: 150, status: 'draft' },
    ],
  },
  {
    id: 'veg-momos',
    name: 'Veg Momos',
    slug: 'veg-momos',
    dietary: 'veg',
    description: 'Dumplings',
    iconName: 'Soup',
    items: [
      {
        id: '4',
        name: 'Veg Momos',
        category: 'Veg Momos',
        dietary: 'veg',
        portions: [
          { label: '5 pcs', price: 50 },
          { label: '10 pcs', price: 90 },
        ],
        status: 'published',
      },
    ],
  },
  {
    id: 'waffles',
    name: 'Waffles',
    slug: 'waffles',
    dietary: 'dessert',
    description: 'Sweet waffles',
    iconName: 'Grid',
    items: [
      { id: '5', name: 'Triple Chocolate Waffle', category: 'Waffles', dietary: 'dessert', price: 149, status: 'published' },
    ],
  },
];

test('formatINR formats currency in Indian notation correctly', () => {
  assert.equal(formatINR(0), '₹0');
  assert.equal(formatINR(190), '₹190');
  assert.equal(formatINR(1299), '₹1,299');
  assert.equal(formatINR(50), '₹50');
});

test('getTotalItemCount counts only published items', () => {
  const count = getTotalItemCount(mockCategories);
  // 2 published in veg pizzas + 1 published in momos + 1 published in waffles = 4
  assert.equal(count, 4);
});

test('filterCategoriesByDietary correctly filters by category type', () => {
  const all = filterCategoriesByDietary(mockCategories, 'all');
  assert.equal(all.length, 3);

  const veg = filterCategoriesByDietary(mockCategories, 'veg');
  assert.equal(veg.length, 2);

  const desserts = filterCategoriesByDietary(mockCategories, 'dessert');
  assert.equal(desserts.length, 1);
  assert.equal(desserts[0].id, 'waffles');
});

test('searchMenuItems finds items matching name across categories', () => {
  const results = searchMenuItems(mockCategories, 'chocolate');
  assert.equal(results.length, 1);
  assert.equal(results[0].item.name, 'Triple Chocolate Waffle');
  assert.equal(results[0].categorySlug, 'waffles');

  const pizzaResults = searchMenuItems(mockCategories, 'pizza');
  assert.equal(pizzaResults.length, 2); // Margherita & Peri Peri (Draft is excluded)
});

test('getPriceSummary formats single and multi-portion prices', () => {
  const single = getPriceSummary(mockCategories[0].items[0]);
  assert.equal(single, '₹190');

  const multi = getPriceSummary(mockCategories[1].items[0]);
  assert.equal(multi, '5 pcs ₹50 / 10 pcs ₹90');
});

test('all supplied menu rows preserve their names, prices, types and combo descriptions', async () => {
  const { menuData, MENU_CATEGORIES, COMBOS_DATA } = await import('../data/menuData.ts');
  const expectedCounts = [66, 42, 5, 30, 18];
  assert.deepEqual(menuData.map((section) => section.items.length), expectedCounts);

  const rendered = MENU_CATEGORIES.flatMap((category) => category.items);
  const sourceRows = menuData.filter((section) => section.section !== 'Combos').flatMap((section) => section.items);
  assert.equal(rendered.length, 161);
  assert.equal(sourceRows.length, 156);
  assert.equal(new Set(rendered.map((item) => item.id)).size, 161);

  const normalized = new Set(rendered.map((item) => `${item.name}|${item.price}|${item.sourceType}`));
  sourceRows.forEach(([name, price, type]) => assert.ok(normalized.has(`${name}|${price}|${type}`), `Missing ${name} at ₹${price}`));
  assert.deepEqual(COMBOS_DATA.map(({ name, price, sourceType, description }) => [name, price, sourceType, description]), menuData[2].items);
  assert.equal(getTotalItemCount(MENU_CATEGORIES), 161);
});
