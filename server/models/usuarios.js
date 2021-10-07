const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  estado: {
    type: Bolean,
    required: true,
  },
  
});

const Usuarios = mongoose.model("Usuarios", userSchema);

module.exports = Usuarios;
