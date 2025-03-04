export class Product {
    constructor (id, name, price, category, description, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.description = description;
        this.image = image;
    }
    describe() {
        return `Product: ${this.name}, Price: ${this.price}, Category: ${this.category}`;
    }
    static discoutedPrice (price, discount) {
        return price - (price*discount) / 100;

    }
}
