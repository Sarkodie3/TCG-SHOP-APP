import Link from "next/link";

export const metadata = {
  title: "Page Not Found | KAGAMI",
  description: "The page you requested was not found. Browse KAGAMI collections or return to the homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="container section" style={{ textAlign: "center", paddingTop: "6rem", paddingBottom: "6rem" }}>
      <p className="hero-badge" style={{ margin: "0 auto 1rem" }}>404</p>
      <h1 className="section-title">Page not found</h1>
      <p style={{ color: "var(--color-text-secondary)", maxWidth: 560, margin: "1rem auto 2rem", lineHeight: 1.7 }}>
        The page you are looking for does not exist or may have moved. Continue shopping from the main collections below.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/" className="btn btn-primary">Return home</Link>
        <Link href="/collections/pokemon-boxes" className="btn btn-secondary">Shop Pokémon boxes</Link>
        <Link href="/collections/onepiece-booster-box" className="btn btn-secondary">Shop One Piece boxes</Link>
      </div>
    </section>
  );
}
