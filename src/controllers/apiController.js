// src/controllers/apiController.js
import { Categoria, Productos } from '../models/index.js'
import path from 'path'

// 🔹 Obtener todos los productos
export const apiGetProductos = async (req, res) => {
    try {
        const productos = await Productos.findAll({
            include: [{
                model: Categoria,
                as: 'categoria'
            }],
            order: [['id', 'ASC']]
        });

        res.json({
            status: 'success',
            message: 'Productos obtenidos',
            data: productos
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            data: null
        });
    }
};

// 🔹 Obtener producto por ID
export const apiGetProductoById = async (req, res) => {
    try {
        const producto = await Productos.findByPk(req.params.id, {
            include: [{
                model: Categoria,
                as: 'categoria'
            }]
        });

        if (!producto) {
            return res.status(404).json({
                status: 'error',
                message: 'Producto no encontrado',
                data: null
            });
        }

        res.json({
            status: 'success',
            message: 'Producto encontrado',
            data: producto
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            data: null
        });
    }
};

// 🔹 Crear producto
export const apiCreateProducto = async (req, res) => {
    try {
        const { nombre, precio, CategoriaId, descripcion } = req.body;

        if (!nombre || !precio || isNaN(precio)) {
            return res.status(400).json({
                status: 'error',
                message: 'nombre y precio válido son obligatorios',
                data: null
            });
        }

        const nuevo = await Productos.create({
            nombre,
            precio,
            CategoriaId,
            descripcion
        });

        res.status(201).json({
            status: 'success',
            message: 'Producto creado',
            data: nuevo
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            data: null
        });
    }
};

// 🔹 Actualizar producto
export const apiUpdateProducto = async (req, res) => {
    try {
        const { nombre, precio, CategoriaId, descripcion } = req.body;

        const [updated] = await Productos.update(
            { nombre, precio, CategoriaId, descripcion },
            { where: { id: req.params.id } }
        );

        if (!updated) {
            return res.status(404).json({
                status: 'error',
                message: 'Producto no encontrado',
                data: null
            });
        }

        const productoActualizado = await Productos.findByPk(req.params.id);

        res.json({
            status: 'success',
            message: 'Producto actualizado',
            data: productoActualizado
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            data: null
        });
    }
};

// 🔹 Eliminar producto
export const apiDeleteProducto = async (req, res) => {
    try {
        const deleted = await Productos.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) {
            return res.status(404).json({
                status: 'error',
                message: 'Producto no encontrado',
                data: null
            });
        }

        res.json({
            status: 'success',
            message: 'Producto eliminado',
            data: null
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            data: null
        });
    }
};

// 🔹 Subida de archivos
export const apiUpload = (req, res) => {
    if (!req.files || !req.files.imagen) {
        return res.status(400).json({
            status: 'error',
            message: 'No se subió ningún archivo',
            data: null
        });
    }

    const archivo = req.files.imagen;

    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];

    if (!tiposPermitidos.includes(archivo.mimetype)) {
        return res.status(400).json({
            status: 'error',
            message: 'Solo se permiten imágenes JPG, PNG o WEBP',
            data: null
        });
    }

    const nombreFinal = `${Date.now()}${path.extname(archivo.name)}`;
    const rutaDestino = path.join(process.cwd(), 'src/public/img/productos', nombreFinal);

    archivo.mv(rutaDestino, (err) => {
        if (err) {
            return res.status(500).json({
                status: 'error',
                message: err.message,
                data: null
            });
        }

        res.json({
            status: 'success',
            message: 'Archivo subido correctamente',
            data: { archivo: nombreFinal }
        });
    });
};

// 🔹 Obtener categorías
export const apiGetCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll();

        res.json({
            status: 'success',
            message: 'Categorías obtenidas',
            data: categorias
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            data: null
        });
    }
};

// 🔹 Crear categoría
export const apiCreateCategoria = async (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                status: 'error',
                message: 'nombre es obligatorio',
                data: null
            });
        }

        const nueva = await Categoria.create({ nombre });

        res.status(201).json({
            status: 'success',
            message: 'Categoría creada',
            data: nueva
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            data: null
        });
    }
};