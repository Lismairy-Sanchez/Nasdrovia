const router = require("express").Router();
const { Op } = require("sequelize");
const { Carrito, LineaDeOrden, Usuario, Producto } = require("../db.js");
const { isAuthenticated, isAuthenticatedAndAdmin } = require("./middlewares");
/* -------------------Rutas Orden de compra------------------ */




//Ruta para obtener lineas de orden de un carrito
router.get("/:id", (req, res) => {
  let id = req.params.id;

  Carrito.findByPk(id, {
    include: [{ model: LineaDeOrden }],
  }) //Traemos los datos del producto, precio, cantidad, etc
    .then((respuesta) => {
      if (respuesta) return res.status(200).json(respuesta);
      else res.status(404).json({ error: "Orden no encontrada" });
    })
    .catch((error) => res.status(400).json(error));
});

//Rutas para traer todas las lineas de ordenes
router.get("/", (req, res) => {
  let estado = req.query.estado;

  Carrito.findAll({
    include: [{ model: LineaDeOrden }],
    where: estado ? { estado: { [Op.iLike]: `%${estado}%` } } : {},
  }).then((r) => {
    if (r.length <= 0) {
      res.status(400).send("no existe su petición");
    } else {
      res.status(200).send(r);
    }
  });
});

//Agregar productos al carro
router.post("/:idCarro/cart", (req, res) => {
  let lista = [];
  id = req.params.idCarro;
  let productos = req.body.productos;
  console.log(productos);
  console.log(typeof productos);
  if (typeof productos !== "object") {
    productos = JSON.parse(req.body.productos);
  }
  console.log(typeof productos);
  //Llenamos la lista de productos
  productos.list.forEach((element) => {
    let producto = {
      productoId: element.productoId,
      carritoId: id,
      cantidad: element.cantidad,
      precio: element.precio,
    };
    lista.push(producto);
  });
  let listaAnterior = LineaDeOrden.findAll({ where: { carritoId: id } });
  console.log(listaAnterior);
  if (listaAnterior) {
    LineaDeOrden.destroy({ where: { carritoId: id } });
  }

  //Creamos las lineasDeOrden asociadas al carrito
  LineaDeOrden.bulkCreate(lista)
  .then(
    Carrito.findOne({
      where: { id: id },
      include: LineaDeOrden,
    }).then((carrito) => res.json(carrito))
  );
});

//Editar las cantidad con el id del carro y el id producto la cantidad
router.put("/:id/cart", async (req, res) => {
  let idCarrito = req.params.id;
  let { producto, cantidad, precio } = req.body;
  if (producto || cantidad || precio) {
    LineaDeOrden.findOne({ where: { carritoId: idCarrito } })
      .then((existe) => {
        !!existe
          ? LineaDeOrden.update(
              { producto: producto, cantidad: cantidad, precio: precio },
              { where: { carritoId: idCarrito } }
            ).then(res.status(200).json({ OK: "Actualizado correctamente" }))
          : res.status(400).json({ Error: "Linea de orden no existente" });
      })
      .catch((err) => res.status(400).json({ Error: err }));
  } else {
    res.status(400).json({ Error: "Envia almenos un parametro" });
  }
});

//Borrar un producto del carrito
router.delete("/borrar/:idCarro", async (req, res) => {
  const id = req.params.idCarro;
  let producto = req.body.producto;
  let deleting = await LineaDeOrden.destroy({
    where: { productoId: producto },
  });
  let compras = await Carrito.findOne({
    where: { id: id },
    include: LineaDeOrden,
  });
  res.status(200).json(compras);
});

router.put("/:id/cart/status", (req, res) => {
  let idCarrito = req.params.id;
  let { estado } = req.body;
  if (estado) {
    Carrito.findOne({ where: { id: idCarrito } })
      .then((existe) => {
        !!existe
          ? Carrito.update(
              { estado: estado },
              { where: { id: idCarrito } }
            ).then(res.status(200).json({ OK: "Actualizado correctamente" }))
          : res.status(400).json({ Error: "Linea de orden no existente" });
      })
      .catch((err) => res.status(400).json({ Error: err }));
  } else {
    res.status(400).json({ Error: "Envia almenos un parametro" });
  }
});

router.put("/:id/set-total", async (req, res) => {
  let idCarrito = req.params.id;
  let total = 0;
  let data = await Carrito.findOne({
    where: { id: idCarrito },
    include: LineaDeOrden,
  });
  if (data) {
    data.lineaDeOrdens.forEach((element) => {
      total += element.dataValues.precio;
    });
    Carrito.update({ total: total }, { where: { id: idCarrito } }).then(
      res.status(200).json({ OK: "Total seteado" })
    );
  } else {
    res.status(200).json({ Error: "Esa orden no existia" });
  }
});
module.exports = router;
