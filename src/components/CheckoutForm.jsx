import { useState } from 'react';

import { CheckIcon, UserIcon, PhoneIcon } from '../utils/icons.jsx';

import Button from './Button.jsx';
import DeliverySelector from './DeliverySelector.jsx';

import { DELIVERY_LOCATIONS } from '../constants/deliveryLocations.js';

import '../styles/checkoutForm.css';

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  deliveryLocation: '',
  notes: '',
};

export default function CheckoutForm({
  onSubmit,
  submitting = false,
}) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: '',
      }));
    }
  };

  const handleDeliveryChange = (locationId) => {
    setForm((current) => ({
      ...current,
      deliveryLocation: locationId,
    }));

    if (errors.deliveryLocation) {
      setErrors((current) => ({
        ...current,
        deliveryLocation: '',
      }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Please enter your phone number.';
    } else if (
      !/^[+0-9\s()-]{7,20}$/.test(form.phone.trim())
    ) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim(),
      )
    ) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!form.deliveryLocation) {
      nextErrors.deliveryLocation =
        'Please choose a delivery location.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const selectedLocation = DELIVERY_LOCATIONS.find(
      (location) =>
        location.id === form.deliveryLocation,
    );

    onSubmit?.({
      ...form,
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      notes: form.notes.trim(),
      deliveryLocationData: selectedLocation ?? null,
    });
  };

  return (
    <form
      className="checkout-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* --------------------------------------------------
          CUSTOMER DETAILS
      -------------------------------------------------- */}

      <section
        className="checkout-form__section"
        aria-labelledby="customer-details-title"
      >
        <div className="checkout-form__section-header">
          <div className="checkout-form__section-number">
            01
          </div>

          <div>
            <p className="checkout-form__eyebrow">
              Your details
            </p>

            <h2
              id="customer-details-title"
              className="checkout-form__section-title"
            >
              Customer information
            </h2>
          </div>
        </div>

        <div className="checkout-form__fields">
          {/* Name */}
          <div className="checkout-field checkout-field--full">
            <label
              htmlFor="checkout-name"
              className="checkout-field__label"
            >
              Full name
              <span aria-hidden="true">*</span>
            </label>

            <div
              className={`checkout-field__input-wrap ${
                errors.name
                  ? 'checkout-field__input-wrap--error'
                  : ''
              }`}
            >
              <UserIcon
                className="checkout-field__icon"
                aria-hidden="true"
              />

              <input
                id="checkout-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name
                    ? 'checkout-name-error'
                    : undefined
                }
              />
            </div>

            {errors.name && (
              <p
                id="checkout-name-error"
                className="checkout-field__error"
                role="alert"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="checkout-field">
            <label
              htmlFor="checkout-phone"
              className="checkout-field__label"
            >
              Phone number
              <span aria-hidden="true">*</span>
            </label>

            <div
              className={`checkout-field__input-wrap ${
                errors.phone
                  ? 'checkout-field__input-wrap--error'
                  : ''
              }`}
            >
              <PhoneIcon
                className="checkout-field__icon"
                aria-hidden="true"
              />

              <input
                id="checkout-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 082 123 4567"
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone
                    ? 'checkout-phone-error'
                    : undefined
                }
              />
            </div>

            {errors.phone && (
              <p
                id="checkout-phone-error"
                className="checkout-field__error"
                role="alert"
              >
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="checkout-field">
            <label
              htmlFor="checkout-email"
              className="checkout-field__label"
            >
              Email
              <span className="checkout-field__optional">
                Optional
              </span>
            </label>

            <div
              className={`checkout-field__input-wrap ${
                errors.email
                  ? 'checkout-field__input-wrap--error'
                  : ''
              }`}
            >
              <span
                className="checkout-field__text-icon"
                aria-hidden="true"
              >
                @
              </span>

              <input
                id="checkout-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email
                    ? 'checkout-email-error'
                    : undefined
                }
              />
            </div>

            {errors.email && (
              <p
                id="checkout-email-error"
                className="checkout-field__error"
                role="alert"
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          DELIVERY LOCATION
      -------------------------------------------------- */}

      <section
        className="checkout-form__section"
        aria-labelledby="delivery-details-title"
      >
        <div className="checkout-form__section-header">
          <div className="checkout-form__section-number">
            02
          </div>

          <div>
            <p className="checkout-form__eyebrow">
              Campus delivery
            </p>

            <h2
              id="delivery-details-title"
              className="checkout-form__section-title"
            >
              Choose your location
            </h2>
          </div>
        </div>

        <DeliverySelector
          locations={DELIVERY_LOCATIONS.map(
            (location) => ({
              id: location.id,
              name: location.label,
              description: `${location.building} • Zone ${location.zone}`,
              estimatedTime: `${location.eta} min`,
            }),
          )}
          value={form.deliveryLocation}
          onChange={handleDeliveryChange}
          error={errors.deliveryLocation}
        />
      </section>

      {/* --------------------------------------------------
          NOTES
      -------------------------------------------------- */}

      <section
        className="checkout-form__section"
        aria-labelledby="order-notes-title"
      >
        <div className="checkout-form__section-header">
          <div className="checkout-form__section-number">
            03
          </div>

          <div>
            <p className="checkout-form__eyebrow">
              Special instructions
            </p>

            <h2
              id="order-notes-title"
              className="checkout-form__section-title"
            >
              Anything we should know?
            </h2>
          </div>
        </div>

        <div className="checkout-field checkout-field--full">
          <label
            htmlFor="checkout-notes"
            className="checkout-field__label"
          >
            Order notes
            <span className="checkout-field__optional">
              Optional
            </span>
          </label>

          <textarea
            id="checkout-notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="e.g. Please call when you arrive..."
            rows={4}
            maxLength={300}
          />

          <div className="checkout-field__footer">
            <span>
              Delivery instructions only
            </span>

            <span>
              {form.notes.length}/300
            </span>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------
          SUBMIT
      -------------------------------------------------- */}

      <div className="checkout-form__submit">
        <div className="checkout-form__secure">
          <div className="checkout-form__secure-icon">
            <CheckIcon />
          </div>

          <div>
            <strong>
              Ready to order?
            </strong>

            <span>
              Your order will be prepared after submission.
            </span>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          block
          loading={submitting}
          disabled={submitting}
          className="checkout-form__submit-button"
        >
          Place order
        </Button>
      </div>
    </form>
  );
}