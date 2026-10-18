import type { ComboItem, DietaryType, MenuCategory, MenuItem, OwnerVerificationEntry } from '../types/menu';

export type MenuRow = [name: string, price: number, type: string] | [name: string, price: number, type: string, description: string];
export interface MenuSectionSource {
  section: string;
  title: string;
  description: string;
  items: MenuRow[];
}

// Supplied menu is the source of truth. Names, prices, types, and combo descriptions are kept verbatim.
export const menuData: MenuSectionSource[] = [
  {
    section: "Veg",
    title: "Veg Favourites",
    description: "Fresh, flavourful vegetarian bites",
    items: [
      ["Veg Momos (5 Pc)", 50, "momo"], ["Veg Momos (10 Pc)", 90, "momo"],
      ["Paneer Steam Momos (5 Pc)", 70, "momo"], ["Paneer Steam Momos (10 Pc)", 130, "momo"],
      ["Paneer Fry Momos (5 Pc)", 80, "momo"], ["Paneer Fry Momos (10 Pc)", 150, "momo"],
      ["Paneer Kurkure Momos (5 Pc)", 90, "momo"], ["Paneer Kurkure Momos (10 Pc)", 160, "momo"],
      ["Paneer Gravy Momos (5 Pc)", 110, "momo"], ["Paneer Gravy Momos (10 Pc)", 200, "momo"],
      ["Sweet Corn Momos (5 Pc)", 70, "momo"], ["Sweet Corn Momos (10 Pc)", 130, "momo"],
      ["Sweet Corn Fry Momos (5 Pc)", 80, "momo"], ["Sweet Corn Fry Momos (10 Pc)", 150, "momo"],
      ["Sweet Corn Kurkure Momos (5 Pc)", 90, "momo"], ["Sweet Corn Kurkure Momos (10 Pc)", 160, "momo"],
      ["Sweet Corn Gravy Momos (5 Pc)", 110, "momo"], ["Sweet Corn Gravy Momos (10 Pc)", 200, "momo"],
      ["Plain Veg Momos (5 Pc)", 70, "momo"], ["Plain Veg Momos (10 Pc)", 90, "momo"],
      ["Plain Veg Fry Momos (5 Pc)", 80, "momo"], ["Plain Veg Fry Momos (10 Pc)", 150, "momo"],
      ["Plain Veg Kurkure Momos (5 Pc)", 90, "momo"], ["Plain Veg Kurkure Momos (10 Pc)", 160, "momo"],
      ["Plain Veg Gravy Momos (5 Pc)", 90, "momo"], ["Plain Veg Gravy Momos (10 Pc)", 160, "momo"],
      ["Peri Peri Veg Pizza", 170, "pizza"], ["Margherita Pizza", 190, "pizza"], ["Sweet Corn Pizza", 150, "pizza"],
      ["Paneer Pizza", 180, "pizza"], ["Makhani Pizza", 150, "pizza"], ["Tandoori Veg Pizza", 155, "pizza"],
      ["Veg Burger", 90, "burger"], ["Aloo Tikki Burger", 90, "burger"], ["Butter Burger", 90, "burger"],
      ["Paneer Wrap", 149, "wrap"], ["Sweet Corn Wrap", 139, "wrap"], ["Paneer Tikka Wrap", 169, "wrap"],
      ["Aloo Tikki Wrap", 139, "wrap"], ["Falafel Wrap", 179, "wrap"],
      ["Falafel Bites", 159, "snack"], ["Aloo Bites", 129, "snack"], ["Veg Nuggets", 139, "snack"],
      ["Cheese Balls", 159, "snack"], ["Cheese Fingers", 169, "snack"],
      ["Corn Pizza Pocket", 149, "pizza"], ["Paneer Pizza Pocket", 169, "pizza"],
      ["Paneer Tikka Pocket", 179, "pizza"], ["All Veggies Pizza Pocket", 149, "pizza"],
      ["Butter Garlic Bread", 160, "bread"], ["Peri Peri Garlic Bread", 130, "bread"],
      ["Garlic Bread", 130, "bread"], ["Cheesy Garlic Bread", 160, "bread"],
      ["White Chocolate Waffle", 169, "waffle"], ["Milk Chocolate Waffle", 189, "waffle"],
      ["Nutella Chocolate Waffle", 199, "waffle"], ["Waffle with Ice Cream", 199, "waffle"],
      ["French Fries Small", 79, "fries"], ["French Fries Medium", 119, "fries"], ["French Fries Large", 169, "fries"],
      ["Veg Loaded Fries Bowl", 169, "fries"], ["Paneer Loaded Fries Bowl", 179, "fries"],
      ["Plain Maggie", 59, "noodles"], ["Masala Maggie", 89, "noodles"], ["Cheese Maggie", 139, "noodles"],
      ["Vegetable Cheese Maggie", 159, "noodles"]
    ]
  },
  {
    section: "Non-Veg",
    title: "Non-Veg Specials",
    description: "Crispy, spicy and delicious",
    items: [
      ["Chicken Steamed Momos (5 Pc)", 80, "momo"], ["Chicken Steamed Momos (10 Pc)", 150, "momo"],
      ["Chicken Fry Momos (5 Pc)", 90, "momo"], ["Chicken Fry Momos (10 Pc)", 170, "momo"],
      ["Chicken Kurkure Momos (5 Pc)", 110, "momo"], ["Chicken Kurkure Momos (10 Pc)", 200, "momo"],
      ["Chicken Gravy Momos (5 Pc)", 120, "momo"], ["Chicken Gravy Momos (10 Pc)", 210, "momo"],
      ["Chicken Peri Peri Steamed Momos (5 Pc)", 80, "momo"], ["Chicken Peri Peri Steamed Momos (10 Pc)", 150, "momo"],
      ["Chicken Peri Peri Fry Momos (5 Pc)", 90, "momo"], ["Chicken Peri Peri Fry Momos (10 Pc)", 170, "momo"],
      ["Chicken Peri Peri Kurkure Momos (5 Pc)", 110, "momo"], ["Chicken Peri Peri Kurkure Momos (10 Pc)", 200, "momo"],
      ["Chicken Peri Peri Gravy Momos (5 Pc)", 120, "momo"], ["Chicken Peri Peri Gravy Momos (10 Pc)", 210, "momo"],
      ["Peri Peri Chicken Pizza", 220, "pizza"], ["Chicken Butter Pizza", 230, "pizza"], ["Cheesy Chicken Pizza", 220, "pizza"],
      ["Tandoori Chicken Pizza", 210, "pizza"], ["Masala Chicken Pizza", 240, "pizza"], ["Brookies Special Pizza", 270, "pizza"],
      ["Butter Chicken Burger", 120, "burger"], ["Tandoori Chicken Burger", 120, "burger"], ["Peri Peri Chicken Burger", 130, "burger"],
      ["Fried Chicken Legs (2 Pc)", 129, "chicken"], ["Fried Chicken Legs (4 Pc)", 199, "chicken"],
      ["Chicken Wings (4 Pc)", 129, "chicken"], ["Chicken Wings (8 Pc)", 199, "chicken"],
      ["Chicken Wrap", 179, "wrap"], ["Chicken Tikka Wrap", 189, "wrap"], ["Tandoori Chicken Wrap", 199, "wrap"], ["Butter Chicken Wrap", 199, "wrap"],
      ["Chicken Nuggets", 240, "chicken"], ["Chicken Cheese Balls", 220, "chicken"], ["Chicken Bites", 210, "chicken"], ["Chicken Fingers", 230, "chicken"],
      ["Chicken Pizza Pocket", 210, "pizza"], ["Tandoori Pizza Pocket", 230, "pizza"],
      ["Peri Peri Pizza Pocket", 240, "pizza"], ["Chicken Keema Pocket", 260, "pizza"],
      ["Chicken Loaded Fries Bowl", 229, "fries"]
    ]
  },
  {
    section: "Combos",
    title: "Most Popular Combos",
    description: "More food, more fun, more happiness",
    items: [
      ["Combo 1", 299, "chocolate", "Any momos, 1-person chocolate bowl, French fries and mocktail"],
      ["Combo 2", 459, "pizza", "Any momos, 1-person chocolate bowl, French fries, any veg pizza and mocktail"],
      ["Combo 3", 599, "waffle", "Any momos, any waffle, Maggie, French fries, chicken pizza and mocktail"],
      ["Combo 4", 799, "pizza", "Any momos, 2-person chocolate bowl, French fries, chicken pizza, Maggie, mocktail and sizzling brownie"],
      ["Combo 5", 999, "chocolate", "Any 2 pizzas, sizzling brownie, 2-person chocolate bowl + ice cream, any 2 momos, 2 mocktails, French fries and cold coffee"]
    ]
  },
  {
    section: "Special",
    title: "Chocolate & Dessert Specials",
    description: "A little extra sweetness",
    items: [
      ["Triple Chocolate Bowl (1 Person)", 129, "chocolate"], ["Brownie Chocolate Bowl (1 Person)", 129, "chocolate"],
      ["White Chocolate Bowl (1 Person)", 159, "chocolate"], ["Milk Chocolate Bowl (1 Person)", 159, "chocolate"],
      ["All Mix Bowl (1 Person)", 199, "chocolate"], ["Biscoff Chocolate (1 Person)", 199, "chocolate"], ["Kinder Joy Chocolate (1 Person)", 199, "chocolate"],
      ["Triple Chocolate Bowl (2 Person)", 219, "chocolate"], ["Brownie Chocolate Bowl (2 Person)", 199, "chocolate"],
      ["White Chocolate Bowl (2 Person)", 229, "chocolate"], ["Milk Chocolate Bowl (2 Person)", 229, "chocolate"],
      ["All Mix Bowl (2 Person)", 249, "chocolate"], ["Biscoff Chocolate (2 Person)", 249, "chocolate"], ["Kinder Joy Chocolate (2 Person)", 249, "chocolate"],
      ["Triple Chocolate Waffle", 149, "waffle"], ["Brownie Chocolate Waffle", 149, "waffle"],
      ["Triple Chocolate Sizzling Brownie", 199, "chocolate"], ["Brownie Chocolate Sizzling Brownie", 199, "chocolate"],
      ["Milk Chocolate Sizzling Brownie", 159, "chocolate"], ["White Chocolate Sizzling Brownie", 179, "chocolate"],
      ["Nutella Cake Bowl", 339, "chocolate"], ["Nutella with Dark Chocolate Cake Bowl", 349, "chocolate"],
      ["Nutella with White Chocolate Cake Bowl", 359, "chocolate"], ["Nutella with Milk Chocolate Cake Bowl", 359, "chocolate"],
      ["Dark Chocolate Cake Bowl", 339, "chocolate"], ["Milk Chocolate Cake Bowl", 359, "chocolate"], ["White Chocolate Cake Bowl", 399, "chocolate"],
      ["Dark Chocolate Bomboloni", 159, "chocolate"], ["Milk Chocolate Bomboloni", 159, "chocolate"], ["Nutella Bomboloni", 179, "chocolate"]
    ]
  },
  {
    section: "Drinks",
    title: "Mocktails, Milkshakes & More",
    description: "Cool sips and refreshing vibes",
    items: [
      ["Green Mint Mocktail", 79, "drink"], ["Blue Curacao Mocktail", 79, "drink"], ["Lemon Mint Mocktail", 79, "drink"],
      ["Mojito", 89, "drink"], ["Jeera Masala", 89, "drink"], ["Mojito Lime & Mint", 89, "drink"], ["Mojito Havana Unana", 79, "drink"],
      ["Chocolate Milk Shake", 119, "drink"], ["Strawberry Milk Shake", 119, "drink"], ["Oreo Milk Shake", 119, "drink"],
      ["Vanilla Caramel", 139, "drink"], ["Mango Milk Shake", 119, "drink"], ["Kit Kat Milk Shake", 119, "drink"],
      ["Cold Coffee", 119, "coffee"], ["Hot Coffee", 70, "coffee"],
      ["Thums Up", 49, "drink"], ["Sprite", 49, "drink"], ["Mountain Dew", 59, "drink"]
    ]
  }
];

