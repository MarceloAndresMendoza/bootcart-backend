import express from 'express';
const router = express.Router();
import { getAllUsers, getUserProfile, login, signUp } from '../controllers/users.controller.js';
import { authRequire, adminAuthRequire } from '../middleware/auth.middleware.js';

router.get('/usermanage', adminAuthRequire, getAllUsers );  // ADMIN AUTH
router.post('/signup', signUp ); // NO AUTH
router.post('/login', login ); // NO AUTH
router.get('/userprofile', authRequire, getUserProfile ); // user profile, USER AUTH

export default router