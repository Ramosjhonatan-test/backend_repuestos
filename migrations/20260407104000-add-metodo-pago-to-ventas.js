'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Añadir metodo_pago a la tabla ventas
    // En PostgreSQL, Sequelize creará el tipo enum_ventas_metodo_pago
    await queryInterface.addColumn('ventas', 'metodo_pago', {
      type: Sequelize.ENUM('efectivo', 'tarjeta', 'transferencia', 'qr'),
      defaultValue: 'efectivo',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar columna metodo_pago de ventas
    await queryInterface.removeColumn('ventas', 'metodo_pago');
    
    // El tipo ENUM permanecerá en la base de datos (PostgreSQL behavior)
  }
};
