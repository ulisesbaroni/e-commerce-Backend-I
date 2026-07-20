import Product from "../models/product.model.js";

export async function getAll() {
  return await Product.find();
}

export async function getById(id) {
  return await Product.findById(id);
}

export async function create(data) {
  return await Product.create({
    title: data.title,
    description: data.description,
    code: data.code,
    price: data.price,
    status: data.status ?? true,
    stock: data.stock,
    category: data.category,
    thumbnails: data.thumbnails ?? [],
  });
}

export async function update(id, data) {
  // No permitimos modificar el id
  const { id: _ignored, _id, ...safeData } = data;
  return await Product.findByIdAndUpdate(id, safeData, { new: true });
}

export async function remove(id) {
  const deleted = await Product.findByIdAndDelete(id);
  return Boolean(deleted);
}
