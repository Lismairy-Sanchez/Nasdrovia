require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const crypto = require('crypto');
const path = require("path");
const { userInfo } = require("os");
const userData = require("./models/userData");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/development`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  Producto,
  Categories,
  Carrito,
  LineaDeOrden,
  Reviews,
  Usuario,
  Images,
  Userdata
} = sequelize.models;

// relacion producto-categoria
Producto.belongsToMany(Categories, { through: "producto_categoria" });
Categories.belongsToMany(Producto, { through: "producto_categoria" });
// relacion producto-review
Producto.hasMany(Reviews);
//relacion usuario-review
Usuario.hasMany(Reviews);

Reviews.belongsTo(Usuario);
// relacion carrito-usuario
Usuario.hasMany(Carrito);
Carrito.belongsTo(Usuario);

Carrito.hasMany(LineaDeOrden);
//relacion carrito-producto
Carrito.belongsToMany(Producto, { through: LineaDeOrden });
Producto.belongsToMany(Carrito, { through: LineaDeOrden });
//relacion imagen-producto 
Producto.hasMany(Images);
Images.belongsTo(Producto);
//relacion usuario-datos
Userdata.belongsToMany(Usuario, { through: "datosUsuario"});
Usuario.hasOne(Userdata);
//-------Password------
Usuario.generateSalt = function () {
  return crypto.randomBytes(20).toString("hex");
},
Usuario.encryptPassword = function (plainText, salt) { 
  return crypto 
      .createHash ('RSA-SHA256') 
      .update (plainText) 
      .update (salt) 
      .digest ('hex') 
}
const setSaltAndPassword = usuario => { 
  if (usuario.changed ('password')) { 
      usuario.salt = Usuario.generateSalt() 
      usuario.password = Usuario.encryptPassword (usuario.password (), usuario.salt ()) 
  } 
}
Usuario.beforeCreate (setSaltAndPassword) 
Usuario.beforeUpdate (setSaltAndPassword)

Usuario.prototype.correctPassword = function(enteredPassword) {
  return Usuario.encryptPassword(enteredPassword, this.salt()) === this.password()
}

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
