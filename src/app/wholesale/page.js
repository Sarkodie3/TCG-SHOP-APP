import Link from "next/link";
import WholesaleForm from "./WholesaleForm";

export const metadata = {
  title: "Wholesale Trading Cards | KAGAMI Japan B2B Inquiries",
  description: "Looking for Japanese trading cards in bulk? KAGAMI offers wholesale deals with flexible pricing, secure shipping, and fast response for global buyers.",
};

export default function WholesalePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Wholesale &amp; B2B Inquiries</span>
          </nav>
          <h1>Wholesale &amp; B2B Inquiries</h1>
          <p>Looking for Japanese trading cards in bulk? We offer wholesale deals with flexible pricing, secure shipping, and fast response for global buyers.</p>
        </div>
      </section>

      <div className="container section">
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Features */}
          <div className="wholesale-features">
            {[
              { icon: "📦", title: "Bulk Orders Welcome", desc: "We handle orders from single boxes to full pallet quantities. Contact us for volume pricing." },
              { icon: "🌍", title: "Global Shipping", desc: "We ship to over 50 countries worldwide with full tracking and insurance." },
              { icon: "💬", title: "Fast Response", desc: "Our team responds to all wholesale inquiries within 24 hours (Japan time)." },
              { icon: "✅", title: "Authentic Products", desc: "All products are 100% authentic, factory sealed, sourced directly from Japan." },
              { icon: "💰", title: "Flexible Pricing", desc: "Tiered pricing based on order volume. The more you order, the better the price." },
              { icon: "🔒", title: "Secure Transactions", desc: "We use secure, verified payment methods and provide proper invoicing for business accounts." },
            ].map((f, i) => (
              <div key={i} className="wholesale-feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="divider" />

          {/* What We Offer */}
          <div className="policy-content" style={{ paddingTop: 0 }}>
            <h2>What We Offer</h2>
            <p>KAGAMI specializes in authentic Japanese Trading Card Game products, including:</p>
            <ul>
              <li>Pokémon TCG — Booster Boxes, Cases, Decks, and Single Cards</li>
              <li>One Piece TCG — Booster Boxes, Cases, and Single Cards</li>
              <li>Dragon Ball Super TCG — Fusion World Booster Boxes</li>
              <li>Disney LORCANA — Booster Boxes and Sets</li>
              <li>Promo Cards and Limited Edition Items</li>
            </ul>

            <h2>Minimum Order Requirements</h2>
            <p>Wholesale inquiries typically start from a minimum of 3 boxes per SKU. For Cases (6–12 boxes per case), we can offer competitive pricing. Please contact us to discuss your specific needs.</p>

            <h2>How to Inquire</h2>
            <p>Please fill out the inquiry form below or contact us directly. Include the following information to receive the fastest response:</p>
            <ul>
              <li>Your business name and country</li>
              <li>Products you are interested in</li>
              <li>Estimated quantities per product</li>
              <li>Your preferred payment method</li>
              <li>Any specific shipping requirements</li>
            </ul>
          </div>

          {/* Contact Form — client component */}
          <div>
            <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>Send Us Your Inquiry</h2>
            <WholesaleForm />
          </div>
        </div>
      </div>
    </>
  );
}
