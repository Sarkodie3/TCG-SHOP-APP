import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import { pokemonBoosterBoxes, onePieceBoosterBoxes, singleCards, deckSets, gradingCards, dragonBallBoxes, yugiohBoxes, boosterBundles } from "@/lib/data";
import { absoluteUrl, breadcrumbJsonLd, categoryMeta, SITE_NAME, truncate } from "@/lib/seo";

const categorySlugs = Object.keys(categoryMeta);

function getCategoryMeta(category) {
  return (
    categoryMeta[category] || {
      title: `${category.replace(/-/g, " ")} | ${SITE_NAME}`,
      description: `Browse ${category.replace(/-/g, " ")} trading card products from KAGAMI.`,
      name: category.replace(/-/g, " "),
    }
  );
}

export function generateStaticParams() {
  return categorySlugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const category = (await params).category;
  const meta = getCategoryMeta(category);
  const path = `/${category}`;

  return {
    title: meta.title,
    description: truncate(meta.description),
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: meta.title,
      description: truncate(meta.description),
      type: "website",
      url: absoluteUrl(path),
    },
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;

  let products = [];
  const meta = getCategoryMeta(category);
  let title = meta.name;
  let desc = meta.description;

  if (category === "pokemon") {
    products = [...pokemonBoosterBoxes, ...singleCards.filter(p => p.category === "pokemon"), ...deckSets];
  } else if (category === "one-piece") {
    products = [...onePieceBoosterBoxes, ...singleCards.filter(p => p.category === "onepiece")];
  } else if (category === "disney-lorcana") {
    title = "Disney LORCANA";
    desc = "Immerse yourself in the magic of Disney LORCANA.";
    products = [];
  } else if (category === "dragon-ball") {
    products = dragonBallBoxes;
  } else if (category === "yughi-oh" || category === "yugioh") {
    products = yugiohBoxes;
  } else if (category === "booster-bundles") {
    products = boosterBundles;
  } else if (category === "grading") {
    products = gradingCards;
  } else {
    title = "Not Found";
    desc = "No products found in this category right now.";
  }

  const path = `/${category}`;
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: title, path },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
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
