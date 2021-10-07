//Imports
const express = require("express");
const cors = require("cors");
const port = 8080;
const app = express();
const products = require("./routes/products.routes");
const ventas = require("./routes/ventas.routes");
require("./config/database");

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/products", products);
app.use("/ventas", ventas);

//HTTP request
app.get("/", (req, res) => {
  res.send("estamos en la pagina principal");
});

//Escuchando al servidor
app.listen(port, () => {
  console.log("estamos conectados");
});
