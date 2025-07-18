# 🛍️ EcoMystika Backend (cursoBackEnd2)

Este es el backend de **EcoMystika**, una aplicación de e-commerce construida con **Node.js**, **Express**, **MongoDB**, **JWT**, **BCrypt**, y **Handlebars**. Gestiona usuarios, productos, carritos de compras y generación de tickets.

---

## 🔧 Tecnologías Utilizadas

- **Node.js** & **Express**: Backend y rutas RESTful
- **MongoDB** & **Mongoose**: Base de datos NoSQL y ODM
- **JWT**: Autenticación mediante tokens
- **BCrypt**: Hasheo seguro de contraseñas
- **Handlebars**: Motor de plantillas para renderizado en el servidor
- **Nodemailer**: Envío de correos de recuperación
- **Passport.js**: Middleware de autenticación JWT

---

## 🚀 Instalación

```bash
git clone <https://github.com/NicoToledoJAVA/bak2.git>
cd bak2
npm install
```

## 🌐 Endpoints y Vistas

## 👤 Autenticación

| Endpoint                         | Método | Descripción                                |
|----------------------------------|--------|--------------------------------------------|
| `/api/sessions/login`           | POST   | Login con JWT y cookie                     |
| `/api/sessions/logout`          | POST   | Cierra sesión (borra cookie)               |
| `/api/sessions/current`         | GET    | Devuelve el usuario actual (requiere JWT)  |
| `/api/sessions/forgot-password` | POST   | Enviar link de recuperación                |
| `/api/sessions/reset-password`  | POST   | Setea nueva contraseña                     |

---

## 🔐 JWT

- Los tokens se entregan al iniciar sesión y se guardan como cookies (`httpOnly`)
- Se extraen con `cookieExtractor` y se verifican con `passport-jwt`
- El middleware `passport.authenticate("jwt")` se utiliza para proteger rutas
- Roles como `USER` y `ADMIN` se almacenan en el payload del token
- El frontend accede a rutas según el rol, y en caso contrario, se renderiza una vista `403-forbidden`

---

## 👤 Autenticación (Desarrollo)

### ✅ POST /api/sessions/login

Descripción: Inicia sesión. Devuelve un JWT y setea cookie de sesión.

Body (JSON):

```json
{
  "email": "usuario@ejemplo.com",
  "password": "tuContraseña"
}
```

Respuesta esperada:

```json
{
  "status": "success",
  "message": "Login exitoso",
  "token": "jwt_generado"
}
```
### 🔓 POST /api/sessions/logout

Descripción: Cierra la sesión del usuario. Elimina la cookie.

### 👤 POST /api/sessions/current

Descripción: Devuelve los datos del usuario autenticado.

Headers:

|     KEY:      |           VALUE:           |
|---------------|----------------------------|
|Authorization: |    Bearer <token_JWT>      |
|               |                            |

---

Respuesta esperada:

```json
{
  "user": {
    "first_name": "nombre",
    "last_name": "apellido",
    "email": "nombreapellido@dominio.com",
    "age": 99,
    "role": "USER"
  }
}
```

### 🔑 POST /api/sessions/forgot-password

Descripción: Envía un correo con un enlace para recuperar la contraseña.

Body (JSON):

```json
{
  "email": "usuario@ejemplo.com"
}
```

Respuesta esperada:

```json
{
  "status": "success",
  "message": "Correo de recuperación enviado"
}
```

### 🔁 POST /api/sessions/reset-password

Descripción: Cambia la contraseña usando el token recibido por correo.

Body (JSON):

```json
{
  "token": "token_de_recuperacion",
  "newPassword": "nuevaContraseñaSegura123"
}
```

Respuesta esperada (JSON o renderizado de vista):

```json
{
  "status": "success",
  "message": "Contraseña actualizada correctamente"
}
```
O puede redirigir a la vista de login con un mensaje.



## 🖼️ Vistas Renderizadas

