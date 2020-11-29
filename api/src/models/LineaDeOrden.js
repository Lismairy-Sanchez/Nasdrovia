const { DataTypes } = require('sequelize');

    // Defino lo que se repite en los modelos:
   
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
//Pertece  a un carrito mediante carritoId
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
        floatType: {
            isNumeric: true,
          },
      };
  // defino el modelo
  sequelize.define('lineaDeOrden', {
    cantidad:{
        type:DataTypes.INTEGER,
        allowNull: validations.allowNull,
        validate: validations.strType,

      },
      precio:{
        type:DataTypes.FLOAT,
        allowNull: validations.allowNull,
        validate: validations.floatType,
      }
     
   

  });
};