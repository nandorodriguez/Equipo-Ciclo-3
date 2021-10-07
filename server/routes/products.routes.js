const express = require("express");
const router = express.Router();
const Product = require("../models/producto");

//middlewares
router.use(express.json());
router.use(express.urlencoded());

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
router.post("/", async (req, res) => {
  await Product.insertMany(req.body);
  const productsNow = await Product.find();
  res.json(productsNow);
});
router.delete("/", async (req, res) => {
  await Product.deleteOne({ _id: req.body });
  const productsNow = await Product.find();
  res.json(productsNow);
});

module.exports = router;
