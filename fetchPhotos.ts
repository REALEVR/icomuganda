import https from 'https';
import fs from 'fs';
import path from 'path';

function getPhotosLink(url: string): Promise<string> {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (res2) => {
            let data = '';
            res2.on('data', chunk => data += chunk);
            res2.on('end', () => resolve(data));
        });
      } else {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      }
    });
  });
}

async function run() {
  const data1 = await getPhotosLink('https://photos.app.goo.gl/grBc8CJkW8xttkELA');
  let links1 = Array.from(new Set([...data1.matchAll(/"(https:\/\/lh3\.googleusercontent\.com\/pw\/[^"]+)"/g)].map(m => m[1])));
  
  const data2 = await getPhotosLink('https://photos.app.goo.gl/49ybK7ja2KGTT9PU7');
  let links2 = Array.from(new Set([...data2.matchAll(/"(https:\/\/lh3\.googleusercontent\.com\/pw\/[^"]+)"/g)].map(m => m[1])));

  const allLinks = [...links1, ...links2].map(link => {
      // Remove sizing parameters if present or set a generic one
      return link.split('=')[0]; 
  });

  const uniqueLinks = Array.from(new Set(allLinks));

  fs.mkdirSync(path.join(process.cwd(), 'src', 'data'), { recursive: true });
  fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'photos.json'), JSON.stringify(uniqueLinks, null, 2));

  console.log(`Saved ${uniqueLinks.length} photos!`);
}
run();
