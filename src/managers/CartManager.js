import Cart from "../models/cart.model.js";

export async function create() {
  return await Cart.create({ products: [] });
}

export async function getById(id) {
  return await Cart.findById(id);
}

export async function getByIdPopulated(id) {
  return await Cart.findById(id).populate("products.product");
}

export async function addProduct(cartId, productId) {
  const cart = await Cart.findById(cartId);

  if (!cart) return null;

  const existing = cart.products.find((p) => p.product.toString() === productId);

  if (existing) {
    // Si ya existe, sumamos una unidad
    existing.quantity += 1;
  } else {
    cart.products.push({ product: productId, quantity: 1 });
  }

  await cart.save();
  return cart;
}

export async function removeProduct(cartId, productId) {
  const cart = await Cart.findById(cartId);

  if (!cart) return null;

  cart.products = cart.products.filter((p) => p.product.toString() !== productId);

  await cart.save();
  return cart;
}

export async function updateProducts(cartId, products) {
  const cart = await Cart.findById(cartId);

  if (!cart) return null;

  cart.products = products.map((p) => ({ product: p.product, quantity: p.quantity }));

  await cart.save();
  return cart;
}

export async function updateQuantity(cartId, productId, quantity) {
  const cart = await Cart.findById(cartId);

  if (!cart) return null;

  const item = cart.products.find((p) => p.product.toString() === productId);

  if (!item) return null;

  item.quantity = quantity;

  await cart.save();
  return cart;
}

export async function clear(cartId) {
  const cart = await Cart.findById(cartId);

  if (!cart) return null;

  cart.products = [];

  await cart.save();
  return cart;
}
