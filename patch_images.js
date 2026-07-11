const fs = require('fs');
let html = fs.readFileSync('op.html', 'utf16le');
if (html.charCodeAt(0) === 0xFEFF) html = html.slice(1);

let matches = [...html.matchAll(/<img[^>]*src=\"\/\/([^>]+cdn\.shopify\.com\/s\/files\/[^>]+)\"[^>]*alt=\"([^\"]+)\"/g)];

let opMap = {};
matches.forEach(m => {
  let title = m[2];
  let src = 'https://' + m[1].replace(/&amp;/g, '&');
  
  if (title.includes('OP-') || title.includes('OP0')) {
     let mm = title.match(/OP-?(\d+)/i);
     if (mm) {
        let num = parseInt(mm[1], 10);
        if (!opMap[num]) opMap[num] = src;
     }
  }
});

let dataContent = fs.readFileSync('src/lib/data.js', 'utf8');

for (let num = 1; num <= 17; num++) {
  if (opMap[num]) {
    console.log(`Found OP-${num}: ${opMap[num]}`);
    let slugRegex = new RegExp(`slug: ['"]op-${num}-.*?\n\\s*image: '[^']+'`, 'g');
    let replacement = (match) => match.replace(/image: '[^']+'/, `image: '${opMap[num]}'`);
    dataContent = dataContent.replace(slugRegex, replacement);
  }
}

fs.writeFileSync('src/lib/data.js', dataContent);
console.log('Done replacing images in data.js');
