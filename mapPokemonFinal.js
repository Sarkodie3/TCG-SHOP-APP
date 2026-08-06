const fs = require('fs');
const path = require('path');

const imgDir = 'products/pokemon';
const files = fs.readdirSync(imgDir);

// Read data.js
let data = fs.readFileSync('src/lib/data.js', 'utf8');

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const fileMap = {};
files.forEach(f => {
  const nameWithoutExt = f.replace(/\.[^/.]+$/, '');
  fileMap[normalize(nameWithoutExt)] = f;
});

const lines = data.split('\n');
let inPokemonBoxes = false;
let updatedData = '';

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.includes('export const pokemonBoxes = [')) {
    inPokemonBoxes = true;
  }
  
  if (inPokemonBoxes && line.includes('image: ')) {
    let name = '';
    for (let j = i - 1; j >= i - 5; j--) {
      if (lines[j].includes('name: ')) {
        const match = lines[j].match(/name:\s*\"([^\"]+)\"/);
        if (match) {
          name = match[1];
          break;
        }
      }
    }
    
    if (name) {
      const normName = normalize(name);
      if (fileMap[normName]) {
        line = line.replace(/image:\s*\"[^\"]+\"/, `image: "/images/pokemon/${fileMap[normName]}"`);
      } else {
        const keys = Object.keys(fileMap);
        const matchKey = keys.find(k => k.includes(normName) || normName.includes(k));
        if (matchKey) {
          line = line.replace(/image:\s*\"[^\"]+\"/, `image: "/images/pokemon/${fileMap[matchKey]}"`);
        }
      }
    }
  }
  
  if (inPokemonBoxes && line === '];') {
    inPokemonBoxes = false;
  }
  
  updatedData += line + '\n';
}

fs.writeFileSync('src/lib/data.js', updatedData);

const publicImgDir = 'public/images/pokemon';
if (!fs.existsSync(publicImgDir)) {
  fs.mkdirSync(publicImgDir, { recursive: true });
}
files.forEach(f => {
  fs.copyFileSync(path.join(imgDir, f), path.join(publicImgDir, f));
});

console.log('Done mapping pokemon images and copying to public/images/pokemon');
