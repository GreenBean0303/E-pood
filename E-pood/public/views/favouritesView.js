import { getFavourites, addToCart, removeFromFavourites } from "../api.js";
import { updateCartCount } from "./mainMenu.js"; 

export async function displayFavouritesView() {
    const container = document.getElementById("app");
    container.innerHTML = "<h2>Lemmikud</h2>";

  
    const favourites = await getFavourites();
    console.log("Favourites:", favourites);

    if (!favourites || favourites.length === 0) {
        container.innerHTML += "<p>You have no favourite products yet.</p>";
        return;
    }

    favourites.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
            <h3>${product.title}</h3>
            <p>Price: €${product.price}</p>
            <button class="add-to-cart">Lisa ostukorvi</button>
            <button class="remove-from-favourites">Eemalda</button>
        `;

        // Add to Cart
        productCard.querySelector(".add-to-cart").addEventListener("click", async () => {
            await addToCart(product);
            updateCartCount(); //
            console.log(`Added ${product.title} to cart.`);
        });

        //  Remove from Favourites
        productCard.querySelector(".remove-from-favourites").addEventListener("click", async () => {
            await removeFromFavourites(product.id);
            displayFavouritesView(); 
        });

        container.appendChild(productCard);
    });
}
