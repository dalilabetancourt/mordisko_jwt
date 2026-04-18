import Categoria from "./Categoria.js";
import Productos from "./Productos.js";
import User from './user.js'

//Relacion de tabla de de uno a muchos
Categoria.hasMany(Productos, { foreignKey: 'categoriaId' })

//un producto pertenece a una sola categoria 
Productos.belongsTo(Categoria, { foreignKey: 'categoriaId' });

export { Categoria, Productos, User };