"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const BULK_QUANTITIES = [1, 5, 10, 15, 20];
const CASE_QTY = 12;

export default function ProductDetailClient({ product, reviews }) {
  const { addItem } = useCart();

  const isBoosterBox = product.subcategory === "booster-box";
  const casePrice = product.casePrice || product.price * CASE_QTY;

  // Quantity mode: "box" = individual boxes, "case" = case of 12
  const [quantityMode, setQuantityMode] = useState("box"); // "box" | "case"
  const [boxQty, setBoxQty] = useState(1);

  // For non-booster-box products (singles, decks etc.)
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, title: "", text: "" });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Compute displayed price
  const getDisplayPrice = () => {
    if (!isBoosterBox) return product.price;
    if (quantityMode === "case") return casePrice;
    return product.price * boxQty;
  };

  const getDisplayLabel = () => {
    if (!isBoosterBox) return "";
    if (quantityMode === "case") return `1 CASE (${CASE_QTY} BOXES)`;
    return `${boxQty} BOX${boxQty > 1 ? "ES" : ""}`;
  };

  const handleAddToCart = () => {
    if (isBoosterBox) {
      const qty = quantityMode === "case" ? CASE_QTY : boxQty;
      for (let i = 0; i < qty; i++) {
        addItem({ ...product, price: product.price });
      }
    } else {
      addItem({ ...product, variantLabel: selectedVariant });
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewSubmitted(true);
    setShowReviewForm(false);
  };

  const emoji = product.category === "pokemon" ? "⚡" : product.category === "onepiece" ? "⚓" : product.category === "lorcana" ? "✨" : product.category === "dragonball" ? "🐉" : "🃏";

  return (
    <>
      <div className="product-detail-grid">
        {/* Images */}
        <div className="product-detail-images">
          <div className="product-main-image" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10rem", overflow: "hidden" }}>
            {product.image ? (
              <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : emoji}
          </div>
          <div className="product-thumbnails">
            <div className="product-thumb active" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", background: "var(--color-bg-elevated)", overflow: "hidden" }}>
              {product.image ? <img src={product.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : emoji}
            </div>
            <div className="product-thumb" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", background: "var(--color-bg-elevated)", opacity: 0.6 }}>
              📦
            </div>
            <div className="product-thumb" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", background: "var(--color-bg-elevated)", opacity: 0.6 }}>
              🔍
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="product-detail-info">
          <p className="product-brand">{product.brand}</p>
          <h1>{product.name}</h1>

          <div className="product-card-reviews" style={{ marginBottom: "1.5rem" }}>
            <div className="stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "var(--color-accent-gold)" }}>★</span>
              ))}
            </div>
            <span className="review-count">
              {product.reviews || 0} {product.reviews === 1 ? "review" : "reviews"}
            </span>
          </div>

          {/* BULK BUY SECTION — Booster Boxes Only */}
          {isBoosterBox && (
            <div className="bulk-buy-section">
              <p className="bulk-buy-label">
                Buy in Bulk and Save per BOX!!: <strong>{getDisplayLabel()}</strong>
              </p>
              <div className="bulk-qty-row">
                {BULK_QUANTITIES.map((q) => (
                  <button
                    key={q}
                    className={`bulk-qty-btn${quantityMode === "box" && boxQty === q ? " active" : ""}`}
                    onClick={() => { setQuantityMode("box"); setBoxQty(q); }}
                  >
                    {q}
                  </button>
                ))}
              </div>
              <button
                className={`bulk-case-btn${quantityMode === "case" ? " active" : ""}`}
                onClick={() => setQuantityMode("case")}
              >
                Case 【{CASE_QTY}BOX】
              </button>
            </div>
          )}

          {/* PRICE */}
          <div className="product-detail-price">
            ${getDisplayPrice().toFixed(2)}
            {isBoosterBox && (
              <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", fontWeight: 400, marginLeft: "0.5rem" }}>
                {quantityMode === "case"
                  ? `($${(casePrice / CASE_QTY).toFixed(2)} / BOX)`
                  : boxQty > 1 ? `($${product.price.toFixed(2)} / BOX)` : ""}
              </span>
            )}
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--color-accent-primary)", marginBottom: "1rem" }}>
            Shipping calculated at checkout
          </p>

          <div style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "2rem" }}>
            {product.description ? (
              <p>{product.description}</p>
            ) : (
              <p>Authentic Japanese trading card product. Imported directly from Japan. 100% genuine and factory sealed.</p>
            )}
          </div>

          {/* VARIANTS — Non-booster-box products */}
          {!isBoosterBox && product.variants && product.variants.length > 0 && (
            <div className="product-variants">
              <p className="variant-label">
                Select Option: <span style={{ color: "var(--color-text-primary)" }}>{selectedVariant}</span>
              </p>
              <div className="variant-options">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    className={`variant-btn ${selectedVariant === v ? "active" : ""}`}
                    onClick={() => setSelectedVariant(v)}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MANUAL QUANTITY OVERRIDE / SELECTOR */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
             <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>Quantity:</span>
             <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", width: "fit-content", overflow: "hidden", background: "var(--color-bg-elevated)" }}>
                <button 
                  onClick={() => {
                    if (isBoosterBox && quantityMode === "case") {
                       // Switch back to box mode if they tweak quantity
                       setQuantityMode("box");
                       setBoxQty(prev => Math.max(1, prev - 1));
                    } else if (isBoosterBox) {
                       setBoxQty(prev => Math.max(1, prev - 1));
                    }
                  }} 
                  style={{ padding: "0.5rem 0.85rem", background: "transparent", border: "none", color: "var(--color-text-primary)", cursor: "pointer", fontSize: "1.1rem" }}
                >
                  -
                </button>
                <span style={{ padding: "0 1rem", fontSize: "0.95rem", fontWeight: 700 }}>
                  {isBoosterBox && quantityMode === "case" ? CASE_QTY : boxQty}
                </span>
                <button 
                  onClick={() => {
                    if (isBoosterBox && quantityMode === "case") {
                       setQuantityMode("box");
                       setBoxQty(CASE_QTY + 1);
                    } else if (isBoosterBox) {
                       setBoxQty(prev => prev + 1);
                    }
                  }} 
                  style={{ padding: "0.5rem 0.85rem", background: "transparent", border: "none", color: "var(--color-text-primary)", cursor: "pointer", fontSize: "1.1rem" }}
                >
                  +
                </button>
             </div>
          </div>

          {/* ADD TO CART */}
          <button className="product-add-btn" onClick={handleAddToCart} id="add-to-cart-detail">
            🛒 Add to Cart — {getDisplayLabel() || selectedVariant || ""}
          </button>

          {/* Additional Info */}
          <div className="product-meta">
            <div className="product-meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Ships within 2-5 business days from Japan</span>
            </div>
            <div className="product-meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span>Authenticity Guaranteed (Factory Sealed)</span>
            </div>
            <div className="product-meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <span>Duties &amp; Taxes collected at checkout</span>
            </div>
            <div className="product-meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              <span>Shipping by Total Order Weight — calculated at checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container section" id="reviews">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: "0.5rem" }}>Customer Reviews</h2>
            <div className="section-divider" />
          </div>
          <button
            className="btn btn-secondary"
            id="write-review-btn"
            onClick={() => setShowReviewForm(true)}
          >
            ✏️ Write a Review
          </button>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="review-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowReviewForm(false); }}>
            <div className="review-modal">
              <div className="review-modal-header">
                <h3>Write a Review</h3>
                <button className="review-modal-close" onClick={() => setShowReviewForm(false)}>✕</button>
              </div>
              <form onSubmit={handleReviewSubmit} className="review-form">
                <div className="review-form-field">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John D."
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  />
                </div>
                <div className="review-form-field">
                  <label>Rating *</label>
                  <div className="review-star-select">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={`star-pick${reviewForm.rating >= star ? " selected" : ""}`}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div className="review-form-field">
                  <label>Review Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="Summarize your experience"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  />
                </div>
                <div className="review-form-field">
                  <label>Your Review *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you think about this product..."
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                  />
                </div>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Submit Review</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowReviewForm(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success message */}
        {reviewSubmitted && (
          <div style={{ background: "rgba(34,197,94,0.1)", border: "1px solid #22c55e", borderRadius: "var(--radius-md)", padding: "1rem 1.5rem", marginBottom: "1.5rem", color: "#22c55e", fontWeight: 600 }}>
            ✅ Thank you! Your review has been submitted and is pending approval.
          </div>
        )}

        {reviews && reviews.length > 0 ? (
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card-header">
                  <div className="review-avatar">{review.avatar}</div>
                  <div>
                    <p className="review-author">{review.author}</p>
                    <div className="stars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} style={{ color: i < review.rating ? "var(--color-accent-gold)" : "var(--color-text-muted)" }}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="review-title">{review.title}</p>
                <p className="review-text">{review.text}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.75rem" }}>
                  {review.date}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: "3rem", background: "var(--color-bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", textAlign: "center" }}>
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>No reviews yet for this product. Be the first!</p>
            <button className="btn btn-secondary" id="write-first-review-btn" onClick={() => setShowReviewForm(true)}>
              ✏️ Write the First Review
            </button>
          </div>
        )}
      </div>
    </>
  );
}
