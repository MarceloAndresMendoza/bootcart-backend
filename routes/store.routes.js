import express from 'express';
const router = express.Router();
import { getAllProducts, addProduct } from '../controllers/store.controller.js';

router.get('/products', getAllProducts ); // NOT LOGGED
router.post('/products', addProduct ); // ADMIN AUTH

export default router