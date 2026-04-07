'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    static associate(models) {
      this.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'Categoria' });
      this.belongsTo(models.Proveedor, { foreignKey: 'proveedor_id', as: 'Proveedor' });
      this.hasMany(models.DetalleVenta, { foreignKey: 'producto_id' });
    }
  }
  Producto.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    categoria_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    proveedor_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: DataTypes.TEXT,
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    stock_minimo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    url_imagen: {
      type: DataTypes.STRING,
      defaultValue: 'https://via.placeholder.com/300x300?text=Sin+Imagen',
    },
    marca_vehiculo: {
      type: DataTypes.STRING,
      defaultValue: 'Universal',
    },
    modelo_vehiculo: {
      type: DataTypes.STRING,
      defaultValue: 'Todos',
    },
  }, {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos',
    underscored: true,
  });
  return Producto;
};
