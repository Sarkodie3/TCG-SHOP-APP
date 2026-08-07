const fs = require('fs');
const path = require('path');

function getTokens(str) {
  return str.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // remove punctuation
    .split(/\s+/)
    .filter(t => t.length > 0);
}

function matchTokens(tokens1, tokens2) {
  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);
  let intersection = 0;
  for (const t of set1) {
    if (set2.has(t)) {
      intersection++;
    }
  }
  const minSize = Math.min(set1.size, set2.size);
  if (minSize === 0) return 0;
  return intersection / minSize;
}

// 1. Copy files to public/images/etbs
const sourceDir = 'products/ETBs';
const destDir = 'public/images/etbs';
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.jpeg'));
files.forEach(f => {
  fs.copyFileSync(path.join(sourceDir, f), path.join(destDir, f));
});
console.log(`Copied ${files.length} images to ${destDir}`);

// 2. Read src/lib/data.js
let data = fs.readFileSync('src/lib/data.js', 'utf8');

// Extract the etbs array block
const startMarker = 'export const etbs = [';
const endMarker = '];';

const startIndex = data.indexOf(startMarker);
if (startIndex === -1) {
  console.error('Could not find start of etbs array!');
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
  console.error('Could not find end of etbs array!');
  process.exit(1);
}

const arrayContent = data.substring(startIndex + startMarker.length, endIndex);

// Parse objects inside the array
// We can find individual objects since they start with '{' and end with '}'
const objectRegex = /\{[\s\S]*?\}(?=,|\s*\])/g;
const objectBlocks = arrayContent.match(objectRegex) || [];

console.log(`Found ${objectBlocks.length} existing ETB product blocks.`);

const mappedFiles = new Set();
const updatedBlocks = [];

objectBlocks.forEach(block => {
  const nameMatch = block.match(/name:\s*(['"])(.+?)\1/);
  if (!nameMatch) {
    updatedBlocks.push(block);
    return;
  }
  
  const name = nameMatch[2];
  const nameTokens = getTokens(name);
  
  // Find the best matching file
  let bestMatchFile = null;
  let bestScore = 0;
  
  files.forEach(f => {
    const baseName = f.replace(/\.[^/.]+$/, '');
    const fileTokens = getTokens(baseName);
    const score = matchTokens(nameTokens, fileTokens);
    
    // Also support fallback exact substring match
    const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanFile = baseName.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    let isSub = cleanName.includes(cleanFile) || cleanFile.includes(cleanName);
    
    let finalScore = score;
    if (isSub && score < 0.5) finalScore = 0.6; // boost substring match if token match is low
    
    if (finalScore > bestScore) {
      bestScore = finalScore;
      bestMatchFile = f;
    }
  });
  
  // If we have a good match (score >= 0.6), map it
  if (bestScore >= 0.6 && bestMatchFile) {
    mappedFiles.add(bestMatchFile);
    console.log(`Mapped product "${name}" to image "${bestMatchFile}" (score: ${bestScore.toFixed(2)})`);
    
    // Update the image line in the block
    let updatedBlock = block.replace(/image:\s*(['"])(.+?)\1/, `image: '/images/etbs/${bestMatchFile}'`);
    // Also change the brand to brand: 'ETB' for consistency if needed, or keep original. Let's keep original brand or update to 'Pokemon' / 'ETB'. 
    updatedBlocks.push(updatedBlock);
  } else {
    console.log(`No good match for product "${name}" (best score: ${bestScore.toFixed(2)}, file: ${bestMatchFile})`);
    updatedBlocks.push(block);
  }
});

// For unmatched files, create new product blocks and append them
let newIdCounter = objectBlocks.length + 1;
const unmatchedBlocks = [];

files.forEach(f => {
  if (!mappedFiles.has(f)) {
    const baseName = f.replace(/\.[^/.]+$/, '');
    console.log(`Creating new product for unmatched image: "${f}"`);
    
    const newBlock = `  {
    id: "tcg-etb-auto-${newIdCounter++}",
    name: "${baseName}",
    slug: "${baseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}",
    category: "pokemon",
    subcategory: "etbs",
    price: 99.99,
    image: '/images/etbs/${f}',
    badge: null,
    reviews: 0,
    brand: "Pokemon",
    description: "${baseName} Factory Sealed.",
    variants: ["1 BOX"]
  }`;
    unmatchedBlocks.push(newBlock);
  }
});

const finalArrayBlocks = [...updatedBlocks, ...unmatchedBlocks];
const newArrayContent = '\n' + finalArrayBlocks.join(',\n') + '\n';

// Replace the array in data.js
data = data.substring(0, startIndex + startMarker.length) + newArrayContent + data.substring(endIndex);

// Delete the duplicate auto-generated etbBoxes array
data = data.replace(/\/\/ Auto-generated array for ETB[\s\S]*?export const etbBoxes = \[\s*\{[\s\S]*?\}\s*\];\s*\n/m, '');

fs.writeFileSync('src/lib/data.js', data);
console.log('Successfully completed mapping of ETBs!');
