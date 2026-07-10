"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, total, count, removeItem, updateQty, clearItem } = useCart();

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
            {count > 0 && (
              <span style={{ fontSize: "0.9rem", color: "var(--color-text-muted)", fontWeight: 400 }}>
                ({count} item{count !== 1 ? "s" : ""})
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
              {/* Empty state icon */}
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ opacity: 0.3, marginBottom: "1rem" }}>
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.4rem" }}>Your cart is empty</p>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
                Add some cards to get started!
              </p>
              <button
                className="btn btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setIsOpen(false)}
                id="cart-continue-shopping-empty"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {items.map((item) => (
                <div key={item.key} className="cart-item">
                  {/* Image */}
                  <div
                    className="cart-item-img"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      "🃏"
                    )}
                  </div>

                  <div className="cart-item-info" style={{ flex: 1, minWidth: 0 }}>
                    <p className="cart-item-name" style={{ marginBottom: "0.2rem" }}>
                      {item.name}
                    </p>
                    {item.variant && (
                      <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "0.25rem" }}>
                        {item.variant}
                      </p>
                    )}

                    {/* Row: qty controls + subtotal */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.4rem" }}>
                      {/* Qty controls */}
                      <div className="cart-item-controls">
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.key, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          id={`qty-decrease-${item.key}`}
                        >
                          −
                        </button>
                        <span className="qty-num" aria-live="polite">{item.qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.key, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          id={`qty-increase-${item.key}`}
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal for this item */}
                      <p className="cart-item-price" style={{ marginBottom: 0, fontWeight: 700 }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>

                    {/* Unit price + remove */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.25rem" }}>
                      <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                        ${item.price.toFixed(2)} each
                      </span>
                      <button
                        className="cart-item-remove"
                        onClick={() => clearItem ? clearItem(item.key) : removeItem(item.key)}
                        aria-label={`Remove ${item.name} from cart`}
                        id={`remove-${item.key}`}
                        style={{ fontSize: "0.72rem" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Per-item subtotals summary */}
            <div style={{ marginBottom: "0.75rem" }}>
              {items.map((item) => (
                <div
                  key={item.key}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.78rem",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.2rem",
                  }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "65%" }}>
                    {item.name.length > 30 ? item.name.substring(0, 30) + "…" : item.name}
                    {item.qty > 1 && <span style={{ marginLeft: "0.25rem" }}>×{item.qty}</span>}
                  </span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid var(--color-border)",
                paddingTop: "0.75rem",
                marginBottom: "0.5rem",
              }}
            />

            {/* Grand total */}
            <div className="cart-subtotal" style={{ fontWeight: 700, fontSize: "1rem" }}>
              <span>Grand Total</span>
              <span style={{ color: "var(--color-accent-primary)" }}>${total.toFixed(2)}</span>
            </div>

            <p style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textAlign: "center", margin: "0.5rem 0 0.75rem" }}>
              Taxes and shipping calculated at checkout
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              <button
                className="cart-checkout-btn"
                id="checkout-btn"
                aria-label="Proceed to checkout"
              >
                Checkout →
              </button>
              <button
                className="btn btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setIsOpen(false)}
                id="cart-continue-shopping"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
