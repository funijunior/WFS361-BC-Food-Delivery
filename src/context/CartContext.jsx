/**
 * CartContext.jsx
 * ----------------------------------------------------------
 * Global cart state via React Context API.
 * Provides: items, addItem, removeItem, updateQty, clearCart,
 *           totals (subtotal, deliveryFee, grandTotal), itemCount.
 *
 * State shape: [{ id, name, price, image, qty, category }]
 * Persisted to localStorage so the cart survives reloads
 * (premium UX touch — no backend required).
 */
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

import { CartContext } from './cartContext.js';

const STORAGE_KEY = 'bc_eats_cart_v1';
const DELIVERY_FEE = Number(import.meta.env.VITE_DELIVERY_FEE ?? 15);

/* ---------------- Reducer ---------------- */
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { item } = action;
      const existing = state.find((i) => i.id === item.id);
      if (existing) {
        return state.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + (item.qty ?? 1) } : i,
        );
      }
      return [...state, { ...item, qty: item.qty ?? 1 }];
    }
    case 'REMOVE':
      return state.filter((i) => i.id !== action.id);
    case 'UPDATE_QTY': {
      const { id, qty } = action;
      if (qty <= 0) return state.filter((i) => i.id !== id);
      return state.map((i) => (i.id === id ? { ...i, qty } : i));
    }
    case 'INCREMENT':
      return state.map((i) =>
        i.id === action.id ? { ...i, qty: i.qty + 1 } : i,
      );
    case 'DECREMENT':
      return state
        .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case 'CLEAR':
      return [];
    case 'HYDRATE':
      return action.items ?? [];
    default:
      return state;
  }
}

/* ---------------- Provider ---------------- */
export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'HYDRATE', items: JSON.parse(raw) });
    } catch {
      /* ignore corrupted storage */
    }
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable */
    }
  }, [items]);

  const addItem = useCallback(
    (item) => {
      dispatch({
        type: 'ADD',
        item,
      });
    },
    [],
  );

  const removeItem = useCallback(
    (id) => {
      dispatch({
        type: 'REMOVE',
        id,
      });
    },
    [],
  );

  const updateQty = useCallback(
    (id, qty) => {
      dispatch({
        type: 'UPDATE_QTY',
        id,
        qty,
      });
    },
    [],
  );

  const increment = useCallback(
    (id) => {
      dispatch({
        type: 'INCREMENT',
        id,
      });
    },
    [],
  );

  const decrement = useCallback(
    (id) => {
      dispatch({
        type: 'DECREMENT',
        id,
      });
    },
    [],
  );

  const clearCart = useCallback(
    () => {
      dispatch({
        type: 'CLEAR',
      });
    },
    [],
  );

  // Derived values (memoized to avoid re-renders)
  const value = useMemo(() => {
    const itemCount = items.reduce(
      (sum, item) =>
        sum + item.qty,
      0,
    );

    const subtotal = items.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0,
    );

    const deliveryFee =
      items.length > 0
        ? DELIVERY_FEE
        : 0;

    const grandTotal =
      subtotal + deliveryFee;

    return {
      items,
      itemCount,
      subtotal,
      deliveryFee,
      grandTotal,
      isEmpty:
        items.length === 0,

      addItem,
      removeItem,
      updateQty,
      increment,
      decrement,
      clearCart,
    };
  }, [
    items,
    addItem,
    removeItem,
    updateQty,
    increment,
    decrement,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
