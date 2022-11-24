import multer from 'multer';
import crypto from 'crypto';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: resolve(__dirname, '..', '..', 'uploads'),
  filename: (req, file, callback) => {
    crypto.randomBytes(16, (err, hash) => {
      try {
        if (err) throw err;

        const fileName = `${hash.toString('hex')}-${file.originalname.replace(/\s+/g, '-')}`;
        callback(null, fileName);
      }
      catch (err) {
        console.error(err);
      }
    });
  }
});

export const upload = multer({
  storage: storage,
  fileFilter(req, file, callback) {
    if (!(/image/.test(file.mimetype))) return callback(new Error('Only images types are allowed.'));

    callback(null, true);
  }
});
