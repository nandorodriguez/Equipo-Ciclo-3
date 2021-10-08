const express = require("express");
const router = express.Router();
const Venta = require("../models/venta");

//middlewares
router.use(express.json());
router.use(express.urlencoded());

router.get("/", async (req, res) => {
  const ventas = await Venta.find();
  res.json(ventas);
});
router.post("/", async (req, res) => {
  await Venta.insertMany(req.body);
  const ventasNow = await Venta.find();
  res.json(ventasNow);
});
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  await Venta.findOneAndUpdate(
    { _id: id },
    {
      $set: { ...req.body },
    }
  );
  const ventaNow = await Venta.find();
  res.json(ventaNow);
});
router.delete("/", async (req, res) => {
  await Venta.findOneAndDelete({ _id: req.body });
  const ventaNow = await Venta.find();
  res.json(ventaNow);
});

module.exports = router;
