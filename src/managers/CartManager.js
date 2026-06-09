import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.resolve("data/carts.json");

async function readCarts() {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  return JSON.parse(data);
}

async function writeCarts(carts) {
  await fs.writeFile(FILE_PATH, JSON.stringify(carts, null, 2));
}

export async function create() {
  const carts = await readCarts();

  const lastId = carts.length > 0 ? Math.max(...carts.map((c) => c.id)) : 0;

  const newCart = {
    id: lastId + 1,
    products: [],
  };

  carts.push(newCart);
  await writeCarts(carts);
  return newCart;
}

export async function getById(id) {
  const carts = await readCarts();
  return carts.find((c) => c.id === id) || null;
}

export async function addProduct(cartId, productId) {
  const carts = await readCarts();
  const cart = carts.find((c) => c.id === cartId);

  if (!cart) return null;

  const existing = cart.products.find((p) => p.product === productId);

  if (existing) {
    // Si ya existe, sumamos una unidad
    existing.quantity += 1;
  } else {
    cart.products.push({ product: productId, quantity: 1 });
  }

  await writeCarts(carts);
  return cart;
}
