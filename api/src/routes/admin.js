const router = require("express").Router();
const { Usuario } = require("../db.js");
const { isAuthenticated, isAuthenticatedAndAdmin } = require("./middlewares");

router.post("/", async (req, res) => {
  try {
    const admin = await Usuario.create({
      nombre: "admin",
      rol: "admin",
      email: "admin@nasdrovia.com",
      password: "nasdrovia",
    });
    return res.send("Usuario administrador creado");
  } catch (error) {
    return res.status(400).send("Ya existe el Administrador");
  }
});

module.exports = router;
