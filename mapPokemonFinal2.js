const fs = require('fs');
const path = require('path');

const imgDir = 'products/pokemon';
const files = fs.readdirSync(imgDir);

let data = fs.readFileSync('src/lib/data.js', 'utf8');

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const fileMap = {};
files.forEach(f => {
  const nameWithoutExt = f.replace(/\.[^/.]+$/, '');
  fileMap[normalize(nameWithoutExt)] = f;
});

// We need to parse each line and if it looks like a product with a name, match and replace image.
const lines = data.split('\n');
for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  const nameMatch = line.match(/name:\s*'([^']+)'/);
  if (nameMatch) {
    const name = nameMatch[1];
    const normName = normalize(name);
    let matchedFile = fileMap[normName];
    
    if (!matchedFile) {
      // try subset match
      const keys = Object.keys(fileMap);
      const matchKey = keys.find(k => k.includes(normName) || normName.includes(k));
      if (matchKey) {
        matchedFile = fileMap[matchKey];
      }
    }
    
    if (matchedFile) {
      // replace the image property
      line = line.replace(/image:\s*'[^']+'/, `image: '/images/pokemon/${matchedFile}'`);
      lines[i] = line;
    }
  }
}

fs.writeFileSync('src/lib/data.js', lines.join('\n'));

// Copy files
const publicImgDir = 'public/images/pokemon';
if (!fs.existsSync(publicImgDir)) {
  fs.mkdirSync(publicImgDir, { recursive: true });
}
files.forEach(f => {
  fs.copyFileSync(path.join(imgDir, f), path.join(publicImgDir, f));
});

console.log('Done mapping single-line pokemon images.');
