# E-commerce Backend

Backend de un e-commerce hecho con Express, Mongoose (MongoDB Atlas) y Socket.IO, con vistas Handlebars.

## Requisitos

- Node.js
- Un cluster de MongoDB Atlas (o cualquier instancia de MongoDB accesible)

## Instalación

```bash
npm install
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar con tu connection string de MongoDB:

```bash
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/ecommerce
```

## Comandos

```bash
npm run dev    # levanta el servidor con nodemon (recarga automática) en http://localhost:8080
npm start      # levanta el servidor con Node directamente
```

## Endpoints

### Productos — `/api/products`

| Método | Ruta         | Descripción                                                    |
| ------ | ------------ | --------------------------------------------------------------- |
| GET    | `/`          | Lista paginada. Query params: `limit`, `page`, `query` (categoría o `true`/`false` por disponibilidad), `sort` (`asc`/`desc` por precio) |
| GET    | `/:pid`      | Obtener un producto por id                                      |
| POST   | `/`          | Crear un producto                                                |
| PUT    | `/:pid`      | Actualizar un producto                                          |
| DELETE | `/:pid`      | Eliminar un producto                                             |

### Carritos — `/api/carts`

| Método | Ruta                        | Descripción                                       |
| ------ | --------------------------- | -------------------------------------------------- |
| POST   | `/`                         | Crear un carrito                                   |
| GET    | `/:cid`                     | Ver un carrito, con los productos poblados         |
| POST   | `/:cid/product/:pid`        | Agregar un producto al carrito                     |
| DELETE | `/:cid/products/:pid`       | Eliminar un producto del carrito                   |
| PUT    | `/:cid`                     | Reemplazar todos los productos del carrito         |
| PUT    | `/:cid/products/:pid`       | Actualizar la cantidad de un producto               |
| DELETE | `/:cid`                     | Vaciar el carrito                                  |

## Vistas

| Ruta                 | Descripción                                                    |
| --------------------- | --------------------------------------------------------------- |
| `/`                    | Lista estática de productos                                     |
| `/realtimeproducts`    | Lista de productos en tiempo real (crear/eliminar vía Socket.IO) |
| `/products`            | Lista paginada de productos, con botón de agregar al carrito     |
| `/products/:pid`       | Detalle de un producto, con botón de agregar al carrito          |
| `/carts/:cid`          | Contenido de un carrito, con los productos poblados              |

El carrito asociado al navegador se guarda en una cookie (`cartId`) y se crea automáticamente en la primera visita a `/products` o `/products/:pid`.
