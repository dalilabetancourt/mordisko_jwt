import { Categoria, Productos, User } from "../models/index.js"
import bcrypt from "bcryptjs";
import path from 'path';
import fs from 'fs/promises';
import jwt from 'jsonwebtoken';

// --- Autenticación ---
const getAuth = {
    showLogin: (req, res) => res.render('login'),
    showRegister: (req, res) => res.render('register'),
    
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await User.create({ email, password: hashedPassword });
            res.render('resultado', { mensaje: "Usuario registrado con éxito. ¡Inicia sesión!", esExito: true });
        } catch (error) {
            res.render('resultado', { mensaje: 'Error al registrarse', esExito: false });
        }
    },

    loginPost: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email }, raw: true });

            if (!user) {
                if (req.headers['content-type']?.includes('application/json')) {
                    return res.status(401).json({ status: 'error', message: 'Credenciales incorrectas', data: null });
                }
                return res.render('resultado', { mensaje: "Credenciales incorrectas", esExito: false });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET || 'palabra_secreta_provisional',
                    { expiresIn: '5m' }
                );

                res.cookie('token', token, { httpOnly: true });

                if (req.headers['content-type']?.includes('application/json')) {
                    return res.json({ status: 'success', message: 'Login exitoso', data: { token } });
                }
                return res.redirect('/');
            }

            if (req.headers['content-type']?.includes('application/json')) {
                return res.status(401).json({ status: 'error', message: 'Credenciales incorrectas', data: null });
            }
            res.render('resultado', { mensaje: 'Credenciales incorrectas', esExito: false });

        } catch (error) {
            console.error("Error en loginPost:", error);
            res.status(500).json({ status: 'error', message: 'Error del servidor', data: null });
        }
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.redirect('/login');
    }
};

// --- Middleware JWT ---
const eStaloguado = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect('/login');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'palabra_secreta_provisional');
        req.user = decoded;
        next();
    } catch (error) {
        res.clearCookie('token');
        res.redirect('/login');
    }
};

// --- Productos ---
const home = async (req, res) => {
    try {
        const productosData = await Productos.findAll();
        const productos = productosData.map(p => p.get({ plain: true }));
        res.render('home', { products: productos });
    } catch (error) {
        console.error("ERROR CRÍTICO EN HOME:", error);
        res.status(500).send(`Error interno: ${error.message}`);
    }
}

const getFormProducto = async (req, res) => {
    const categorias = await Categoria.findAll({ raw: true });
    res.render('formProducto', { categorias });
};

const saveProducto = async (req, res) => {
    try {
        const { nombre, precio, CategoriaId, descripcion } = req.body;
        let nombreImagenFinal = null;

        if (req.files && req.files.imagen) {
            const archivo = req.files.imagen;
            const timestamp = Date.now();
            nombreImagenFinal = `${timestamp}${path.extname(archivo.name)}`;
            const rutaDestino = path.join(process.cwd(), 'src/public/img/productos', nombreImagenFinal);
            await archivo.mv(rutaDestino);
        }

        await Productos.create({
            nombre,
            precio,
            CategoriaId,
            descripcion,
            imagen: nombreImagenFinal
        });

        res.redirect('/');
    } catch (error) {
        console.error("ERROR AL GUARDAR:", error);
        res.status(500).send('Error al guardar el producto');
    }
};

const getFormEditarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Productos.findByPk(id, { raw: true });
        const categorias = await Categoria.findAll({ raw: true });
        res.render('formEditar', { producto, categorias });
    } catch (error) {
        console.error('Error al cargar formulario de edición', error);
        res.status(500).send('Error al cargar formulario de edición');
    }
};

const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, CategoriaId } = req.body;
        const productoActual = await Productos.findByPk(id);

        let nombreImagenFinal = productoActual.imagen;

        if (req.files && req.files.imagen) {
            const archivo = req.files.imagen;
            const timestamp = Date.now();
            nombreImagenFinal = `${timestamp}${path.extname(archivo.name)}`;
            const rutaNueva = path.join(process.cwd(), 'src/public/img/productos', nombreImagenFinal);
            await archivo.mv(rutaNueva);

            if (productoActual.imagen) {
                const rutaVieja = path.join(process.cwd(), 'src/public/img/productos', productoActual.imagen);
                await fs.unlink(rutaVieja).catch(() => console.log("La imagen vieja no existía físicamente"));
            }
        }

        await Productos.update(
            { nombre, descripcion, precio, CategoriaId, imagen: nombreImagenFinal },
            { where: { id } }
        );
        res.redirect('/');
    } catch (error) {
        console.error("ERROR AL ACTUALIZAR:", error);
        res.status(500).send('Error al editar el producto');
    }
};

const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Productos.findByPk(id);

        if (producto.imagen) {
            const rutaImagen = path.join(process.cwd(), 'src/public/img/productos', producto.imagen);
            await fs.unlink(rutaImagen).catch(() => {});
        }

        await Productos.destroy({ where: { id } });
        res.redirect('/');
    } catch (error) {
        res.status(500).send('Error al eliminar');
    }
};

// --- Categorías ---
const getFormCategoria = async (req, res) => {
    try {
        res.render('formCategoria')
    } catch (error) {
        console.error('Error al cargar el formulario de categorias', error);
        res.status(500).send('Error al cargar el formulario de categorias');
    }
}

const saveCategoria = async (req, res) => {
    try {
        const { nombre } = req.body
        await Categoria.create({ nombre })
        res.redirect('/crear-producto')
    } catch (error) {
        console.error('Error al guardar categoria', error);
        res.status(500).send('Error al guardar categoria')
    }
}

export {
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
}