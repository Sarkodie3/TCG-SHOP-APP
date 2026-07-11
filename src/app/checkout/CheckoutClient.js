"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutClient() {
  const { items, total, clearItem } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h2>Your cart is empty</h2>
        <p style={{ marginTop: "1rem", color: "var(--color-text-muted)" }}>
          Add some products to your cart to proceed with checkout.
        </p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: "2rem", display: "inline-block" }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Format cart contents for the email
  const cartSummaryText = items
    .map(
      (item) =>
        `${item.qty}x ${item.name} ${item.variant ? `(${item.variant})` : ""} - $${(
          item.price * item.qty
        ).toFixed(2)}`
    )
    .join("\n");
  
  const totalText = `$${total.toFixed(2)}`;
  const orderSummary = `${cartSummaryText}\n\nTOTAL: ${totalText}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    
    // Convert FormData to object for AJAX
    const object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/tcgshopkasumi@gmail.com", {
          method: "POST",
          headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
          },
          body: JSON.stringify(object)
      });
      
      if (response.ok) {
        // Clear cart after successful order
        items.forEach(item => clearItem(item.key));
        router.push("/checkout/success");
      } else {
        alert("There was an issue submitting your order. Please try again.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Network error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1 className="section-title">Secure Checkout</h1>
        <div className="section-divider" style={{ margin: "0" }} />
      </div>

      <div className="checkout-layout">
        <div className="checkout-form-section">
          <h2>Shipping & Payment Details</h2>
          <form
            onSubmit={handleSubmit}
            className="checkout-form"
          >
            {/* FormSubmit Configuration */}
            <input type="hidden" name="_subject" value="New Order Received - TCG SHOP KASUMI!" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            
            {/* Order Data */}
            <input type="hidden" name="Order Details" value={orderSummary} />
            <input type="hidden" name="Total Amount" value={totalText} />

            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="Full Name" required placeholder="John Doe" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" required placeholder="john@example.com" />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="Phone Number" required placeholder="+1 (555) 000-0000" />
              </div>
            </div>

            <div className="form-group">
              <label>Street Address *</label>
              <input type="text" name="Address" required placeholder="123 Main St, Apt 4B" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City *</label>
                <input type="text" name="City" required placeholder="New York" />
              </div>
              <div className="form-group">
                <label>State / Province *</label>
                <input type="text" name="State" required placeholder="NY" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>ZIP / Postal Code *</label>
                <input type="text" name="ZIP Code" required placeholder="10001" />
              </div>
              <div className="form-group">
                <label>Country *</label>
                <input type="text" name="Country" required placeholder="United States" />
              </div>
            </div>

            <div className="payment-method-section">
              <h3>Select Payment Method *</h3>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="Payment Method" value="Wise" required />
                  <span className="radio-custom"></span>
                  <div className="payment-info">
                    <span className="payment-name">Wise (TransferWise)</span>
                    <span className="payment-desc">Fast international bank transfer</span>
                  </div>
                </label>
                <label className="payment-option">
                  <input type="radio" name="Payment Method" value="Credit Card Link Payment" required />
                  <span className="radio-custom"></span>
                  <div className="payment-info">
                    <span className="payment-name">Credit Card Link Payment</span>
                    <span className="payment-desc">Pay securely via a link sent to your email</span>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary checkout-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Submit Order"}
            </button>
            <p className="secure-badge">
              🔒 Your information is secure and encrypted
            </p>
          </form>
        </div>

        <div className="checkout-summary-section">
          <h2>Order Summary</h2>
          <div className="checkout-items">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="checkout-item">
                <div className="checkout-item-info">
                  <span className="checkout-item-qty">{item.qty}x</span>
                  <div>
                    <p className="checkout-item-name">{item.name}</p>
                    {item.variant && (
                      <p className="checkout-item-variant">{item.variant}</p>
                    )}
                  </div>
                </div>
                <p className="checkout-item-price">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .checkout-container {
          max-width: 1200px;
          margin: 0 auto;
        }
        .checkout-header {
          margin-bottom: 3rem;
        }
        .checkout-layout {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        .checkout-form-section, .checkout-summary-section {
          background: var(--color-bg-card);
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }
        h2 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: var(--color-text);
          font-weight: 600;
        }
        h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: var(--color-text);
        }
        .checkout-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        label {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }
        input[type="text"], input[type="email"], input[type="tel"] {
          padding: 0.8rem 1rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          background: var(--color-bg);
          color: var(--color-text);
          font-size: 1rem;
          transition: all 0.2s ease;
        }
        input:focus {
          outline: none;
          border-color: var(--color-accent-primary);
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
        }
        
        .payment-method-section {
          margin-top: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
        }
        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .payment-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .payment-option:hover {
          border-color: var(--color-text-muted);
        }
        .payment-option input[type="radio"] {
          display: none;
        }
        .radio-custom {
          width: 20px;
          height: 20px;
          border: 2px solid var(--color-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .payment-option input[type="radio"]:checked + .radio-custom {
          border-color: var(--color-accent-primary);
        }
        .payment-option input[type="radio"]:checked + .radio-custom::after {
          content: '';
          width: 10px;
          height: 10px;
          background: var(--color-accent-primary);
          border-radius: 50%;
        }
        .payment-option:has(input[type="radio"]:checked) {
          border-color: var(--color-accent-primary);
          background: rgba(99, 102, 241, 0.05);
        }
        .payment-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .payment-name {
          font-weight: 600;
          color: var(--color-text);
        }
        .payment-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .checkout-submit-btn {
          margin-top: 1.5rem;
          width: 100%;
          padding: 1.2rem;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .checkout-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .secure-badge {
          text-align: center;
          font-size: 0.85rem;
          color: var(--color-success);
          margin-top: 1rem;
        }
        .checkout-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .checkout-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }
        .checkout-item-info {
          display: flex;
          gap: 1rem;
        }
        .checkout-item-qty {
          background: var(--color-accent-primary);
          color: white;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          height: fit-content;
        }
        .checkout-item-name {
          font-weight: 500;
          line-height: 1.4;
        }
        .checkout-item-variant {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-top: 0.2rem;
        }
        .checkout-item-price {
          font-weight: 600;
          color: var(--color-accent-gold);
        }
        .checkout-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.25rem;
          font-weight: 700;
          padding-top: 1rem;
          border-top: 2px solid var(--color-border);
        }

        @media (max-width: 768px) {
          .checkout-layout {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .checkout-form-section, .checkout-summary-section {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
