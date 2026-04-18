import express from 'express'
import {
    home,
    getFormCategoria,
    saveCategoria,
    getFormProducto,
    saveProducto,
    deleteProducto,
    getFormEditarProducto,
    updateProducto,
    auth
} from '../controllers/mordiskoController.js'

const router = express.Router()

router.get('/', home)

//login
router.get('/login', auth)


// categorias
router.get('/crear-categoria', getFormCategoria)
router.post('/crear-categoria', saveCategoria)

// productos
router.get('/crear-producto', getFormProducto)
router.post('/crear-producto', saveProducto)

//editar producto
router.get('/editar-producto/:id', getFormEditarProducto)
router.post('/editar-producto/:id', updateProducto)

//eliminar producto
router.post('/eliminar-producto/:id', deleteProducto)

export default router