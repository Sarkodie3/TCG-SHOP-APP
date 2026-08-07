const fs = require('fs');
const path = require('path');

// 1. Copy the images safely
const sourceDir = 'products/one piece';
const destDir = 'public/images/onepiece';

const imagesToCopy = ['Kumamoto.jpg', 'base shop.jpg', '3rd Captain Promo.jpg'];

imagesToCopy.forEach(img => {
  const src = path.join(sourceDir, img);
  const dest = path.join(destDir, img);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${img} to ${destDir}`);
  } else {
    console.error(`Source image ${src} not found!`);
  }
});

// 2. Read and modify src/lib/data.js
let data = fs.readFileSync('src/lib/data.js', 'utf8');

// Replace 3rd Campaign Promo name and image in the main array
data = data.replace(
  `    name: "3rd Campaign Promo",
    slug: "op-box-3rd-campaign-promo",
    category: "onepiece",
    subcategory: "booster-box",
    price: 5.01,
    image: "https://placehold.co/600x600/f5f5f5/999999?text=3rd%20Campaign%20Promo",`,
  `    name: "3rd Captain Promo",
    slug: "op-box-3rd-captain-promo",
    category: "onepiece",
    subcategory: "booster-box",
    price: 5.01,
    image: '/images/onepiece/3rd Captain Promo.jpg',`
);

// Delete the duplicate auto-generated onePiecePromoBoxes array
data = data.replace(/\/\/ Auto-generated array for One Piece[\s\S]*?export const onePiecePromoBoxes = \[\s*\{[\s\S]*?\}\s*\];\s*\n/m, '');

fs.writeFileSync('src/lib/data.js', data);
console.log('Successfully updated src/lib/data.js with fixes for Kumamoto, base shop, and 3rd Captain Promo!');
