/**
 * calculateTotal.js
 * ----------------------------------------------------------
 * Pure helpers for cart/order totals. Kept framework-agnostic
 * so they can be unit-tested and reused by OrderSummary.
 *
 * items: [{ price, qty }]
 */
export function calculateSubtotal(items = []) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function calculateDeliveryFee(items = [], fee = 0) {
  return items.length > 0 ? fee : 0;
}

export function calculateTotal(items = [], deliveryFee = 0) {
  return calculateSubtotal(items) + calculateDeliveryFee(items, deliveryFee);
}

export default calculateTotal;
