import '../styles/loader.css';

export default function Loader({
  variant = 'spinner',
  size = 'md',
  label = 'Loading',
  count = 4,
}) {
  if (variant === 'skeleton') {
    return (
      <div
        className={`loader-skeleton loader-skeleton--${size}`}
        aria-busy="true"
        aria-label={label}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            className="loader-skeleton__card"
            key={index}
          >
            <div className="loader-skeleton__image" />

            <div className="loader-skeleton__content">
              <div className="loader-skeleton__line loader-skeleton__line--title" />

              <div className="loader-skeleton__line loader-skeleton__line--short" />

              <div className="loader-skeleton__bottom">
                <div className="loader-skeleton__line loader-skeleton__line--price" />

                <div className="loader-skeleton__button" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const loader = (
    <div
      className={`loader loader--${variant} loader--${size}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className="loader__spinner" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>

      {label && (
        <span className="loader__label">
          {label}
        </span>
      )}
    </div>
  );

  if (variant === 'page') {
    return (
      <div
        className="loader-page"
        aria-busy="true"
      >
        {loader}
      </div>
    );
  }

  return loader;
}