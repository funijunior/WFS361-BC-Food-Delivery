/**
 * getCategories.js
 * ----------------------------------------------------------
 * Helper to derive the list of categories actually present in
 * the food data (so the filter only shows categories with items).
 * Always includes the synthetic 'all' category first.
 */
import { CATEGORIES } from '../constants/categories.js';

export function getCategories(foods = []) {
  const present = new Set(foods.map((f) => f.category));
  return CATEGORIES.filter((c) => c.id === 'all' || present.has(c.id));
}

export default getCategories;
