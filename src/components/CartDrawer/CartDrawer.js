"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, total, removeItem, updateQty } = useCart();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay${isOpen ? " open" : ""}`}
        onClick={handleOverlayClick}
        aria-hidden={!isOpen}
        id="cart-overlay"
      />

      {/* Drawer */}
      <aside className={`cart-drawer${isOpen ? " open" : ""}`} aria-label="Shopping cart" role="complementary">
        {/* Header */}
        <div className="cart-drawer-header">
          <h2>
            Your Cart{" "}
            {items.length > 0 && (
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", fontWeight: 400 }}>
                ({items.reduce((s, i) => s + i.qty, 0)} items)
              </span>
            )}
          </h2>
          <button className="cart-close" onClick={() => setIsOpen(false)} aria-label="Close cart" id="cart-close-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>Your cart is empty</p>
              <button className="btn btn-primary" style={{ marginTop: "0.5rem" }} onClick={() => setIsOpen(false)}>
                Shop our products
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.key} className="cart-item">
                {/* Image */}
                <div className="cart-item-img" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", overflow: "hidden" }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : "🃏"}
                </div>

                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  {item.variant && (
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>{item.variant}</p>
                  )}
                  <p className="cart-item-price">${(item.price * item.qty).toFixed(2)}</p>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.key, -1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-num">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.key, 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeItem(item.key)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textAlign: "center" }}>
              Taxes and shipping calculated at checkout
            </p>
            <button className="cart-checkout-btn" id="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
