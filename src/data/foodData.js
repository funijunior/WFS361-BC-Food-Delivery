/**
 * foodData.js
 * ----------------------------------------------------------
 * Static menu data for BC Eats.
 *
 * Each item:
 * {
 *   id,
 *   name,
 *   description,
 *   price,
 *   category,
 *   image,
 *   rating,
 *   deliveryTime,
 *   popular
 * }
 */

import burger from '../assets/foods/burger.png';
import pizza from '../assets/foods/pizza.png';
import coke from '../assets/foods/coke.png';
import fries from '../assets/foods/fries.png';
import chicken from '../assets/foods/chicken.png';
import milkshake from '../assets/foods/milkshake.png';
import lavaCake from '../assets/foods/lava-cake.png';

const FOOD_DATA = [
  {
    id: 'burger-classic',
    name: 'Classic Cheeseburger',
    description:
      'Juicy beef patty, melted cheddar, crisp lettuce, house sauce on a brioche bun.',
    price: 65,
    category: 'meals',
    image: burger,
    rating: 4.8,
    deliveryTime: 18,
    popular: true,
  },

  {
    id: 'pizza-margherita',
    name: 'Margherita Pizza',
    description:
      'Wood-fired base, San Marzano tomato, fresh mozzarella, basil, olive oil.',
    price: 89,
    category: 'meals',
    image: pizza,
    rating: 4.9,
    deliveryTime: 22,
    popular: true,
  },

  {
    id: 'chicken-crispy',
    name: 'Crispy Chicken Bucket',
    description:
      '8 pieces of golden buttermilk fried chicken with a signature spice blend.',
    price: 99,
    category: 'meals',
    image: chicken,
    rating: 4.7,
    deliveryTime: 20,
    popular: true,
  },

  {
    id: 'fries-loaded',
    name: 'Loaded Fries',
    description:
      'Crispy fries topped with cheese sauce, herbs and a smoky sprinkle.',
    price: 35,
    category: 'sides',
    image: fries,
    rating: 4.6,
    deliveryTime: 12,
    popular: true,
  },

  {
    id: 'coke-iced',
    name: 'Iced Cola',
    description:
      'Ice-cold cola served over crushed ice with a fresh lime twist.',
    price: 18,
    category: 'drinks',
    image: coke,
    rating: 4.5,
    deliveryTime: 8,
    popular: true,
  },

  {
    id: 'milkshake-choc',
    name: 'Chocolate Milkshake',
    description:
      'Thick chocolate shake topped with whipped cream and a cherry.',
    price: 32,
    category: 'drinks',
    image: milkshake,
    rating: 4.8,
    deliveryTime: 10,
    popular: false,
  },

  {
    id: 'lava-cake',
    name: 'Chocolate Lava Cake',
    description:
      'Warm molten centre with vanilla bean ice cream and cocoa dust.',
    price: 45,
    category: 'desserts',
    image: lavaCake,
    rating: 4.9,
    deliveryTime: 14,
    popular: true,
  },
];

/*
 * Named export used by Home.jsx:
 *
 * import { FOOD_DATA } from '../data/foodData.js';
 */
export { FOOD_DATA };

/*
 * Backwards-compatible export.
 */
export const FOODS = FOOD_DATA;

/*
 * Default export.
 */
export default FOOD_DATA;