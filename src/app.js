import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { initSocket } from "./socket.js";

import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = 8080;

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Rutas vistas
app.use("/", viewsRouter);

// Socket.IO
initSocket(io);

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});