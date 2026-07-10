const fs = require('fs');

async function scrape() {
  try {
    const res = await fetch('https://omotenashitcg.com/collections/all');
    const html = await res.text();
    
    // Simple regex to find product cards which usually have product title in alt text of images
    // Shopify images often start with //omotenashitcg.com/cdn/shop/files/
    
    const matches = [...html.matchAll(/<img[^>]+src="([^">]+)"[^>]+alt="([^">]*)"[^>]*>/g)];
    
    const products = [];
    for (const match of matches) {
      let src = match[1];
      if (src.startsWith('//')) src = 'https:' + src;
      const alt = match[2];
      
      if (alt && alt.length > 5 && src.includes('cdn/shop')) {
        products.push({ src, alt });
      }
    }
    
    fs.writeFileSync('scraped_images.json', JSON.stringify(products, null, 2));
    console.log(`Scraped ${products.length} images.`);
  } catch (err) {
    console.error(err);
  }
}

scrape();
