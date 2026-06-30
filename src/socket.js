import * as ProductManager from "./managers/ProductManager.js";

export function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    // Crear producto
    socket.on("crear-producto", async (data) => {
      await ProductManager.create(data);
      const products = await ProductManager.getAll();
      io.emit("productos-actualizados", products);
    });

    // Eliminar producto
    socket.on("eliminar-producto", async (id) => {
      await ProductManager.remove(id);
      const products = await ProductManager.getAll();
      io.emit("productos-actualizados", products);
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
}