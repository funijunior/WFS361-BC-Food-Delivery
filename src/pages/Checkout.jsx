import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../hooks/useCart.js';

import {
  submitOrder,
} from '../services/orderService.js';

import {
  DELIVERY_LOCATIONS,
} from '../constants/deliveryLocations.js';

import CheckoutForm from '../components/CheckoutForm.jsx';
import OrderSummary from '../components/OrderSummary.jsx';
import EmptyState from '../components/EmptyState.jsx';

import {
  ArrowLeftIcon,
  CartIcon,
} from '../utils/icons.jsx';

import '../styles/checkoutPage.css';

export default function Checkout() {
  const navigate = useNavigate();

  const {
    items,
    subtotal,
    deliveryFee,
    grandTotal,
    isEmpty,
    clearCart,
  } = useCart();

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState('');

  const [selectedLocation, setSelectedLocation] =
    useState('');

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setSubmitError('');

    try {
      const location =
        DELIVERY_LOCATIONS.find(
          (item) =>
            item.id ===
            formData.deliveryLocation,
        );

      const order = await submitOrder({
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        },

        items,

        totals: {
          subtotal,
          deliveryFee,
          grandTotal,
        },

        delivery: {
          locationId:
            formData.deliveryLocation,

          location:
            location?.label ?? '',

          building:
            location?.building ?? '',

          zone:
            location?.zone ?? '',

          eta:
            location?.eta ?? null,
        },

        notes: formData.notes,
      });

      setSelectedLocation(
        location?.label ?? '',
      );

      clearCart();

      navigate('/order', {
        replace: true,
        state: {
          order,
        },
      });
    } catch (error) {
      console.error(
        'BC Eats order submission failed:',
        error,
      );

      if (
        error.code ===
        'VALIDATION_ERROR'
      ) {
        setSubmitError(
          'Please check your order details and try again.',
        );
      } else if (
        error.code ===
        'EMPTY_CART'
      ) {
        setSubmitError(
          'Your cart is empty.',
        );
      } else {
        setSubmitError(
          'Something went wrong while placing your order. Please try again.',
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (isEmpty) {
    return (
      <main className="checkout-page checkout-page--empty">
        <div className="checkout-page__empty-container">
          <EmptyState
            icon={CartIcon}
            title="Your cart is empty"
            message="Add something delicious before checking out."
            actionLabel="Back to menu"
            onAction={() => navigate('/')}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-page__header">
        <div className="checkout-page__header-inner">
          <Link
            to="/"
            className="checkout-page__back"
          >
            <ArrowLeftIcon />

            <span>
              Back to menu
            </span>
          </Link>

          <div className="checkout-page__heading">
            <p className="checkout-page__eyebrow">
              BC Eats
            </p>

            <h1 className="checkout-page__title">
              Complete your order.
            </h1>

            <p className="checkout-page__description">
              Tell us where to deliver your food
              and we&apos;ll take care of the rest.
            </p>
          </div>
        </div>
      </section>

      <section className="checkout-page__content">
        <div className="checkout-page__grid">
          <div>
            {submitError && (
              <div
                className="checkout-page__error"
                role="alert"
              >
                {submitError}
              </div>
            )}

            <CheckoutForm
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          </div>

          <OrderSummary
            deliveryLocation={selectedLocation}
          />
        </div>
      </section>
    </main>
  );
}