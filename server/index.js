//Imports
const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const products = require("./routes/products.routes");
const ventas = require("./routes/ventas.routes");
const usuarios = require("./routes/usuarios.routes");
require("./config/database");

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

//Routes
app.use("/products", products);
app.use("/ventas", ventas);
app.use("/usuarios", usuarios);

//HTTP request
app.get("/", (req, res) => {
  res.send("estamos en la pagina principal");
});

//Escuchando al servidor
app.listen(port, () => {
  console.log("estamos conectados");
});
