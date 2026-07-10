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
            <Image src="/logo.jpg" alt="Omotenashi TCG" width={140} height={44} style={{ height: 44, width: "auto", marginBottom: "1rem" }} />
            <p>
              Your trusted source for authentic Japanese Trading Card Game products. Pokémon &amp; ONE PIECE Cards, Booster Boxes, Single Cards, and more — shipped worldwide.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/omotcg/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://www.threads.net/@tcg_japan_omotenashitcg" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Threads">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
              </a>
              <a href="https://www.instagram.com/tcg_japan_omotenashitcg/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
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
              <Link href="/tariff-vat" className="footer-link">Tariff &amp; VAT Page</Link>
              <Link href="/eu-member-states" className="footer-link">EU Member States Eligible</Link>
            </nav>
          </div>

          {/* Policies */}
          <div>
            <p className="footer-col-title">Policies</p>
            <nav className="footer-links" aria-label="Policy links">
              <Link href="/shipping-policy" className="footer-link">Shipping Policy</Link>
              <Link href="/refund-policy" className="footer-link">Returns &amp; Refunds Policy</Link>
              <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
              <Link href="/terms-of-service" className="footer-link">Terms of Service</Link>
              <Link href="/cancel-policy" className="footer-link">Cancel Policy</Link>
              <Link href="/legal-info" className="footer-link">Legal-Info</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {year} Omotenashi TCG | Japanese TCG Store. All rights reserved.</p>
          <div className="payment-badges" aria-label="Accepted payment methods">
            {["VISA", "MC", "AMEX", "PayPal", "Klarna"].map((m) => (
              <span key={m} className="payment-badge">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
