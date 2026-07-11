const fs = require('fs');

const csv = fs.readFileSync('sheet.csv', 'utf8');
const lines = csv.split('\n');

let products = [];
let currentProduct = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  // A simple regex to split by comma outside quotes
  const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  
  const col0 = cols[0] ? cols[0].replace(/"/g, '').trim() : '';
  const type = cols[2] ? cols[2].replace(/"/g, '').trim() : '';
  let usdPriceStr = cols[3] ? cols[3].replace(/"/g, '').trim() : '';
  
  if (col0 && col0 !== 'Product' && col0 !== '製品名') {
    currentProduct = col0;
  }
  
  if (currentProduct && type === 'Box') {
    let usdPrice = parseFloat(usdPriceStr.replace('$', ''));
    if (!isNaN(usdPrice)) {
      products.push({
        name: currentProduct,
        price: usdPrice
      });
      // reset to avoid duplicate Box lines for the same product if any
      currentProduct = null;
    }
  }
}

console.log(JSON.stringify(products, null, 2));
