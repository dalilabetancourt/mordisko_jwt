import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("users", {
    // ATRIBUTOS (Columnas de la tabla)
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
}, {
    // OPCIONES DEL MODELO (Aquí es donde va timestamps)
    timestamps: true 
});

export default User;