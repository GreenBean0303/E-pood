import { updateCartCount } from "./mainMenu.js";

export const displayCartView = (cart) => {
    const container = document.getElementById("app");
    container.innerHTML = "";

    if (cart.items.length === 0) {
        container.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.items.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <h3>${item.product.name}</h3>
            <p>Price: €${item.product.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="increase-quantity">+</button>
            <button class="decrease-quantity">-</button>
            <button class="remove-item">Remove</button>
        `;

        cartItem.querySelector(".increase-quantity").onclick = () => {
            item.quantity += 1;
            displayCartView(cart);
        };

        cartItem.querySelector(".decrease-quantity").onclick = () => {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                cart.removeProduct(item.product.id);
            }
            displayCartView(cart);
        };

        
        cartItem.querySelector(".remove-item").onclick = () => {
            cart.removeProduct(item.product.id);
            updateCartCount(cart);
            displayCartView(cart);
        };

        container.appendChild(cartItem);
    });

    const total = document.createElement("p");
    total.textContent = `Total: €${cart.calculateTotal().toFixed(2)}`;
    container.appendChild(total);
};