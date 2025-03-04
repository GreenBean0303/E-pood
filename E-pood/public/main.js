import { Product } from "./constructor/Product.js";
import { cart } from "./constructor/Cart.js";
import { displayProductsView } from "./views/allProductsView.js";
import { displayFavouritesView } from "./views/favouritesView.js";
import { displayCartView } from "./views/cartView.js";
import { getAllCategory } from "./api.js";
import { Customer } from "./constructor/Customer.js";

const favourites = [];
const customer = new Customer();
async function initApp() {
    try {
        // Home Button
        const homeButton = document.getElementById("home-button");
        homeButton.onclick = () => {
            displayProductsView(null, customer);
        };

        // Favourites Button
        const favouritesButton = document.getElementById("favourites-button");
        favouritesButton.onclick = () => {
            displayFavouritesView(customer.getFavourites(), cart);
        };

        // Cart Button
        const cartButton = document.getElementById("cart-button");
        cartButton.onclick = () => {
            displayCartView(cart);
        };

        // Fetch and Display Categories
        const categories = await getAllCategory();
        const categoryMenu = document.getElementById("categories");

        if (categories && categories.length > 0) {
            categories.forEach((category) => {
                const categoryElement = document.createElement("button");
                categoryElement.classList.add("category-button"); // Add a class
                categoryElement.textContent = category;
                categoryElement.onclick = async () => {
                    displayProductsView(category, customer); // Pass category and customer
                };
                categoryMenu.appendChild(categoryElement);
            });
        } else {
            categoryMenu.innerHTML = "<p>No categories available.</p>";
        }

        // Display all products on initial load
        displayProductsView(null, customer);
    } catch (error) {
        console.error("Error initializing the app:", error);
        const categoryMenu = document.getElementById("categories");
        categoryMenu.innerHTML = "<p>Failed to load categories. Please try again later.</p>";
    }
}
document.addEventListener("DOMContentLoaded", initApp);