const fs = require('fs');
let html = fs.readFileSync('op.html', 'utf16le');
if (html.charCodeAt(0) === 0xFEFF) html = html.slice(1);

let matches = [...html.matchAll(/<img[^>]+src=\\?"\/\/([^"\\]+cdn\.shopify\.com\/s\/files\/[^"\\]+)\\?"[^>]+alt=\\?"([^"\\]+)\\?"/gi)];
let out = [];
matches.forEach(m => {
  out.push(m[2] + ' | https://' + m[1]);
});
fs.writeFileSync('found.txt', out.join('\n'));
