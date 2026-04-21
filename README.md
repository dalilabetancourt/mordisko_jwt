
![Login](/src/public/img/local/mordisko_foto.png)

![Login](/src/public/img/local/mordisko_foto_2.png)

# 🧠 API REST - Mordisko Backend

API RESTful desarrollada con Node.js y Express para la gestión de productos y categorías en una tienda digital.
Incluye autenticación con JWT, control de acceso, operaciones CRUD completas y subida de archivos.

---

# 🚀 Tecnologías utilizadas

* Node.js
* Express.js
* Sequelize (ORM)
* PostgreSQL
* JSON Web Tokens (JWT)
* Express File Upload

---

# 📦 Instalación

1. Clonar repositorio:

```bash
git clone https://github.com/dalilabetancourt/mordisko_jwt.git
cd mordisko_jwt
```

2. Instalar dependencias:

```bash
npm install
```

3. Configurar variables de entorno:

Crear archivo `.env`:

```env
PORT=4007
DB_NAME=tu_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password
JWT_SECRET=tu_secreto
```

4. Ejecutar servidor:

```bash
npm run dev
```

Servidor corriendo en:

```
http://localhost:4007
```

---

# 🔐 Autenticación

La API utiliza JWT para proteger rutas privadas.

## Login

```http
POST /api/login
```

Body:

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

Respuesta:

```json
{
  "status": "success",
  "data": {
    "token": "..."
  }
}
```

---

# 🔑 Uso del Token

En endpoints protegidos:

**Headers:**

```http
Authorization: Bearer TU_TOKEN
```

---

# 🌐 Endpoints

## 🔓 Públicos

| Método | Endpoint           | Descripción             |
| ------ | ------------------ | ----------------------- |
| GET    | /api/productos     | Obtener productos       |
| GET    | /api/productos/:id | Obtener producto por ID |
| GET    | /api/categorias    | Obtener categorías      |

---

## 🔐 Privados (requieren token)

| Método | Endpoint           | Descripción       |
| ------ | ------------------ | ----------------- |
| POST   | /api/productos     | Crear producto    |
| PUT    | /api/productos/:id | Editar producto   |
| DELETE | /api/productos/:id | Eliminar producto |
| POST   | /api/categorias    | Crear categoría   |

---

# 🧪 Pruebas con Postman

![Antes](/src/public/img/local/login_postma_html.png)
![Despues](/src/public/img/local/login_postman_json.png)


📸
![Antes](/src/public/img/local/postman_producto_.png)
![Despues](/src/public/img/local/postman_productos_.png)
![por id:](/src/public/img/local/postan_producto_id.png)
---

# 📁 Subida de archivos

```http
POST /api/upload
```

* Permite subir imágenes de productos
* Valida tipo: JPG, PNG, WEBP
* Guarda en carpeta `/public/img/productos`

---

# 🧠 Arquitectura

La aplicación sigue una arquitectura modular:

* Routes → definen endpoints
* Controllers → lógica de negocio
* Models → interacción con base de datos
* Middlewares → autenticación y validación

---

# 🔒 Seguridad

* Autenticación mediante JWT
* Protección de rutas sensibles
* Validación de datos en endpoints
* Control de acceso por usuario autenticado

---

# 🎯 Conclusión

Este proyecto implementa una API RESTful completa que:

* Gestiona productos y categorías
* Controla acceso mediante autenticación
* Permite operaciones CRUD
* Maneja subida de archivos
* Sigue buenas prácticas de desarrollo backend

---

# 👩‍💻 Autor

Dalila Betancourt
Proyecto académico - Desarrollo Backend con Node.js

---
