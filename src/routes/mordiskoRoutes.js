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
   getAuth,
   eStaloguado
} from '../controllers/mordiskoController.js'

const router = express.Router()

router.get('/', home)

/// RUTAS DE AUTENTICACIÓN
router.get('/login', getAuth.showLogin);      // Muestra el login
router.post('/login', getAuth.loginPost);     // Procesa el login

router.get('/register', getAuth.showRegister); // Muestra el registro (nuvo usuario)
router.post('/register', getAuth.register);   // Procesa el registro

// Ruta para cerrar sesión
router.get('/logout', getAuth.logout);

// categorias
router.get('/crear-categoria', eStaloguado, getFormCategoria)
router.post('/crear-categoria', eStaloguado, saveCategoria)

// productos
router.get('/crear-producto', eStaloguado, getFormProducto)
router.post('/crear-producto', eStaloguado, saveProducto)

//editar producto
router.get('/editar-producto/:id', eStaloguado, getFormEditarProducto)
router.post('/editar-producto/:id', eStaloguado, updateProducto)

//eliminar producto
router.post('/eliminar-producto/:id', deleteProducto)

export default router