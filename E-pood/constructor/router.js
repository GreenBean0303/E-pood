import { displayProductsView } from './views/productsView.js';
import { displayCartView } from './views/cartView.js';
import { displayFavoritesView } from './views/favoritesView.js';
import { displayProductDetailView } from './views/productDetailView.js';

export const navigate = (view, data) => {
    switch (view) {
        case 'products':
            displayProductsView(data);
            break;
        case 'cart':
            displayCartView(data);
            break;
        case 'favorites':
            displayFavoritesView(data);
            break;
        case 'productDetail':
            displayProductDetailView(data);
            break;
        default:
            console.error("Unknown view:", view);
    }
};