/**
 * icons.jsx
 * ----------------------------------------------------------
 * Central icon library — SVGs as React components using
 * currentColor, 2px stroke, rounded caps (per design system).
 *
 * Why a single module instead of ?react imports:
 *  - Zero plugin/runtime transform dependency → reliable builds
 *  - Tree-shakeable (only used icons ship)
 *  - Consistent prop interface ({ size, className, ... })
 *
 * Usage:
 *   import { SearchIcon, CartIcon } from '../utils/icons.jsx';
 *   <SearchIcon className="hero__search-icon" />
 */

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
  focusable: false,
};

export function SearchIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="m20 20-3.5-3.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CartIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M3 4h2l2.4 12.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.2L21 8H6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="9.5"
        cy="20"
        r="1.4"
        fill="currentColor"
      />

      <circle
        cx="17.5"
        cy="20"
        r="1.4"
        fill="currentColor"
      />
    </svg>
  );
}

export function MenuIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CloseIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Map / Location icon
 *
 * Added because several BC Eats components import
 * MapPinIcon.
 */
export function MapPinIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle
        cx="12"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

/**
 * Back-to-top arrow
 *
 * Added because Footer.jsx imports ArrowUpIcon.
 */
export function ArrowUpIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M12 19V5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="m6 11 6-6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DeliveryIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <circle
        cx="12"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function StarIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="currentColor"
      />
    </svg>
  );
}

export function ClockIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <circle
        cx="12"
        cy="12"
        r="8.5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M12 7.5V12l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartIcon({
  className,
  size,
  filled,
  ...rest
}) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M12 20s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.4-7 10-7 10z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill={filled ? 'currentColor' : 'none'}
      />
    </svg>
  );
}

export function PlusIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MinusIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M5 12h14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TrashIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function UserIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
      <path d="M5 19c1.7-3 4.2-4.5 7-4.5s5.3 1.5 7 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path d="M7 4.5h3l1.3 4-2 1.8a12.5 12.5 0 0 0 7.4 7.4l1.8-2 4 1.3v3a2.5 2.5 0 0 1-2.5 2.5A16.5 16.5 0 0 1 5 7a2.5 2.5 0 0 1 2.5-2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRightIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowLeftIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M19 12H5M11 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ----------------------------------------------------------
   CATEGORY ICONS
---------------------------------------------------------- */

export function AllIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <rect
        x="4"
        y="4"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <rect
        x="13"
        y="4"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <rect
        x="4"
        y="13"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />

      <rect
        x="13"
        y="13"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function MealsIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M8 12h8M12 8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SidesIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M7 5h10l-1 15H8L7 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M9 5V3M12 5V3M15 5V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DrinksIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M6 5h12l-1 15H7L6 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      <path
        d="M9 5V3h6v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M9 10h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DessertsIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M5 15h14M7 15v3.5A2.5 2.5 0 0 0 9.5 21h5a2.5 2.5 0 0 0 2.5-2.5V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M7 11a5 5 0 0 1 10 0v4H7v-4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SnacksIcon({ className, size, ...rest }) {
  return (
    <svg {...base} className={className} width={size} height={size} {...rest}>
      <path
        d="M7 7.5h10l-1 11.5H8L7 7.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 7.5V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 11h5M9 14h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

