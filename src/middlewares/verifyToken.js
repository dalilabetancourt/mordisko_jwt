// src/middlewares/verifyToken.js
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ status: 'error', message: 'Token requerido', data: null });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'palabra_secreta_provisional');
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ status: 'error', message: 'Token inválido o expirado', data: null });
    }
}