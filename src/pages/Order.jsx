/**
 * Order.jsx
 * ----------------------------------------------------------
 * BC Eats order confirmation page.
 */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getLatestOrder } from '../services/orderService.js';

import {
  CheckIcon,
  MapPinIcon,
  ArrowRightIcon,
  CartIcon,
} from '../utils/icons.jsx';

import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Footer from '../components/Footer.jsx';

import { formatPrice } from '../utils/formatPrice.js';

import '../styles/orderPage.css';

export default function Order() {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(() => {
    return location.state?.order ?? getLatestOrder();
  });

  useEffect(() => {
    const nextOrder =
      location.state?.order ?? getLatestOrder();

    setOrder(nextOrder ?? null);
  }, [location.key, location.pathname, location.state]);

  if (!order) {
    return (
      <>
        <main className="order-page order-page--empty">
          <EmptyState
            icon={CartIcon}
            title="No recent order"
            message="We couldn't find a recent BC Eats order."
            actionLabel="Browse menu"
            onAction={() => navigate('/')}
          />
        </main>

        <Footer />
      </>
    );
  }

  const orderDate = new Date(order.createdAt);

  const formattedDate = orderDate.toLocaleDateString(
    'en-ZA',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  );

  const formattedTime = orderDate.toLocaleTimeString(
    'en-ZA',
    {
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  return (
    <>
      <main className="order-page">
        {/* --------------------------------------------------
            SUCCESS HEADER
        -------------------------------------------------- */}

        <section className="order-page__hero">
          <div className="order-page__success-icon">
            <CheckIcon />
          </div>

          <p className="order-page__eyebrow">
            Order confirmed
          </p>

          <h1 className="order-page__title">
            You&apos;re all set.
          </h1>

          <p className="order-page__description">
            Your campus meal is on its way.
          </p>

          <div className="order-page__order-number">
            <span>Order</span>

            <strong>#{order.id}</strong>
          </div>
        </section>

        {/* --------------------------------------------------
            CONTENT
        -------------------------------------------------- */}

        <section className="order-page__content">
          <div className="order-page__grid">
            {/* Order details */}
            <div className="order-page__panel">
              <div className="order-page__panel-header">
                <div>
                  <p className="order-page__panel-eyebrow">
                    Order details
                  </p>

                  <h2 className="order-page__panel-title">
                    Your order
                  </h2>
                </div>

                <span className="order-page__status">
                  Confirmed
                </span>
              </div>

              <div className="order-page__items">
                {order.items.map((item) => (
                  <div
                    className="order-page__item"
                    key={item.id}
                  >
                    <div className="order-page__item-image">
                      <img
                        src={item.image}
                        alt=""
                      />

                      <span>{item.qty}</span>
                    </div>

                    <div className="order-page__item-info">
                      <strong>{item.name}</strong>

                      <span>
                        {formatPrice(item.price)} each
                      </span>
                    </div>

                    <strong className="order-page__item-total">
                      {formatPrice(
                        item.price * item.qty,
                      )}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="order-page__totals">
                <div>
                  <span>Subtotal</span>

                  <strong>
                    {formatPrice(
                      order.totals.subtotal,
                    )}
                  </strong>
                </div>

                <div>
                  <span>Delivery</span>

                  <strong>
                    {formatPrice(
                      order.totals.deliveryFee,
                    )}
                  </strong>
                </div>

                <div className="order-page__total-divider" />

                <div className="order-page__grand-total">
                  <span>Total</span>

                  <strong>
                    {formatPrice(
                      order.totals.grandTotal,
                    )}
                  </strong>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <aside className="order-page__panel">
              <div className="order-page__panel-header">
                <div>
                  <p className="order-page__panel-eyebrow">
                    Delivery
                  </p>

                  <h2 className="order-page__panel-title">
                    Where to find you
                  </h2>
                </div>
              </div>

              <div className="order-page__delivery">
                <div className="order-page__delivery-icon">
                  <MapPinIcon />
                </div>

                <div>
                  <span>Delivering to</span>

                  <strong>
                    {order.delivery.location}
                  </strong>

                  <small>
                    {order.delivery.building}
                    {' • '}
                    Zone {order.delivery.zone}
                  </small>
                </div>
              </div>

              {order.delivery.eta && (
                <div className="order-page__eta">
                  <span className="order-page__eta-dot" />

                  <div>
                    <strong>
                      Estimated delivery
                    </strong>

                    <span>
                      Approximately{' '}
                      {order.delivery.eta}{' '}
                      minutes
                    </span>
                  </div>
                </div>
              )}

              <div className="order-page__timestamp">
                <span>Placed</span>

                <strong>
                  {formattedDate}
                  {' • '}
                  {formattedTime}
                </strong>
              </div>

              {order.notes && (
                <div className="order-page__notes">
                  <span>Order note</span>

                  <p>{order.notes}</p>
                </div>
              )}
            </aside>
          </div>

          {/* Actions */}
          <div className="order-page__actions">
            <Button
              as={Link}
              to="/"
              variant="primary"
              size="lg"
              icon={CartIcon}
            >
              Order something else
            </Button>

            <Button
              as={Link}
              to="/"
              variant="secondary"
              size="lg"
              iconRight={ArrowRightIcon}
            >
              Back home
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}