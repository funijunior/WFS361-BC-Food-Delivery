import { motion } from 'framer-motion';

import { MapPinIcon, CheckIcon } from '../utils/icons.jsx';

import '../styles/deliverySelector.css';

export default function DeliverySelector({
  locations = [],
  value,
  onChange,
  error = '',
}) {
  const handleSelect = (locationId) => {
    onChange?.(locationId);
  };

  return (
    <section
      className="delivery-selector"
      aria-labelledby="delivery-selector-title"
    >
      <div className="delivery-selector__header">
        <div>
          <p className="delivery-selector__eyebrow">
            Delivery
          </p>

          <h2
            id="delivery-selector-title"
            className="delivery-selector__title"
          >
            Where should we deliver?
          </h2>

          <p className="delivery-selector__description">
            Choose your preferred campus delivery point.
          </p>
        </div>

        <div className="delivery-selector__icon">
          <MapPinIcon />
        </div>
      </div>

      <div
        className="delivery-selector__options"
        role="radiogroup"
        aria-labelledby="delivery-selector-title"
        aria-describedby={
          error
            ? 'delivery-selector-error'
            : undefined
        }
      >
        {locations.map((location) => {
          const locationId =
            location.id ?? location.value;

          const isSelected = value === locationId;

          return (
            <motion.button
              key={locationId}
              type="button"
              className={`delivery-option ${
                isSelected
                  ? 'delivery-option--selected'
                  : ''
              }`}
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(locationId)}
              whileTap={{ scale: 0.985 }}
              layout
            >
              <div className="delivery-option__icon">
                {location.icon ? (
                  <location.icon />
                ) : (
                  <MapPinIcon />
                )}
              </div>

              <div className="delivery-option__content">
                <div className="delivery-option__top">
                  <h3 className="delivery-option__name">
                    {location.name ??
                      location.label}
                  </h3>

                  <span className="delivery-option__check">
                    <CheckIcon />
                  </span>
                </div>

                {(location.description ||
                  location.address) && (
                  <p className="delivery-option__description">
                    {location.description ??
                      location.address}
                  </p>
                )}

                {(location.time ||
                  location.estimatedTime ||
                  location.deliveryTime) && (
                  <span className="delivery-option__time">
                    <span className="delivery-option__time-dot" />
                    {location.time ??
                      location.estimatedTime ??
                      location.deliveryTime}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {error && (
        <p
          id="delivery-selector-error"
          className="delivery-selector__error"
          role="alert"
        >
          {error}
        </p>
      )}
    </section>
  );
}