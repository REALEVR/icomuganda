import fs from 'fs';
import path from 'path';

const files = [
  { id: '1OtOX-9MzEL1DNJEgBICN01y-nNYb4zWK', name: 'ateker-logo.jpg' },
  { id: '1IFVJoYnX2CF4BtQFZueWkVgjyhZn4p_J', name: 'img1.jpg' },
  { id: '1z4chqU6_0yunpiSeQpp3Vu6RfpFgQkqy', name: 'img2.jpg' }
];

const publicDir = path.join(process.cwd(), 'public');

async function run() {
  for (const f of files) {
    console.log('Downloading', f.name);
    const url = `https://drive.google.com/uc?export=download&id=${f.id}`;
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(path.join(publicDir, f.name), Buffer.from(buffer));
    console.log('Saved', f.name);
  }
}
run().catch(console.error);
