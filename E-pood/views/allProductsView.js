import { updateCartCount } from "./mainMenu.js";
import { cart } from "../constructor/Cart.js";
import { getProductsByCategory } from "../api.js";



export const displayProductsView = async (category) => {
    const products = await getProductsByCategory(category);
    const container = document.getElementById("app");
    container.innerHTML = "Tooted"; 

    if (products.length === 0) {
        container.innerHTML = "<p>No products found in this category.</p>";
        return;
    }

    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product");
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: €${product.price}</p>
            <button class="add-to-cart">Lisa ostukorvi</button>
            <button class="add-to-favourites">Lisa lemmikutesse</button>
        `;

        productCard.querySelector(".add-to-cart").onclick = () => {
            cart.addProduct(product);
            updateCartCount(cart);
            console.log(`Added ${product.name} to cart.`);
        };

        productCard.querySelector(".add-to-favourites").onclick = () => {
            if (!favourites.includes(product)) {
                favourites.push(product);
                console.log(`Added ${product.name} to favourites.`);
            }
        };

        container.appendChild(productCard);
    });
    const categoriesMenu = document.getElementById(categories);
if (categoriesMenu) {
    categoriesMenu.addEventListener("click", (event) => {
        event.preventDefault()
        const category = event.target.dataset.category;

        if (category) {
            const filteredProducts = products.filter(
                (product) => product.category === category
            );
            displayProductsView(filteredProducts);
        }
    });
}
};