const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombres: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    required: true,
  },
});

const Usuarios = mongoose.model("Usuario", userSchema);

module.exports = Usuario;
