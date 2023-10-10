// ====================================================
// Auth Middleware
// Author: Marcelo Mendoza
// Created: 2023-10-10
// Description: This middleware handles the authentication
//              of the API calls.
// ====================================================

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const AUTH_TIMEOUT = process.env.AUTH_TIMEOUT;
const SECRET_KEY = process.env.SECRET_KEY;

export const authRequire = (req, res, next) => {
    // ================================
    // User authentication
    // ================================
    try {
        const apiKey = req.headers['x-access-token'];
        const decoded = jwt.verify(apiKey, SECRET_KEY);
        const actualTime = (new Date() / AUTH_TIMEOUT)
        if (actualTime > decoded.exp) {
            return res.status(401).json({message: 'Expired Token. Login again.'})
        }
        req.data = decoded.data;
    } catch (error) {
        return res.status(401).json({error: error})
    }
    next();
}

export const adminAuthRequire = (req, res, next) => {
    // ================================
    // Admin authentication
    // ================================
    try {
        const apiKey = req.headers['x-access-token'];
        const decoded = jwt.verify(apiKey, SECRET_KEY);
        const actualTime = Math.floor(new Date().getTime() / AUTH_TIMEOUT);

        if (actualTime > decoded.exp) {
            return res.status(401).json({ message: 'Expired Token. Login again.' });
        }
        req.userData = decoded.data;
        // Check if the user has the "admin" role
        if (req.userData.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Only admins can access this resource.' });
        }
    } catch (error) {
        return res.status(401).json(error);
    }
    next();
};
