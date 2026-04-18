# 🍦 Mordisko App

Aplicación web desarrollada con Node.js y Express que simula la gestión de una heladería. Permite crear categorías, registrar productos mediante formularios y visualizar la información de forma dinámica en una interfaz renderizada con Handlebars.

---

## 🚀 Objetivo del proyecto

Desarrollar una aplicación web funcional que permita:

- Crear categorías de productos  
- Registrar productos asociados a una categoría  
- Mostrar los productos en una vista principal  
- Renderizar contenido dinámico utilizando un motor de plantillas  

Este proyecto forma parte del desarrollo progresivo del módulo 7, enfocado en estructura backend, renderizado dinámico y operaciones CRUD básicas.

---

## 🧠 Tecnologías utilizadas

- Node.js  
- Express  
- Handlebars (motor de plantillas)  
- HTML5  
- CSS3  

---

## 🧩 Funcionalidades

- 📂 Creación de categorías  
- 🍨 Creación de productos con detalle (nombre, descripción, precio, etc.)  
- 🔄 Renderizado dinámico de productos en la página principal  
- 🧾 Formularios para ingreso de datos  
- 🧱 Estructura modular de rutas y vistas  

---

## 🗂️ Estructura del proyecto

    mordisko-app/
    │
    ├── public/
    │   └── css/
    │       └── style.css
    │
    ├── config/
    │   └── db.js
    │
    ├── models/
    │   ├── categoria.js
    │   ├── index.js
    │   └── productos.js
    │
    ├── controller/
    │   └── mordiskoController.js
    │
    ├── views/
    │   ├── layouts/
    │   │   └── main.hbs
    │   ├── home.hbs
    │   ├── formEditar.hbs
    │   ├── formCategoria.hbs
    │   └── formProductos.hbs
    │
    ├── routes/
    │   └── (rutas del proyecto)
    │
    ├── index.js
    │
    └── package.json



---

## ⚙️ Instalación y uso

1. Clonar el repositorio:

```bash
git clone https://github.com/dalilabetancourt/mordisko-

Instalar dependencias:

npm install

Ejecutar el proyecto:

npm run dev

o

npm start

Abrir en el navegador:

http://localhost:3000