const API_BASE_URL = "http://localhost:3000/api";


export async function getAllProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    return response.json();
}


export async function getProductById(productId) {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    return response.json();
}


export async function getAllCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    return response.json();
}


export async function getProductsByCategory(category) {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    return response.json();
}


export async function getFavourites() {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  console.log("Fetched favourites from localStorage:", favourites); 
  return favourites;
}

export async function addToFavourites(product) {
  console.log(`Adding to favourites: ${product.title}`); 

  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  if (!favourites.some(fav => fav.id === product.id)) {
      favourites.push(product);
      localStorage.setItem("favourites", JSON.stringify(favourites));
  }

  return favourites;
}

export async function removeFromFavourites(productId) {
  console.log(`Removing from favourites: ${productId}`); 

  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  favourites = favourites.filter(fav => fav.id !== productId);
  localStorage.setItem("favourites", JSON.stringify(favourites));

  return favourites;
}



export async function addToCart(product) {
  console.log(`Adding to cart via API: ${product.title}`); 

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  return cart; 
}

export async function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}



export async function removeFromCart(productId) {
    const response = await fetch(`${API_BASE_URL}/cart/${productId}`, { method: "DELETE" });
    return response.json();
}
