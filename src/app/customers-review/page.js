import Link from "next/link";
import { customerReviews } from "@/lib/data";

export const metadata = {
  title: "KAGAMI Reviews | KAGAMI | Japanese TCG Store Official Store",
  description: "Explore KAGAMI Reviews. Discover our wide range of TCG products and enjoy secure global shipping.",
};

function StarRating({ count = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function CustomersReviewPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Customers Review</span>
          </nav>
          <h1>KAGAMI Reviews</h1>
          <p>Real experiences from our customers around the world. See why collectors trust KAGAMI.</p>
        </div>
      </section>

      <div className="container section">
        {/* Overall Rating */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ fontSize: "5rem", fontWeight: 900, color: "var(--color-accent-gold)", lineHeight: 1 }}>5.0</div>
          <div className="stars" style={{ justifyContent: "center", fontSize: "1.5rem", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
            Based on {customerReviews.length}+ verified customer reviews
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="reviews-grid">
          {customerReviews.map((review) => (
            <article key={review.id} className="review-card" itemScope itemType="https://schema.org/Review">
              <div className="review-card-header">
                <div className="review-avatar" aria-hidden="true">{review.avatar}</div>
                <div>
                  <p className="review-author" itemProp="author">{review.author}</p>
                  <StarRating />
                  <p className="review-date">{review.date}</p>
                </div>
              </div>
              <p className="review-title" itemProp="name">{review.title}</p>
              <p className="review-text" itemProp="reviewBody">{review.text}</p>
              {review.product && (
                <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.75rem" }}>
                  Verified Purchase — {review.product}
                </p>
              )}
            </article>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link href="/" className="btn btn-primary" id="shop-now-from-reviews">
            Shop Now
          </Link>
        </div>
      </div>
    </>
  );
}
