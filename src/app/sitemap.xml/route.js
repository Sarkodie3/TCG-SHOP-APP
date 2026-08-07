import { allProducts, absoluteUrl } from "../../lib/seo";

const staticPages = [
  { path: "/", priority: "1.0", changeFrequency: "daily" },
  { path: "/collections/all", priority: "0.8", changeFrequency: "daily" },
  { path: "/collections/pokemon-boxes", priority: "0.9", changeFrequency: "daily" },
  { path: "/collections/onepiece-booster-box", priority: "0.9", changeFrequency: "daily" },
  { path: "/collections/etbs", priority: "0.8", changeFrequency: "weekly" },
  { path: "/collections/graded", priority: "0.8", changeFrequency: "weekly" },
  { path: "/collections/pokemon-single", priority: "0.7", changeFrequency: "weekly" },
  { path: "/collections/onepiece-single", priority: "0.7", changeFrequency: "weekly" },
  { path: "/collections/pokemon-deck", priority: "0.7", changeFrequency: "weekly" },
  { path: "/collections/onepiece-deck", priority: "0.7", changeFrequency: "weekly" },
  { path: "/pokemon", priority: "0.8", changeFrequency: "weekly" },
  { path: "/one-piece", priority: "0.8", changeFrequency: "weekly" },
  { path: "/dragon-ball", priority: "0.7", changeFrequency: "weekly" },
  { path: "/yughi-oh", priority: "0.7", changeFrequency: "weekly" },
  { path: "/booster-bundles", priority: "0.7", changeFrequency: "weekly" },
  { path: "/grading", priority: "0.7", changeFrequency: "weekly" },
  { path: "/customers-review", priority: "0.6", changeFrequency: "monthly" },
  { path: "/condition-guidelines", priority: "0.6", changeFrequency: "monthly" },
  { path: "/shipping-policy", priority: "0.5", changeFrequency: "monthly" },
  { path: "/refund-policy", priority: "0.5", changeFrequency: "monthly" },
  { path: "/wholesale", priority: "0.7", changeFrequency: "monthly" },
];

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function sitemapEntry({ url, lastModified, changeFrequency, priority }) {
  return [
    "  <url>",
    `    <loc>${escapeXml(url)}</loc>`,
    `    <lastmod>${escapeXml(lastModified)}</lastmod>`,
    `    <changefreq>${escapeXml(changeFrequency)}</changefreq>`,
    `    <priority>${escapeXml(priority)}</priority>`,
    "  </url>",
  ].join("\n");
}

export function GET() {
  const lastModified = new Date().toISOString();
  const urls = new Map();

  for (const page of staticPages) {
    urls.set(page.path, {
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    });
  }

  for (const product of allProducts) {
    if (!product?.slug || !product?.name) continue;
    const path = `/products/${product.slug}`;
    urls.set(path, {
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: "weekly",
      priority: "0.8",
    });
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...Array.from(urls.values()).map(sitemapEntry),
    '</urlset>',
    '',
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
