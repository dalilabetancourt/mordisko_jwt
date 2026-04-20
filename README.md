# 🍦 Mordisko App

Aplicación web de gestión de heladería desarrollada con Node.js y Express.
Incluye una API RESTful con autenticación JWT, subida de archivos y CRUD completo
sobre productos y categorías.

---

## 🚀 Tecnologías utilizadas

- Node.js (v18+)
- Express.js
- Sequelize ORM + PostgreSQL
- JSON Web Tokens (JWT)
- bcryptjs
- express-fileupload
- Handlebars (vistas web)

---

## ⚙️ Instalación y uso

Clonar el repositorio:
```bash
git clone https://github.com/dalilabetancourt/tienda_mordisko
cd tienda_mordisko
```
---

## 🗂️ Estructura del proyecto
src/
├── config/
│   └── db.js
├── controllers/
│   ├── apiController.js
│   └── mordiskoController.js
├── middlewares/
│   └── verifyToken.js
├── models/
│   ├── Categoria.js
│   ├── Productos.js
│   ├── index.js
│   └── user.js
├── routes/
│   ├── apiRoutes.js
│   └── mordiskoRoutes.js
├── views/
│   ├── layouts/
│   └── *.hbs
└── index.js