| Ruta                             | Vista             | Descripción                                           |
|----------------------------------|-------------------|-------------------------------------------------------|
| `/`                              | index             | Página de inicio con links a login, register, profile|
| `/views/login`                   | login             | Formulario para iniciar sesión                        |
| `/views/register`                | register          | Formulario de registro con elección de rol           |
| `/views/profile`                 | profile           | Muestra los datos del usuario actual                 |
| `/views/forgot-password`         | forgot-password   | Solicita email para recuperación                     |
| `/views/reset-password`          | reset-password    | Cambia la contraseña con token                       |
| `/api/products/getAll/USER`      | products-user     | Vista de productos con botón de “Agregar al carrito” |
| `/api/products/getAll/ADMIN`     | products-admin    | Vista editable de productos                          |
| `/views/failed`                  | failed            | Vista de error genérica                              |
| `/403-forbidden`                 | 403-forbidden     | Vista de acceso denegado con imagen personalizada    |

---

## 📦 Productos

| Endpoint                    | Método | Acceso      | Descripción                          |
|-----------------------------|--------|-------------|--------------------------------------|
| `/api/products`             | POST   | Solo ADMIN  | Crea un nuevo producto               |
| `/api/products/getAll/:role`| GET    | ADMIN, USER | Renderiza vista dependiendo del rol  |
| `/api/products/`            | GET    | Público     | Devuelve todos los productos         |
| `/api/products/id/:id`      | GET    | Público     | Devuelve un producto por ID          |
| `/api/products/num/:num`    | GET    | Público     | Devuelve un producto por NUM ordinal |
| `/api/products/id/:id`      | PUT    | Solo ADMIN  | Actualiza un producto existente      |
| `/api/products/id/:id`      | DELETE | Solo ADMIN  | Elimina un producto por ID           |
| `/api/products/num/:num`    | DELETE | Solo ADMIN  | Elimina un producto por NUM ordinal  |

---

### ✅ POST /api/products
Descripción: Devuelve un array con todos los productos disponibles.

Headers:

|     KEY:      |           VALUE:           |
|---------------|----------------------------|
|Authorization: |    Bearer <token_JWT>      |
|               |                            |

---

> ⚠️ **¡ATENCIÓN!** Este endpoint requiere autenticación con rol ADMIN. Si no se proporciona el token válido, la solicitud será rechazada con un error 401 o 403.

Body:
```json
{
  "title": "Título del producto",
  "description": "Descripción del producto",
  "code_bar": "Código de barras del producto",
  "product_number": 12345,
  "price": 999.99,
  "status": true,
  "stock": 100,
  "category": "Categoría del producto",
  "thumbnails": [
    "https://ruta-a-la-imagen.com/imagen.jpg"
  ]
}
```

🔄 Respuesta esperada: 

Body:
```json
{
  "message": "Producto creado exitosamente",
  "product": {
    "_id": "64e2f7b7a01c3a76c8302a6d",
    "title": "Título del producto",
    "description": "Descripción del producto",
    "code_bar": "Código de barras del producto",
    "product_number": 12345,
    "price": 999.99,
    "status": true,
    "stock": 100,
    "category": "Categoría del producto",
    "thumbnails": [
      "https://ruta-a-la-imagen.com/imagen.jpg"
    ],
    "createdAt": "2025-07-15T21:34:56.000Z",
    "updatedAt": "2025-07-15T21:34:56.000Z"
  }
}
```

### 👥 GET /api/products/getAll/:role

> 📦 **MAIN VIEW** Descripción: Renderiza una vista HTML personalizada para el usuario según su rol (ADMIN o USER).
Dependiendo de si es USER o ADMIN, permitirá agregar al carrito (USER) o EDITAR y ELIMINAR productos (ADMIN).
Este endpoint no devuelve un JSON sino una página visual con los productos listados.

Parámetros:

```
:role: string que indica el tipo de usuario (admin, user)
```

> 🔒 **¡ATENCIÓN!** Requiere autenticación JWT. Se debe enviar el token en los headers.

Headers:

|     KEY:      |           VALUE:           |
|---------------|----------------------------|
|Authorization: |    Bearer <token_JWT>      |
|               |                            |

---

### 🌐 GET /api/products/
Descripción: Devuelve un array con todos los productos disponibles en formato JSON. Es un endpoint público y no requiere autenticación.

