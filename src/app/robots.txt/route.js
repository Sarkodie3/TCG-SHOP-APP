import { SITE_URL } from "../../lib/seo";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /dashboard",
    "Disallow: /checkout",
    "Disallow: /cart",
    "Disallow: /login",
    "Disallow: /register",
    "Disallow: /account",
    "Disallow: /profile",
    "Disallow: /api/",
    "Disallow: /*?*sort=",
    "Disallow: /*?*filter=",
    "Disallow: /*?*page=",
    "Disallow: /*?*q=",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
