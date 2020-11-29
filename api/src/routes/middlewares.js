const middlewares = {};
const { Usuario} = require("../db.js");
//Para ver si se esta logueado
//Me parece que ya viene con passport
middlewares.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).json({ Error: "Login required" });
};
//Para ver si el usuario es un admin
middlewares.isAuthenticatedAndAdmin = async (req, res, next) => {

  if (req.isAuthenticated() && req.user["dataValues"].rol == "admin") {
    return next();

  }else{
  	return res.status(403).json({ Error: "Admin level access required" });
  }

  
}
middlewares.userInjector = async (req, res, next) => {
    if (req.isAuthenticated()) {
      req.user = await Usuario.findOne({ where: { id: usuario["dataValues"].id  } });
  }
    next();
}

middlewares.createUser = (req, res, next) => {
  let { nombre, rol, email, contrasena } = req.body;
};
module.exports = middlewares;
