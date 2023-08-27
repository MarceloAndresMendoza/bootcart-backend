import express from 'express';
const router = express.Router();
import { getAllProducts, addProduct } from '../controllers/store.controller.js';

router.get('/products', getAllProducts ); 
router.post('/products', addProduct );

export default router