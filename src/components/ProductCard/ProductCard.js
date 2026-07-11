"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: "var(--color-accent-gold)" }}>★</span>
  ));

  // Determine price based on selected variant
  const getPrice = () => {
    if (product.variants && product.variants.length > 1 && selectedVariant === 1 && product.casePrice) {
      return product.casePrice;
    }
    return product.price;
  };

  const handleAddToCart = () => {
    const variantLabel = product.variants ? product.variants[selectedVariant] : null;
    addItem({
      ...product,
      price: getPrice(),
      variantLabel,
    });
  };

  return (
    <article className="product-card">
      <Link href={`/products/${product.slug}`} aria-label={product.name}>
        <div className="product-card-img-wrap">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3.5rem",
                background: "linear-gradient(135deg, #1e1e2a, #16161f)",
              }}
            >
              {product.category === "pokemon" ? "⚡" : product.category === "onepiece" ? "⚓" : product.category === "lorcana" ? "✨" : product.category === "dragonball" ? "🐉" : "🃏"}
            </div>
          )}

          {product.badge && (
            <span className={`product-card-badge ${product.badge}`}>
              {product.badge === "new" ? "New" : product.badge === "hot" ? "Hot" : "Sale"}
            </span>
          )}

          <button
            className="product-card-wishlist"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
        </div>
      </Link>

      <div className="product-card-body">
        <p className="product-card-brand">{product.brand}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="product-card-name">{product.name}</h3>
        </Link>

        {product.reviews > 0 && (
          <div className="product-card-reviews">
            <div className="stars">{stars}</div>
            <span className="review-count">
              {product.reviews} {product.reviews === 1 ? "review" : "reviews"}
            </span>
          </div>
        )}
        {product.reviews === 0 && (
          <div className="product-card-reviews">
            <Link href={`/products/${product.slug}#reviews`} className="review-count" style={{ color: "var(--color-accent-primary)" }}>
              Write the first review?
            </Link>
          </div>
        )}

        {/* Variant selector for BOX / CASE */}
        {product.variants && product.variants.length > 1 && (
          <div className="product-card-variants">
            {product.variants.map((v, i) => (
              <button
                key={i}
                className={`variant-btn${selectedVariant === i ? " active" : ""}`}
                onClick={() => setSelectedVariant(i)}
              >
                {v}
              </button>
            ))}
          </div>
        )}

        <div className="product-card-footer">
          <div>
            <span className="product-card-price">
              ${getPrice().toFixed(2)}
            </span>
            {product.variants && product.variants.length > 1 && (
              <span style={{ fontSize: "0.7rem", color: "var(--color-text-muted)", display: "block", marginTop: "2px" }}>
                {product.variants[selectedVariant]}
              </span>
            )}
          </div>

          <button
            className="add-to-cart-btn"
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
