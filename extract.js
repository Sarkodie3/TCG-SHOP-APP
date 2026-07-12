const fs = require('fs');

const data = JSON.parse(fs.readFileSync('products250.json', 'utf8'));

let titles = [];
data.products.forEach(p => {
  titles.push(p.title);
});

fs.writeFileSync('titles.txt', titles.join('\n'));
console.log('Done');
