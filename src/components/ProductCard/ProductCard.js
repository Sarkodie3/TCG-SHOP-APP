"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [cardQty, setCardQty] = useState(1);

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: "var(--color-accent-gold)" }}>★</span>
  ));

  // Determine price based on selected variant and qty
  const getPrice = () => {
    // If it has variants and it's not a booster box
    if (product.variants && product.variants.length > 1 && selectedVariant === 1 && product.casePrice) {
      return product.casePrice * cardQty;
    }
    return product.price * cardQty;
  };

  const handleAddToCart = () => {
    const variantLabel = product.variants ? product.variants[selectedVariant] : null;
    for (let i = 0; i < cardQty; i++) {
      addItem({
        ...product,
        price: getPrice() / cardQty,
        variantLabel,
      });
    }
  };

  const handleQtyChange = (delta) => {
    setCardQty(prev => Math.max(1, prev + delta));
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


        {/* Replaced Variant selector with text as requested */}
        {product.variants && product.variants.length > 1 && product.category !== 'grading' && product.category !== 'pokemon' && product.category !== 'onepiece' ? (
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
        ) : product.subcategory === "booster-box" ? (
          <div style={{ margin: "0.5rem 0", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
             <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
               Buy in Bulk and Save per BOX!!: <span style={{color: "var(--color-accent-primary)"}}>{cardQty} BOX{cardQty > 1 ? "ES" : ""}</span>
             </div>
             <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", width: "fit-content", overflow: "hidden" }}>
                <button onClick={() => handleQtyChange(-1)} style={{ padding: "0.25rem 0.5rem", background: "var(--color-bg-elevated)", border: "none", color: "var(--color-text-primary)", cursor: "pointer" }}>-</button>
                <span style={{ padding: "0 0.75rem", fontSize: "0.85rem", fontWeight: 600 }}>{cardQty}</span>
                <button onClick={() => handleQtyChange(1)} style={{ padding: "0.25rem 0.5rem", background: "var(--color-bg-elevated)", border: "none", color: "var(--color-text-primary)", cursor: "pointer" }}>+</button>
             </div>
          </div>
        ) : null}

        <div className="product-card-footer">
          <div>
            <span className="product-card-price">
              ${getPrice().toFixed(2)}
            </span>
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
