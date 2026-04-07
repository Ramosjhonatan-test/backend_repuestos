'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Factura extends Model {
    static associate(models) {
      this.belongsTo(models.Venta, { foreignKey: 'venta_id' });
    }
  }
  Factura.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    venta_id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    numero_factura: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    metodo_pago: {
      type: DataTypes.ENUM('efectivo', 'tarjeta', 'transferencia', 'qr'),
      defaultValue: 'efectivo',
    },
    notas: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Factura',
    tableName: 'facturas',
    underscored: true,
  });
  return Factura;
};
