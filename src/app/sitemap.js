import { absoluteUrl, allProducts } from "@/lib/seo";

const staticPages = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/collections/all", priority: 0.8, changeFrequency: "daily" },
  { path: "/collections/pokemon-boxes", priority: 0.9, changeFrequency: "daily" },
  { path: "/collections/onepiece-booster-box", priority: 0.9, changeFrequency: "daily" },
  { path: "/collections/etbs", priority: 0.8, changeFrequency: "weekly" },
  { path: "/collections/graded", priority: 0.8, changeFrequency: "weekly" },
  { path: "/collections/pokemon-single", priority: 0.7, changeFrequency: "weekly" },
  { path: "/collections/onepiece-single", priority: 0.7, changeFrequency: "weekly" },
  { path: "/collections/pokemon-deck", priority: 0.7, changeFrequency: "weekly" },
  { path: "/collections/onepiece-deck", priority: 0.7, changeFrequency: "weekly" },
  { path: "/pokemon", priority: 0.8, changeFrequency: "weekly" },
  { path: "/one-piece", priority: 0.8, changeFrequency: "weekly" },
  { path: "/dragon-ball", priority: 0.7, changeFrequency: "weekly" },
  { path: "/yughi-oh", priority: 0.7, changeFrequency: "weekly" },
  { path: "/booster-bundles", priority: 0.7, changeFrequency: "weekly" },
  { path: "/grading", priority: 0.7, changeFrequency: "weekly" },
  { path: "/customers-review", priority: 0.6, changeFrequency: "monthly" },
  { path: "/condition-guidelines", priority: 0.6, changeFrequency: "monthly" },
  { path: "/shipping-policy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/refund-policy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/wholesale", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap() {
  const now = new Date();
  const urls = new Map();

  for (const page of staticPages) {
    urls.set(page.path, {
      url: absoluteUrl(page.path),
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  for (const product of allProducts) {
    if (!product?.slug || !product?.name) continue;
    const path = `/products/${product.slug}`;
    urls.set(path, {
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return Array.from(urls.values());
}
