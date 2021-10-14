const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  idGoogle: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

const Usuario = mongoose.model("Usuario", userSchema);

module.exports = Usuario;
