import express from 'express';
import cors from 'cors';
import { z } from 'zod';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { upload } from './lib/multer';

import * as dotenv from 'dotenv';
dotenv.config();

const server = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

server.use('/images', express.static(resolve(__dirname, '..', 'uploads')));
server.use(express.json());
server.use(cors());

server.post('/api/upload', upload.single('file'), async (req, res) => {
  const fileSchema = z.object({
    filename: z.string(),
    mimetype: z.string(),
  });

  try {
    const file = fileSchema.parse(req.file);

    if (!file) throw new Error('No file found.');

    return res.status(200).json({
      message: 'Successful upload.',
      imageUrl: `${process.env.STATIC_FILES_PATH}/${file.filename}`,
    });
  }
  catch (err) {
    console.log(err);

    if (err instanceof Error) return res.status(400).json({
      error: err.message
    });
  }
});

server.listen(process.env.PORT || 3333, () => {
  console.log(`✨ Server is running on port ${process.env.PORT || 3333}`);
});
