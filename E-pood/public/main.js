import { displayProductsView } from "./views/allProductsView.js";
import { displayFavouritesView } from "./views/favouritesView.js";
import { displayCartView } from "./views/cartView.js";
import { getAllCategories } from "./api.js"; 
import { Customer } from "./constructor/Customer.js";
import { Cart } from "./constructor/Cart.js";


const customer = new Customer();
const cart = new Cart();


document.getElementById("home-button").onclick = () => {
    displayProductsView(null, customer);
};


document.getElementById("favourites-button").onclick = () => {
    displayFavouritesView();
};


document.getElementById("cart-button").onclick = () => {
    displayCartView(cart);
};


(async () => {
    const categories = await getAllCategories();
    const categoryMenu = document.getElementById("categories");

    if (categories.length) {
        categories.forEach((category) => {
            const categoryElement = document.createElement("button");
            categoryElement.classList.add("category-button");
            categoryElement.textContent = category;
            categoryElement.onclick = () => displayProductsView(category, customer);
            categoryMenu.appendChild(categoryElement);
        });
    } else {
        categoryMenu.innerHTML = "<p>No categories available.</p>";
    }
})();


displayProductsView(null, customer);
