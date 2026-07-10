const fs = require('fs');

let buffer = fs.readFileSync('products.json');
let text = buffer.toString('utf16le');
if (text.charCodeAt(0) === 0xFEFF) {
  text = text.slice(1);
}
const data = JSON.parse(text);

let opImages = [];
data.products.forEach(p => {
  if (p.title.includes('OP-') && p.images && p.images.length > 0) {
    opImages.push(p.images[0].src);
  }
});
opImages = [...new Set(opImages)].filter(img => img && !img.includes('logo') && !img.includes('icon'));

let dataContent = fs.readFileSync('src/lib/data.js', 'utf8');
let idx = 0;
dataContent = dataContent.replace(/export const onePieceBoosterBoxes = \[(.*?)\];/s, (match, p1) => {
   let updated = p1.replace(/image:\s*'[^']+',/g, () => {
       let img = opImages[idx % opImages.length];
       idx++;
       return "image: '" + img + "',";
   });
   return "export const onePieceBoosterBoxes = [" + updated + "];";
});
fs.writeFileSync('src/lib/data.js', dataContent);
console.log('Updated data.js with ' + idx + ' unique images!');
