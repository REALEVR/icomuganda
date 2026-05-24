import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

async function testThumb() {
  const url = `https://drive.google.com/thumbnail?id=1GQsazHuMtHhjPm06RE-xa7ZYPdYNsEUG&sz=w800-h800`;
  const res = await fetch(url);
  console.log(res.status, res.headers.get('content-type'));
}
testThumb();
