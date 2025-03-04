import { getProductById } from "../api.js";

export const displayProductsDetailView = async (productId) => {
    const product = await getProductById(productId);
    const container = document.createElement("app");

    if(!container) {
        console.error("Container with app Id not found");
        return;
    }

    container.innerHTML="";
    const productDetail = document.createElement("div");
    productDetail.classList.add("product-detail");
    productDetail.innerHTML = `
    <h2>${product.name}</h2>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Price:</strong> €${product.price}</p>
        <p><strong>Description:</strong> ${product.description || "No description available."}</p>
        <img src="${product.image || 'placeholder.jpg'}" alt="${product.name}" class="product-image">
        <button class="add-to-cart">Add to Cart</button>
        <button class="add-to-favourites">Add to Favourites</button
        `;
        productDetail.querySelector(".add-to-cart").addEventListener("click", () => {
            cart.addProduct(product);
            console.log(`Added ${product.name} to cart`)
        });

        productDetail.querySelector(".add-to-favourites").addEventListener("click", () => {
            if(!favourites.include(product)) {
                favourites.push(product)
                console.log(`Added ${product.name} to favourites.`);
            } else {
                console.log(`${product.name} is already in favourites.`);
            }
        });

        container.appendChild(productDetail)
}