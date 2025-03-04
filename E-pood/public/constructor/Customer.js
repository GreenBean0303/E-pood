import { Order } from "./Order.js";

export class Customer {
    constructor(name) {
        this.name = name;
        this.orderHistory = [];
        this.favourites = [];
    }

    // Add a product to favourites
    addToFavourites(product) {
        if (!this.favourites.includes(product)) {
            this.favourites.push(product);
            console.log(`Added ${product.name} to favourites.`);
        } else {
            console.log(`${product.name} is already in favourites.`);
        }
    }

    // Remove a product from favourites
    removeFromFavourites(product) {
        this.favourites = this.favourites.filter((fav) => fav.id !== product.id);
        console.log(`Removed ${product.name} from favourites.`);
    }

    // Get all favourites
    getFavourites() {
        return this.favourites;
    }

    // Place an order
    placeOrder(cart) {
        const order = new Order(cart);
        this.orderHistory.push(order);
    }

    // Print order history
    printOrderHistory() {
        console.log(`Order History for Customer: ${this.name}`);
        if (this.orderHistory.length === 0) {
            console.log("No orders found.");
            return;
        }

        this.orderHistory.forEach((order, index) => {
            console.log(`Order ${index + 1}:`);
            order.printOrder();
            console.log("------------");
        });
    }
}

export const customer = new Customer("Agnes");