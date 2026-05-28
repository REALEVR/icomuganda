import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function identify(filename: string) {
  const data = fs.readFileSync(filename);
  const ext = filename.split('.').pop();
  const mimeType = ext === 'png' ? 'image/png' : ext === 'jpeg' || ext === 'jpg' ? 'image/jpeg' : 'image/webp';
  let retries = 3;
  while(retries > 0) {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{ inlineData: { data: data.toString('base64'), mimeType } }, 'A short 2-5 word description of this item. e.g. "White t-shirt", "Black t-shirt", "Wooden keychain", "Metallic keychain", "Blue thermoflask"']
        });
        console.log(filename, ':', response.text.trim());
        break;
    } catch(e) {
        retries--;
        if(retries===0) console.log(filename, 'error');
    }
  }
}

async function run() {
  const files = [
    'public/regenerated_image_1779520019250.png',
    'public/regenerated_image_1779520019848.webp',
    'public/regenerated_image_1779520020344.png',
    'public/regenerated_image_1779520026822.png',
    'public/regenerated_image_1779520029728.png',
    'public/regenerated_image_1779520031117.webp',
    'public/regenerated_image_1779520895698.png',
    'public/regenerated_image_1779520895163.webp'
  ];
  for (const f of files) {
    if (fs.existsSync(f)) {
        await identify(f);
    }
  }
}
run();
