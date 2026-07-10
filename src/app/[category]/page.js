import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import { pokemonBoosterBoxes, onePieceBoosterBoxes, singleCards, deckSets, gradingCards } from "@/lib/data";

export async function generateMetadata({ params }) {
  const categoryStr = (await params).category.replace("-", " ");
  return {
    title: `${categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1)} | Omotenashi TCG`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;

  let products = [];
  let title = "";
  let desc = "";

  // Mock filtering based on category
  if (category === "pokemon") {
    title = "Pokémon Cards";
    desc = "Explore our vast collection of authentic Japanese Pokémon cards. From Booster Boxes to rare Singles.";
    products = [...pokemonBoosterBoxes, ...singleCards.filter(p => p.category === "pokemon"), ...deckSets];
  } else if (category === "one-piece") {
    title = "One Piece Cards";
    desc = "Discover the world of One Piece TCG. Find the latest Booster Boxes and Singles.";
    products = [...onePieceBoosterBoxes, ...singleCards.filter(p => p.category === "onepiece")];
  } else if (category === "disney-lorcana") {
    title = "Disney LORCANA";
    desc = "Immerse yourself in the magic of Disney LORCANA.";
    products = []; // Add mock data if needed
  } else if (category === "dragon-ball") {
    title = "Dragon Ball Cards";
    desc = "Power up your deck with Dragon Ball Super Card Game Fusion World.";
    products = [];
  } else if (category === "grading") {
    title = "Grading Cards";
    desc = "Professional grading services for your most valuable cards.";
    products = gradingCards;
  } else {
    title = "Not Found";
  }

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span style={{ textTransform: "capitalize" }}>{title}</span>
          </nav>
          <h1>{title}</h1>
          <p>{desc}</p>
        </div>
      </section>

      <div className="container section">
        {products.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-text-muted)" }}>
            <p>No products found in this category right now. Please check back later!</p>
          </div>
        ) : (
          <>
            <div className="collection-filters">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">New Arrivals</button>
              <button className="filter-btn">Best Sellers</button>
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
