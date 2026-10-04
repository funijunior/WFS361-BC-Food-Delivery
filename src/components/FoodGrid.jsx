/**
 * FoodGrid.jsx
 * ----------------------------------------------------------
 * BC Eats — optimized food grid.
 *
 * Phase 5:
 *  - Memoized filtering
 *  - Staggered entrance
 *  - Reduced-motion support
 *  - Stable rendering
 *  - Accessible result announcements
 */

import {
  useMemo,
} from 'react';

import {
  motion,
  useReducedMotion,
} from 'framer-motion';

import FoodCard from './FoodCard.jsx';
import EmptyState from './EmptyState.jsx';

import { FOODS } from '../data/foodData.js';
import CATEGORIES from '../constants/categories.js';

import '../styles/foodGrid.css';

const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.04,
    },
  },
};

const cellVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function FoodGrid({
  items = FOODS,
  category = 'all',
  query = '',
  onClearFilters,
  className = '',
}) {
  const reduceMotion =
    useReducedMotion();

  const normalizedQuery =
    query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        category === 'all' ||
        item.category === category;

      const matchesQuery =
        normalizedQuery === '' ||
        item.name
          .toLowerCase()
          .includes(normalizedQuery) ||
        item.description
          .toLowerCase()
          .includes(normalizedQuery);

      return (
        matchesCategory &&
        matchesQuery
      );
    });
  }, [
    items,
    category,
    normalizedQuery,
  ]);

  const activeCategory =
    CATEGORIES.find(
      (item) => item.id === category,
    );

  const isFiltering =
    category !== 'all' ||
    normalizedQuery !== '';

  const count = filtered.length;

  const animationProps = reduceMotion
    ? {
        initial: false,
        animate: undefined,
        variants: undefined,
      }
    : {
        variants: gridVariants,
        initial: 'hidden',
        whileInView: 'show',
        viewport: {
          once: true,
          margin: '-60px',
        },
      };

  return (
    <div
      className={`food-grid ${className}`.trim()}
    >
      <div className="food-grid__header">
        <p
          className="food-grid__count"
          aria-live="polite"
          aria-atomic="true"
        >
          <strong>{count}</strong>{' '}
          {count === 1
            ? 'item'
            : 'items'}

          {category !== 'all' &&
            activeCategory
            ? ` in ${activeCategory.label}`
            : ''}
        </p>

        {normalizedQuery !== '' && (
          <p className="food-grid__filter-note">
            Results for{' '}
            <em>
              “{query.trim()}”
            </em>
          </p>
        )}
      </div>

      {count > 0 ? (
        <motion.ul
          className="food-grid__grid"
          key={`${category}-${normalizedQuery}`}
          {...animationProps}
          aria-label="Food menu"
        >
          {filtered.map((item) => (
            <motion.li
              key={item.id}
              className="food-grid__cell"
              variants={
                reduceMotion
                  ? undefined
                  : cellVariants
              }
            >
              <FoodCard item={item} />
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <EmptyState
          show={count === 0}
          title="No dishes found"
          message={
            normalizedQuery !== ''
              ? `We couldn't find anything matching “${query.trim()}”. Try a different search or category.`
              : 'Nothing in this category yet. Check back soon!'
          }
          actionLabel={
            isFiltering &&
            onClearFilters
              ? 'Clear filters'
              : undefined
          }
          onAction={
            isFiltering
              ? onClearFilters
              : undefined
          }
        />
      )}
    </div>
  );
}