Respuesta esperada:

```json
{
    "status": "success",
    [
        {
          "_id": "64e2f7b7a01c3a76c8302a6d",
          "title": "Título del producto",
          "description": "Descripción del producto",
          "code_bar": "Código de barras",
          "product_number": 12345,
          "price": 999.99,
          "status": true,
          "stock": 100,
          "category": "Categoría del producto",
          "thumbnails": ["https://ruta-a-la-imagen.com/imagen.jpg"]
          ... Demás atributos
        },
        {
          ... Otros productos
        }
    ]
}
```

### 🔍 GET /api/products/id/:id
Descripción: Devuelve un producto específico según su ID de base de datos.

Parámetros:

```
:id: ID del producto (ObjectId de MongoDB)
``` 

Respuesta esperada:

```json
{
  "_id": "64e2f7b7a01c3a76c8302a6d",
  "title": "Título del producto",
  "description": "Descripción del producto",
  "code_bar": "Código de barras",
  "product_number": 12345,
  "price": 999.99,
  "status": true,
  "stock": 100,
  "category": "Categoría del producto",
  "thumbnails": ["https://ruta-a-la-imagen.com/imagen.jpg"]
}
```

### 🔢 GET /api/products/num/:num
Descripción: Devuelve un producto específico según su número ordinal (product_number).

Parámetros:

```
:num: número de producto
```

Respuesta esperada: igual a la de búsqueda por ID.

### ✏️ PUT /api/products/id/:id
Descripción: Permite actualizar parcialmente o completamente un producto por su ID.
Solo accesible por usuarios con rol ADMIN.

Headers:

|     KEY:      |           VALUE:           |
|---------------|----------------------------|
|Authorization: |    Bearer <token_JWT>      |
|               |                            |

---

> ⚠️ **¡ATENCIÓN!** Este endpoint requiere autenticación con rol ADMIN. Si no se proporciona el token válido, la solicitud será rechazada con un error 401 o 403.

Body esperado (campos modificables):

```json
{
  "title": "Nuevo título del producto",
  "price": 799.99,
  "stock": 200
}
```
Respuesta esperada:

```json
{
  "message": "Producto actualizado correctamente",
  "updatedProduct": {
    "_id": "64e2f7b7a01c3a76c8302a6d",
    "title": "Nuevo título del producto",
    "price": 799.99,
    "stock": 200,
    "...": "..."
  }
}
```

### 🗑 DELETE /api/products/id/:id
Descripción: Elimina un producto por su ID. Solo ADMIN.

Headers:

|     KEY:      |           VALUE:           |
|---------------|----------------------------|
|Authorization: |    Bearer <token_JWT>      |
|               |                            |

---

> ⚠️ **¡ATENCIÓN!** Este endpoint requiere autenticación con rol ADMIN. Si no se proporciona el token válido, la solicitud será rechazada con un error 401 o 403.


Respuesta:

```json
{
  "message": "Producto eliminado correctamente"
}
```

### 🗑 DELETE /api/products/num/:num
Descripción: Elimina un producto por su número de producto (atributo num). Solo ADMIN.

Headers:

|     KEY:      |           VALUE:           |
|---------------|----------------------------|
|Authorization: |    Bearer <token_JWT>      |
|               |                            |

---

> ⚠️ **¡ATENCIÓN!** Este endpoint requiere autenticación con rol ADMIN. Si no se proporciona el token válido, la solicitud será rechazada con un error 401 o 403.

Respuesta:

```json
{
  "message": "Producto eliminado correctamente"
}
```

## 👤 Usuarios

| Endpoint                     | Método | Descripción                    |
|------------------------------|--------|--------------------------------|
| `/api/users/`               | GET    | Listar todos los usuarios     |
| `/api/users/id/:id`         | GET    | Buscar por ID                 |
| `/api/users/num/:num`       | GET    | Buscar por número             |
| `/api/users/:id`            | PUT    | Editar por ID                 |
| `/api/users/num/:num`       | PUT    | Editar por número             |
| `/api/users/id/:id`         | DELETE | Eliminar por ID               |
| `/api/users/num/:num`       | DELETE | Eliminar por número           |
| `/api/users/register`       | POST   | Registro desde cliente        |
| `/api/users/`               | POST   | Crear usuario manualmente     |

