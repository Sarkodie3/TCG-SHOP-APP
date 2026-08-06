const fs = require('fs');
let data = fs.readFileSync('src/lib/data.js', 'utf8');

const replacements = [
  { search: 'White Flare Deluxe(SV11W)', img: '/images/pokemon/White Flare deluxe (SV11W).jpg' },
  { search: 'White Flare(SV11W)', img: '/images/pokemon/White Flare (SV11W).jpg' }
];

let lines = data.split('\n');
let count = 0;

for (let i = 0; i < lines.length; i++) {
  for (let r of replacements) {
    if (lines[i].includes(`name: '${r.search}'`) || lines[i].includes(`name: "${r.search}"`)) {
      lines[i] = lines[i].replace(/image:\s*['"][^'"]+['"]/, `image: '${r.img}'`);
      count++;
    }
  }
}

fs.writeFileSync('src/lib/data.js', lines.join('\n'));
console.log('Fixed ' + count + ' occurrences to use the newly uploaded White Flare images.');
