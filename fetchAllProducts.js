const fs = require('fs');
const https = require('https');

let allProducts = [];
let page = 1;

function fetchPage() {
  const url = `https://omotenashitcg.com/products.json?limit=250&page=${page}`;
  https.get(url, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (data.products && data.products.length > 0) {
          allProducts = allProducts.concat(data.products);
          console.log(`Fetched page ${page}, total products so far: ${allProducts.length}`);
          page++;
          fetchPage();
        } else {
          fs.writeFileSync('all_products.json', JSON.stringify({products: allProducts}, null, 2));
          console.log(`Done! Fetched ${allProducts.length} total products.`);
        }
      } catch (e) {
        console.error("Error parsing JSON on page", page, e);
      }
    });
  }).on('error', e => {
    console.error(e);
  });
}

fetchPage();
