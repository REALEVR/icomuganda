import fs from 'fs';
import path from 'path';

const pub = path.join(process.cwd(), 'public');
fs.copyFileSync(path.join(pub, 'img1.jpg'), path.join(pub, 'icom-logo.png'));
fs.copyFileSync(path.join(pub, 'img2.jpg'), path.join(pub, 'wava-logo.png'));
