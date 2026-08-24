"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutSuccessPage() {
  const { items, clearItem } = useCart();
  const clearedRef = useRef(false);

  useEffect(() => {
    if (!clearedRef.current && items.length > 0) {
      items.forEach(item => clearItem(item.key));
      clearedRef.current = true;
    }
  }, [items, clearItem]);

  return (
    <main className="success-page-wrap">
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1 className="success-title">Payment Successful</h1>
        <div className="success-message" style={{ color: "var(--color-text)", fontSize: "1.1rem", lineHeight: "1.8" }}>
          <p style={{ fontWeight: "600", fontSize: "1.25rem", marginBottom: "0.5rem" }}>Thank you for your order! 🎉</p>
          <p style={{ marginBottom: "1rem" }}>Your payment has been successfully received.</p>
        </div>
        <div className="payment-notice">
          <p style={{ marginBottom: "1rem" }}>
            You’ll receive a confirmation email from the team.<br />
            Your order is now being processed by our team. We will carefully prepare your items and provide shipping/tracking information once your order has been dispatched.
          </p>
          <p style={{ fontWeight: "700", color: "var(--color-success)", fontSize: "1.15rem", marginBottom: "1.5rem" }}>
            Order Status: Payment Confirmed ✅
          </p>
          <p style={{ fontStyle: "italic" }}>
            Thank you for choosing TCG SHOP KAGAMI JAPAN.<br/>
            We appreciate your business and look forward to serving you again!
          </p>
        </div>
        <Link href="/" className="btn btn-primary mt-4">
          Go back to the website
        </Link>
      </div>

      <style jsx>{`
        .success-page-wrap {
          padding: 6rem 2rem;
          background: var(--color-bg);
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .success-container {
          background: var(--color-bg-card);
          padding: 3rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          text-align: center;
          width: 100%;
        }
        .success-icon {
          width: 80px;
          height: 80px;
          background: var(--color-success);
          color: white;
          font-size: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin: 0 auto 1.5rem auto;
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }
        .success-title {
          font-size: 2rem;
          color: var(--color-text);
          margin-bottom: 1rem;
        }
        .success-message {
          color: var(--color-text-muted);
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .payment-notice {
          background: rgba(99, 102, 241, 0.1);
          border-left: 4px solid var(--color-accent-primary);
          padding: 1.5rem;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          text-align: left;
          margin-bottom: 2.5rem;
        }
        .payment-notice p {
          color: var(--color-text);
          line-height: 1.6;
          margin: 0;
        }
        .payment-notice strong {
          color: var(--color-accent-primary);
          font-size: 1.1rem;
        }
        .mt-4 {
          margin-top: 1rem;
          display: inline-block;
        }

        @media (max-width: 480px) {
          .success-page-wrap {
            padding: 4rem 1rem;
          }
          .success-container {
            padding: 2rem 1.25rem;
          }
          .success-title {
            font-size: 1.75rem;
          }
          .payment-notice {
            padding: 1rem;
          }
        }
      `}</style>
    </main>
  );
}
