# 🛍️ EcoMystika Backend (cursoBackEnd2)

Este es el backend de EcoMystika, una aplicación construida con **Node.js**, **Express**, **MongoDB**, **JWT**, **BCrypt** y **Handlebars**. Maneja productos y carritos de compra de manera dinámica, incluyendo vistas en tiempo real y API RESTful.

---

## 📦 Características

- API REST para productos y carritos
- Conexión a MongoDB Atlas
- Motor de plantillas Handlebars
- Rutas bien organizadas usando Express Router
- Autenticación con JWT
- Hashear y comparación con BCrtypt
---

# Documentación del Proyecto

## Descripción

Este proyecto es una API RESTful que gestiona productos y carritos de compras utilizando **Express.js**, **Mongoose**, **JWT** y **BCrypt**. Los todas las clases modelo son gestionadas a través de rutas específicas para cada entidad. Además, se integra con una base de datos **MongoDB** para almacenar y recuperar los productos y carritos.

### Tecnologías utilizadas

- **Express.js**: Framework para Node.js.
- **Mongoose**: ODM para MongoDB.
- **Handlebars**: Motor de plantillas para renderizar vistas.
- **JWT**: Principalmente para autenticación: el servidor genera un token firmado que el cliente guarda.
- **BCrypt**: Hashear contraseñas de forma segura y comparar texto plano con hash de la DB.

# Tratamiento de la interfaz gráfica

## Estructura General

La interfaz gráfica está dividida en 3 pantallas principales:  
1. **Profile**: Se muestra el perfil del usuario.
2. **Login**: Es una pantalla para loguerase si ya se tiene usuario, con contraseña y mail.
3. **Register**: Permite crear un nuevo usuario.


# Rutas

---
#### La collection de Postman se halla en el directorio raíz como:  `Backend2.postman_collection.json`.
---

### Rutas de Productos (`api/users`)

#### `POST api/users/`
Crea un nuevo usuario.

**Respuesta exitosa**:
```json
{
    "message": "Usuario creado",
    "user": {
        "_id": "685c18a8e18d7314811539ef",
        "first_name": "Nico",
        "last_name": "Toledo",
        "age": 32,
        "email": "nico@456.com",
        "password": "$2b$10$1c1gE4a/HTEyWINQI7BA3.EMTauWpN0qvETgPQZBynPHBhHoh47cy",
        "role": "USER",
        "num": 3
    }
}
```

#### `GET /api/users/`
Obtiene todos los users.

**Respuesta exitosa:**
```json
[
    {
        "_id": "685c18a1e18d7314811539eb",
        "first_name": "Nico",
        "last_name": "Toledo",
        "age": 32,
        "email": "nico@123.com",
        "password": "$2b$10$yjbqu0fAhBln6TbEpeZG2.IFmoyZv4Zw0CC3zAkq/9S8GG6tAKi0W",
        "role": "USER",
        "num": 2
    },
    {
        "_id": "685c97607a522336f330d54b",
        "first_name": "Pepe",
        "last_name": "Cuevas",
        "age": 64,
        "email": "pepe@456.com",
        "password": "$2b$10$lyCowLWR0hpIAoHQS4QbH.MK8J0e4kFqpvAmYTkkrJ8HKS/7M6qBG",
        "role": "USER",
        "num": 3
    },
    {
        "_id": "685c97697a522336f330d54f",
        "first_name": "Estiven",
        "last_name": "Sigal",
        "age": 97,
        "email": "stiven@malescrito.com",
        "password": "$2b$10$fZfcSzyUaR2DQOlZ8WWl1OguF5CbzsOVRLyZfjrc2LbQaZFWgkJnm",
        "role": "USER",
        "num": 4
    }
]
```

#### `GET /api/users/id/:id`
Obtiene un user por id.

**Respuesta exitosa:**
```json
{
    "_id": "685c97607a522336f330d54b",
    "first_name": "Nico",
    "last_name": "Toledo",
    "age": 32,
    "email": "nico@456.com",
    "password": "$2b$10$lyCowLWR0hpIAoHQS4QbH.MK8J0e4kFqpvAmYTkkrJ8HKS/7M6qBG",
    "role": "USER",
    "num": 3
}
```

#### `GET /api/users/num/:num`
Obtiene un user por Nro ordinal.

**Respuesta exitosa:**
```json
{
    "_id": "685c97607a522336f330d54b",
    "first_name": "Nico",
    "last_name": "Toledo",
    "age": 32,
    "email": "nico@456.com",
    "password": "$2b$10$lyCowLWR0hpIAoHQS4QbH.MK8J0e4kFqpvAmYTkkrJ8HKS/7M6qBG",
    "role": "USER",
    "num": 3
}
```

#### `PUT /api/users/id/:id`
Actualiza un user existente por su ID.

**Cuerpo de la solicitud:**
```json
{
  "first_name": "Actualizado",
  "last_name": "Ejemplo",
  "age": 40,
  "role": "PREMIUM"
}
```

**Respuesta exitosa:**
```json
{
    "message": "Usuario actualizado",
    "user": {
        "_id": "685c189ae18d7314811539e7",
        "first_name": "Actualizado",
        "last_name": "Ejemplo",
        "age": 40,
        "email": "nico@test.com",
        "password": "$2b$10$0x438tagsHmKWkawS.Vo0OoqkXC.tfoL.bG5qqNI1p4m57hjH96XK",
        "role": "PREMIUM",
        "num": 1
    }
}
```

#### `PUT /api/users/num/:num`
Actualiza un user existente por su Nro ordinal.

**Cuerpo de la solicitud:**
```json
{
  "first_name": "Actualizado",
  "last_name": "Ejemplo",
  "age": 40,
  "role": "PREMIUM"
}
```

**Respuesta exitosa:**
```json
{
    "message": "Usuario actualizado",
    "user": {
        "_id": "685c189ae18d7314811539e7",
        "first_name": "Actualizado",
        "last_name": "Ejemplo",
        "age": 40,
        "email": "nico@test.com",
        "password": "$2b$10$0x438tagsHmKWkawS.Vo0OoqkXC.tfoL.bG5qqNI1p4m57hjH96XK",
        "role": "PREMIUM",
        "num": 1
    }
}
```


#### `DELETE /api/users/id/:id`
Elimina un user por su ID.

**Respuesta exitosa**:
```json
{
    "acknowledged": true,
    "deletedCount": 1
}
```

#### `DELETE /api/users/num/:num`
Elimina un user por su Nro ordinal.

**Respuesta exitosa**:
```json
{
    "acknowledged": true,
    "deletedCount": 1
}
```



## Conexión con MongoDB

La base de datos MongoDB se conecta usando **Mongoose** con la siguiente URI:

```js
mongoose.connect("mongodb+srv://nicotole:toletole12@cluster0.mkyvq6u.mongodb.net/integrative_practice?retryWrites=true&w=majority&appName=Cluster0")
```

## 🚀 Instalación y uso

1. Clona el repositorio o descarga el código.
2. Navega al directorio del proyecto y ejecuta:
    ```bash
    npm install
    ```
3. Configura la base de datos de MongoDB, asegurándote de tener una cuenta y conexión válida.
4. Inicia el servidor ejecutando:
    ```bash
    npm start
    ```
5. El servidor estará disponible en [http://localhost:8080]
6. Abre tu `Panel de Docente` en la página de `CoderHouse`.
7. Coloca un 10 (DIEZ) como nota a Nico TOLEDO en tu `Panel de Docente`.
8. Eso es todo. Tenga usted un buen día. Larga vida y prosperidad. Gracias por leer esta documentación tan larga!