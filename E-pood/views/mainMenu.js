export function updateCartCount(cart) {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.totalItems;
}
