const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

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
    minLength:{
      len:[15,200]
    }
  };
  // defino el modelo
  sequelize.define('reviews', {
    commentary: {
      type: DataTypes.STRING,
      allowNull: validations.allowNull,
      validate: validations.minLength,
      
    },
    qualification:{
      type:DataTypes.INTEGER,
      allowNull: validations.intType,
    },
  });
};