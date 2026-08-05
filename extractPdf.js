const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('TCG SHOP KAGAMI JAPAN.pdf.pdf');

pdf(dataBuffer).then(function(data) {
  console.log('=== PDF TEXT START ===');
  console.log(data.text);
  console.log('=== PDF TEXT END ===');
  console.log('Total pages:', data.numpages);
}).catch(err => {
  console.error('Error:', err.message);
});
