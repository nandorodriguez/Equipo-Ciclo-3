const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const user = "reactfanboy";
const password = "I8hK7qVIE1nCGTCW";
const db = "tienda";
const uri = `mongodb+srv://${user}:${password}@tiendaonline.z9r8h.mongodb.net/${db}?retryWrites=true&w=majority?`;

mongoose
  .connect(uri)
  .then(() => console.log("DB conected"))
  .catch((err) => console.log(err));

const Product = require("./models/product");

app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
