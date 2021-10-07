const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");

router.use(express.json());
router.use(express.urlencoded());

router.get("/", async (req, res) => {
  const user = await Usuario.find();
  res.json(user);
});
router.post("/", async (req, res) => {
  await Usuarios.insertMany(req.body);
  const usuarioNow = await Usuario.find();
  res.json(usuarioNow);
});
router.delete("/", async (req, res) => {
  await Usuario.deleteOne({ _id: req.body });
  const usuarioNow = await Usuario.find();
  res.json(usuarioNow);
});

module.exports = router;
