import { Router } from "express";
import * as CartManager from "../managers/CartManager.js";

const router = Router();

// POST /api/carts
router.post("/", async (req, res) => {
  try {
    const cart = await CartManager.create();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el carrito" });
  }
});

// GET /api/carts/:cid
router.get("/:cid", async (req, res) => {
  try {
    const id = Number(req.params.cid);
    const cart = await CartManager.getById(id);

    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    res.json(cart.products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
});

// POST /api/carts/:cid/product/:pid
router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);

    const cart = await CartManager.addProduct(cartId, productId);

    if (!cart) return res.status(404).json({ error: "Carrito no encontrado" });

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});

export default router;
