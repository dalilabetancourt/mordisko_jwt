import Categoria from "./Categoria.js";
import Productos from "./Productos.js";
import User from './user.js'

//Relacion de tabla de de uno a muchos
Categoria.hasMany(Productos, { foreignKey: 'CategoriaId' });

//un producto pertenece a una sola categoria 
Productos.belongsTo(Categoria, { foreignKey: 'CategoriaId', as: 'categoria' });

export { Categoria, Productos, User };