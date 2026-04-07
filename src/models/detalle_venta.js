'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DetalleVenta extends Model {
    static associate(models) {
      this.belongsTo(models.Venta, { foreignKey: 'venta_id' });
      this.belongsTo(models.Producto, { foreignKey: 'producto_id' });
    }
  }
  DetalleVenta.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    venta_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'DetalleVenta',
    tableName: 'detalle_ventas',
    underscored: true,
  });
  return DetalleVenta;
};
