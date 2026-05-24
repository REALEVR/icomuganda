import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function identify(filename: string) {
  const data = fs.readFileSync(filename);
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: [
      { inlineData: { data: data.toString('base64'), mimeType: 'image/jpeg' } },
      'What text is in this image?'
    ]
  });
  console.log(filename, ':', response.text);
}

async function run() {
  await identify('./public/ateker-logo.jpg');
  await identify('./public/img1.jpg');
  await identify('./public/img2.jpg');
}
run();
