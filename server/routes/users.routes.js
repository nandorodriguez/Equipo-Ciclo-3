const express = require("express");
const router = express.Router();
const Usuarios = require("../models/usuarios");

router.use(express.json());
router.use(express.urlencoded());

router.get("/", async (req, res) => {
    const user = await Usuarios.find();
    res.json(user);
  });
  router.post("/", async (req, res) => {
    await Usuarios.insertMany(req.body);
    const usuarioNow = await Usuarios.find();
    res.json(usuarioNow);
  });
  router.delete("/", async (req, res) => {
    await Usuarios.deleteOne({ _id: req.body });
    const usuarioNow = await Usuarios.find();
    res.json(usuarioNow);
  });
  
  module.exports = router;