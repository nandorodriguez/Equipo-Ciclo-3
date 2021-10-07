const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ventaSchema = new Schema({
  nameProduct: {
    type: String,
    required: true,
  },
  valueUnit: {
    type: Number,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  idClient: {
    type: String,
    required: true,
  },
  nameClient: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  nameSeller: {
    type: String,
    required: true,
  },
});

const Venta = mongoose.model("Venta", ventaSchema);

module.exports = Venta;
