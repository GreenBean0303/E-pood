import { Product } from "./constructor/Product.js";

const BASE_URL = "http://localhost:3000";

export const getProductsFromJson = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`); // Fetch from backend products endpoint
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
    return []; // Return an empty array if fetch fails
  }
};

export const getProductsByCategory = async (category) => {
  try {
      // If no category is provided, fetch all products
      const endpoint = category ? `/products/category/${category}` : "/products";
      const response = await fetch(`${BASE_URL}${endpoint}`);
      if (!response.ok) {
          throw new Error("Failed to fetch products by category");
      }
      const data = await response.json();

      // Map the data to Product objects
      return data.map((item) => new Product(
          item.id,
          item.title,
          item.price,
          item.category,
          item.description,
          item.image
      ));
  } catch (error) {
      console.error(`Error fetching products for category "${category}":`, error);
      return []; // Return an empty array if fetching fails
  }
};

export const getAllCategory = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json(); // Return categories array
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array if fetch fails
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);
    if (!response.ok)
      throw new Error(`Failed to fetch product with ID ${productId}`);
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
    return null; // Return null if fetch fails
  }
};