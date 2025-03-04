import { Product } from "./constructor/Product.js";
import { cart } from "./constructor/Cart.js";
import { displayProductsView } from "./views/allProductsView.js";
import { displayFavouritesView } from "./views/favouritesView.js";
import { displayCartView } from "./views/cartView.js";
import { getAllCategory } from "./api.js";


const favourites = [];

async function initApp() {
    const homeButton = document.getElementById("home-button");
    homeButton.onclick = () => initApp(); 

    const favouritesButton = document.getElementById("favourites-button");
    favouritesButton.onclick = () => displayFavouritesView(favourites, cart);

    const cartButton = document.getElementById("cart-button");
    cartButton.onclick = () => displayCartView(cart);

    
    const categories = await getAllCategory();
    const categoryMenu = document.getElementById("categories");
    categoryMenu.innerHTML = ""; 
    categories.forEach((category) => {
        const categoryElement = document.createElement("li");
        categoryElement.textContent = category;
        categoryElement.onclick = () => navigate("category", category); 
        categoryMenu.appendChild(categoryElement);
    });

    //updateCartCount(cart); 
    
    displayProductsView();
}


document.addEventListener("DOMContentLoaded", initApp);


 
