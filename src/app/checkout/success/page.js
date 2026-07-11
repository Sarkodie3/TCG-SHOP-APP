"use client";
import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <main style={{ padding: "6rem 2rem", background: "var(--color-bg)", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="success-container">
        <div className="success-icon">✓</div>
        <h1 className="success-title">Order Submitted Successfully!</h1>
        <p className="success-message">
          Thank you for choosing TCG SHOP KASUMI. We have received your order details and shipping information.
        </p>
        <div className="payment-notice">
          <p>
            <strong>What happens next?</strong><br/>
            A secure payment link will be sent to your email address in less than 10 minutes. Please check your inbox (and spam folder) to complete your payment and finalize the order.
          </p>
        </div>
        <Link href="/" className="btn btn-primary mt-4">
          Return to Homepage
        </Link>
      </div>

      <style jsx>{`
        .success-container {
          background: var(--color-bg-card);
          padding: 3rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          max-width: 600px;
          text-align: center;
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
      `}</style>
    </main>
  );
}
