import express from 'express';
import fs from 'fs/promises';
import axios from 'axios';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware to serve static files (for frontend)
app.use(express.static('public'));

// Ensure the data directory exists
const ensureDataDirectoryExists = async () => {
    const dirPath = path.resolve('./data');
    try {
        await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
        console.error('Error ensuring data directory exists:', error);
    }
};
await ensureDataDirectoryExists();

// Function: Fetch products from FakeStore API and save them to a file
const fetchAndSaveProducts = async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;
    await fs.writeFile('./data/products.json', JSON.stringify(products, null, 2));
};

// Function: Check if a file is empty or doesn't exist
const isFileEmpty = async (filePath) => {
    try {
        const rawData = await fs.readFile(filePath, 'utf-8');
        return !rawData.trim(); // True if file is empty or contains only whitespace
    } catch (error) {
        console.error('Error reading file:', error);
        return true; // Treat as empty if an error occurs
    }
};

// Route: Get all products
app.get('/products', async (req, res) => {
    try {
        const filePath = './data/products.json';

        // Check if file is empty and fetch products if needed
        const emptyFile = await isFileEmpty(filePath);
        if (emptyFile) {
            console.log('File is empty. Fetching data from FakeStore API...');
            await fetchAndSaveProducts();
        }

        // Read and parse products
        const rawData = await fs.readFile(filePath, 'utf-8');
        const products = JSON.parse(rawData);

        // Send products as response
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Route: Get unique product categories
app.get('/products/categories', async (req, res) => {
    try {
        const filePath = './data/products.json';

        // Check if file is empty and fetch products if needed
        const emptyFile = await isFileEmpty(filePath);
        if (emptyFile) {
            console.log('File is empty. Fetching data from FakeStore API...');
            await fetchAndSaveProducts();
        }

        // Read and parse products
        const rawData = await fs.readFile(filePath, 'utf-8');
        const products = JSON.parse(rawData);

        // Extract unique categories
        const categories = [...new Set(products.map(product => product.category))];

        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Route: Get products by category
app.get('/products/category/:category', async (req, res) => {
    try {
        const { category } = req.params; // Get the category from the request
        const filePath = './data/products.json';

        // Check if file is empty and fetch products if needed
        const emptyFile = await isFileEmpty(filePath);
        if (emptyFile) {
            console.log('File is empty. Fetching data from FakeStore API...');
            await fetchAndSaveProducts();
        }

        // Read and parse products
        const rawData = await fs.readFile(filePath, 'utf-8');
        const products = JSON.parse(rawData);

        // Filter products by category
        const filteredProducts = products.filter(
            (product) => product.category.toLowerCase() === category.toLowerCase()
        );

        if (filteredProducts.length > 0) {
            res.status(200).json(filteredProducts);
        } else {
            res.status(404).json({ message: `No products found for category: ${category}` });
        }
    } catch (error) {
        console.error('Error filtering products by category:', error);
        res.status(500).json({ error: 'Failed to filter products by category' });
    }
});

// Route: Force fetch products and save to file
app.get('/fetch-products', async (req, res) => {
    try {
        await fetchAndSaveProducts();
        res.status(200).json({ message: 'Products fetched and saved successfully' });
    } catch (error) {
        console.error('Error fetching and saving products:', error);
        res.status(500).json({ error: 'Failed to fetch and save products' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});