const fs = require('fs');

let buffer = fs.readFileSync('products.json');
let text = buffer.toString('utf16le');
if (text.charCodeAt(0) === 0xFEFF) {
  text = text.slice(1);
}
const data = JSON.parse(text);

let opImages = [];
data.products.forEach(p => {
  if (p.title.toUpperCase().includes('ONE PIECE') || p.title.toUpperCase().includes('OP')) {
    if (p.images && p.images.length > 0) {
      opImages.push(p.images[0].src);
    }
  }
});
opImages = [...new Set(opImages)].filter(img => img && !img.includes('logo') && !img.includes('icon'));

let dataContent = fs.readFileSync('src/lib/data.js', 'utf8');

for (let i = 1; i <= 17; i++) {
  let img = opImages[i % opImages.length];
  let slugRegex = new RegExp(`(slug: ['"]op-${i}-.*?\\n\\s*image:\\s*)['"][^'"]+['"]`, 'gi');
  dataContent = dataContent.replace(slugRegex, `$1'${img}'`);
}

fs.writeFileSync('src/lib/data.js', dataContent);
console.log('Successfully assigned unique images to OP-1 through OP-17.');
