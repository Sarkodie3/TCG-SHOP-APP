const fs = require('fs');

async function scrape() {
  try {
    const urlsToScrape = [
      'https://omotenashitcg.com/collections/booster-box',
      'https://omotenashitcg.com/collections/op-booster-box-case',
      'https://omotenashitcg.com/collections/single',
      'https://omotenashitcg.com/collections/deck-box-set'
    ];

    const allImages = new Set();

    for (const url of urlsToScrape) {
      console.log('Fetching', url);
      const res = await fetch(url);
      const html = await res.text();
      
      // Find all URLs matching shopify CDN images
      // format: //omotenashitcg.com/cdn/shop/files/...
      // or cdn.shopify.com/s/files/...
      
      const regex = /(?:https?:)?\/\/omotenashitcg\.com\/cdn\/shop\/[a-zA-Z0-9_\-\.\/]+(?:jpg|png|webp|jpeg)/g;
      const matches = [...html.matchAll(regex)];
      
      for (const match of matches) {
        let src = match[0];
        if (src.startsWith('//')) src = 'https:' + src;
        // avoid small thumbnails if possible, prefer master or large
        // shopify often adds _400x.jpg etc, let's keep them all for now
        allImages.add(src);
      }
    }
    
    fs.writeFileSync('scraped_images2.json', JSON.stringify(Array.from(allImages), null, 2));
    console.log(`Scraped ${allImages.size} unique image URLs.`);
  } catch (err) {
    console.error(err);
  }
}

scrape();
