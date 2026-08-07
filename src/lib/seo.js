import {
  pokemonBoosterBoxes,
  onePieceBoosterBoxes,
  singleCards,
  deckSets,
  gradingCards,
  gradedCards,
  opDecks,
  etbs,
  dragonBallBoxes,
  yugiohBoxes,
  boosterBundles,
} from "@/lib/data";

export const SITE_URL = "https://kagamitcg.com";
export const SITE_NAME = "KAGAMI";
export const DEFAULT_TITLE = "KAGAMI | Authentic Japanese TCG Cards & Booster Boxes";
export const DEFAULT_DESCRIPTION =
  "Shop authentic Japanese Pokémon, One Piece, Yu-Gi-Oh!, Dragon Ball, ETBs, booster boxes, deck sets, and graded trading cards with worldwide shipping from Japan.";

export const allProducts = [
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

export const categoryMeta = {
  pokemon: {
    title: "Japanese Pokémon Cards & Booster Boxes | KAGAMI",
    description:
      "Shop authentic Japanese Pokémon booster boxes, singles, deck sets, and sealed TCG products from Japan.",
    name: "Pokémon Cards",
  },
  "one-piece": {
    title: "Japanese One Piece TCG Cards & Booster Boxes | KAGAMI",
    description:
      "Explore authentic Japanese One Piece TCG booster boxes, singles, and deck products with worldwide shipping.",
    name: "One Piece Cards",
  },
  "dragon-ball": {
    title: "Dragon Ball TCG Cards & Booster Boxes | KAGAMI",
    description:
      "Shop Dragon Ball trading card products, sealed boxes, and collector items from KAGAMI.",
    name: "Dragon Ball Cards",
  },
  "yughi-oh": {
    title: "Yu-Gi-Oh! Cards & Booster Boxes | KAGAMI",
    description:
      "Find Yu-Gi-Oh! booster boxes, decks, and collectible trading card products from Japan.",
    name: "Yu-Gi-Oh! Cards",
  },
  yugioh: {
    title: "Yu-Gi-Oh! Cards & Booster Boxes | KAGAMI",
    description:
      "Find Yu-Gi-Oh! booster boxes, decks, and collectible trading card products from Japan.",
    name: "Yu-Gi-Oh! Cards",
  },
  "booster-bundles": {
    title: "TCG Booster Bundles | KAGAMI",
    description:
      "Browse authentic trading card booster bundles for collectors and players.",
    name: "Booster Bundles",
  },
  grading: {
    title: "Graded Trading Cards & PSA Cards | KAGAMI",
    description:
      "Shop graded trading cards and PSA collector cards from KAGAMI.",
    name: "Graded Cards",
  },
};

export const collectionMeta = {
  all: {
    title: "All Japanese TCG Products | KAGAMI",
    description: "Browse all authentic Japanese trading card products available from KAGAMI.",
    name: "All Products",
  },
  etbs: {
    title: "Elite Trainer Boxes (ETBs) | KAGAMI",
    description: "Shop authentic Elite Trainer Boxes and sealed Pokémon TCG collector products.",
    name: "Elite Trainer Boxes",
  },
  "pokemon-boxes": {
    title: "Japanese Pokémon Booster Boxes & Cases | KAGAMI",
    description: "Shop factory-sealed Japanese Pokémon booster boxes and cases with worldwide shipping.",
    name: "Pokémon Booster Boxes & Cases",
  },
  "pokemon-booster-box": {
    title: "Japanese Pokémon Booster Boxes & Cases | KAGAMI",
    description: "Shop factory-sealed Japanese Pokémon booster boxes and cases with worldwide shipping.",
    name: "Pokémon Booster Boxes & Cases",
  },
  "onepiece-boxes": {
    title: "Japanese One Piece Booster Boxes & Cases | KAGAMI",
    description: "Browse authentic One Piece TCG booster boxes and cases imported from Japan.",
    name: "One Piece Booster Boxes & Cases",
  },
  "onepiece-booster-box": {
    title: "Japanese One Piece Booster Boxes & Cases | KAGAMI",
    description: "Browse authentic One Piece TCG booster boxes and cases imported from Japan.",
    name: "One Piece Booster Boxes & Cases",
  },
  "pokemon-single": {
    title: "Japanese Pokémon Single Cards | KAGAMI",
    description: "Find Japanese Pokémon single cards with clear condition guidance and secure shipping.",
    name: "Pokémon Single Cards",
  },
  "onepiece-single": {
    title: "Japanese One Piece Single Cards | KAGAMI",
    description: "Shop Japanese One Piece TCG single cards from KAGAMI.",
    name: "One Piece Single Cards",
  },
  "pokemon-deck": {
    title: "Japanese Pokémon Decks & Sets | KAGAMI",
    description: "Shop authentic Japanese Pokémon decks, sets, and sealed TCG products.",
    name: "Pokémon Decks & Sets",
  },
  "onepiece-deck": {
    title: "Japanese One Piece Decks & Sets | KAGAMI",
    description: "Browse Japanese One Piece TCG decks and sealed card sets.",
    name: "One Piece Decks & Sets",
  },
  graded: {
    title: "Graded TCG Cards | KAGAMI",
    description: "Shop graded Pokémon, One Piece, and collectible trading cards from KAGAMI.",
    name: "Graded Cards",
  },
};

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export function absoluteImageUrl(image) {
  if (!image) return absoluteUrl("/kagami-logo.png");
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return absoluteUrl(image);
}

export function truncate(text = "", max = 155) {
  const clean = String(text).replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
}

export function productPath(product) {
  return `/products/${product.slug}`;
}

export function productCategoryPath(product) {
  if (product.category === "pokemon") return "/pokemon";
  if (product.category === "onepiece") return "/one-piece";
  if (product.category === "dragonball" || product.category === "dragonball-boxes") return "/dragon-ball";
  if (product.category === "yugioh" || product.category === "yugioh-boxes") return "/yughi-oh";
  if (product.category === "etbs" || product.category === "etbs-boxes") return "/collections/etbs";
  if (product.category === "booster-bundles") return "/booster-bundles";
  if (product.category === "grading" || product.category === "graded" || product.category === "psa") return "/grading";
  if (product.category === "pokemon-boxes" || product.subcategory === "booster-box") return "/collections/pokemon-boxes";
  if (product.category === "single") return "/collections/all";
  if (product.category === "deck") return "/collections/pokemon-deck";
  return "/collections/all";
}

export function productDescription(product) {
  return truncate(
    product.description ||
      `Buy ${product.name} from KAGAMI. Authentic Japanese trading card product with secure worldwide shipping from Japan.`
  );
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
