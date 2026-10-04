/**
 * CategoryFilter.jsx
 * ----------------------------------------------------------
 * Premium pill-based category switcher for the menu section.
 *
 * Renders the CATEGORIES constant as glass pills, each showing
 * an icon + label + item count. The active pill is filled with
 * the brand gradient and a Framer Motion shared-layout highlight
 * slides smoothly between pills (layoutId) when the selection
 * changes.
 *
 * Props:
 *  - categories    -> array of { id, label } (defaults to CATEGORIES)
 *  - active        -> currently active category id
 *  - onChange(id)  -> fired when a pill is selected
 *  - counts        -> optional map { categoryId: number } for badges
 *                     (counts for 'all' derived automatically when omitted)
 *
 * Accessibility:
 *  - role="tablist" container, each pill role="tab" with aria-selected
 *  - aria-label on each tab, keyboard arrow navigation
 *  - focus-visible ring
 */
import { useRef } from 'react';
import { motion } from 'framer-motion';
import CATEGORIES from '../constants/categories.js';
import { getCategoryIcon } from '../utils/categoryIcons.js';
import '../styles/categoryFilter.css';

export default function CategoryFilter({
  categories = CATEGORIES,
  active = 'all',
  onChange = () => {},
  counts,
  className = '',
}) {
  const listRef = useRef(null);

  // Derive "all" count automatically if counts provided but no 'all' key
  const resolveCount = (id) => {
    if (!counts) return null;
    if (id === 'all') {
      if (counts.all != null) return counts.all;
      return Object.entries(counts)
        .filter(([key]) => key !== 'all')
        .reduce((sum, [, n]) => sum + (n || 0), 0);
    }
    return counts[id] ?? 0;
  };

  // Keyboard arrow navigation across tabs (WAI-ARIA tabs pattern)
  const handleKeyDown = (e, index) => {
    const tabs = categories;
    let nextIndex = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }
    if (nextIndex !== null) {
      e.preventDefault();
      onChange(tabs[nextIndex].id);
      // Move focus to the newly-selected tab
      const nodes = listRef.current?.querySelectorAll('[role="tab"]');
      nodes?.[nextIndex]?.focus();
    }
  };

  const classes = ['cat-filter', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="cat-filter__scroll" role="tablist" aria-label="Menu categories" ref={listRef}>
        {categories.map((cat, index) => {
          const Icon = getCategoryIcon(cat.id);
          const isActive = cat.id === active;
          const count = resolveCount(cat.id);

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              aria-label={`${cat.label}${count != null ? `, ${count} items` : ''}`}
              className={`cat-pill ${isActive ? 'cat-pill--active' : ''}`}
              onClick={() => onChange(cat.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {isActive && (
                <motion.span
                  layoutId="cat-pill-highlight"
                  className="cat-pill__highlight"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  aria-hidden="true"
                />
              )}
              <Icon className="cat-pill__icon" />
              <span className="cat-pill__label">{cat.label}</span>
              {count != null && (
                <span className="cat-pill__count" aria-hidden="true">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
