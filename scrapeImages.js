const fs = require('fs');

const html = fs.readFileSync('page.html', 'utf8');

// The HTML from Shopify has product cards usually in <li> elements or <div> with class grid__item
// Let's use a regex to match product links and their corresponding image

// Match <a href="/products/SOMETHING" ...> ... <img srcset="//cdn.shopify.com/s/files/.../img.jpg 165w" src="//cdn.shopify.com/s/files/.../img.jpg?v=123" ...> ... </a>
// Or just find all product links and the first img src inside them.

let images = {};
let regex = /href="\/products\/([^"]+)"[^>]*>.*?<img[^>]*src="([^"]+)"/gs;

let match;
while ((match = regex.exec(html)) !== null) {
  let slug = match[1];
  let src = match[2];
  if (src.startsWith('//')) {
    src = 'https:' + src;
  }
  // strip width queries like &width=...
  src = src.split('&')[0];
  
  if (!images[slug]) {
    images[slug] = src;
  }
}

console.log(JSON.stringify(images, null, 2));
fs.writeFileSync('scraped_images.json', JSON.stringify(images, null, 2));
