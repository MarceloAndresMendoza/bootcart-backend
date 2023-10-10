// ====================================================
// User management routes
// Author: Marcelo Mendoza
// Created: 2023-08-27
// Description: This file contains the routes for the
//              user management: login, signup, etc.
// ====================================================

import express from 'express';
const router = express.Router();
import { getAllUsers, getUserProfile, login, signUp, verifyUser } from '../controllers/users.controller.js';
import { authRequire, adminAuthRequire } from '../middleware/auth.middleware.js';

router.get('/usermanage', adminAuthRequire, getAllUsers );  // ADMIN AUTH
router.get('/verify-token', authRequire, verifyUser ); // USER AUTH
router.post('/signup', signUp ); // NO AUTH
router.post('/login', login ); // NO AUTH
router.get('/userprofile', authRequire, getUserProfile ); // user profile, USER AUTH

export default router