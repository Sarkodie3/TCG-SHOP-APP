const fs = require('fs');

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

const files = [
  '25th Edition.jpg', '2nd Anniversary.jpg', '3rd Anniversary.jpg', '3rd Captain Promo.jpg', 'base shop.jpg', 'EB-01.jpg', 'EB-02.jpg', 'EB-03.jpg', 'EB-04.jpg', 'Kumamoto.jpg', 'Magazine.jpg', 'One Piece Day 24.jpg', 'One Piece day 25.jpg', 'OP-01.jpg', 'OP-02.jpg', 'OP-03.jpg', 'OP-04.jpg', 'OP-05.jpg', 'OP-06.jpg', 'OP-07.jpg', 'OP-08.jpg', 'OP-09.jpg', 'OP-10.jpg', 'OP-11.jpg', 'OP-12.jpg', 'OP-13.jpg', 'OP-14.jpg', 'OP-15.jpg', 'OP-16.jpg', 'OP-17.jpg', 'PRB-01.jpg', 'PRB-02.jpg'
];

let data = fs.readFileSync('src/lib/data.js', 'utf8');
let lines = data.split('\n');
let replaced = 0;

files.forEach(f => {
  const baseName = f.replace(/\.[^/.]+$/, '');
  const normKey = normalize(baseName);
  
  for (let i = 0; i < lines.length; i++) {
    // Look for name: "something" or name: 'something'
    const match = lines[i].match(/name:\s*(['"])(.+?)\1/);
    if (match) {
      const name = match[2];
      const normName = normalize(name);
      
      if (normName.includes(normKey) || (normKey.length > 3 && name.toLowerCase().includes(baseName.toLowerCase()))) {
        // Find the image field for this product (usually within next 10 lines)
        for (let j = i; j <= Math.min(i + 15, lines.length - 1); j++) {
          if (lines[j].includes('image:')) {
            // Replace the image url
            lines[j] = lines[j].replace(/image:\s*(['"])(.+?)\1/, `image: '/images/onepiece/${f}'`);
            replaced++;
            break;
          }
        }
      }
    }
  }
});

console.log(`Replaced ${replaced} images for one piece.`);
fs.writeFileSync('src/lib/data.js', lines.join('\n'));
