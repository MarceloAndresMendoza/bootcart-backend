import express from 'express';
const router = express.Router();
import { checkLoginToken } from '../utils/testToken.js';
import { authRequire, adminAuthRequire } from '../middleware/auth.middleware.js';
import { checkDBConnection, checkNodeMailerServer, checkSunbeamServer, db } from '../config/config.js';

router.get('/checklogin', authRequire, checkLoginToken ); // ANY AUTH
router.get('/dbstatus', checkDBConnection);
router.get('/nodemailerstatus', checkNodeMailerServer);
router.get('/fileserverstatus', checkSunbeamServer);
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is working normally!' });
});

export default router