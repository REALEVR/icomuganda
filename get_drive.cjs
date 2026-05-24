const https = require('https');
const url = 'https://drive.google.com/drive/folders/1DTFcQy8Eq7NiIP8dEHYVxkU7f1j_g-kY';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const matches = data.match(/href="\/file\/d\/([a-zA-Z0-9_-]+)/g) || data.match(/"([a-zA-Z0-9_-]{33})"/g);
    console.log("Found matches:", [...new Set(matches)]);
  });
}).on('error', console.error);
