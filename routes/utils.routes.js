import express from 'express';
const router = express.Router();
import { checkLoginToken } from '../utils/testToken.js';
import { authRequire, adminAuthRequire } from '../middleware/auth.middleware.js';

router.get('/checklogin', authRequire, checkLoginToken ); // ANY AUTH

export default router