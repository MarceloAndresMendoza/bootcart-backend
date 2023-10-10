// ====================================================
// Store Routes
// Author: Marcelo Mendoza
// Created: 2023-08-27
// Description: This file contains the routes for the
//              store: products, categories, etc.
// ====================================================

import express from 'express';
const router = express.Router();
import { getAllProducts, addProduct } from '../controllers/store.controller.js';
import { authRequire } from '../middleware/auth.middleware.js';

router.get('/products', getAllProducts ); // NOT LOGGED
router.post('/products', authRequire, addProduct ); // ADMIN AUTH

export default router