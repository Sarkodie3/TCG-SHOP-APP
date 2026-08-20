import Link from "next/link";
import { 
  pokemonBoosterBoxes, 
  onePieceBoosterBoxes, 
  singleCards, 
  deckSets, 
  gradingCards, 
  customerReviews,
  gradedCards,
  opDecks,
  etbs,
  dragonBallBoxes,
  yugiohBoxes,
  boosterBundles
} from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

export const revalidate = 3600;

const allProducts = [
  ...pokemonBoosterBoxes,
  ...onePieceBoosterBoxes,
  ...singleCards,
  ...deckSets,
  ...gradingCards,
  ...gradedCards,
  ...opDecks,
  ...etbs,
  ...dragonBallBoxes,
  ...yugiohBoxes,
  ...boosterBundles,
];

export function generateStaticParams() {
  return allProducts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = allProducts.find(p => p.slug === slug);
  
  if (!product) {
    return { title: "Product Not Found | KAGAMI TCG Shop" };
  }

  const keywords = [
    product.name,
    product.brand,
    product.category,
    product.subcategory,
    `buy ${product.name}`,
    `${product.category} cards`,
    product.subcategory === "booster-box" ? "booster box" : product.subcategory,
    "Japanese TCG",
    "authentic TCG",
    "factory sealed",
    "KAGAMI TCG Shop"
  ].filter(Boolean);

  return {
    title: `${product.name} | KAGAMI TCG Shop`,
    description: product.description || `Buy ${product.name} at KAGAMI TCG Shop. Authentic Japanese TCG shipped worldwide.`,
    keywords: keywords,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = allProducts.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="container section" style={{ textAlign: "center", padding: "10rem 0" }}>
        <h1>Product Not Found</h1>
        <p style={{ color: "var(--color-text-muted)", marginTop: "1rem", marginBottom: "2rem" }}>
          We couldn't find the product you're looking for.
        </p>
        <Link href="/" className="btn btn-primary">Return to Home</Link>
      </div>
    );
  }

  // Find reviews for this product
  const productReviews = customerReviews.filter(r => r.product.includes(product.name.split(" ")[0]) || (r.product.includes("M5") && product.id.includes("M5")));

  return (
    <>
      <div className="container" style={{ padding: "2rem 1.5rem" }}>
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/${product.category}`} style={{ textTransform: "capitalize" }}>{product.category.replace("-", " ")}</Link>
          <span>/</span>
          <span style={{ color: "var(--color-text-primary)" }}>{product.name}</span>
        </nav>

        <ProductDetailClient product={product} reviews={productReviews} />
      </div>
    </>
  );
}
