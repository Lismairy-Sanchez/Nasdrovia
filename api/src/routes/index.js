const express = require("express");
// import all routers
const Categorias = require("./categorias.js");
const ProductoRuta = require("./producto.js");
const Usuario = require("./usuarios");
const Carrito = require("./carrito");
const Admin = require("./admin");
const auth = require("./auth");
const { Op } = require("sequelize");
const { Producto, Images, Categories } = require("../db.js");
const router = express();
// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/producto", ProductoRuta);
router.use("/categorias", Categorias);
router.use("/usuario", Usuario);
router.use("/ordenes", Carrito);
router.use("/admin", Admin);
router.use("/auth", auth);

//prettier-ignore
router.get("/search", (req, res) => {

  const query = req.query;
  Producto.findAll({
    where: {
      [Op.or]: [
        { nombre: { [Op.iLike]: `%${query.busqueda}%` } },
        { descripcion: { [Op.iLike]: `%${query.busqueda}%` } },
      ],
    }, include: [
      {
        model: Images,
      },
      {
        model: Categories,
      },
    ],
  }).then((response) => {
    if (response.length <= 0) {
      return res.status(404).send("No se encontró ningún producto con ese nombre o descripción!" + err.message);
    } else {
      return res.status(200).send(response)
    }
  }).catch(() => res.status(400).send("Algo salió mal"));
});

module.exports = router;
