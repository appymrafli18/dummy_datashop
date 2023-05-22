import express from 'express';
import { getProduct, getProductByCategory, getProductById, getProductByName, postProduct, updatingProduct } from '../controllers/ProductControllers.js';
import multer from 'multer';

const router = express.Router();

// Create Storage Images
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },

  filename: (req, file, cb) => {
    const uniqueFile = new Date().getTime();
    cb(null, `${uniqueFile}-${file.originalname}`);
  },
});

// Filterisasi File Images
const filterFile = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: fileStorage, fileFilter: filterFile });

router.get('/product', getProduct);
router.get('/product/category', getProductByCategory);
router.get('/product/name', getProductByName);
router.get('/product/:id', getProductById);
router.post('/product', upload.single('images' /* name db */), postProduct);
router.patch('/product/:id', updatingProduct);

export default router;
