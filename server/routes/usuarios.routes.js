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
  const { idGoogle } = req.body;
  const usuarioExiste = await Usuario.findOne({
    idGoogle: idGoogle,
  });
  if (usuarioExiste) {
    res.json({
      message: "El usuario ya existe",
    });
  } else {
    await Usuario.insertMany(req.body);
    const usuarioNow = await Usuario.find();
    res.json(usuarioNow);
  }
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  await Usuario.findOneAndUpdate(
    { _id: id },
    {
      $set: { ...req.body },
    }
  );
  const usuarioNow = await Usuario.find();
  res.json(usuarioNow);
});
router.delete("/", async (req, res) => {
  await Usuario.deleteOne({ _id: req.body });
  const usuarioNow = await Usuario.find();
  res.json(usuarioNow);
});

module.exports = router;
