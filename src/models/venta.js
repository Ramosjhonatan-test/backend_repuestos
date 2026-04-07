'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    static associate(models) {
      this.belongsTo(models.Cliente, { foreignKey: 'cliente_id', as: 'Cliente' });
      this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'Usuario' });
      this.hasMany(models.DetalleVenta, { foreignKey: 'venta_id', as: 'detalles' });
      this.hasOne(models.Factura, { foreignKey: 'venta_id', as: 'Factura' });
    }
  }
  Venta.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cliente_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fecha_venta: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    tasa_impuesto: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 15.00,
    },
    total_impuesto: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('completada', 'anulada'),
      defaultValue: 'completada',
    },
    metodo_pago: {
      type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia', 'qr'),
      defaultValue: 'efectivo',
    },
  }, {
    sequelize,
    modelName: 'Venta',
    tableName: 'ventas',
    underscored: true,
  });
  return Venta;
};
