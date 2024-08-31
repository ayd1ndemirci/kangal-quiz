import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  const { image } = req.query;
  const filePath = path.join(process.cwd(), 'src/app/images', image);

  try {
    const imageFile = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    
    const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.status(200).send(imageFile);
  } catch (error) {
    console.error('Error reading image file:', error); 
    res.status(404).json({ error: 'Image not found' });
  }
}
