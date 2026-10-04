/**
 * OrderSummary.jsx
 * ----------------------------------------------------------
 * BC Eats checkout order summary.
 *
 * Displays:
 * - Cart items
 * - Quantities
 * - Item totals
 * - Subtotal
 * - Delivery fee
 * - Grand total
 * - Optional delivery location
 */

import { motion } from 'framer-motion';

import { useCart } from '../hooks/useCart.js';
import { formatPrice } from '../utils/formatPrice.js';

import {
  CartIcon,
  MapPinIcon,
} from '../utils/icons.jsx';

import '../styles/orderSummary.css';

export default function OrderSummary({
  deliveryLocation = '',
}) {
  const {
    items,
    subtotal,
    deliveryFee,
    grandTotal,
    itemCount,
  } = useCart();

  return (
    <motion.aside
      className="order-summary"
      aria-labelledby="order-summary-title"
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Header */}
      <header className="order-summary__header">
        <div className="order-summary__heading">
          <div className="order-summary__icon">
            <CartIcon />
          </div>

          <div>
            <p className="order-summary__eyebrow">
              Checkout
            </p>

            <h2
              id="order-summary-title"
              className="order-summary__title"
            >
              Order summary
            </h2>
          </div>
        </div>

        <span className="order-summary__count">
          {itemCount} item{itemCount === 1 ? '' : 's'}
        </span>
      </header>

      {/* Items */}
      <div className="order-summary__items">
        {items.length > 0 ? (
          items.map((item) => {
            const itemTotal = item.price * item.qty;

            return (
              <div
                className="order-summary__item"
                key={item.id}
              >
                <div className="order-summary__item-image">
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                  />

                  <span className="order-summary__quantity">
                    {item.qty}
                  </span>
                </div>

                <div className="order-summary__item-info">
                  <h3 className="order-summary__item-name">
                    {item.name}
                  </h3>

                  <span className="order-summary__item-price">
                    {formatPrice(item.price)} each
                  </span>
                </div>

                <strong className="order-summary__item-total">
                  {formatPrice(itemTotal)}
                </strong>
              </div>
            );
          })
        ) : (
          <div className="order-summary__empty">
            Your cart is currently empty.
          </div>
        )}
      </div>

      {/* Delivery location */}
      {deliveryLocation && (
        <div className="order-summary__delivery">
          <div className="order-summary__delivery-icon">
            <MapPinIcon />
          </div>

          <div>
            <span className="order-summary__delivery-label">
              Delivering to
            </span>

            <strong className="order-summary__delivery-location">
              {deliveryLocation}
            </strong>
          </div>
        </div>
      )}

      {/* Totals */}
      <div className="order-summary__totals">
        <div className="order-summary__row">
          <span>Subtotal</span>

          <strong>
            {formatPrice(subtotal)}
          </strong>
        </div>

        <div className="order-summary__row">
          <span>Delivery</span>

          <strong>
            {formatPrice(deliveryFee)}
          </strong>
        </div>

        <div className="order-summary__divider" />

        <div className="order-summary__row order-summary__row--total">
          <span>Total</span>

          <strong>
            {formatPrice(grandTotal)}
          </strong>
        </div>
      </div>

      {/* Footer note */}
      <div className="order-summary__note">
        <span className="order-summary__note-dot" />

        <span>
          Campus delivery • Secure checkout
        </span>
      </div>
    </motion.aside>
  );
}