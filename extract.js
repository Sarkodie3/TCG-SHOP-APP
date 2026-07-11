const fs = require('fs');
const html = fs.readFileSync('op.html', 'utf8');
const regex = /src=\"\/\/([^>]+cdn\.shopify\.com\/s\/files\/[^>]+)\"/g;
let match;
let urls = [];
while ((match = regex.exec(html)) !== null) {
  urls.push('https://' + match[1].replace(/&amp;/g, '&'));
}
urls = [...new Set(urls)];
fs.writeFileSync('urls.json', JSON.stringify(urls, null, 2));
console.log('Saved ' + urls.length + ' urls.');
