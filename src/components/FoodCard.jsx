/**
 * FoodCard.jsx
 * ----------------------------------------------------------
 * BC Eats — premium food card.
 *
 * Phase 5:
 *  - Grid owns entrance animation
 *  - Card owns hover/tap interaction
 *  - Reduced-motion aware
 *  - Optimized image loading
 */

import {
  motion,
  useReducedMotion,
} from 'framer-motion';

import { useCart } from '../hooks/useCart.js';
import { formatPrice } from '../utils/formatPrice.js';

import Button from './Button.jsx';

import {
  StarIcon,
  ClockIcon,
  PlusIcon,
  MinusIcon,
} from '../utils/icons.jsx';

import '../styles/foodCard.css';

export default function FoodCard({ item }) {
  const reduceMotion = useReducedMotion();

  const {
    items,
    addItem,
    increment,
    decrement,
  } = useCart();

  const {
    id,
    name,
    description,
    price,
    image,
    rating,
    deliveryTime,
    popular,
  } = item;

  const cartItem = items.find(
    (cartEntry) =>
      cartEntry.id === id,
  );

  const qty = cartItem?.qty ?? 0;

  const handleAdd = () => {
    addItem({
      id,
      name,
      price,
      image,
      category: item.category,
      qty: 1,
    });
  };

  return (
    <motion.article
      className="food-card"
      aria-labelledby={`food-${id}-name`}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
            }
      }
      whileTap={
        reduceMotion
          ? undefined
          : {
              scale: 0.985,
            }
      }
      transition={{
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="food-card__media">
        <img
          className="food-card__img"
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          width="640"
          height="480"
        />

        {popular && (
          <span className="food-card__badge">
            <StarIcon size={11} />
            Popular
          </span>
        )}
      </div>

      <div className="food-card__body">
        <div className="food-card__meta">
          <span className="food-card__chip food-card__chip--rating">
            <StarIcon />
            {rating.toFixed(1)}
          </span>

          <span className="food-card__chip">
            <ClockIcon />
            {deliveryTime} min
          </span>
        </div>

        <h3
          className="food-card__name"
          id={`food-${id}-name`}
        >
          {name}
        </h3>

        <p className="food-card__desc">
          {description}
        </p>

        <div className="food-card__footer">
          <span className="food-card__price">
            {formatPrice(price)}
          </span>

          {qty === 0 ? (
            <Button
              variant="primary"
              size="sm"
              icon={PlusIcon}
              onClick={handleAdd}
              ariaLabel={`Add ${name} to cart, ${formatPrice(price)}`}
              className="food-card__cta"
              magnetic={false}
            >
              Add
            </Button>
          ) : (
            <div
              className="food-card__stepper"
              role="group"
              aria-label={`${name} quantity in cart`}
            >
              <button
                type="button"
                className="food-card__stepper-btn"
                onClick={() =>
                  decrement(id)
                }
                aria-label={
                  qty === 1
                    ? `Remove ${name} from cart`
                    : `Decrease ${name} quantity`
                }
              >
                <MinusIcon />
              </button>

              <span
                className="food-card__stepper-qty"
                aria-live="polite"
              >
                {qty}
              </span>

              <button
                type="button"
                className="food-card__stepper-btn"
                onClick={() =>
                  increment(id)
                }
                aria-label={`Increase ${name} quantity`}
              >
                <PlusIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}