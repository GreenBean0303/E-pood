import { cart } from "../constructor/Cart.js"; 
import { updateCartCount } from "./mainMenu.js";

export async function displayCartView() {
    const container = document.getElementById("app");
    container.innerHTML = "<h2>Ostukorv</h2>";

    try {
        const cartItems = cart.getItems(); 
        console.log("Cart items:", cartItems); 

        if (!cartItems || cartItems.length === 0) {
            container.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cartItems.forEach((item) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <h3>${item.title}</h3>
                <p>Price: €${item.price}</p>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;

            cartItem.querySelector(".remove-item").addEventListener("click", () => {
                cart.removeProduct(item.id);
                updateCartCount();
                displayCartView();
            });

            container.appendChild(cartItem);
        });

        updateCartCount();
    } catch (error) {
        console.error("Error displaying cart:", error);
        container.innerHTML = "<p>Failed to load cart.</p>";
    }
}
