import { Router } from "express";
import * as ProductManager from "../managers/ProductManager.js";

const router = Router();

// Vista estática
router.get("/", async (req, res) => {
  const products = await ProductManager.getAll();
  res.render("home", { products });
});

// Vista en tiempo real
router.get("/realtimeproducts", async (req, res) => {
  const products = await ProductManager.getAll();
  res.render("realTimeProducts", { products });
});

export default router;