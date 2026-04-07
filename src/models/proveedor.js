'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    static associate(models) {
      this.hasMany(models.Producto, { foreignKey: 'proveedor_id' });
    }
  }
  Proveedor.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre_contacto: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Proveedor',
    tableName: 'proveedores',
    underscored: true,
  });
  return Proveedor;
};
