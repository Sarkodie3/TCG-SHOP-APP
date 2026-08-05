const fs = require('fs');

const etbsList = [
  { name: '30th Celeb ETB (pre-order)', price: 91.47, stock: 'Large Stock' },
  { name: 'Pitch black ETB', price: 107.13, stock: 'Large Stock' },
  { name: 'Ascended Heroes ETB', price: 78.94, stock: 'Large Stock' },
  { name: 'Chaos Rising ETB', price: 70.17, stock: 'Large Stock' },
  { name: 'Prismatic evolutions ETB', price: 120.29, stock: 'Large Stock' },
  { name: 'Journey Together ETB', price: 86.46, stock: 'Large Stock' },
  { name: 'Destined Rivals ETB', price: 98.99, stock: 'Large Stock' },
  { name: 'Black Bolt ETB', price: 110.26, stock: 'Large Stock' },
  { name: 'White flare ETB', price: 112.77, stock: 'Low Stock' },
  { name: 'Surging Sparks ETB', price: 0.00, stock: 'Low Stock' },
  { name: 'Stellar Crown ETB', price: 65.78, stock: 'Low Stock' },
  { name: 'Twilight Masquerade ETB', price: 63.90, stock: 'Low Stock' },
  { name: 'Temporal Forces ETB', price: 0.00, stock: 'Low Stock' },
  { name: 'Paldean Fates ETB', price: 0.00, stock: 'Low Stock' },
  { name: 'Obsidian Flames ETB', price: 0.00, stock: 'Low Stock' },
  { name: 'Paradox Rift ETB', price: 0.00, stock: 'Low Stock' },
  { name: 'Pokemon Center 151 ETB', price: 0.00, stock: 'Low Stock' },
  { name: 'Crown Zenith ETB', price: 0.00, stock: 'Low Stock' },
  { name: 'Shrouded Fable ETB', price: 0.00, stock: 'Low Stock' }
];

let jsCode = `\n// =============================================\n// PRODUCTS — ETBs\n// =============================================\nexport const etbs = [\n`;

etbsList.forEach((product, i) => {
  const badge = product.name.toLowerCase().includes('pre-order') ? 'pre-order' : (product.stock === 'Sold Out' ? 'sold-out' : '');
  const cleanName = product.name.replace(' (pre-order)', '');
  
  jsCode += `  {
    id: "etb-${i + 1}",
    name: "${cleanName}",
    slug: "etb-${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
    category: "pokemon",
    subcategory: "etbs",
    price: ${product.price},
    image: "https://placehold.co/600x600/f5f5f5/999999?text=${encodeURIComponent(cleanName)}",
    badge: "${badge}",
    reviews: 0,
    brand: "Pokemon",
    description: "${cleanName} Japanese Factory Sealed.",
    variants: ["1 ETB"]
  },\n`;
});

jsCode += `];\n`;

// Read current data.js
let data = fs.readFileSync('src/lib/data.js', 'utf8');

// Replace export const etbs = [];
data = data.replace('export const etbs = [];', jsCode);

fs.writeFileSync('src/lib/data.js', data, 'utf8');
console.log('Populated ETBs in data.js');
