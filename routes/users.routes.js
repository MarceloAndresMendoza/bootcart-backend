import express from 'express';
const router = express.Router();
import { getAllUsers, getUserProfile, login, signUp } from '../controllers/users.controller.js';
import { authRequire, adminAuthRequire } from '../middleware/auth.middleware.js';

router.get('/user', adminAuthRequire, getAllUsers );  // ADMIN AUTH
router.post('/signup', signUp ); // NO AUTH
router.post('/login', login ); // NO AUTH
router.get('/user/:id', authRequire, getUserProfile ); // user profile, USER AUTH

export default router