import { Order } from '.constructor/Order.js';

export class Customer {
    constructor(name) {
      this.name = name;
      this.orderHistory = [];
    }
  
    placeOrder(cart) {
      const order = new Order(cart);
      this.orderHistory.push(order);
    }
  
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
  export const customer = new Customer("Agnes")