/**
 * CartItem.jsx
 * ----------------------------------------------------------
 * Individual cart item for the BC Eats cart drawer.
 *
 * Features:
 * - Food image
 * - Item name
 * - Unit price
 * - Quantity stepper
 * - Remove action
 * - Framer Motion entrance/exit
 * - Accessible controls
 */

import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart.js';
import { formatPrice } from '../utils/formatPrice.js';
import Button from './Button.jsx';
import { MinusIcon, PlusIcon, TrashIcon } from '../utils/icons.jsx';

import '../styles/cartItem.css';

export default function CartItem({ item }) {
  const { increment, decrement, removeItem } = useCart();

  const { id, name, image, price, qty } = item;

  const itemTotal = price * qty;

  return (
    <motion.li
      className="cart-item"
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Food image */}
      <div className="cart-item__image-wrap">
        <img
          src={image}
          alt=""
          className="cart-item__image"
          loading="lazy"
        />
      </div>

      {/* Main information */}
      <div className="cart-item__content">
        <div className="cart-item__top">
          <div>
            <h3 className="cart-item__name">{name}</h3>

            <p className="cart-item__unit-price">
              {formatPrice(price)} each
            </p>
          </div>

          <Button
            variant="icon"
            size="sm"
            ariaLabel={`Remove ${name} from cart`}
            className="cart-item__remove"
            onClick={() => removeItem(id)}
            magnetic={false}
          >
            <TrashIcon />
          </Button>
        </div>

        <div className="cart-item__bottom">
          {/* Quantity controls */}
          <div
            className="cart-item__stepper"
            aria-label={`Quantity for ${name}`}
          >
            <Button
              variant="icon"
              size="sm"
              ariaLabel={`Remove one ${name}`}
              onClick={() => decrement(id)}
              magnetic={false}
              className="cart-item__qty-button"
            >
              <MinusIcon />
            </Button>

            <span
              className="cart-item__quantity"
              aria-live="polite"
              aria-label={`${qty} ${name}`}
            >
              {qty}
            </span>

            <Button
              variant="icon"
              size="sm"
              ariaLabel={`Add one more ${name}`}
              onClick={() => increment(id)}
              magnetic={false}
              className="cart-item__qty-button"
            >
              <PlusIcon />
            </Button>
          </div>

          {/* Item total */}
          <span className="cart-item__total">
            {formatPrice(itemTotal)}
          </span>
        </div>
      </div>
    </motion.li>
  );
}