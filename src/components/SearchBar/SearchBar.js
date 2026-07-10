"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { pokemonBoosterBoxes, onePieceBoosterBoxes, singleCards, deckSets, gradingCards } from "@/lib/data";

const allProducts = [
  ...pokemonBoosterBoxes,
  ...onePieceBoosterBoxes,
  ...singleCards,
  ...deckSets,
  ...gradingCards,
];

const quickLinks = [
  { label: "Pokémon Booster Boxes", href: "/collections/pokemon-booster-box", icon: "⚡" },
  { label: "One Piece Booster Boxes", href: "/collections/onepiece-booster-box", icon: "⚓" },
  { label: "Single Cards", href: "/collections/pokemon-single", icon: "🃏" },
  { label: "Deck Sets", href: "/collections/pokemon-deck", icon: "📦" },
  { label: "Grading Cards", href: "/grading", icon: "🏆" },
];

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Click outside to close
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Esc key
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Search logic
  const handleSearch = useCallback((val) => {
    setQuery(val);
    if (!val.trim()) {
      setResults([]);
      return;
    }
    const lower = val.toLowerCase();
    const filtered = allProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.brand.toLowerCase().includes(lower) ||
          (p.description && p.description.toLowerCase().includes(lower)) ||
          p.category.toLowerCase().includes(lower)
      )
      .slice(0, 8);
    setResults(filtered);
  }, []);

  const categoryLabel = (cat) => {
    const map = { pokemon: "Pokémon", onepiece: "One Piece", grading: "Grading", lorcana: "Disney LORCANA", dragonball: "Dragon Ball" };
    return map[cat] || cat;
  };

  return (
    <div className="search-overlay" role="dialog" aria-label="Search" aria-modal="true">
      <div className="search-modal" ref={containerRef}>
        {/* Input */}
        <div className="search-input-wrap">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            className="search-input-field"
            placeholder="Search products..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            id="search-input"
            aria-label="Search products"
            autoComplete="off"
          />
          <button className="search-close-btn" onClick={onClose} aria-label="Close search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Results / Quick Links */}
        <div className="search-body">
          {query.trim() === "" ? (
            <div>
              <p className="search-section-label">Quick Links</p>
              <div className="search-quick-links">
                {quickLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="search-quick-link" onClick={onClose}>
                    <span className="search-quick-icon">{l.icon}</span>
                    {l.label}
                    <svg style={{ marginLeft: "auto" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <p className="search-section-label">{results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;</p>
              <div className="search-results-list">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    className="search-result-item"
                    onClick={onClose}
                  >
                    {/* Thumbnail */}
                    <div className="search-result-thumb">
                      {p.image ? (
                        <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <span style={{ fontSize: "1.6rem" }}>
                          {p.category === "pokemon" ? "⚡" : p.category === "onepiece" ? "⚓" : p.category === "grading" ? "🏆" : "🃏"}
                        </span>
                      )}
                    </div>
                    {/* Info */}
                    <div className="search-result-info">
                      <p className="search-result-brand">{categoryLabel(p.category)}</p>
                      <p className="search-result-name">{p.name}</p>
                    </div>
                    <p className="search-result-price">${p.price.toFixed(2)}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="search-no-results">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p style={{ fontSize: "0.8rem", marginTop: "0.25rem" }}>Try a different search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
