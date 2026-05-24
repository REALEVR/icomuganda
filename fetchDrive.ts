import https from 'https';

const url = 'https://drive.google.com/drive/folders/1ecJww8atknlg7B7bsVMECa_edTQsHoM1?usp=drive_link';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // search for IDs
    const regex = /\["([^"]+)",\]/g; 
    // Just dump all string literals that look like Google Drive IDs (usually 33 chars of alphanumeric, dashes, underscores)
    const matches = data.match(/"[a-zA-Z0-9_-]{33}"/g);
    console.log("Found matches:", [ ...new Set(matches) ]);
  });
}).on('error', console.error);
