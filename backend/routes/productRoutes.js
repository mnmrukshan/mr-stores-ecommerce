import express from 'express';
const router = express.Router();
import { getProducts, createProduct, deleteProduct } from '../controllers/productController.js';

router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/:id', deleteProduct);

export default router;
