export class Cart {
    constructor () {
        this.items = [];
    }
    addProduct(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
        
    }
    updateProductQuantity(productId, delta) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                this.removeProduct(productId);
            }
        }
        
    }
    removeProduct(productId) {
        this.items = this.items.filter((item)=>item.product.id !==productId)
     
    }
    get totalItems() {
        return this.items.reduce((total, item)=> total + item.quantity,0);
    }
    calculateTotal(VAT = 0.2, discount = 0.1) {
        return this.items.reduce((total, item) => {
            const discountedPrice = item.product.price * (1 - discount);
            return total + discountedPrice * item.quantity * (1 + VAT);
        }, 0);
    }
    clear() {
        this.items = [];
    }


}
export const cart = new Cart();