import Product from "../models/product.model.js";

export async function getAll() {
  return await Product.find();
}

export async function getPaginated({ limit = 10, page = 1, query, sort }) {
  const filter = {};

  if (query === "true" || query === "false") {
    filter.status = query === "true";
  } else if (query) {
    filter.category = query;
  }

  const options = { limit: Number(limit), page: Number(page) };

  if (sort === "asc" || sort === "desc") {
    options.sort = { price: sort === "asc" ? 1 : -1 };
  }

  return await Product.paginate(filter, options);
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
