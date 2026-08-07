const fs = require('fs');
const path = require('path');

// 1. Copy the images
const srcDir = 'products/Booster Bundles';
const destDir = 'public/images/boosterbundles';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(f => {
  fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
});
console.log(`Copied ${files.length} Booster Bundle images.`);

// 2. Append the new boosterBundles array to src/lib/data.js
let data = fs.readFileSync('src/lib/data.js', 'utf8');

if (!data.includes('export const boosterBundles = [')) {
  let arrayStr = '\n// Auto-generated array for Booster Bundles\nexport const boosterBundles = [\n';
  files.forEach((f, idx) => {
    const baseName = f.replace(/\.[^/.]+$/, '');
    arrayStr += `  {
    id: "booster-bundle-${idx + 1}",
    name: "${baseName}",
    slug: "${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
    category: "pokemon",
    subcategory: "booster-bundles",
    price: 29.99,
    image: '/images/boosterbundles/${f}',
    badge: "",
    reviews: 0,
    brand: "Pokemon",
    description: "${baseName} containing 6 Booster Packs.",
    variants: ["1 BUNDLE"]
  },\n`;
  });
  arrayStr += '];\n';
  data += arrayStr;
  fs.writeFileSync('src/lib/data.js', data);
  console.log('Appended boosterBundles to src/lib/data.js.');
} else {
  console.log('boosterBundles already exists in data.js.');
}

// 3. Update dynamic category route: src/app/[category]/page.js
let categoryPage = fs.readFileSync('src/app/[category]/page.js', 'utf8');
if (!categoryPage.includes('boosterBundles')) {
  // Add to import
  categoryPage = categoryPage.replace(
    `import { pokemonBoosterBoxes, onePieceBoosterBoxes, singleCards, deckSets, gradingCards, dragonBallBoxes, yugiohBoxes } from "@/lib/data";`,
    `import { pokemonBoosterBoxes, onePieceBoosterBoxes, singleCards, deckSets, gradingCards, dragonBallBoxes, yugiohBoxes, boosterBundles } from "@/lib/data";`
  );
  
  // Add to category checks
  const targetCheck = `  } else if (category === "grading") {`;
  const insertContent = `  } else if (category === "booster-bundles") {
    title = "Booster Bundles";
    desc = "Shop authentic TCG Booster Bundles. Perfect for building your collection.";
    products = boosterBundles;
  } else if (category === "grading") {`;
  
  categoryPage = categoryPage.replace(targetCheck, insertContent);
  fs.writeFileSync('src/app/[category]/page.js', categoryPage);
  console.log('Updated src/app/[category]/page.js.');
}

// 4. Update Navbar: src/components/Navbar/Navbar.js
let navbar = fs.readFileSync('src/components/Navbar/Navbar.js', 'utf8');
if (!navbar.includes('/booster-bundles')) {
  const targetNav = `  { label: "Yughi-oh", href: "/yughi-oh" },`;
  const insertNav = `  { label: "Yughi-oh", href: "/yughi-oh" },
  { label: "Booster Bundles", href: "/booster-bundles" },`;
  
  navbar = navbar.replace(targetNav, insertNav);
  fs.writeFileSync('src/components/Navbar/Navbar.js', navbar);
  console.log('Updated src/components/Navbar/Navbar.js.');
}
