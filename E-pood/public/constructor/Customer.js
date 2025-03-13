export class Customer {
    constructor(name) {
        this.name = name;
        this.favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    }

    addToFavourites(product) {
        console.log(`Adding product to favourites: ${product.title}`);
        if (!this.favourites.some(fav => fav.id === product.id)) {
            this.favourites.push(product);
            this.saveFavourites();
        }
    }

    removeFromFavourites(productId) {
        this.favourites = this.favourites.filter(fav => fav.id !== productId);
        this.saveFavourites();
    }

    saveFavourites() {
        localStorage.setItem("favourites", JSON.stringify(this.favourites));
    }

    getFavourites() {
        return this.favourites;
    }
}

export const customer = new Customer("Agnes");
