import { Router } from "express";
import * as ProductManager from "../managers/ProductManager.js";

const router = Router();

// GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await ProductManager.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// GET /api/products/:pid
router.get("/:pid", async (req, res) => {
  try {
    const id = Number(req.params.pid);
    const product = await ProductManager.getById(id);

    if (!product) return res.status(404).json({ error: "Producto no encontrado" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

// POST /api/products
router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    // Validamos los campos obligatorios
    if (!title || !description || !code || price == null || stock == null || !category) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const product = await ProductManager.create({ title, description, code, price, status, stock, category, thumbnails });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el producto" });
  }
});

// PUT /api/products/:pid
router.put("/:pid", async (req, res) => {
  try {
    const id = Number(req.params.pid);
    const updated = await ProductManager.update(id, req.body);

    if (!updated) return res.status(404).json({ error: "Producto no encontrado" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

// DELETE /api/products/:pid
router.delete("/:pid", async (req, res) => {
  try {
    const id = Number(req.params.pid);
    const deleted = await ProductManager.remove(id);

    if (!deleted) return res.status(404).json({ error: "Producto no encontrado" });

    res.json({ message: "Producto eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

export default router;
