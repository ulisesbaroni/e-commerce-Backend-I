import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.resolve("data/products.json");

// Lee el archivo y devuelve el array de productos
async function readProducts() {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  return JSON.parse(data);
}

// Sobreescribe el archivo con el array actualizado
async function writeProducts(products) {
  await fs.writeFile(FILE_PATH, JSON.stringify(products, null, 2));
}

export async function getAll() {
  return await readProducts();
}

export async function getById(id) {
  const products = await readProducts();
  return products.find((p) => p.id === id) || null;
}

export async function create(data) {
  const products = await readProducts();

  // Generamos un id único basado en el máximo actual
  const lastId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;

  const newProduct = {
    id: lastId + 1,
    title: data.title,
    description: data.description,
    code: data.code,
    price: data.price,
    status: data.status ?? true,
    stock: data.stock,
    category: data.category,
    thumbnails: data.thumbnails ?? [],
  };

  products.push(newProduct);
  await writeProducts(products);
  return newProduct;
}

export async function update(id, data) {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return null;

  // No permitimos modificar el id
  const { id: _ignored, ...safeData } = data;

  products[index] = { ...products[index], ...safeData };
  await writeProducts(products);
  return products[index];
}

export async function remove(id) {
  const products = await readProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) return false;

  products.splice(index, 1);
  await writeProducts(products);
  return true;
}
