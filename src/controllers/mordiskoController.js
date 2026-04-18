import { raw } from "express"
import { Categoria, Productos, User } from "../models/index.js"
import bcrypt, { truncates } from "bcryptjs";

//registro

const getAuth = {
    showLogin: (req, res) => res.render('login'),
    showRegister: (req, res) => res.render('register'),
    
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await User.create({ email, password: hashedPassword });

            res.render('resultado', {
                mensaje: "Usuario registrado con éxito. ¡Inicia sesión!",
                esExito: true
            });
        } catch (error) {
            res.render('resultado', { mensaje: 'Error al registrarse', esExito: false });
        }
    },

    loginPost: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email }, raw: true });

            if (!user) {
                return res.render('resultado', { mensaje: "Credenciales incorrectas", esExito: false });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            
            if (isMatch) {
                req.session.user = { id: user.id, email: user.email };
                return res.redirect('/'); 
            } else {
                return res.render('resultado', { mensaje: 'Credenciales incorrectas', esExito: false });
            }
        } catch (error) {
            res.status(500).send('Error del servidor');
        }
    },

    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
};

// AGREGA ESTO AL FINAL DEL ARCHIVO PARA QUE TUS RUTAS LO ENCUENTREN
export const eStaloguado = (req, res, next) => {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect('/login');
};
//productos 
const home = async (req, res) => {
    try {
 const poductos = await Productos.findAll({ raw: true })
        res.render('home', { products: poductos })
       
    } catch (error) {
        console.log('Error al cargar pagina home', error)
        res.status(500).send('Error al cargar home')
    }
}


// formulario de categorias 
const getFormCategoria = async (req, res) => {
    try {
        res.render('formCategoria')
    } catch (error) {
        console.error('Error al cargar el formulario de categorias', error);
        res.status(500).send('Error al cargar el formulario de categorias');
        
    }
}
//guardar categorias
const saveCategoria = async (req, res) => {
    try {
        const { nombre } = req.body
        await Categoria.create({nombre})
        res.redirect('/crear-producto')
    } catch (error) {
        console.error('Error al guardar categoria', error);
        res.status(500).send('Error al guardar categiria')

    }
}



/// formulario para crear productos
const getFormProducto = async (req, res) => {
    try {
        const categorias = await Categoria.findAll({ raw: true })

        res.render('formProducto', {
            categorias
        })
    } catch (error) {
        console.error('Error al cargar formulario producto', error)
        res.status(500).send('Error al cargar formulario de productos')
    }
}
   //escuchar  el formullario de producto 
const saveProducto = async (req, res) => {
    try {
        const { nombre, precio, CategoriaId, descripcion } = req.body

        await Productos.create({
            nombre,
            precio,
            CategoriaId,
            descripcion
        })

        res.redirect('/')
    } catch (error) {
        console.error('Error al guardar producto', error)
        res.status(500).send('Error al gurdar producto')
    }
}

//editar producto
const getFormEditarProducto = async (req, res) => {
    try {
        const { id } = req.params
        const producto = await Productos.findByPk(id, { raw: true })
        const categorias = await Categoria.findAll({ raw: true })

        res.render('formEditar', {
            producto,
            categorias
        })
    } catch (error) {
        console.error('Error al cargar formulario de edición de producto', error)
        res.status(500).send('Error al cargar formulario de edición de producto')
    }
}
//guardar cambiosde producto editado
const updateProducto = async (req, res) => {
    const { id } = req.params
    const { nombre, descripcion, precio, CategoriaId } = req.body

    await Productos.update(
        { nombre, descripcion, precio, CategoriaId },
        { where: { id } }
    )

    res.redirect('/')
}

//eliminar producto 
const deleteProducto = async (req, res) => {
    const { id } = req.params

    await Productos.destroy({
        where: { id }
    })

    res.redirect('/')
}


export {
    home,
    getFormCategoria,
    saveCategoria ,
    getFormProducto,
    saveProducto,
    deleteProducto,
    getFormEditarProducto,
    updateProducto,
    getAuth
}