interface CategoryDefinition { name: string; slug: string; iconName: string; }
const categoryDefinitions: Record<string, CategoryDefinition> = {
  'Veg|momo': { name: 'Veg Momos', slug: 'veg-momos', iconName: 'Soup' },
  'Veg|pizza': { name: 'Veg Pizzas', slug: 'veg-pizzas', iconName: 'Pizza' },
  'Veg|pizza-pocket': { name: 'Veg Pizza Pockets', slug: 'veg-pizza-pockets', iconName: 'Pizza' },
  'Veg|burger': { name: 'Veg Burgers', slug: 'veg-burgers', iconName: 'Sandwich' },
  'Veg|wrap': { name: 'Veg Wraps', slug: 'veg-wraps', iconName: 'Sandwich' },
  'Veg|snack': { name: 'Veg Snacks', slug: 'veg-snacks', iconName: 'Utensils' },
  'Veg|bread': { name: 'Garlic Breads', slug: 'garlic-breads', iconName: 'Utensils' },
  'Veg|waffle': { name: 'Waffles', slug: 'waffles', iconName: 'Grid' },
  'Veg|fries': { name: 'French Fries', slug: 'french-fries', iconName: 'Utensils' },
  'Veg|loaded-fries': { name: 'Veg Loaded Fries', slug: 'veg-loaded-fries', iconName: 'Utensils' },
  'Veg|noodles': { name: 'Maggi', slug: 'maggi', iconName: 'Soup' },
  'Non-Veg|momo': { name: 'Non-Veg Momos', slug: 'non-veg-momos', iconName: 'Soup' },
  'Non-Veg|pizza': { name: 'Non-Veg Pizzas', slug: 'non-veg-pizzas', iconName: 'Pizza' },
  'Non-Veg|pizza-pocket': { name: 'Non-Veg Pizza Pockets', slug: 'non-veg-pizza-pockets', iconName: 'Pizza' },
  'Non-Veg|burger': { name: 'Non-Veg Burgers', slug: 'non-veg-burgers', iconName: 'Sandwich' },
  'Non-Veg|wrap': { name: 'Non-Veg Wraps', slug: 'non-veg-wraps', iconName: 'Sandwich' },
  'Non-Veg|chicken': { name: 'Chicken Snacks, Legs & Wings', slug: 'chicken-snacks', iconName: 'Utensils' },
  'Non-Veg|fries': { name: 'Chicken Loaded Fries', slug: 'chicken-loaded-fries', iconName: 'Utensils' },
  'Combos|all': { name: 'Combos', slug: 'combos', iconName: 'Sparkles' },
  'Special|chocolate-bowls': { name: 'Chocolate Bowls', slug: 'chocolate-bowls', iconName: 'Cookie' },
  'Special|cake-bowls': { name: 'Chocolate Cake Bowls', slug: 'chocolate-cake-bowls', iconName: 'Cookie' },
  'Special|waffles': { name: 'Special Waffles', slug: 'special-waffles', iconName: 'Grid' },
  'Special|brownies': { name: 'Sizzling Brownies', slug: 'sizzling-brownies', iconName: 'Flame' },
  'Special|bomboloni': { name: 'Bomboloni', slug: 'bombolonis', iconName: 'Cookie' },
  'Drinks|mocktails': { name: 'Mocktails', slug: 'mocktails', iconName: 'GlassWater' },
  'Drinks|milkshakes': { name: 'Milkshakes', slug: 'milkshakes', iconName: 'CupSoda' },
  'Drinks|coffee': { name: 'Coffee', slug: 'coffee', iconName: 'Coffee' },
  'Drinks|soft-drinks': { name: 'Soft Drinks', slug: 'soft-drinks', iconName: 'CupSoda' }
};

