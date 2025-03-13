import { updateCartCount } from "./mainMenu.js";
import { cart } from "../constructor/Cart.js";
import { getAllProducts, getProductsByCategory } from "../api.js";
import { addToFavourites, getFavourites } from "../api.js";

export const displayProductsView = async (category = null) => {
    let products;

    try {
        products = category ? await getProductsByCategory(category) : await getAllProducts();
    } catch (error) {
        console.error("Error fetching products:", error);
        return;
    }

    const container = document.getElementById("app");
    container.innerHTML = "<h2>Tooted</h2>";

    if (!products || products.length === 0) {
        container.innerHTML += "<p>No products found.</p>";
        return;
    }

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: €${product.price}</p>
            <button class="add-to-cart">Lisa ostukorvi</button>
            <button class="add-to-favourites">Lisa lemmikutesse</button>
        `;

        // Add to Cart
        productCard.querySelector(".add-to-cart").addEventListener("click", () => {
            cart.addProduct(product);
            updateCartCount(cart);
            console.log(`Added ${product.title} to cart.`);
        });

        productCard.querySelector(".add-to-favourites").addEventListener("click", async () => {
            await addToFavourites(product);
            console.log(`Added ${product.title} to favourites.`);
        });

        container.appendChild(productCard);
    });

    const categoriesMenu = document.getElementById("categories");
    if (categoriesMenu) {
        categoriesMenu.addEventListener("click", (event) => {
            event.preventDefault();
            const selectedCategory = event.target.dataset.category;

            if (selectedCategory) {
                displayProductsView(selectedCategory);
            }
        });
    }
};
