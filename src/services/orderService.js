/**
 * orderService.js
 * ----------------------------------------------------------
 * BC Eats frontend order service.
 *
 * Phase 4:
 * - Validates checkout data
 * - Creates order objects
 * - Generates order IDs
 * - Persists the latest order to sessionStorage
 * - Retrieves the latest order
 * - Simulates order submission
 *
 * Phase 5 / future backend:
 * This service can be replaced with a real API call without
 * changing the Checkout UI.
 */

const ORDER_STORAGE_KEY = 'bc_eats_last_order_v1';

/* ----------------------------------------------------------
   Helpers
---------------------------------------------------------- */

function generateOrderId() {
  const timestamp = Date.now()
    .toString(36)
    .toUpperCase();

  const random = Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase();

  return `BCE-${timestamp}-${random}`;
}

function cleanString(value) {
  return typeof value === 'string'
    ? value.trim()
    : '';
}

/* ----------------------------------------------------------
   Validation
---------------------------------------------------------- */

export function validateOrderData(orderData = {}) {
  const errors = {};

  const name = cleanString(orderData.name);
  const phone = cleanString(orderData.phone);
  const deliveryLocation =
    cleanString(orderData.deliveryLocation);

  if (!name) {
    errors.name = 'Customer name is required.';
  }

  if (!phone) {
    errors.phone = 'Phone number is required.';
  }

  if (!deliveryLocation) {
    errors.deliveryLocation =
      'Delivery location is required.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/* ----------------------------------------------------------
   Create order
---------------------------------------------------------- */

export function createOrder({
  customer = {},
  items = [],
  totals = {},
  delivery = {},
  notes = '',
} = {}) {
  if (!items.length) {
    throw new Error(
      'Cannot create an order with an empty cart.',
    );
  }

  const order = {
    id: generateOrderId(),

    status: 'confirmed',

    createdAt: new Date().toISOString(),

    customer: {
      name: cleanString(customer.name),
      phone: cleanString(customer.phone),
      email: cleanString(customer.email),
    },

    delivery: {
      locationId:
        cleanString(delivery.locationId),

      location:
        cleanString(delivery.location),

      building:
        cleanString(delivery.building),

      zone:
        cleanString(delivery.zone),

      eta:
        Number(delivery.eta) || null,
    },

    items: items.map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price) || 0,
      qty: Number(item.qty) || 1,
      image: item.image,
      category: item.category,
    })),

    totals: {
      subtotal: Number(totals.subtotal) || 0,

      deliveryFee:
        Number(totals.deliveryFee) || 0,

      grandTotal:
        Number(totals.grandTotal) || 0,
    },

    notes: cleanString(notes),
  };

  return order;
}

/* ----------------------------------------------------------
   Save order
---------------------------------------------------------- */

export function saveOrder(order) {
  if (!order?.id) {
    throw new Error(
      'Cannot save an invalid order.',
    );
  }

  try {
    localStorage.setItem(
      ORDER_STORAGE_KEY,
      JSON.stringify(order),
    );

    return order;
  } catch (error) {
    console.error(
      'Unable to save BC Eats order:',
      error,
    );

    return order;
  }
}

/* ----------------------------------------------------------
   Get latest order
---------------------------------------------------------- */

export function getLatestOrder() {
  try {
    const raw = localStorage.getItem(
      ORDER_STORAGE_KEY,
    );

    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error(
      'Unable to read BC Eats order:',
      error,
    );

    return null;
  }
}

/* ----------------------------------------------------------
   Clear latest order
---------------------------------------------------------- */

export function clearLatestOrder() {
  try {
    localStorage.removeItem(
      ORDER_STORAGE_KEY,
    );
  } catch (error) {
    console.error(
      'Unable to clear BC Eats order:',
      error,
    );
  }
}

/* ----------------------------------------------------------
   Submit order
---------------------------------------------------------- */

export async function submitOrder({
  customer,
  items,
  totals,
  delivery,
  notes,
} = {}) {
  const validation = validateOrderData({
    name: customer?.name,
    phone: customer?.phone,
    deliveryLocation:
      delivery?.locationId,
  });

  if (!validation.valid) {
    const error = new Error(
      'Order validation failed.',
    );

    error.code = 'VALIDATION_ERROR';
    error.validation = validation.errors;

    throw error;
  }

  if (!items?.length) {
    const error = new Error(
      'Your cart is empty.',
    );

    error.code = 'EMPTY_CART';

    throw error;
  }

  /*
   * Simulate network/API processing.
   * Replace this block with fetch() when a backend exists.
   */
  await new Promise((resolve) => {
    setTimeout(resolve, 700);
  });

  const order = createOrder({
    customer,
    items,
    totals,
    delivery,
    notes,
  });

  saveOrder(order);

  return order;
}

export default {
  validateOrderData,
  createOrder,
  saveOrder,
  getLatestOrder,
  clearLatestOrder,
  submitOrder,
};