const https = require('https');

https.get('https://omotenashitcg.com/collections/onepiece-booster-box', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    const matches = html.match(/<img[^>]+src="(\/\/[^">]+cdn\.shopify\.com\/s\/files\/[^">]+)"/g);
    if(matches) {
       matches.forEach(m => {
           let src = m.match(/src="(\/\/[^">]+)"/)[1];
           console.log("https:" + src);
       });
    } else {
       console.log('No matches');
    }
  });
}).on('error', console.error);
