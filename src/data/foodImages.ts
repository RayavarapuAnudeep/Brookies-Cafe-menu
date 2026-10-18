// Local assets imported through Vite are fingerprinted and copied into dist during production builds.
import tableHeroImage from '../assets/images/brookies_luxury_table_hero_1792269202415.jpg';
import cafeHeroImage from '../assets/images/brookies_cafe_hero_1792247813209.jpg';
import pizzaImage from '../assets/images/category_artisanal_pizza_1792249230614.jpg';
import nonVegPizzaImage from '../assets/images/non_veg_pizza_1792270962937.jpg';
import kunafaImage from '../assets/images/category_chocolate_kunafa_1792249230353.jpg';
import chocolateBowlImage from '../assets/images/chocolate_bowl_1792270980635.jpg';
import momosImage from '../assets/images/category_steamed_momos_1792249231443.jpg';
import chickenMomosImage from '../assets/images/chicken_momos_1792271065366.jpg';
import burgerImage from '../assets/images/category_gourmet_burger_1792249231673.jpg';
import chickenBurgerImage from '../assets/images/chicken_burger_1792271032527.jpg';
import wafflesImage from '../assets/images/category_golden_waffles_1792249249010.jpg';
import sizzlingBrownieImage from '../assets/images/category_sizzling_brownie_1792249250563.jpg';
import loadedFriesImage from '../assets/images/category_loaded_fries_1792249251131.jpg';
import crispyFriesImage from '../assets/images/crispy_fries_1792271017070.jpg';
import mocktailImage from '../assets/images/category_chilled_mocktail_1792249250810.jpg';
import chickenWingsImage from '../assets/images/category_chicken_wings_1792249273311.jpg';
import garlicBreadImage from '../assets/images/category_garlic_bread_1792249274256.jpg';
import bomboloniImage from '../assets/images/category_bomboloni_1792249273980.jpg';
import wrapImage from '../assets/images/category_fresh_veg_wrap_1792269203312.jpg';
import chickenWrapImage from '../assets/images/chicken_wrap_1792271082260.jpg';
import vegSnacksImage from '../assets/images/veg_snacks_1792271097849.jpg';
import pizzaPocketsImage from '../assets/images/pizza_pockets_1792270996272.jpg';
import maggiImage from '../assets/images/category_steamed_maggi_1792269203925.jpg';
import icedCoffeeImage from '../assets/images/category_chilled_iced_coffee_1792269203726.jpg';
import hotCoffeeImage from '../assets/images/hot_coffee_1792271113008.jpg';
import combosFeastImage from '../assets/images/combos_feast_1792271049859.jpg';

export {
  tableHeroImage, cafeHeroImage, pizzaImage, nonVegPizzaImage, kunafaImage,
  chocolateBowlImage, momosImage, chickenMomosImage, burgerImage,
  chickenBurgerImage, wafflesImage, sizzlingBrownieImage, loadedFriesImage,
  crispyFriesImage, mocktailImage, chickenWingsImage, garlicBreadImage,
  bomboloniImage, wrapImage, chickenWrapImage, vegSnacksImage,
  pizzaPocketsImage, maggiImage, icedCoffeeImage, hotCoffeeImage,
  combosFeastImage,
};

export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  'veg-momos': momosImage,
  'non-veg-momos': chickenMomosImage,
  'veg-pizzas': pizzaImage,
  'non-veg-pizzas': nonVegPizzaImage,
  'veg-pizza-pockets': pizzaPocketsImage,
  'non-veg-pizza-pockets': nonVegPizzaImage,
  'veg-burgers': burgerImage,
  'non-veg-burgers': chickenBurgerImage,
  'veg-wraps': wrapImage,
  'non-veg-wraps': chickenWrapImage,
  'veg-snacks': vegSnacksImage,
  'garlic-breads': garlicBreadImage,
  'waffles': wafflesImage,
  'french-fries': crispyFriesImage,
  'veg-loaded-fries': loadedFriesImage,
  'chicken-loaded-fries': chickenWingsImage,
  'maggi': maggiImage,
  'chicken-snacks': chickenWingsImage,
  'combos': combosFeastImage,
  'chocolate-bowls': chocolateBowlImage,
  'chocolate-cake-bowls': kunafaImage,
  'special-waffles': wafflesImage,
  'sizzling-brownies': sizzlingBrownieImage,
  'bombolonis': bomboloniImage,
  'mocktails': mocktailImage,
  'milkshakes': cafeHeroImage,
  'coffee': icedCoffeeImage,
  'soft-drinks': mocktailImage,
};

export function getItemImage(_id: string, categorySlug: string, name: string): string {
  if (categorySlug === 'coffee' && name.toLowerCase() === 'hot coffee') return hotCoffeeImage;
  return CATEGORY_IMAGE_MAP[categorySlug] || tableHeroImage;
}
