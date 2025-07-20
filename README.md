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

# Índice

1. [📦 Descripción General](#-ecomystika-backend-cursobackend2)
2. [🔧 Tecnologías Utilizadas](#-tecnologías-utilizadas)
3. [🚀 Instalación](#-instalación)
4. [🌐 Endpoints y Vistas](#-endpoints-y-vistas)
5. [🔐 Autenticación con JWT](#-jwt)
6. 👤 Gestión de Usuarios

    6.1 [Registro y login](#-post-apisessionslogin)  
    6.2 [Recuperación de contraseña](#-post-apisessionsforgot-password)  
    6.3 [CRUD de usuarios](#-post-apiuser)

7. [🖼️ Vistas Renderizadas](#-vistas-renderizadas)
8. [📦 Gestión de Productos](#-productos)

    8.1 [Endpoints públicos](#-get-apiproducts)  
    8.2 [Endpoints ADMIN](#-post-apiproducts)

9. [🛒 Gestión de Carritos](#-carritos)

    9.1 [Creación y modificación](#-post-apicarts)  
    9.2 [Consulta y eliminación](#-delete-apicartsidid)

10. [🎟️ Tickets de Compra](#-tickets)

    10.1 [Proceso de checkout](#-post-apicartsidcheckout)

11. [🔒 Roles y Permisos](#-roles-y-permisos)
12. [💌 Recuperación de Contraseña](#-recuperación-de-contraseña)


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
| `/api/users/`               | POST   | Crear usuario manualmente     |
| `/api/users/`               | GET    | Listar todos los usuarios     |
| `/api/users/id/:id`         | GET    | Buscar por ID                 |
| `/api/users/num/:num`       | GET    | Buscar por número             |
| `/api/users/:id`            | PUT    | Editar por ID                 |
| `/api/users/num/:num`       | PUT    | Editar por número             |
| `/api/users/id/:id`         | DELETE | Eliminar por ID               |
| `/api/users/num/:num`       | DELETE | Eliminar por número           |
| `/api/users/register`       | POST   | Registro desde cliente        |


---

## 👤 Usuarios (/api/users)

### 📄 POST /api/user/
Descripción: Permite crear un usuario manualmente pasandole un body.

Body (JSON):

```json
{
  "first_name": "Nombre",
  "last_name": "Apellido",
  "email": "nombre.apellido@dominio.com",
  "password": "ContraseñaSegura123",
  "age": 99,
  "role": "USER"
}
```


> ✅  **Respuesta esperada (302 FOUND):** Redirige a la pantalla principal de productos.

### 📄 GET /api/users
Descripción: Devuelve un array con todos los usuarios registrados.

Respuesta esperada (200 OK):

```json
[
  {
    "_id": "64fa65c9b5b9d8c10e4c735f",
    "first_name": "Carlos",
    "last_name": "Pérez",
    "email": "carlos@example.com",
    "role": "user",
    "last_connection": "2024-09-01T10:30:00.000Z"
  },
  {
    "_id": "64fa65c9b5b9d8c10e4c7360",
    "first_name": "Lucía",
    "last_name": "García",
    "email": "lucia@example.com",
    "role": "premium",
    "last_connection": "2024-09-03T22:45:00.000Z"
  }
]
```

### 🔍 GET /api/users/id/:id
Descripción: Devuelve los datos de un único usuario según su id.

```
Ejemplo:
GET /api/users/id/64fa65c9b5b9d8c10e4c735f
```

Respuesta esperada (200 OK):

```json
{
  "_id": "64fa65c9b5b9d8c10e4c735f",
  "first_name": "Carlos",
  "last_name": "Pérez",
  "email": "carlos@example.com",
  "role": "user",
  "last_connection": "2024-09-01T10:30:00.000Z"
}
```

### 🔍 GET /api/users/num/:num
Descripción: Devuelve los datos de un único usuario según su num.

```
Ejemplo:
GET /api/users/num/5
```

Respuesta esperada (200 OK):

```json
{
  "_id": "64fa65c9b5b9d8c10e4c735f",
  "first_name": "Carlos",
  "last_name": "Pérez",
  "email": "carlos@example.com",
  "role": "user",
  "last_connection": "2024-09-01T10:30:00.000Z"
}
```

### 📝 PUT /api/users/id/:id
Descripción: Actualiza un usuario existente utilizando su _id de MongoDB.

Body (JSON):
```json
{
  "name": "Nombre actualizado",
  "email": "nuevoemail@correo.com",
  "password": "nuevacontraseña",
  "role": "user"
}
```

Respuesta exitosa (200):
```json
{
  "status": "success",
  "message": "Usuario actualizado correctamente"
}
```
Errores posibles:
400 Bad Request si el ID es inválido o no se encuentra el usuario.


### 📝 PUT /api/users/num/:num
Descripción: Actualiza un usuario utilizando su número de usuario (num) como identificador.

Body (JSON):

```json
{
  "name": "Nombre actualizado",
  "email": "nuevoemail@correo.com",
  "password": "nuevacontraseña",
  "role": "admin"
}
```

Respuesta exitosa (200):

```json
{
  "status": "success",
  "message": "Usuario actualizado correctamente"
}
```

Errores posibles:
400 Bad Request si el número no es válido o no se encuentra el usuario.


### 🗑 DELETE /api/users/id/:id
Descripción: Elimina un usuario por su uid.

Respuesta esperada (200 OK):

```json
{
  "status": "success",
  "message": "Usuario eliminado correctamente."
}
```

### 🗑 DELETE /api/users/num/:num
Descripción: Elimina automáticamente un usuario por su número de orden (atributo 'num').

Respuesta esperada (200 OK):
```json
{
  "status": "success",
  "deletedUsers": [
    {
      "_id": "64fa65c9b5b9d8c10e4c7360",
      "email": "inactivo@example.com",
      "last_connection": "2024-08-25T08:00:00.000Z"
    }
  ]
}
```

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

### 🛒🛒🛒 GET /api/carts/
Descripción: Devuelve un array con todos los carritos disponibles en formato JSON. Es un endpoint público y no requiere autenticación.

Respuesta esperada:

```json
{
    "status": "success",
    "carts": [
        {
            "_id": "cart_id",
            "user": "user_id",
            "products": [
                {
                    "_id": "product_id",
                    "num": 1,
                    "title": "product_title",
                    "price": 99.99,
                    "quantity": 1
                },
                {
                  ... Demás productos
                }  
            ],
            "total": 999.99,
            "num": 1
        },
         {
          ... Otros carts
        }
        
    ]
}
```

### 🛒 GET /api/carts/id/:id
Descripción: Devuelve un objeto JSON 'cart' con todos los productos que contiene y sus atributos de cart. Es un endpoint público y no requiere autenticación.

Respuesta esperada:

```json
{
    "status": "success",
    "cart": {
        "_id": "cart_id",
        "user": "user_id",
        "products": [
            {
               "_id": "product_id",
               "num": 1,
               "title": "product_title",
               "price": 99.99,
               "quantity": 1
            },
            
            {
                ... Demás productos
            }  

        ],
        "price": 99.99,
        "num": 1
    }
}
```

### 🛒 GET /api/carts/my-cart
Descripción: Devuelve un objeto JSON 'cart' con el carrito del usuario actualmente logueado. Es un endpoint público.

Headers:

|     KEY:      |           VALUE:           |
|---------------|----------------------------|
|Authorization: |    Bearer <token_JWT>      |
|               |                            |

---

Respuesta esperada:

```json
{
    "result": "ok",
    "cart": {
        "_id": "cart_id",
        "user": "user_id",
        "products": [
            {
               "_id": "product_id",
               "num": 1,
               "title": "product_title",
               "price": 99.99,
               "quantity": 1
            },
            
            {
                ... Demás productos
            }  

        ],
        "price": 99.99,
        "num": 1
    }
}
```
> ⚠️ **¡ATENCIÓN!** Si bien es un endpoint público, requiere un token de autorización en el header (de la manera descripta arriba) para poder devolverte el carrito del usuario logueado.

### 🔹 POST /api/carts
Descripción: Crear un carrito vacío asociado a un usuario.

Body JSON esperado:

```json
{
  "userID": "64fc0a991e8f4c001a4e497a"
}
```
Respuestas posibles:

```
201 Created: Carrito creado correctamente.
400 Bad Request: Falta el userID.
500 Internal Server Error: Error del servidor o usuario inexistente.
```

Respuesta esperada:

```json
{
    "status": "success",
    "payload": {
        "user": "user_id",
        "products": [],
        "total": 0,
        "num": 18,
        "_id": "cart_id"
    }
}
```


### 🔹 POST /api/carts/with-products
Descripción: Crea un nuevo carrito con productos iniciales.

Body JSON esperado:
```json
{
  "userID": "64fc0a991e8f4c001a4e497a",
  "products": [1001, 1002, 1003]
}
```
Respuestas posibles:
```
201 Created: Carrito creado correctamente.
400 Bad Request: Falta userID o array de products.
500 Internal Server Error: Usuario no existe, productos inválidos o sin stock.
```

Respuesta esperada:

```json
{
    "status": "success",
    "payload": {
        "products": [
            {
                "num": 5,
                "title": "product_title",
                "price": 99.99,
                "quantity": 1,
                "_id": "product_id"
            },
           
            {
                 ... Demás productos
            }
        ],
        "total": 99.99,
        "num": 19,
        "_id": "cart_id"
    }
}
```

### 🔹 PUT /api/carts/id/:id
Descripción: Actualiza completamente un carrito existente por su ID (reemplaza contenido).

Body JSON esperado:
```json
{
  "products": [
    {
       "num": 1001, 
       "title": "Producto A", 
       "price": 50, 
       "quantity": 2 
    },
    { 
       "num": 1002, 
       "title": "Producto B", 
       "price": 30, 
       "quantity": 1 
    },
    {
       ... Demás productos
    }    
  ],
  "num": 8888,
  ... Otros atributos de 'cart'  
      
}
```

Respuestas posibles:
```
200 OK: Carrito actualizado.
400 Bad Request: ID inválido o body mal formado.
500 Internal Server Error: Fallo en actualización.
```

### 🔹 PUT /api/carts/addToCart/:cid/:pid
Descripción: Agrega un producto al carrito indicado.

Parámetros URL:
```
cid: ID del carrito
pid: ID del producto
```

Respuestas posibles:
```
200 OK: Producto agregado correctamente.
400 Bad Request: Carrito o producto no encontrado, o sin stock.
500 Internal Server Error: Error inesperado.
```

### 🔹 PUT /api/carts/id/:id/product
Descripción: Actualiza la cantidad de un producto específico en el carrito.

Body JSON esperado:
```json
{
  "productNum": 1001,
  "quantity": 3
}
```

Respuestas posibles:
```
200 OK: Cantidad actualizada.
400 Bad Request: Faltan campos o stock insuficiente.
404 Not Found: Carrito o producto inexistente.
500 Internal Server Error: Error en operación.
```

### 🔹 DELETE /api/carts/id/:id/product/num/:num
Descripción: Elimina un producto específico del carrito, identificando al carrito por su id y al producto por su num.

Parámetros URL:
```
id: ID del carrito
num: Número del producto
```

Respuestas posibles:
```
200 OK: Producto eliminado del carrito.
400 Bad Request: Número inválido.
500 Internal Server Error: Producto no encontrado o error en la operación.
```

### 🔹 DELETE /api/carts/id/:id
Descripción: Elimina todo el carrito por su ID.

Parámetros URL:
```
id: ID del carrito
```
Respuestas posibles:
```
200 OK: Carrito eliminado.
404 Not Found: Carrito no encontrado.
500 Internal Server Error: Error al intentar eliminar.
```

## 🛒 Carritos


## 🎟️ Tickets

| Endpoint                                   | Método | Acción                                    |
|--------------------------------------------|--------|-------------------------------------------|
| `/api/carts/:id/checkout`                  | POST   | Se vale de la sesión, ejecutando doSale() |


| Función     | Descripción                                                                                   |
|-------------|-----------------------------------------------------------------------------------------------|
| `doSale()`  | Verifica stock, descuenta cantidades y genera un ticket con `UUID`, fecha, total, y productos |
|             | vendidos al usuario comprador. Limpia el carrito del usuario.                                 |

---

### 🛒 POST /api/carts/:id/checkout
Descripción: Este endpoint procesa la venta de un carrito determinado. Verifica el stock de productos, 
descuenta las cantidades disponibles, genera un ticket y vacía el carrito.

> 🧑‍💻 **Autenticación:** Requiere token JWT (mediante passport.authenticate("jwt")).


Parámetros:
```
:id – ID del carrito a procesar.
```
Request Headers:
```http
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

Cuerpo opcional:
```json
{
  "email": "usuario@example.com"
}
```
> ⚠️ **Nota:** Si el usuario está autenticado correctamente, se toma el email de `req.user.email`. El campo email en el body es opcional y solo se utiliza como respaldo.
 

Respuesta Exitosa – 201 Created:
```json
{
  "status": "success",
  "ticket": {
    "code": "e28b73c8-b4de-4e78-a2f3-149e4c2c1889",
    "amount": 15800,
    "purchaser": "usuario@example.com",
    "purchase_datetime": "2025-07-20T23:18:45.789Z",
    "products": [
      {
        "product": "64c1f3b9b4fd5a001e0aa3ef",
        "quantity": 2,
        "price": 4000
      },
      {
        "product": "64c1f3a8b4fd5a001e0aa3ed",
        "quantity": 1,
        "price": 7800
      }
    ]
  }
}
```

Respuesta con error – 400 Bad Request:
```json
{
  "status": "error",
  "message": "Faltan datos: ID de carrito o email"
}
```

Respuesta con error – 404 Not Found:
```json
{
  "status": "error",
  "message": "Carrito no encontrado"
}
```

Respuesta con error – 500 Internal Server Error:
```json
{
  "status": "error",
  "message": "Error inesperado al realizar la venta"
}
```
** 🧾 Estructura del `Ticket`
Cada ticket contiene la siguiente información:
| Campo                      |  Tipo  |             Descripción                   |
|----------------------------|--------|-------------------------------------------|
|           code	           | string	|  Código único generado con UUID           |
|          amount	           | number |	 Total de la compra                       |
|         purchaser	         | string	|  Email del comprador                      |
|     purchase_datetime      | string	|  Fecha y hora de la compra en formato ISO |
|         products	         | array	|  Lista de productos comprados             |
---

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
```


## ✨ Autor

**Nicolás Toledo**  
**Curso**: Backend II – CoderHouse  
📩 **Contacto**: nicotole@gmail.com
📍 **Ciudad**: Posadas-Misiones-Argentina

---

🧪 **Gracias profe, por leer toda la documentación.**  
🖖 *Live long and code.*
