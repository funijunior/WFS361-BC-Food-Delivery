/**
 * Button.jsx
 * ----------------------------------------------------------
 * BC Eats — reusable premium button.
 *
 * Variants:
 *  primary | secondary | ghost | danger | icon
 *
 * Sizes:
 *  sm | md | lg
 *
 * Phase 5 improvements:
 *  - Reduced-motion aware
 *  - Touch-device safe
 *  - Magnetic interaction
 *  - Loading state
 *  - Accessible icon buttons
 */

import {
  useCallback,
  useRef,
} from 'react';

import '../styles/button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  badge,
  loading = false,
  disabled = false,
  magnetic = true,
  block = false,
  type = 'button',
  ariaLabel,
  className = '',
  as,
  onClick,
  ...rest
}) {
  const ref = useRef(null);

  const isIcon = variant === 'icon';

  const Tag = as || 'button';

  const handlePointerMove = useCallback(
    (event) => {
      if (
        !magnetic ||
        disabled ||
        loading ||
        !ref.current
      ) {
        return;
      }

      if (event.pointerType !== 'mouse') {
        return;
      }

      if (
        window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches
      ) {
        return;
      }

      const element = ref.current;

      const rect =
        element.getBoundingClientRect();

      const x =
        event.clientX -
        rect.left -
        rect.width / 2;

      const y =
        event.clientY -
        rect.top -
        rect.height / 2;

      element.style.setProperty(
        '--magnetic-x',
        `${x * 0.12}px`,
      );

      element.style.setProperty(
        '--magnetic-y',
        `${y * 0.12}px`,
      );
    },
    [
      magnetic,
      disabled,
      loading,
    ],
  );

  const resetMagnetic = useCallback(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    element.style.setProperty(
      '--magnetic-x',
      '0px',
    );

    element.style.setProperty(
      '--magnetic-y',
      '0px',
    );
  }, []);

  const classes = [
    'btn',
    `btn--${variant}`,
    size === 'sm' && 'btn--sm',
    size === 'lg' && 'btn--lg',
    isIcon &&
      size === 'sm' &&
      'btn--icon--sm',
    block && 'btn--block',
    loading && 'btn--loading',
    disabled && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = isIcon ? (
    Icon ? (
      <Icon
        className="btn__icon"
        aria-hidden="true"
      />
    ) : (
      children
    )
  ) : (
    <>
      {Icon && (
        <Icon
          className="btn__icon"
          aria-hidden="true"
        />
      )}

      {children && (
        <span className="btn__label">
          {children}
        </span>
      )}

      {IconRight && (
        <IconRight
          className="btn__icon"
          aria-hidden="true"
        />
      )}
    </>
  );

  return (
    <Tag
      ref={ref}
      type={as ? undefined : type}
      className={classes}
      disabled={
        as
          ? undefined
          : disabled || loading
      }
      aria-disabled={
        disabled || loading
          ? 'true'
          : undefined
      }
      aria-label={ariaLabel}
      aria-busy={
        loading ? 'true' : undefined
      }
      onClick={onClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMagnetic}
      {...rest}
    >
      {loading ? (
        <span
          className="btn__loading-content"
          aria-hidden="true"
        >
          <span className="btn__spinner" />
          <span>Loading</span>
        </span>
      ) : (
        content
      )}

      {badge != null &&
        Number(badge) > 0 && (
          <span
            className="btn__badge"
            aria-hidden="true"
          >
            {badge}
          </span>
        )}
    </Tag>
  );
}