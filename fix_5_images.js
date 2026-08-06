const fs = require('fs');

const data = fs.readFileSync('src/lib/data.js', 'utf8');
const lines = data.split('\n');

const fixes = [
  { match: /name: 'Storm Emerard \\(M6\\)'/i, img: '/images/pokemon/Storm Emarard (M6).jpg' },
  { match: /name: 'Gengar Starter Set'/i, img: '/images/pokemon/Gender Starter set.jpg' },
  { match: /name: 'Black Volt Deluxe\\(SV11B\\)'/i, img: '/images/pokemon/Black Volt Deleuxe (SV11B).jpg' },
  { match: /name: 'White Flare Deluxe\\(SV11W\\)'/i, img: '/images/pokemon/White Flare Deluexe(SV11W).jpg' },
  { match: /name: 'Paradise Dragona\\(SV7a\\)'/i, img: '/images/pokemon/Paradise Ⅾragona（SV7a).jpg' },
  // Also check if they were added with double quotes
  { match: /name: "Storm Emerard \\(M6\\)"/i, img: '/images/pokemon/Storm Emarard (M6).jpg' },
  { match: /name: "Gengar Starter Set"/i, img: '/images/pokemon/Gender Starter set.jpg' },
  { match: /name: "Black Volt Deluxe\\(SV11B\\)"/i, img: '/images/pokemon/Black Volt Deleuxe (SV11B).jpg' },
  { match: /name: "White Flare Deluxe\\(SV11W\\)"/i, img: '/images/pokemon/White Flare Deluexe(SV11W).jpg' },
  { match: /name: "Paradise Dragona\\(SV7a\\)"/i, img: '/images/pokemon/Paradise Ⅾragona（SV7a).jpg' }
];

let updated = false;
for (let i = 0; i < lines.length; i++) {
  fixes.forEach(fix => {
    if (fix.match.test(lines[i])) {
      lines[i] = lines[i].replace(/image:\s*'[^']+'/, `image: '${fix.img}'`);
      lines[i] = lines[i].replace(/image:\s*"[^"]+"/, `image: '${fix.img}'`);
      updated = true;
    }
  });
}

if (updated) {
  fs.writeFileSync('src/lib/data.js', lines.join('\n'));
  console.log('Fixed images for the 5 products.');
} else {
  console.log('No matches found.');
}
