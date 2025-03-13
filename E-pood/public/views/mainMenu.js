import { cart } from "../constructor/Cart.js";

export function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.getItems().length;
    }
}