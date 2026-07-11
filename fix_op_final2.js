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

let idx = 0;
dataContent = dataContent.replace(/export const onePieceBoosterBoxes = \[(.*?)\];/s, (match, arrayContent) => {
    let replacedArray = arrayContent.replace(/image:\s*['"](.*?)['"]/g, (imgMatch, imgUrl) => {
        let newImg = opImages[idx % opImages.length];
        idx++;
        return `image: "${newImg}"`;
    });
    return `export const onePieceBoosterBoxes = [${replacedArray}];`;
});

fs.writeFileSync('src/lib/data.js', dataContent);
console.log('Successfully assigned unique images to OP boxes, replaced ' + idx + ' images.');
