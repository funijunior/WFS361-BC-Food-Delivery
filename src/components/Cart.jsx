/**
 * Cart.jsx
 * ----------------------------------------------------------
 * Premium BC Eats cart drawer.
 *
 * Features:
 * - Glassmorphic slide-in panel
 * - Cart item list
 * - Quantity controls
 * - Remove items
 * - Clear cart
 * - Subtotal
 * - Delivery fee
 * - Grand total
 * - Empty state
 * - Escape-key support
 * - Backdrop close
 * - Responsive mobile layout
 */

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { useCart } from '../hooks/useCart.js';
import { formatPrice } from '../utils/formatPrice.js';

import Button from './Button.jsx';
import CartItem from './CartItem.jsx';
import EmptyState from './EmptyState.jsx';

import {
  ArrowRightIcon,
  CartIcon,
  CloseIcon,
  TrashIcon,
} from '../utils/icons.jsx';

import '../styles/cart.css';

export default function Cart({ isOpen, onClose }) {
  const {
    items,
    itemCount,
    subtotal,
    deliveryFee,
    grandTotal,
    isEmpty,
    clearCart,
  } = useCart();

  /* ----------------------------------------------------------
     Escape key
  ---------------------------------------------------------- */

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  /* ----------------------------------------------------------
     Body scroll lock
  ---------------------------------------------------------- */

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /* ----------------------------------------------------------
     Clear cart
  ---------------------------------------------------------- */

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="cart__backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
            }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="cart"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{
              x: '100%',
              opacity: 0.8,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: '100%',
              opacity: 0.8,
            }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Header */}
            <header className="cart__header">
              <div className="cart__heading">
                <div className="cart__heading-icon">
                  <CartIcon />
                </div>

                <div>
                  <p className="cart__eyebrow">
                    Your order
                  </p>

                  <h2 id="cart-title" className="cart__title">
                    Cart
                  </h2>
                </div>
              </div>

              <Button
                variant="icon"
                ariaLabel="Close cart"
                onClick={onClose}
                magnetic={false}
                className="cart__close"
              >
                <CloseIcon />
              </Button>
            </header>

            {/* Content */}
            <div className="cart__body">
              {isEmpty ? (
                <EmptyState
                  show={isEmpty}
                  icon={CartIcon}
                  title="Your cart is empty"
                  message="Add something delicious from the menu and it will appear here."
                  actionLabel="Browse menu"
                  onAction={onClose}
                  className="cart__empty"
                />
              ) : (
                <>
                  {/* Item summary */}
                  <div className="cart__item-heading">
                    <span>
                      {itemCount} item{itemCount === 1 ? '' : 's'}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      icon={TrashIcon}
                      onClick={handleClearCart}
                      magnetic={false}
                      className="cart__clear"
                    >
                      Clear cart
                    </Button>
                  </div>

                  {/* Items */}
                  <motion.ul
                    className="cart__items"
                    layout
                    aria-label="Items in your cart"
                  >
                    <AnimatePresence initial={false}>
                      {items.map((item) => (
                        <CartItem
                          key={item.id}
                          item={item}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.ul>
                </>
              )}
            </div>

            {/* Footer */}
            {!isEmpty && (
              <footer className="cart__footer">
                {/* Totals */}
                <div className="cart__totals">
                  <div className="cart__total-row">
                    <span>Subtotal</span>

                    <strong>
                      {formatPrice(subtotal)}
                    </strong>
                  </div>

                  <div className="cart__total-row">
                    <span>Delivery</span>

                    <strong>
                      {formatPrice(deliveryFee)}
                    </strong>
                  </div>

                  <div className="cart__divider" />

                  <div className="cart__total-row cart__total-row--grand">
                    <span>Total</span>

                    <strong>
                      {formatPrice(grandTotal)}
                    </strong>
                  </div>
                </div>

                {/* Checkout */}
                <Button
                  as={Link}
                  to="/checkout"
                  variant="primary"
                  size="lg"
                  block
                  iconRight={ArrowRightIcon}
                  onClick={onClose}
                  className="cart__checkout"
                >
                  Continue to checkout
                </Button>

                <p className="cart__secure-note">
                  Campus delivery • Fast &amp; convenient
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}