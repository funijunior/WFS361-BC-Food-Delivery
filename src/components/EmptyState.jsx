/**
 * EmptyState.jsx
 * ----------------------------------------------------------
 * Shared empty-state component for BC Eats.
 */

import { motion } from 'framer-motion';
import Button from './Button.jsx';
import { SearchIcon } from '../utils/icons.jsx';
import '../styles/emptyState.css';

export default function EmptyState({
  icon: Icon = SearchIcon,
  title = 'Nothing here yet',
  message = 'Try adjusting your search or filters.',
  actionLabel,
  onAction,
  className = '',
  show = true,
}) {
  if (!show) {
    return null;
  }

  return (
    <motion.section
      className={`empty-state ${className}`.trim()}
      role="status"
      aria-live="polite"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="empty-state__icon-wrap" aria-hidden="true">
        <Icon className="empty-state__icon" />
      </div>

      <div className="empty-state__content">
        <h3 className="empty-state__title">
          {title}
        </h3>

        <p className="empty-state__message">
          {message}
        </p>

        {actionLabel && typeof onAction === 'function' && (
          <Button
            variant="secondary"
            type="button"
            onClick={onAction}
            className="empty-state__action"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </motion.section>
  );
}