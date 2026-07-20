import { Router } from "express";
import { isValidObjectId } from "mongoose";
import * as ProductManager from "../managers/ProductManager.js";
import * as CartManager from "../managers/CartManager.js";

const router = Router();

// Recupera el carrito del navegador (cookie) o crea uno nuevo si no existe
async function getOrCreateCartId(req, res) {
  const cookieCartId = req.cookies.cartId;

  if (cookieCartId && isValidObjectId(cookieCartId) && (await CartManager.getById(cookieCartId))) {
    return cookieCartId;
  }

  const cart = await CartManager.create();
  res.cookie("cartId", cart.id, { httpOnly: true });
  return cart.id;
}

// Disponible en todas las vistas, para el link "Mi carrito" del nav
router.use(async (req, res, next) => {
  res.locals.cartId = await getOrCreateCartId(req, res);
  next();
});

// Landing
router.get("/", (req, res) => {
  res.render("home");
});

// Vista en tiempo real
router.get("/realtimeproducts", async (req, res) => {
  const products = await ProductManager.getAll();
  res.render("realTimeProducts", { products: products.map((p) => p.toJSON()) });
});

// Listado paginado de productos
router.get("/products", async (req, res) => {
  const { limit = 10, page = 1, query, sort } = req.query;

  const result = await ProductManager.getPaginated({ limit, page, query, sort });

  res.render("products", {
    products: result.docs.map((p) => p.toJSON()),
    query,
    sort,
    page: result.page,
    totalPages: result.totalPages,
    hasPrevPage: result.hasPrevPage,
    hasNextPage: result.hasNextPage,
    prevPage: result.prevPage,
    nextPage: result.nextPage,
  });
});

// Detalle de un producto
router.get("/products/:pid", async (req, res) => {
  const { pid } = req.params;

  if (!isValidObjectId(pid)) return res.status(400).send("ID inválido");

  const product = await ProductManager.getById(pid);

  if (!product) return res.status(404).send("Producto no encontrado");

  res.render("productDetail", { product: product.toJSON() });
});

// Detalle de un carrito
router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;

  if (!isValidObjectId(cid)) return res.status(400).send("ID inválido");

  const cart = await CartManager.getByIdPopulated(cid);

  if (!cart) return res.status(404).send("Carrito no encontrado");

  res.render("cartDetail", { cart: cart.toJSON() });
});

export default router;
