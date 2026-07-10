"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { currencies } from "@/lib/data";
import CartDrawer from "@/components/CartDrawer/CartDrawer";
import dynamic from "next/dynamic";

const SearchBar = dynamic(() => import("@/components/SearchBar/SearchBar"), { ssr: false });

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Pokémon Cards",
    href: "/pokemon",
    children: [
      { label: "Booster BOX & CASE", href: "/collections/pokemon-booster-box" },
      { label: "Single Card/Promo", href: "/collections/pokemon-single" },
      { label: "Deck BOX/SET", href: "/collections/pokemon-deck" },
    ],
  },
  {
    label: "One Piece Cards",
    href: "/one-piece",
    children: [
      { label: "OP - Booster BOX & CASE", href: "/collections/onepiece-booster-box" },
      { label: "OP - Single Card/Promo", href: "/collections/onepiece-single" },
      { label: "OP - Decks", href: "/collections/onepiece-deck" },
    ],
  },
  { label: "Disney LORCANA", href: "/disney-lorcana" },
  { label: "Dragon Ball Cards", href: "/dragon-ball" },
  { label: "Grading Cards", href: "/grading" },
  { label: "Customers Review", href: "/customers-review" },
  {
    label: "More",
    href: "#",
    children: [
      { label: "Wholesale & B2B Inquiries", href: "/wholesale" },
      { label: "Condition Guidelines for Single Cards", href: "/condition-guidelines" },
      { label: "Tariff & VAT Page", href: "/tariff-vat" },
      { label: "EU Member States Eligible", href: "/eu-member-states" },
      { label: "Shipping Policy", href: "/shipping-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

export default function Navbar() {
  const { count, setIsOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="announce-bar">
        <span>
          Easy shopping: All Duties &amp; Taxes collected at Checkout.{" "}
          <Link href="/tariff-vat">Learn more →</Link>
        </span>
      </div>

      {/* Main Navbar */}
      <header className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" className="navbar-logo" aria-label="Omotenashi TCG Home">
            <Image src="/logo.jpg" alt="Omotenashi TCG" width={140} height={46} priority style={{ height: 46, width: "auto" }} />
          </Link>

          {/* Desktop Nav */}
          <nav className={`navbar-nav${mobileOpen ? " open" : ""}`} role="navigation" aria-label="Main navigation">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="nav-item">
                  <span className="nav-link" tabIndex={0} aria-haspopup="true">
                    {link.label}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                  </span>
                  <div className="nav-dropdown" role="menu">
                    {link.children.map((child) => (
                      <Link key={child.href} href={child.href} className="nav-dropdown-link" role="menuitem" onClick={() => setMobileOpen(false)}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <div key={link.label} className="nav-item">
                  <Link href={link.href} className="nav-link" onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                </div>
              )
            )}
          </nav>

          {/* Right Side */}
          <div className="navbar-right">
            {/* Currency Selector */}
            <div className="navbar-currency">
              <select className="currency-select" aria-label="Select currency" id="currency-selector">
                {currencies.map((c, i) => (
                  <option key={`${c.code}-${i}`} value={c.code}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Search */}
            <button
              className="navbar-icon-btn"
              aria-label="Search products"
              id="search-btn"
              onClick={() => setSearchOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {/* Account */}
            <Link href="/account" className="navbar-icon-btn" aria-label="My Account">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Cart */}
            <button
              className="navbar-icon-btn cart-btn"
              aria-label={`Cart with ${count} items`}
              id="cart-button"
              onClick={() => setIsOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && <span className="cart-count">{count > 9 ? "9+" : count}</span>}
            </button>

            {/* Mobile Toggle */}
            <button
              className="navbar-toggle"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartDrawer />
      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
    </>
  );
}
