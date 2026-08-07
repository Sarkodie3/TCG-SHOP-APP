import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import { pokemonBoosterBoxes, onePieceBoosterBoxes, singleCards, deckSets, gradingCards, etbs } from "@/lib/data";
import { absoluteUrl, breadcrumbJsonLd, collectionMeta, SITE_NAME, truncate } from "@/lib/seo";

const collectionSlugs = Object.keys(collectionMeta);

function canonicalCollectionPath(subcategory) {
  const canonical = {
    "pokemon-booster-box": "pokemon-boxes",
    "onepiece-boxes": "onepiece-booster-box",
  };
  return `/collections/${canonical[subcategory] || subcategory}`;
}

function getCollectionMeta(subcategory) {
  return (
    collectionMeta[subcategory] || {
      title: `${subcategory.replace(/-/g, " ").toUpperCase()} | ${SITE_NAME}`,
      description: `Browse ${subcategory.replace(/-/g, " ")} trading card products from KAGAMI.`,
      name: subcategory.replace(/-/g, " ").toUpperCase(),
    }
  );
}

export function generateStaticParams() {
  return collectionSlugs.map((subcategory) => ({ subcategory }));
}

export async function generateMetadata({ params }) {
  const subcategory = (await params).subcategory;
  const meta = getCollectionMeta(subcategory);
  const path = canonicalCollectionPath(subcategory);

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

export default async function CollectionPage({ params }) {
  const { subcategory } = await params;
  
  let products = [];
  const allProducts = [...pokemonBoosterBoxes, ...onePieceBoosterBoxes, ...singleCards, ...deckSets, ...gradingCards, ...etbs];
  const meta = getCollectionMeta(subcategory);
  let title = meta.name;
  let desc = meta.description;

  if (subcategory === "all") {
    products = allProducts;
  } else if (subcategory === "etbs") {
    products = etbs;
  } else if (subcategory === "pokemon-boxes" || subcategory === "pokemon-booster-box") {
    products = [...pokemonBoosterBoxes];
  } else if (subcategory === "onepiece-boxes" || subcategory === "onepiece-booster-box") {
    products = [...onePieceBoosterBoxes];
  } else if (subcategory === "pokemon-single") {
    products = singleCards.filter(p => p.category === "pokemon");
  } else if (subcategory === "onepiece-single") {
    products = singleCards.filter(p => p.category === "onepiece");
  } else if (subcategory === "pokemon-deck") {
    products = deckSets.filter(p => p.category === "pokemon");
  } else if (subcategory === "onepiece-deck") {
    products = deckSets.filter(p => p.category === "onepiece");
  } else {
    products = allProducts.filter(p => p.subcategory === subcategory);
  }

  const path = canonicalCollectionPath(subcategory);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections/all" },
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
            <Link href="/collections/all">Collections</Link>
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
