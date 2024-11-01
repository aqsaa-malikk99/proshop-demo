import express from "express";

import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;
import products from "./data/products.js";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello I am working great!");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  res.json(product);
});
// Enable CORS for all routes
app.use(cors()); // Allow requests from any origin

app.listen(port, () => {
  console.log("Happy Serving!");
});
