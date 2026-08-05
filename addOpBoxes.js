const fs = require('fs');

const opBoxes = [
  { name: 'OP-16', price: 72.05, stock: 'Low Stock' },
  { name: 'OP-15', price: 81.44, stock: 'Low Stock' },
  { name: 'EB-04', price: 67.66, stock: 'Low Stock' },
  { name: 'OP-14', price: 80.19, stock: 'Sold Out' },
  { name: 'EB-03', price: 109.64, stock: 'Low Stock' },
  { name: 'OP-13', price: 117.15, stock: 'Low Stock' },
  { name: 'PRB-02', price: 62.65, stock: 'Low Stock' },
  { name: 'OP-12', price: 87.71, stock: 'Low Stock' },
  { name: 'OP-11', price: 197.34, stock: 'Low Stock' },
  { name: 'EB-02', price: 195.46, stock: 'Low Stock' },
  { name: 'OP-10', price: 63.28, stock: 'Low Stock' },
  { name: 'OP-09', price: 112.77, stock: 'Low Stock' },
  { name: 'PRB-01', price: 111.51, stock: 'Low Stock' },
  { name: 'OP-08', price: 62.65, stock: 'Low Stock' },
  { name: 'OP-07', price: 85.20, stock: 'Low Stock' },
  { name: 'EB-01', price: 119.03, stock: 'Low Stock' },
  { name: 'OP-06', price: 117.78, stock: 'Low Stock' },
  { name: 'OP-05', price: 339.56, stock: 'Low Stock' },
  { name: 'Magazine', price: 70.17, stock: 'Low Stock' },
  { name: 'One Piece day 25', price: 186.69, stock: 'Low Stock' },
  { name: 'One Piece day 24', price: 56.38, stock: 'Low Stock' },
  { name: '3rd Anniversary', price: 651.55, stock: 'Low Stock' },
  { name: '3rd Campaign Promo', price: 5.01, stock: 'Low Stock' },
  { name: '2nd Anniversary', price: 551.31, stock: 'Low Stock' },
  { name: '25th Edition', price: 112.77, stock: 'Low Stock' },
  { name: 'Kumamoto', price: 162.89, stock: 'Low Stock' },
  { name: 'Base shop', price: 50.12, stock: 'Large Stock' },
  { name: 'OP-17', price: 112.77, stock: 'Pre-order' }
];

let jsCode = `\n// =============================================\n// PRODUCTS — One Piece Boxes\n// =============================================\nexport const onePieceBoxes = [\n`;

opBoxes.forEach((product, i) => {
  jsCode += `  {
    id: "op-box-${i + 1}",
    name: "${product.name}",
    slug: "op-box-${product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
    category: "onepiece",
    subcategory: "booster-box",
    price: ${product.price},
    image: "https://placehold.co/600x600/f5f5f5/999999?text=${encodeURIComponent(product.name)}",
    badge: "${product.stock === 'Sold Out' ? 'sold-out' : product.stock === 'Pre-order' ? 'pre-order' : ''}",
    reviews: 0,
    brand: "One Piece",
    description: "${product.name} Japanese Factory Sealed.",
    variants: ["1 BOX"]
  },\n`;
});

jsCode += `];\n`;

fs.appendFileSync('src/lib/data.js', jsCode, 'utf8');
console.log('Appended One Piece Boxes to data.js');
