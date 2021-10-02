const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  idProduct: String,
  description: String,
  price: Number,
  status: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;