function getGroup(section: string, row: MenuRow): string {
  const [name, , type] = row;
  const n = name.toLowerCase();
  if (section === 'Combos') return 'all';
  if (section === 'Special') {
    if (n.includes('bomboloni')) return 'bomboloni';
    if (n.includes('waffle')) return 'waffles';
    if (n.includes('sizzling brownie')) return 'brownies';
    if (n.includes('cake bowl')) return 'cake-bowls';
    return 'chocolate-bowls';
  }
  if (section === 'Drinks') {
    if (type === 'coffee') return 'coffee';
    if (['thums up', 'sprite', 'mountain dew'].includes(n)) return 'soft-drinks';
    return n.includes('shake') || n === 'vanilla caramel' ? 'milkshakes' : 'mocktails';
  }
  if (type === 'pizza' && n.includes('pocket')) return 'pizza-pocket';
  if (type === 'fries' && n.includes('loaded')) return section === 'Veg' ? 'loaded-fries' : type;
  return type;
}

const dietaryBySection: Record<string, DietaryType> = {
  Veg: 'veg', 'Non-Veg': 'non-veg', Combos: 'combo', Special: 'dessert', Drinks: 'beverage'
};

function buildCategories(): MenuCategory[] {
  const categories = new Map<string, MenuCategory>();
  menuData.forEach((section) => section.items.forEach((row, index) => {
    const group = getGroup(section.section, row);
    const definition = categoryDefinitions[`${section.section}|${group}`];
    if (!definition) throw new Error(`No category mapping for ${section.section}/${group}`);
    let category = categories.get(definition.slug);
    if (!category) {
      category = {
        id: definition.slug, name: definition.name, slug: definition.slug,
        dietary: dietaryBySection[section.section], description: section.description,
        iconName: definition.iconName, items: [], section: section.section,
        sectionTitle: section.title, sectionDescription: section.description
      };
      categories.set(definition.slug, category);
    }
    const [name, price, sourceType, description] = row;
    const item: MenuItem = {
      id: `${section.section.toLowerCase().replace(/[^a-z]+/g, '-')}-${index + 1}`,
      name, category: definition.name, dietary: dietaryBySection[section.section], price,
      status: 'published', sourceType, ...(description ? { description } : {})
    };
    category.items.push(item);
  }));
  return Array.from(categories.values());
}

export const MENU_CATEGORIES = buildCategories();
export const COMBOS_DATA: ComboItem[] = menuData
  .find((section) => section.section === 'Combos')!.items
  .map(([name, price, sourceType, description], index) => ({
    id: `combo-${index + 1}`, name, price, sourceType, description: description || ''
  }));

export const OWNER_VERIFICATION_CHECKLIST: OwnerVerificationEntry[] = [];
