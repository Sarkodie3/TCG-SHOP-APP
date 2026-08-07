import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allProducts,
  absoluteImageUrl,
  absoluteUrl,
  breadcrumbJsonLd,
  productCategoryPath,
  productDescription,
  productPath,
  SITE_NAME,
} from "@/lib/seo";
import { customerReviews } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";

function findProduct(slug) {
  return allProducts.find((p) => p.slug === slug);
}

function matchingReviews(product) {
  return customerReviews.filter(
    (r) => r.product.includes(product.name.split(" ")[0]) || (r.product.includes("M5") && product.id.includes("M5"))
  );
}

export function generateStaticParams() {
  return allProducts.filter((product) => product?.slug).map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | KAGAMI",
      robots: { index: false, follow: true },
    };
  }

  const title = `${product.name} | ${SITE_NAME}`;
  const description = productDescription(product);
  const path = productPath(product);
  const keywords = [
    product.name,
    product.brand || SITE_NAME,
    product.category,
    product.subcategory,
    product.subcategory === "booster-box" ? "booster box" : null,
    "Japanese TCG",
    "authentic trading cards",
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: absoluteUrl(path),
      images: [
        {
          url: absoluteImageUrl(product.image),
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImageUrl(product.image)],
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);

  if (!product) {
    notFound();
  }

  const reviews = matchingReviews(product);
  const avgRating = reviews.length
    ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / reviews.length
    : null;
  const categoryPath = productCategoryPath(product);
  const path = productPath(product);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [absoluteImageUrl(product.image)],
    description: productDescription(product),
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: product.brand || SITE_NAME,
    },
    category: product.category,
    url: absoluteUrl(path),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(path),
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(avgRating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Number(avgRating.toFixed(1)),
            reviewCount: reviews.length,
          },
        }
      : {}),
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: product.category?.replace(/-/g, " ") || "Products", path: categoryPath },
    { name: product.name, path },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <div className="container" style={{ padding: "2rem 1.5rem" }}>
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: "2rem" }}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={categoryPath} style={{ textTransform: "capitalize" }}>
            {product.category.replace("-", " ")}
          </Link>
          <span>/</span>
          <span style={{ color: "var(--color-text-primary)" }}>{product.name}</span>
        </nav>

        <ProductDetailClient product={product} reviews={reviews} />
      </div>
    </>
  );
}
