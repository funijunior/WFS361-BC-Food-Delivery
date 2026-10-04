/**
 * formatPrice.js
 * ----------------------------------------------------------
 * Format a number as South African Rand currency string.
 * Usage: formatPrice(89) -> "R 89.00"
 */
export function formatPrice(value) {
  const num = Number(value) || 0;
  return `R ${num.toFixed(2)}`;
}

export default formatPrice;
