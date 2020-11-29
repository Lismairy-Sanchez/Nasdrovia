const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  const allowNull = false;
  // defino el modelo
  sequelize.define("categories", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: allowNull,
    },
    descripcion: {
      type: DataTypes.STRING,
      alowNull: allowNull,
    },
  });
};