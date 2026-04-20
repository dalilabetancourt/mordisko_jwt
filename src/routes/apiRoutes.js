import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import {
    apiGetProductos,
    apiGetProductoById,
    apiCreateProducto,
    apiUpdateProducto,
    apiDeleteProducto,
    apiUpload
} from '../controllers/apiController.js'
import { getAuth } from '../controllers/mordiskoController.js'  // ← de acá viene getAuth

const router = express.Router()

// Rutas públicas
router.get('/productos', apiGetProductos)
router.get('/productos/:id', apiGetProductoById)

// Rutas protegidas con JWT
router.post('/productos', verifyToken, apiCreateProducto)
router.put('/productos/:id', verifyToken, apiUpdateProducto)
router.delete('/productos/:id', verifyToken, apiDeleteProducto)
router.post('/upload', verifyToken, apiUpload)

// Autenticación
router.post('/auth/login', getAuth.loginPost)
router.post('/auth/register', getAuth.register)

export default router