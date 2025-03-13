export class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem("cart")) || [];
    }

    addProduct(product) {
        console.log(`Adding product to cart: ${product.title}`); 
        const existingItem = this.items.find((item) => item.id === product.id);
        if (!existingItem) {
            this.items.push(product);
            this.saveCart();
        }
    }

    removeProduct(productId) {
        this.items = this.items.filter((item) => item.id !== productId);
        this.saveCart();
    }

    getItems() {
        return this.items;
    }

    saveCart() {
        localStorage.setItem("cart", JSON.stringify(this.items));
    }
}

// ✅ Export an instance of `Cart`
export const cart = new Cart();
