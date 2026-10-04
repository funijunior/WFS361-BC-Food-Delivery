/**
 * Navbar.jsx
 * ----------------------------------------------------------
 * Premium sticky navigation.
 *  - Transparent over hero, glassmorphic solid on scroll.
 *  - Animated logo (Framer Motion draw/scale).
 *  - Desktop links with animated underline; active state.
 *  - Live cart badge from CartContext.
 *  - Responsive hamburger + slide-down mobile panel.
 *  - Smooth scroll to sections; keyboard accessible.
 *  - Closes mobile menu on route/section change & Esc.
 *
 * Accessibility:
 *  - <header><nav aria-label="Primary">
 *  - Hamburger uses aria-expanded & aria-controls.
 *  - Focus-visible rings via global CSS.
 *  - Esc closes mobile menu; backdrop click closes.
 */
import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useCart } from '../hooks/useCart';

import logoUrl from '../assets/images/logo.svg?url';
import { CartIcon, MenuIcon, CloseIcon } from '../utils/icons.jsx';

import '../styles/navbar.css';

const NAV_LINKS = [
  { label: 'Menu', href: '/#menu' },
  { label: 'Categories', href: '/#categories' },
  { label: 'Delivery', href: '/#delivery' },
  { label: 'About', href: '/#about' },
];

const SCROLL_THRESHOLD = 24;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useCart();

  /* Detect scroll → toggle transparent / solid */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close mobile menu on Esc */
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  /* Smooth scroll to in-page section */
  const handleNavClick = useCallback(
    (e, href) => {
      setMenuOpen(false);
      const isAnchor = href.includes('#');
      if (!isAnchor) return;
      const id = href.split('#')[1];
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [],
  );

  const navbarClass = `navbar ${scrolled ? 'navbar--scrolled' : 'navbar--top'}`;

  return (
    <header className={navbarClass} role="banner">
      <nav className="navbar__inner" aria-label="Primary">
        {/* Logo */}
        <a
          href="/"
          className="navbar__logo"
          aria-label="BC Eats home"
        >
          <motion.span
            className="navbar__logo-mark"
            initial={{ rotate: -20, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
            style={{ display: 'inline-flex' }}
          >
            <img src={logoUrl} alt="" className="navbar__logo-mark-img" />
          </motion.span>
          <motion.span
            className="navbar__logo-text"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            BC Eats
            <span>Campus delivery</span>
          </motion.span>
        </a>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="navbar__link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <Button
            as={Link}
            to="/checkout"
            variant="icon"
            ariaLabel={`Cart with ${itemCount} item${itemCount === 1 ? '' : 's'}`}
            badge={itemCount}
            className="navbar__cart-btn"
          >
            <CartIcon />
          </Button>

          <Button
            variant="primary"
            size="md"
            className="navbar__cta-desktop"
            onClick={() => {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Order now
          </Button>

          {/* Hamburger */}
          <Button
            variant="icon"
            ariaLabel={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="navbar__burger"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </Button>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        className={`navbar__backdrop ${menuOpen ? 'navbar__backdrop--visible' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            className="navbar__mobile navbar__mobile--open"
            role="menu"
            initial={{ opacity: 0, y: -16, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -16, scaleY: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="navbar__mobile-link"
                role="menuitem"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="primary"
              block
              className="navbar__mobile-cta"
              onClick={() => {
                setMenuOpen(false);
                const el = document.getElementById('menu');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Order now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
