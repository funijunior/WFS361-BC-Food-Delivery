import { Link } from 'react-router-dom';

import {
  ArrowUpIcon,
  CartIcon,
  MapPinIcon,
} from '../utils/icons.jsx';

import Button from './Button.jsx';

import '../styles/footer.css';

const FOOTER_LINKS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Menu',
    href: '/#menu',
  },
  {
    label: 'Checkout',
    href: '/checkout',
  },
];

export default function Footer() {
  const handleMenuClick = (event) => {
    const href = event.currentTarget.getAttribute('href');

    if (href !== '/#menu') {
      return;
    }

    const menu = document.getElementById('menu');

    if (menu) {
      event.preventDefault();

      menu.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      window.history.replaceState(
        null,
        '',
        '/#menu',
      );
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      {/* Decorative glow */}
      <div
        className="footer__glow footer__glow--green"
        aria-hidden="true"
      />

      <div
        className="footer__glow footer__glow--red"
        aria-hidden="true"
      />

      <div className="footer__container">
        {/* --------------------------------------------------
            TOP
        -------------------------------------------------- */}

        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <Link
              to="/"
              className="footer__logo"
              aria-label="BC Eats home"
            >
              <span className="footer__logo-mark">
                <CartIcon />
              </span>

              <span className="footer__logo-text">
                BC<span>Eats</span>
              </span>
            </Link>

            <p className="footer__tagline">
              Campus cravings,
              <br />
              delivered.
            </p>

            <p className="footer__description">
              Order your favourite campus meals
              without the queue.
            </p>
          </div>

          {/* Navigation */}
          <div className="footer__column">
            <h2 className="footer__heading">
              Explore
            </h2>

            <nav
              className="footer__links"
              aria-label="Footer navigation"
            >
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="footer__link"
                  onClick={
                    link.href === '/#menu'
                      ? handleMenuClick
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Delivery */}
          <div className="footer__column">
            <h2 className="footer__heading">
              Delivery
            </h2>

            <div className="footer__info">
              <div className="footer__info-item">
                <span className="footer__info-icon">
                  <MapPinIcon />
                </span>

                <div>
                  <strong>
                    Campus-wide
                  </strong>

                  <span>
                    Selected delivery points
                  </span>
                </div>
              </div>

              <div className="footer__info-item">
                <span className="footer__info-icon">
                  <CartIcon />
                </span>

                <div>
                  <strong>
                    Fast ordering
                  </strong>

                  <span>
                    Simple &amp; convenient
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="footer__cta">
            <p className="footer__cta-label">
              Hungry?
            </p>

            <h2 className="footer__cta-title">
              Your next meal
              <br />
              is one click away.
            </h2>

            <Button
              as={Link}
              to="/#menu"
              variant="primary"
              icon={CartIcon}
              onClick={handleMenuClick}
              className="footer__cta-button"
            >
              Order now
            </Button>
          </div>
        </div>

        {/* --------------------------------------------------
            DIVIDER
        -------------------------------------------------- */}

        <div className="footer__divider" />

        {/* --------------------------------------------------
            BOTTOM
        -------------------------------------------------- */}

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} BC Eats.
            All rights reserved.
          </p>

          <p className="footer__project">
            WFS361 Capstone Project
          </p>

          <button
            type="button"
            className="footer__back-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <span>
              Back to top
            </span>

            <span className="footer__back-top-icon">
              <ArrowUpIcon />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}