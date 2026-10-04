/**
 * PageTransition.jsx
 * ----------------------------------------------------------
 * BC Eats — global route transition wrapper.
 *
 * Provides:
 *  - Smooth page fade/slide transitions
 *  - Reduced-motion support
 *  - Consistent transition timing
 *  - Scroll restoration on route changes
 */

import { useEffect } from 'react';
import {
  motion,
  useReducedMotion,
} from 'framer-motion';
import { useLocation } from 'react-router-dom';

import '../styles/pageTransition.css';

export default function PageTransition({ children }) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  }, [location.pathname, reduceMotion]);

  const initial = reduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: 18,
        scale: 0.995,
      };

  const animate = {
    opacity: 1,
    y: 0,
    scale: 1,
  };

  const exit = reduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: -12,
        scale: 0.995,
      };

  return (
    <motion.div
      className="page-transition"
      initial={initial}
      animate={animate}
      exit={exit}
      transition={
        reduceMotion
          ? { duration: 0.01 }
          : {
              duration: 0.42,
              ease: [0.16, 1, 0.3, 1],
            }
      }
    >
      {children}
    </motion.div>
  );
}