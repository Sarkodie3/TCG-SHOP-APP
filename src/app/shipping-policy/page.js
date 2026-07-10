import Link from "next/link";

export const metadata = {
  title: "Shipping Policy | TCG SHOP KASUMI",
  description: "Clear shipping policy for TCG SHOP KASUMI. Orders shipped within 2–5 business days from Japan.",
};

export default function ShippingPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Shipping Policy</span>
          </nav>
          <h1>Shipping Policy</h1>
          <p>Everything you need to know about how we ship your TCG orders from Japan.</p>
        </div>
      </section>

      <div className="container section">
        <div className="policy-content">
          <h2>🚚 Shipping Lead Time</h2>
          <p>Orders are shipped within <strong>2–5 business days</strong>, starting from the next business day after payment confirmation (Japan time).</p>
          <div className="info-banner warning">
            <span>📅</span>
            <p>Please note: Orders placed on weekends or Japanese public holidays will be processed on the next business day.</p>
          </div>

          <h2>🎫 About Pre-orders and Regular Items Ordered Together</h2>
          <p>If your order contains both a pre-order item and regular (in-stock) items, the <strong>entire order will be shipped together</strong> once the pre-order item is available, unless otherwise stated.</p>
          <p>If you need your in-stock items sooner, we recommend placing a separate order for them.</p>

          <h2>📦 Packaging</h2>
          <p>We take great care in packaging your orders to ensure they arrive safely:</p>
          <ul>
            <li>Booster boxes and cases are wrapped securely with bubble wrap and placed in sturdy outer cartons.</li>
            <li>Single cards are placed in protective sleeves and toploaders, then shipped in rigid mailers.</li>
            <li>We use high-quality packaging materials to protect your valuable collectibles during transit.</li>
          </ul>

          <h2>✈️ Shipping Methods</h2>
          <p>We ship from Japan using trusted international carriers. Shipping options and estimated delivery times vary by destination:</p>
          <table>
            <thead>
              <tr>
                <th>Region</th>
                <th>Estimated Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>USA & Canada</td><td>7–14 business days</td></tr>
              <tr><td>Europe</td><td>10–18 business days</td></tr>
              <tr><td>Australia & NZ</td><td>7–12 business days</td></tr>
              <tr><td>Asia</td><td>5–10 business days</td></tr>
              <tr><td>Rest of World</td><td>14–21 business days</td></tr>
            </tbody>
          </table>
          <p style={{ marginTop: "0.75rem", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
            * Delivery times are estimates only and may vary due to customs processing, carrier delays, or local conditions.
          </p>

          <h2>🔍 Tracking</h2>
          <p>All orders include tracking. You will receive a shipping confirmation email with your tracking number once your order has been dispatched. You can use this number to monitor your package's progress on the carrier's website.</p>

          <h2>🛃 Customs & Duties</h2>
          <p>For most supported countries, all applicable duties and taxes are collected at checkout. Please visit our{" "}
            <Link href="/tariff-vat" style={{ color: "var(--color-accent-primary)" }}>Tariff &amp; VAT page</Link>{" "}
            for full details.
          </p>

          <h2>⚠️ Important Notes</h2>
          <ul>
            <li>We are not responsible for delays caused by customs, natural disasters, or other events outside our control.</li>
            <li>Please ensure your shipping address is correct at checkout. We cannot redirect packages once shipped.</li>
            <li>If a package is returned to us due to an incorrect address or failure to collect, the customer will be responsible for reshipping costs.</li>
          </ul>

          <div className="info-banner success">
            <span>💬</span>
            <p>Have a question about your shipment? Contact us at any time and our team will be happy to help!</p>
          </div>
        </div>
      </div>
    </>
  );
}
