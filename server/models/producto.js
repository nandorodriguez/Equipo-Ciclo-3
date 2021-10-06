const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
