import express from "express";
import fs from "fs";
import cors from "cors";
import session from "express-session";
import path from "path";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "e-pood-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static("public"));

// Load products
const products = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));

app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data: https://fakestoreapi.com http://localhost:3000");
    next();
});


app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/epood.html"));
});


app.get("/api/products", (req, res) => {
  res.json(products);
});


app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  product ? res.json(product) : res.status(404).json({ error: "Product not found" });
});


app.get("/api/categories", (req, res) => {
  const categories = [...new Set(products.map((p) => p.category))];
  res.json(categories);
});


app.get("/api/products/category/:category", (req, res) => {
  const filteredProducts = products.filter((p) => p.category === req.params.category);
  res.json(filteredProducts);
});


const favouritesFile = "./data/favourites.json";

app.get("/api/favourites", (req, res) => {
    try {
       
        const favourites = fs.existsSync(favouritesFile)
            ? JSON.parse(fs.readFileSync(favouritesFile, "utf8") || "[]")
            : [];
        res.json(favourites);
    } catch (error) {
        console.error("Error reading favourites.json:", error);
        res.status(500).json({ error: "Failed to load favourites" });
    }
});


app.post("/api/favourites", (req, res) => {
  const favourites = JSON.parse(fs.readFileSync(favouritesFile, "utf8") || "[]");
  if (!favourites.some((fav) => fav.id === req.body.id)) {
    favourites.push(req.body);
    fs.writeFileSync(favouritesFile, JSON.stringify(favourites, null, 2));
  }
  res.json(favourites);
});

//Remove Favorite
app.delete("/api/favourites/:id", (req, res) => {
  let favourites = JSON.parse(fs.readFileSync(favouritesFile, "utf8") || "[]");
  favourites = favourites.filter((fav) => fav.id !== parseInt(req.params.id));
  fs.writeFileSync(favouritesFile, JSON.stringify(favourites, null, 2));
  res.json(favourites);
});

app.get("/api/cart", (req, res) => {
  req.session.cart = req.session.cart || [];
  res.json(req.session.cart);
});

app.post("/api/cart", (req, res) => {
  req.session.cart = req.session.cart || [];
  req.session.cart.push(req.body);
  res.json(req.session.cart);
});

app.delete("/api/cart/:id", (req, res) => {
  req.session.cart = req.session.cart.filter((item) => item.id !== parseInt(req.params.id));
  res.json(req.session.cart);
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
