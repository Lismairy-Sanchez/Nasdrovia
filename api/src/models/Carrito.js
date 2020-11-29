const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

//El carrito está en estado inicial en proceso

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
  };

  // defino el modelo
  //prettier-ignore
  //Estados posibles del carrito: carrito, creada, procesando, cancelada, completa.
  //El carrito tiene su propio id, pertenece a un usuario mediante usuarioId, posee muchas lineas de orden
  sequelize.define('carrito', {
        estado:{
            type:DataTypes.STRING,
            allowNull: validations.allowNull,
            defaultValue:'carrito'
        },
        total:{
          type:DataTypes.FLOAT,
          defaultValue: 0
      }
        
    });
};
