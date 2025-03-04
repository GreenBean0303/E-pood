import { updateCartCount } from "./mainMenu.js";
import { cart } from "../constructor/Cart.js";
import { getProductsByCategory } from "../api.js";

export const displayProductsView = async (category, customer) => {
    const products = await getProductsByCategory(category);

    const container = document.getElementById("app");
    container.innerHTML = "<h2>Tooted</h2>";

    if (products.length === 0) {
        container.innerHTML += "<p>No products found in this category.</p>";
        return;
    }

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: €${product.price}</p>
            <button class="add-to-cart">Lisa ostukorvi</button>
            <button class="add-to-favourites">Lisa lemmikutesse</button>
        `;

        // Add to cart functionality
        productCard.querySelector(".add-to-cart").onclick = () => {
            cart.addProduct(product);
            updateCartCount(cart);
            console.log(`Added ${product.name} to cart.`);
        };

        // Add to favourites functionality
        productCard.querySelector(".add-to-favourites").onclick = () => {
            customer.addToFavourites(product);
        };

        container.appendChild(productCard);
    });

    // Handle category menu (if needed)
    const categoriesMenu = document.getElementById("categories");
    if (categoriesMenu) {
        categoriesMenu.addEventListener("click", (event) => {
            event.preventDefault();
            const selectedCategory = event.target.dataset.category;

            if (selectedCategory) {
                displayProductsView(selectedCategory, favourites);
            }
        });
    }
};