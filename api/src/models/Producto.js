const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // Defino lo que se repite en los modelos:
  const validations = {
    allowNull: false,
    strType: {
      isString(value) {
        if (typeof value !== "string")
          throw new Error("Error: debe ser una String");
      },
    },
    intType: {
      isNumeric: true,
    },
  };
  // defino el modelo
  sequelize.define("producto", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
      validate: validations.strType,
      //unique:true
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: validations.allowNull,
      validate: validations.intType,
    },
    stock: {
      type: DataTypes.FLOAT,
      allowNull: validations.allowNull,
      validate: validations.intType,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: validations.allowNull,
      validate: validations.strType,
    },
  });
};