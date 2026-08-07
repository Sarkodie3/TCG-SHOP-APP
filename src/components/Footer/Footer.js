import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Image src="/kagami-logo.png" alt="KAGAMI" width={140} height={44} style={{ height: 44, width: "auto", marginBottom: "1rem" }} />
            <p>
              Your trusted source for authentic Japanese Trading Card Game products. Pokémon &amp; ONE PIECE Cards, Booster Boxes, Single Cards, and more — shipped worldwide.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/share/1GLXTHVWJV/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="footer-col-title">Shop</p>
            <nav className="footer-links" aria-label="Shop links">
              <Link href="/pokemon" className="footer-link">Pokémon Cards</Link>
              <Link href="/one-piece" className="footer-link">One Piece Cards</Link>
              <Link href="/disney-lorcana" className="footer-link">Disney LORCANA</Link>
              <Link href="/dragon-ball" className="footer-link">Dragon Ball Cards</Link>
              <Link href="/yughi-oh" className="footer-link">Yughi-oh Cards</Link>
              <Link href="/booster-bundles" className="footer-link">Booster Bundles</Link>
              <Link href="/grading" className="footer-link">Grading Cards</Link>
              <Link href="/collections/all" className="footer-link">Online Shop</Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <p className="footer-col-title">Information</p>
            <nav className="footer-links" aria-label="Information links">
              <Link href="/customers-review" className="footer-link">Customers Review</Link>
              <Link href="/wholesale" className="footer-link">Wholesale &amp; B2B Inquiries</Link>
              <Link href="/condition-guidelines" className="footer-link">Condition Guidelines</Link>
            </nav>
          </div>

          {/* Policies */}
          <div>
            <p className="footer-col-title">Policies</p>
            <nav className="footer-links" aria-label="Policy links">
              <Link href="/shipping-policy" className="footer-link">Shipping Policy</Link>
              <Link href="/refund-policy" className="footer-link">Returns &amp; Refunds Policy</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {year} KAGAMI | Japanese TCG Store. All rights reserved.</p>
          <div className="payment-badges" aria-label="Accepted payment methods">
            {["Wise", "Bank Transfer"].map((m) => (
              <span key={m} className="payment-badge">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
