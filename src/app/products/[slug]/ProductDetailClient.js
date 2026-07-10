"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductDetailClient({ product, reviews }) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  
  const handleAddToCart = () => {
    addItem(product, selectedVariant);
  };

  const emoji = product.category === "pokemon" ? "⚡" : product.category === "onepiece" ? "⚓" : product.category === "lorcana" ? "✨" : product.category === "dragonball" ? "🐉" : "🃏";

  return (
    <>
      <div className="product-detail-grid">
        {/* Images */}
        <div className="product-detail-images">
          <div className="product-main-image" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10rem", overflow: "hidden" }}>
            {product.image ? (
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : emoji}
          </div>
          <div className="product-thumbnails">
            <div className="product-thumb active" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", background: "var(--color-bg-elevated)", overflow: "hidden" }}>
              {product.image ? <img src={product.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : emoji}
            </div>
            {/* Mock extra thumbnails */}
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
              {product.reviews} {product.reviews === 1 ? "review" : "reviews"}
            </span>
          </div>

          <div className="product-detail-price">
            ${product.price.toFixed(2)}
          </div>

          <div style={{ color: "var(--color-text-secondary)", lineHeight: 1.7, marginBottom: "2rem" }}>
            {product.description ? (
              <p>{product.description}</p>
            ) : (
              <p>Authentic Japanese trading card product. Imported directly from Japan. 100% genuine and factory sealed.</p>
            )}
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
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

          {/* Add to Cart */}
          <button className="product-add-btn" onClick={handleAddToCart} id="add-to-cart-detail">
            Add to Cart
          </button>

          {/* Additional Info */}
          <div className="product-meta">
            <div className="product-meta-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
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
              <span>Duties & Taxes collected at checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="container section" id="reviews">
        <h2 className="section-title">Customer Reviews</h2>
        <div className="section-divider" style={{ marginBottom: "2rem" }} />
        
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
            <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>No reviews yet for this product.</p>
            <button className="btn btn-secondary">Write a Review</button>
          </div>
        )}
      </div>
    </>
  );
}
