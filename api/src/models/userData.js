const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {


  sequelize.define('userdata', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    apellido:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    documento:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ciudad:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    pais:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono:{
        type: DataTypes.INTEGER,
         allowNull: false,
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    departamento:{
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
};
