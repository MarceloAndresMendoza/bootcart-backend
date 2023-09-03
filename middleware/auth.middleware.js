import jwt from 'jsonwebtoken';

export const authRequire = (req, res, next) => {
    try {
        const { xaccesstoken } = req.headers;
        const decoded = jwt.verify(xaccesstoken, process.env.SECRET_KEY);
        const actualTime = (new Date()/1000)
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
    try {
        const { xaccesstoken } = req.headers;
        const decoded = jwt.verify(xaccesstoken, process.env.SECRET_KEY);
        const actualTime = Math.floor(new Date().getTime() / 1000); // Use Math.floor to ensure an integer value

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
