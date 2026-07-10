"use client";
import { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  /** Add 1 of a product (or increment qty if already in cart) */
  const addItem = useCallback((product, variant = null) => {
    setItems((prev) => {
      const key = variant ? `${product.id}-${variant}` : product.id;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          variant,
          qty: 1,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  /** Remove 1 of a product (removes entirely if qty reaches 0) */
  const removeItem = useCallback((key) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  /** Remove ALL of a product regardless of qty */
  const clearItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  /** Adjust qty by a delta (+1 or -1), removes if qty reaches 0 */
  const updateQty = useCallback((key, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, count, total, addItem, removeItem, clearItem, updateQty, isOpen, setIsOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
