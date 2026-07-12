import Link from "next/link";

export const metadata = {
  title: "Returns and Refunds Policy | KAGAMI",
  description: "Our returns and refunds policy for KAGAMI Japanese Trading Card Game Store.",
};

export default function RefundPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Refund Policy</span>
          </nav>
          <h1>Returns &amp; Refunds Policy</h1>
          <p>We want you to be completely satisfied with your purchase. Please read our policy carefully.</p>
        </div>
      </section>

      <div className="container section">
        <div className="policy-content">
          <h2>Our Commitment</h2>
          <p>At KAGAMI, we are committed to providing authentic, high-quality products. If you experience any issues with your order, we are here to help.</p>

          <h2>Eligibility for Returns</h2>
          <p>We accept returns under the following conditions:</p>
          <ul>
            <li><strong>Item Not as Described:</strong> If the item you received is significantly different from the product description.</li>
            <li><strong>Damaged in Transit:</strong> If your item arrived damaged due to improper packaging or handling during shipping.</li>
            <li><strong>Wrong Item Sent:</strong> If you received a different item than what you ordered.</li>
          </ul>

          <h2>Items NOT Eligible for Return</h2>
          <ul>
            <li>Opened booster boxes, packs, or sealed products.</li>
            <li>Single cards that are in the described condition grade as listed.</li>
            <li>Items damaged by the customer after delivery.</li>
            <li>Pre-order items that have been received correctly as described.</li>
            <li>Items returned without prior communication and approval.</li>
          </ul>

          <div className="highlight-box">
            <p>⚠️ <strong>Important:</strong> Please do NOT open sealed products if you believe there is an issue. Contact us first with photos of the item as received. Opening sealed products makes them ineligible for return.</p>
          </div>

          <h2>How to Request a Return</h2>
          <p>To initiate a return, please follow these steps:</p>
          <ol style={{ listStyle: "decimal", paddingLeft: "1.5rem" }}>
            <li style={{ marginBottom: "0.5rem", color: "var(--color-text-secondary)" }}>Contact us within <strong>7 days</strong> of receiving your order.</li>
            <li style={{ marginBottom: "0.5rem", color: "var(--color-text-secondary)" }}>Provide your order number and a clear description of the issue.</li>
            <li style={{ marginBottom: "0.5rem", color: "var(--color-text-secondary)" }}>Attach clear photos of the item and packaging.</li>
            <li style={{ marginBottom: "0.5rem", color: "var(--color-text-secondary)" }}>Our team will review your request and respond within 2 business days.</li>
            <li style={{ marginBottom: "0.5rem", color: "var(--color-text-secondary)" }}>If approved, we will provide return instructions and a prepaid shipping label where applicable.</li>
          </ol>

          <h2>Refund Processing</h2>
          <p>Once we receive and inspect the returned item:</p>
          <ul>
            <li>We will notify you of the approval or rejection of your refund.</li>
            <li>If approved, your refund will be processed within <strong>5–10 business days</strong> to your original payment method.</li>
            <li>International bank transfer fees may be deducted from the refund amount where applicable.</li>
          </ul>

          <h2>Exchanges</h2>
          <p>We only replace items if they are defective, damaged in transit, or if the wrong item was sent. If you need an exchange, please contact us within 7 days of receiving your order.</p>

          <h2>Shipping Costs for Returns</h2>
          <p>If the return is due to our error (wrong or damaged item), we will cover the return shipping costs. If the return is due to customer preference or change of mind, the customer is responsible for return shipping costs.</p>

          <div className="info-banner">
            <span>💬</span>
            <p>Questions about a return or refund? Contact us directly and our customer support team will assist you as quickly as possible.</p>
          </div>
        </div>
      </div>
    </>
  );
}
