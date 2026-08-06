const fs = require('fs');
let data = fs.readFileSync('src/lib/data.js', 'utf8');

const replacements = [
  { search: 'Storm Emerard (M6)', img: '/images/pokemon/Storm Emarard (M6).jpg' },
  { search: 'Gengar Starter Set', img: '/images/pokemon/Gender Starter set.jpg' },
  { search: 'Black Volt Deluxe(SV11B)', img: '/images/pokemon/Black Volt Deleuxe (SV11B).jpg' },
  { search: 'White Flare Deluxe(SV11W)', img: '/images/pokemon/White Flare Deluexe(SV11W).jpg' },
  { search: 'Paradise Dragona(SV7a)', img: '/images/pokemon/Paradise Ⅾragona（SV7a).jpg' },
  { search: 'Shiny Treasure(SV4a)', img: '/images/pokemon/Shiny Treasure (SW4a).jpg' }
];

let lines = data.split('\n');
let count = 0;

for (let i = 0; i < lines.length; i++) {
  for (let r of replacements) {
    if (lines[i].includes("name: '" + r.search + "'") || lines[i].includes('name: "' + r.search + '"')) {
      // replace the image url
      lines[i] = lines[i].replace(/image:\s*['"][^'"]+['"]/, `image: '${r.img}'`);
      count++;
    }
  }
}

fs.writeFileSync('src/lib/data.js', lines.join('\n'));
console.log('Replaced ' + count + ' occurrences.');
