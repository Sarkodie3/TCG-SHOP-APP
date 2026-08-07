const fs = require('fs');
const path = require('path');

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

// 1. Get all files in products/one piece
const opDir = 'products/one piece';
if (!fs.existsSync(opDir)) {
  console.log('Folder products/one piece does not exist.');
  process.exit(0);
}

const files = fs.readdirSync(opDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg'));
console.log(`Found ${files.length} images in folder.`);

// 2. Read src/lib/data.js
let data = fs.readFileSync('src/lib/data.js', 'utf8');

// Find all image references under /images/onepiece/
const imageRefs = new Set();
const regex = /\/images\/onepiece\/(.+?\.(?:jpg|png|jpeg))/gi;
let match;
while ((match = regex.exec(data)) !== null) {
  imageRefs.add(match[1]);
}

console.log('Images currently referenced in database:', Array.from(imageRefs));

const missingImages = [];
files.forEach(f => {
  if (!imageRefs.has(f)) {
    missingImages.push(f);
  }
});

console.log('Missing images (in folder but not referenced in database):', missingImages);

if (missingImages.length > 0) {
  console.log('Adding missing products to onePieceBoxes...');
  // Find where onePieceBoxes array ends
  const startMarker = 'export const onePieceBoxes = [';
  const startIndex = data.indexOf(startMarker);
  if (startIndex === -1) {
    console.error('Could not find export const onePieceBoxes array in data.js');
    process.exit(1);
  }
  
  // Find the closing bracket of the array
  let endIndex = -1;
  let openBrackets = 0;
  for (let i = startIndex + startMarker.length - 1; i < data.length; i++) {
    if (data[i] === '[') openBrackets++;
    if (data[i] === ']') {
      openBrackets--;
      if (openBrackets === 0) {
        endIndex = i;
        break;
      }
    }
  }
  
  if (endIndex === -1) {
    console.error('Could not find end of onePieceBoxes array');
    process.exit(1);
  }
  
  const arrayContent = data.substring(startIndex + startMarker.length, endIndex);
  const objectRegex = /\{[\s\S]*?\}(?=,|\s*\])/g;
  const objectBlocks = arrayContent.match(objectRegex) || [];
  
  let newIdCounter = objectBlocks.length + 1;
  const newBlocks = [];
  
  missingImages.forEach(f => {
    const baseName = f.replace(/\.[^/.]+$/, '');
    const newBlock = `  {
    id: "op-box-auto-${newIdCounter++}",
    name: "${baseName}",
    slug: "op-box-${normalize(baseName)}",
    category: "onepiece",
    subcategory: "booster-box",
    price: 99.99,
    image: '/images/onepiece/${f}',
    badge: "",
    reviews: 0,
    brand: "One Piece",
    description: "${baseName} Factory Sealed.",
    variants: ["1 BOX"]
  }`;
    newBlocks.push(newBlock);
  });
  
  const updatedArrayContent = arrayContent.trim() + ',\n' + newBlocks.join(',\n') + '\n';
  data = data.substring(0, startIndex + startMarker.length) + '\n' + updatedArrayContent + data.substring(endIndex);
  
  fs.writeFileSync('src/lib/data.js', data);
  console.log('Successfully added missing One Piece products to database!');
} else {
  console.log('No missing One Piece products. All images are already represented in the database.');
}
