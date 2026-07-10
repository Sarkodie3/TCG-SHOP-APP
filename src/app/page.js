import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import { pokemonBoosterBoxes, onePieceBoosterBoxes, singleCards, deckSets, customerReviews, lorcanaBoosters, opDecks, gradedCards } from "@/lib/data";

const categories = [
  { id: "pokemon", name: "Pokémon Cards", href: "/pokemon", emoji: "⚡", desc: "Booster Boxes, Singles, Decks" },
  { id: "onepiece", name: "One Piece Cards", href: "/one-piece", emoji: "⚓", desc: "OP Booster Boxes & Singles" },
  { id: "dragonball", name: "Dragon Ball Cards", href: "/dragon-ball", emoji: "🐉", desc: "FB Booster BOX & CASE" },
  { id: "lorcana", name: "Disney LORCANA", href: "/disney-lorcana", emoji: "✨", desc: "Booster Boxes & More" },
];

function StarRating({ count = 5 }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="hero" aria-label="Hero banner">
        <div className="hero-bg-glow hero-bg-glow-1" />
        <div className="hero-bg-glow hero-bg-glow-2" />
        <div className="hero-content">
          <div>
            <div className="hero-badge">
              <span />
              New Arrivals Available Now
            </div>
            <h1 className="hero-title">
              Japan's Finest<br />
              <span className="gradient-text">TCG Cards</span><br />
              Shipped Worldwide
            </h1>
            <p className="hero-desc">
              Authentic Japanese Pokémon &amp; ONE PIECE Trading Cards. Booster BOX &amp; Case, Single Cards, Grading Cards, Deck Sets — factory sealed &amp; ready to ship.
            </p>
            <div className="hero-actions">
              <Link href="/pokemon" className="btn btn-primary" id="hero-shop-pokemon">
                Shop Pokémon Cards
              </Link>
              <Link href="/one-piece" className="btn btn-secondary" id="hero-shop-onepiece">
                One Piece Cards
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <strong>500+</strong>
                <span>Products</span>
              </div>
              <div className="hero-stat">
                <strong>50+</strong>
                <span>Countries</span>
              </div>
              <div className="hero-stat">
                <strong>5★</strong>
                <span>Rating</span>
              </div>
            </div>
          </div>
          <div className="hero-image-wrap" aria-hidden="true">
            <div className="hero-card-stack">
              {["⚡", "🌊", "🔥"].map((emoji, i) => (
                <div
                  key={i}
                  className="card-img"
                  style={{
                    width: 200,
                    height: 280,
                    background: `linear-gradient(135deg, #1e1e2a, #${["2a1e2a", "1e2a2a", "2a2a1e"][i]})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "5rem",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY QUICK LINKS ===== */}
      <section className="section-sm" aria-label="Browse categories">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Explore Our Deck-Building Collections</h2>
              <div className="section-divider" />
            </div>
            <Link href="/collections/all" className="btn-ghost">
              Browse All Deck Options →
            </Link>
          </div>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link key={cat.id} href={cat.href} className="category-card" id={`category-${cat.id}`}>
                <div className="category-card-icon" style={{ fontSize: "2.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {cat.emoji}
                </div>
                <div>
                  <p className="category-card-name">{cat.name}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCT BANNER ===== */}
      <section className="section-sm" aria-label="Featured product">
        <div className="container">
          <div className="featured-banner">
            <div>
              <span className="hero-badge" style={{ marginBottom: "1rem" }}>
                <span /> Featured Product
              </span>
              <h2 className="featured-banner-title">
                【M6a】30th CELEBRATION TCG BOX &amp; CASE〔Factory Sealed〕
              </h2>
              <p className="featured-banner-desc">
                Celebrate 30 years of Pokémon with this special anniversary set featuring exclusive cards and premium packaging.
              </p>
              <Link href="/products/m6a-30th-celebration-tcg-box-case" className="btn btn-primary" id="featured-view-details">
                View Details →
              </Link>
            </div>
            <div className="featured-banner-emoji" aria-hidden="true">🎉</div>
          </div>
        </div>
      </section>

      {/* ===== POKEMON BOOSTER BOXES ===== */}
      <section className="section" aria-label="Pokémon Booster Boxes">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Boost Your Game: Top Booster Boxes &amp; Cases</h2>
              <div className="section-divider" />
            </div>
            <Link href="/collections/pokemon-booster-box" className="btn-ghost" id="browse-all-pokemon">
              Browse All Your Favorites! →
            </Link>
          </div>
          <div className="product-grid">
            {pokemonBoosterBoxes.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ONE PIECE BOOSTER BOXES ===== */}
      <section className="section" aria-label="One Piece Booster Boxes" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">One Piece Booster Boxes &amp; Cases</h2>
              <div className="section-divider" />
            </div>
            <Link href="/collections/onepiece-booster-box" className="btn-ghost" id="browse-all-onepiece">
              Explore the Full Collection! →
            </Link>
          </div>
          <div className="product-grid">
            {onePieceBoosterBoxes.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SINGLE CARDS ===== */}
      <section className="section" aria-label="Single Cards" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Single Cards &amp; Promos</h2>
              <div className="section-divider" />
            </div>
            <Link href="/collections/pokemon-single" className="btn-ghost" id="discover-singles">
              Discover Your Next Favorite! →
            </Link>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
              Details for each item —{" "}
              <Link href="/condition-guidelines" style={{ color: "var(--color-accent-primary)" }}>
                Condition Guidelines &lt;Click or Tap Here&gt;
              </Link>
            </p>
          </div>
          <div className="product-grid">
            {singleCards.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== DECK SETS ===== */}
      <section className="section" aria-label="Deck BOX/SET" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Deck Out in Style – Deck BOX &amp; Sets</h2>
              <div className="section-divider" />
            </div>
            <Link href="/collections/pokemon-deck" className="btn-ghost" id="browse-decks">
              Browse Now! →
            </Link>
          </div>
          <div className="product-grid">
            {deckSets.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== OP DECKS ===== */}
      <section className="section" aria-label="OP Decks" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">One Piece Decks</h2>
              <div className="section-divider" />
            </div>
            <Link href="/collections/onepiece-deck" className="btn-ghost" id="browse-op-decks">
              Browse All! →
            </Link>
          </div>
          <div className="product-grid">
            {opDecks.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== LORCANA BOOSTERS ===== */}
      <section className="section" aria-label="Lorcana Boosters" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Lorcana Booster Boxes</h2>
              <div className="section-divider" />
            </div>
            <Link href="/collections/lorcana" className="btn-ghost" id="browse-lorcana">
              Browse Lorcana! →
            </Link>
          </div>
          <div className="product-grid">
            {lorcanaBoosters.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== GRADED CARDS ===== */}
      <section className="section" aria-label="Graded Cards" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Graded Cards (PSA 10)</h2>
              <div className="section-divider" />
            </div>
            <Link href="/collections/graded" className="btn-ghost" id="browse-graded">
              View All Graded Cards! →
            </Link>
          </div>
          <div className="product-grid">
            {gradedCards.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>


      {/* ===== CUSTOMER REVIEWS PREVIEW ===== */}
      <section className="section" aria-label="Customer reviews" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">What Our Customers Say</h2>
              <div className="section-divider" />
            </div>
            <Link href="/customers-review" className="btn-ghost" id="all-reviews-link">
              All Reviews →
            </Link>
          </div>
          <div className="reviews-grid">
            {customerReviews.slice(0, 3).map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-card-header">
                  <div className="review-avatar">{review.avatar}</div>
                  <div>
                    <p className="review-author">{review.author}</p>
                    <StarRating />
                  </div>
                </div>
                <p className="review-title">{review.title}</p>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="section-sm" aria-label="Trust signals">
        <div className="container">
          <div className="trust-grid">
            {[
              { icon: "🚀", title: "Fast Worldwide Shipping", desc: "2–5 business days processing from Japan" },
              { icon: "✅", title: "Factory Sealed Products", desc: "100% authentic, guaranteed factory sealed" },
              { icon: "💳", title: "Duties Paid at Checkout", desc: "No surprise customs fees on delivery" },
              { icon: "🌍", title: "Ships to 50+ Countries", desc: "Global shipping with full tracking" },
            ].map((badge, i) => (
              <div key={i} className="trust-badge-card">
                <div className="trust-badge-icon">{badge.icon}</div>
                <h3 className="trust-badge-title">{badge.title}</h3>
                <p className="trust-badge-desc">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
