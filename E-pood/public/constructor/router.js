import express from "express";
import fs from "fs";

const router = express.Router();
const products = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));
const favouritesFile = "./data/favourites.json";


router.get("/products", (req, res) => {
    res.json(products);
});


router.get("/products/:id", (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    product ? res.json(product) : res.status(404).json({ error: "Product not found" });
});


router.get("/categories", (req, res) => {
    const categories = [...new Set(products.map((p) => p.category))];
    res.json(categories);
});


router.get("/products/category/:category", (req, res) => {
    const filteredProducts = products.filter((p) => p.category === req.params.category);
    res.json(filteredProducts);
});


router.get("/favourites", (req, res) => {
    const favourites = JSON.parse(fs.readFileSync(favouritesFile, "utf8") || "[]");
    res.json(favourites);
});


router.post("/favourites", (req, res) => {
    const favourites = JSON.parse(fs.readFileSync(favouritesFile, "utf8") || "[]");
    if (!favourites.some((fav) => fav.id === req.body.id)) {
        favourites.push(req.body);
        fs.writeFileSync(favouritesFile, JSON.stringify(favourites, null, 2));
    }
    res.json(favourites);
});


router.delete("/favourites/:id", (req, res) => {
    let favourites = JSON.parse(fs.readFileSync(favouritesFile, "utf8") || "[]");
    favourites = favourites.filter((fav) => fav.id !== parseInt(req.params.id));
    fs.writeFileSync(favouritesFile, JSON.stringify(favourites, null, 2));
    res.json(favourites);
});

export default router;
