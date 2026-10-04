/**
 * categories.js
 * ----------------------------------------------------------
 * Menu category constants. Shared by CategoryFilter, Hero
 * (popular categories), and the food data layer.
 *
 * Each category: { id, label, icon (svg filename), emoji fallback }
 * Icons live in src/assets/icons/.
 */
export const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'all.svg' },
  { id: 'meals', label: 'Meals', icon: 'meals.svg' },
  { id: 'drinks', label: 'Drinks', icon: 'drinks.svg' },
  { id: 'snacks', label: 'Snacks', icon: 'snacks.svg' },
  { id: 'desserts', label: 'Desserts', icon: 'desserts.svg' },
  { id: 'sides', label: 'Sides', icon: 'sides.svg' },
];

export const POPULAR_CATEGORIES = CATEGORIES.filter((c) => c.id !== 'all');

export default CATEGORIES;
