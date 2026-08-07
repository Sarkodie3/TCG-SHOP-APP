const fs = require('fs');

const data = fs.readFileSync('src/lib/data.js', 'utf8');

// Get ETB products in data.js
const etbMatch = data.match(/export const etbs = \[\s*([\s\S]*?)\];/);
if (etbMatch) {
  const lines = etbMatch[1].split('\n');
  let currentProduct = null;
  const products = [];
  
  lines.forEach(l => {
    const nameMatch = l.match(/name:\s*(['"])(.+?)\1/);
    if (nameMatch) {
      currentProduct = { name: nameMatch[2] };
    }
    const imgMatch = l.match(/image:\s*(['"])(.+?)\1/);
    if (imgMatch && currentProduct) {
      currentProduct.image = imgMatch[2];
      products.push(currentProduct);
      currentProduct = null;
    }
  });
  
  console.log('--- Current ETB Products and Images ---');
  products.forEach(p => {
    console.log(`Name: "${p.name}" | Image: "${p.image}"`);
  });
} else {
  console.log('Could not find etbs array.');
}
