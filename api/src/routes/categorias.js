const e = require("express");
const express = require("express");
const router = express.Router();
const { Categories, Producto } = require("../db.js");
const { isAuthenticated, isAuthenticatedAndAdmin } = require("./middlewares");

router.get("/", (req, res) => {
  Categories.findAll()
    .then((response) => res.send(response))
    .catch((err) => {
      return res.status(400).send(err);
    });
});
router.post("/", (req, res) => {
  let { nombre, descripcion } = req.body;
  if (!nombre || !descripcion) {
    res.status(400).send("Faltan parametros");
  }
  //prettier-ignore
  Categories.create(req.body).then((respuesta) => {
    res.status(201).send(respuesta);
  }).catch((err)=>{
    return  res.status(404).send(err.message)
  });
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  let { nombre, descripcion } = req.body;
  Categories.update({ nombre, descripcion }, { where: { id } })
    .then((categoria) => res.send(categoria))
    .catch((err) => res.status(404).json(err));
});

router.delete("/:id", (req, res) => {
  let id = req.params.id;
  Categories.destroy({ where: { id } }).then((response) => {
    if (response === 0) return res.status(400);
    else return res.status(201);
  });
});

module.exports = router;
