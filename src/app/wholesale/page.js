import Link from "next/link";

export const metadata = {
  title: "Wholesale Trading Cards | Omotenashi TGC Japan B2B Inquiries",
  description: "Looking for Japanese trading cards in bulk? Omotenashi TGC offers wholesale deals with flexible pricing, secure shipping, and fast response for global buyers.",
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
            <p>Omotenashi TCG specializes in authentic Japanese Trading Card Game products, including:</p>
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

          {/* Contact Form */}
          <div>
            <h2 style={{ marginBottom: "1.5rem", fontSize: "1.5rem" }}>Send Us Your Inquiry</h2>
            <form className="contact-form" id="wholesale-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label" htmlFor="business-name">Business Name *</label>
                <input id="business-name" type="text" className="form-input" placeholder="Your Company Name" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Contact Name *</label>
                <input id="contact-name" type="text" className="form-input" placeholder="Your Full Name" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address *</label>
                <input id="email" type="email" className="form-input" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="country">Country *</label>
                <input id="country" type="text" className="form-input" placeholder="Your Country" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="products">Products of Interest *</label>
                <input id="products" type="text" className="form-input" placeholder="e.g. Pokémon Booster Boxes, One Piece Cases..." required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Additional Details</label>
                <textarea id="message" className="form-textarea" placeholder="Tell us more about your order requirements, estimated quantities, and any questions you have..." />
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-start" }} id="wholesale-submit-btn">
                Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
