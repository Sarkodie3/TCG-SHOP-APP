import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import { pokemonBoosterBoxes, onePieceBoosterBoxes, singleCards, deckSets, gradingCards } from "@/lib/data";

export async function generateMetadata({ params }) {
  const subcategory = (await params).subcategory.replace(/-/g, " ");
  return {
    title: `${subcategory.toUpperCase()} | Omotenashi TCG Collection`,
  };
}

export default async function CollectionPage({ params }) {
  const { subcategory } = await params;
  
  let products = [];
  const allProducts = [...pokemonBoosterBoxes, ...onePieceBoosterBoxes, ...singleCards, ...deckSets, ...gradingCards];
  let title = "Collection";

  if (subcategory === "all") {
    products = allProducts;
    title = "All Products";
  } else if (subcategory === "pokemon-booster-box") {
    products = pokemonBoosterBoxes;
    title = "Pokémon Booster BOX & CASE";
  } else if (subcategory === "onepiece-booster-box") {
    products = onePieceBoosterBoxes;
    title = "One Piece Booster BOX & CASE";
  } else if (subcategory === "pokemon-single") {
    products = singleCards.filter(p => p.category === "pokemon");
    title = "Pokémon Single Cards";
  } else if (subcategory === "onepiece-single") {
    products = singleCards.filter(p => p.category === "onepiece");
    title = "One Piece Single Cards";
  } else if (subcategory === "pokemon-deck") {
    products = deckSets.filter(p => p.category === "pokemon");
    title = "Pokémon Decks & Sets";
  } else if (subcategory === "onepiece-deck") {
    products = deckSets.filter(p => p.category === "onepiece");
    title = "One Piece Decks & Sets";
  } else {
    // Generic fallback
    products = allProducts.filter(p => p.subcategory === subcategory);
    title = subcategory.replace(/-/g, " ").toUpperCase();
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/collections/all">Collections</Link>
            <span>/</span>
            <span style={{ textTransform: "capitalize" }}>{title}</span>
          </nav>
          <h1>{title}</h1>
          <p>Browse our curated selection of authentic TCG items.</p>
        </div>
      </section>

      <div className="container section">
        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
            <p>No products found in this collection right now. Please check back later!</p>
          </div>
        ) : (
          <>
            <div className="collection-filters">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">New Arrivals</button>
              <button className="filter-btn">Price: Low to High</button>
              <button className="filter-btn">Price: High to Low</button>
              <div style={{ marginLeft: "auto", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                {products.length} products
              </div>
            </div>
            
            <div className="product-grid">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