---

## 🛒 Carritos

| Endpoint                                   | Método | Descripción                               |
|--------------------------------------------|--------|-------------------------------------------|
| `/api/carts/`                              | GET    | Todos los carritos                        |
| `/api/carts/id/:id`                        | GET    | Carrito por ID                            |
| `/api/carts/my-cart`                       | GET    | Carrito del usuario actual                |
| `/api/carts`                               | POST   | Crear carrito vacío                       |
| `/api/carts/with-products`                 | POST   | Crear con productos                       |
| `/api/carts/id/:id`                        | PUT    | Actualiza todo el carrito                 |
| `/api/carts/addToCart/:cid/:pid`           | PUT    | Agrega producto al carrito                |
| `/api/carts/id/:id/product`                | PUT    | Actualiza cantidad específica             |
| `/api/carts/id/:id/product/num/:num`       | DELETE | Elimina producto específico               |
| `/api/carts/id/:id`                        | DELETE | Elimina todo el carrito                   |

---

## 🎟️ Tickets

| Función     | Descripción                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `doSale()`  | Verifica stock, descuenta cantidades y genera un ticket con `UUID`, fecha, |
|             | total, y productos vendidos al usuario comprador.                           |

- Los tickets se almacenan con:
  - `code`: código único UUID
  - `amount`: total de la compra
  - `purchaser`: email del comprador
  - `products[]`: productos comprados
  - `purchase_datetime`: fecha/hora de emisión

---

## 🔒 Roles y Permisos

- El usuario elige su rol al registrarse: `USER` o `ADMIN`
- Solo los `ADMIN` pueden:
  - Crear, editar y eliminar productos
- El middleware `requireRole("ADMIN")` protege los endpoints sensibles
- Todos los accesos restringidos se redirigen a la vista `403-forbidden`
- Se validan los permisos en rutas como `/api/products/getAll/:role` y en las acciones sobre el carrito

---

## 💌 Recuperación de Contraseña

- Vista: `/views/forgot-password`
- Enlace recibido: `/views/reset-password?token=...`
- Envío de email usando Gmail con credenciales desde `.env`
- Token de recuperación con validez de 1 hora
- Se impide reutilizar la misma contraseña anterior

---

## ✅ Cumplimiento de Requisitos (CoderHouse)

- [x] Uso de **Express Router**
- [x] Middleware de autorización con Passport y JWT
- [x] Vistas en Handlebars: login, register, profile
- [x] Autenticación + Cookies
- [x] Estructura tipo MVC
- [x] Uso de `DTO`
- [x] Servicio de envío de correo (Nodemailer)
- [x] Persistencia de datos con MongoDB
- [x] Uso de clases `Service`, `DAO`, `Repository`
- [x] Imagen personalizada para errores 403
- [x] Logout funcional
- [x] Validación de stock y ticket de compra
- [x] `.env` bien separado y no versionado

---

## 📁 Archivos Postman

> 📄 Archivo de prueba: `Baken2.postman_collection.json` (incluido en el directorio raíz)

---

## 📂 Estructura del Proyecto

```bash
/src
├── config/             # Configuración general y JWT
├── controllers/        # Controladores REST
├── daos/               # Acceso a datos (Mongo)
├── DTO/                # Data transfer Object p/comunicación
├── middlewares/        # Autorización por rol
├── repositories/       # Encapsula lógica DAO
├── routes/             # Rutas Express
├── services/           # Lógica de negocio
├── utils/              # Helpers
├── views/              # Vistas Handlebars
└── server.js           # Punto de entrada

/public/img/         # Imágenes estáticas

## ✨ Autor

**Nicolás Toledo**  
**Curso**: Backend II – CoderHouse  
📩 **Contacto**: gestiones-judiciales@hotmail.com  
📍 **Ciudad**: Posadas-Misiones-Argentina

---

🧪 **Gracias profe, por leer toda la documentación.**  
🖖 *Live long and code.*
