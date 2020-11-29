const router = require("express").Router();
const { Usuario } = require("../db"); //Revisar si va esta parte
const passport = require("passport");
const { isAuthenticatedAndAdmin } = require("./middlewares");

//----------Logueo-------------
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(201).send(req.user["dataValues"]);
});

//-------------Deslogueo--------------
router.post("/logout", (req, res) => {
  req.logout();
  res.status(201).send("Usuario deslogueado");
});

//------------Perfil usuario---------
router.get("/me", (req, res) => {
  if (req.isAuthenticated()) return res.send(req.usuario);
  else return res.status(401).send("Usuario no se encuentra logueado");
});

//-------Cambio rol de usuario-------
router.post("/promote/:id", async (req, res) => {
  id = req.params.id;
  const user = await Usuario.findOne({ where: { id } });
  if (!user) return res.status(400).send("no se encontro el usuario");
  await user.update({ rol: "admin" });
  return res.status(201).send(user);
});

router.post("/revoque/:id", async (req, res) => {
  id = req.params.id;
  const user = await Usuario.findOne({ where: { id } });
  if (!user) return res.status(400).send("no se encontro el usuario");
  await user.update({ rol: "client" });
  return res.status(201).send(user);
});

//--------- Autenticación Facebook-----------
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "http://localhost:3000/",
  })
);

//--------- Autenticación Google -----------

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/perfil",
  })
);

module.exports = router;
