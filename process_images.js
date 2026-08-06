const fs = require('fs');
const path = require('path');

const baseImgDir = 'products';
const publicBaseDir = 'public/images';

const categories = [
  { folder: 'one piece', public: 'onepiece', arrayPrefix: 'onePiece', title: 'One Piece' },
  { folder: 'ETBs', public: 'etbs', arrayPrefix: 'etb', title: 'ETB' },
  { folder: 'Dragon Ball', public: 'dragonball', arrayPrefix: 'dragonBall', title: 'Dragon Ball' },
  { folder: 'Yughi-oh', public: 'yugioh', arrayPrefix: 'yugioh', title: 'Yu-Gi-Oh' }
];

let data = fs.readFileSync('src/lib/data.js', 'utf8');

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

for (const cat of categories) {
  const sourcePath = path.join(baseImgDir, cat.folder);
  const destPath = path.join(publicBaseDir, cat.public);
  
  if (!fs.existsSync(sourcePath)) {
    console.log(`Source folder not found: ${sourcePath}`);
    continue;
  }
  
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true });
  }
  
  const files = fs.readdirSync(sourcePath);
  const fileMap = {};
  
  // copy files and build map
  files.forEach(f => {
    fs.copyFileSync(path.join(sourcePath, f), path.join(destPath, f));
    const nameWithoutExt = f.replace(/\.[^/.]+$/, '');
    fileMap[normalize(nameWithoutExt)] = {
      filename: f,
      name: nameWithoutExt,
      publicPath: `/images/${cat.public}/${f}`
    };
  });
  
  console.log(`Copied ${files.length} files for ${cat.folder}`);
  
  // Update data.js
  let lines = data.split('\n');
  let newProductsToAdd = [];
  
  // check which ones match existing
  Object.keys(fileMap).forEach(normKey => {
    const item = fileMap[normKey];
    let matched = false;
    
    // search for it in data.js lines
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('name:')) {
        const nameMatch = lines[i].match(/name:\s*['"]([^'"]+)['"]/);
        if (nameMatch) {
          const name = nameMatch[1];
          if (normalize(name) === normKey || normalize(name).includes(normKey) || normKey.includes(normalize(name))) {
            lines[i] = lines[i].replace(/image:\s*['"][^'"]+['"]/, `image: '${item.publicPath}'`);
            matched = true;
          }
        }
      }
    }
    
    if (!matched) {
      newProductsToAdd.push(item);
    }
  });
  
  data = lines.join('\n');
  
  if (newProductsToAdd.length > 0) {
    console.log(`Found ${newProductsToAdd.length} products to create for ${cat.folder}`);
    let newArrayStr = `\n// Auto-generated array for ${cat.title}\nexport const ${cat.arrayPrefix}Boxes = [\n`;
    newProductsToAdd.forEach((item, idx) => {
      newArrayStr += `  { id: '${cat.public}-box-${idx+1}', name: '${item.name}', slug: '${cat.public}-box-${normalize(item.name)}', category: '${cat.public}-boxes', subcategory: 'booster-box', price: 99.99, image: '${item.publicPath}', badge: '', reviews: 0, brand: '${cat.title}', description: '${item.name} Factory Sealed.', variants: ['1 BOX'] },\n`;
    });
    newArrayStr += `];\n`;
    data += newArrayStr;
  }
}

fs.writeFileSync('src/lib/data.js', data);
console.log('Finished processing all images and updating data.js');
