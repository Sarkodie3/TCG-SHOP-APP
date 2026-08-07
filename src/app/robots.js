import { SITE_URL } from "@/lib/seo";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/products/", "/collections/", "/pokemon", "/one-piece", "/dragon-ball", "/yughi-oh", "/grading", "/booster-bundles", "/customers-review", "/condition-guidelines", "/shipping-policy", "/refund-policy", "/wholesale"],
      disallow: [
        "/admin",
        "/dashboard",
        "/checkout",
        "/cart",
        "/login",
        "/register",
        "/account",
        "/profile",
        "/api/",
        "/*?*sort=",
        "/*?*filter=",
        "/*?*page=",
        "/*?*q=",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
