import Cart from "../models/cart.model.js";

export async function create() {
  return await Cart.create({ products: [] });
}

export async function getById(id) {
  return await Cart.findById(id);
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
