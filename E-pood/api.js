import { Product } from "./constructor/Product.js";

const BASE_URL = "https://fakestoreapi.com";


export const getProductsFromJson = async () => {
  try {
    const response = await fetch("./data.js");
    if (!response.ok) throw new Error("Failed to fetch products from JSON");
    const data = await response.json();
    return data.map(
      (item) =>
        new Product(
          item.id,
          item.title,
          item.price,
          item.category,
          item.description,
          item.image
        )
    );
  } catch (error) {
    console.error("Error fetching products from JSON:", error);
  }
};

export const getProductsByCategory = async (category = "All products") => {
  try {
    const byCategory =
      category !== "All products" ? `/category/${category}` : "";
    const response = await fetch(`${BASE_URL}/products${byCategory}`);
    //viska uus error
    //if (!response.ok) throw new Error("Failed to fetch products by category");
    const data = await response.json();
    return data.map(
      (item) =>
        new Product(
          item.id,
          item.title,
          item.price,
          item.category,
          item.description,
          item.image
        )
    );
  } catch (error) {
    console.error(`Error fetching products for category "${category}":`, error);
  }
};

export const getAllCategory = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};


export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    if (!response.ok) throw new Error(`Failed to fetch product with ID ${productId}`);
    const item = await response.json();
    return new Product(
      item.id,
      item.title,
      item.price,
      item.category,
      item.description,
      item.image
    );
  } catch (error) {
    console.error(`Error fetching product with ID "${productId}":`, error);
  }
};
